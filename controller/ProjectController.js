
import conn from '../config/dbConnection.js'
import formatDate from './formateDate.js';


// Get all projects
export const getAllProjects = async (req, res) => {
  const userRole = (req.user.role || '').toLowerCase();
  const userEmail = req.user.email;
  try {
    let query = '';
    let queryParams = [];
    let countQuery = '';
    let countQueryParams = [];

    if (userRole === 'admin') {
      query = 'SELECT * FROM Projects';
      countQuery = 'SELECT COUNT(*) AS total_count FROM Projects';
    } else {

      const [participantResult] = await conn.query('SELECT ID FROM Participant WHERE Email_id = ?', [userEmail]);

    if (participantResult.length === 0) {
      return res.status(404).send({ error: 'Participant not found' });
    }

    const participantID = participantResult[0].ID;
     query = 'SELECT * FROM Projects WHERE Participant_ID = ?';
    queryParams.push(participantID);
    countQuery = 'SELECT COUNT(*) AS total_count FROM Projects WHERE Participant_ID = ?';
    countQueryParams.push(participantID);
    }

    const [projects] = await conn.query(query, queryParams);
    const [countResult] = await conn.query(countQuery, countQueryParams);
    const totalCount = countResult[0].total_count || 0;

    return res.status(200).send({ success: true, data: projects, total: totalCount });
  } catch (err) {
    console.error("Error fetching projects entries:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const addProject = async (req, res) => {
  const { Project_Name, Role, Stage, Project_manager, Start_Date, End_Date, Description } = req.body;
  const email = req.user.email;

  try {
    const [participant] = await conn.query('SELECT ID FROM Participant WHERE Email_id = ?', [email]);

    if (participant.length === 0) {
      return res.status(404).send({ error: 'Participant not found' });
    }

    const participantId = participant[0].ID;

    const formattedStartDate = formatDate(Start_Date);
    const formattedEndDate = formatDate(End_Date);

    await conn.query(
      'INSERT INTO Projects (Project_Name, Role, Stage, Project_manager, Start_Date, End_Date, Description, Participant_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [Project_Name, Role, Stage, Project_manager, formattedStartDate, formattedEndDate, Description, participantId]
    );

    return res.status(201).send({ success: true, message: 'Project added successfully' });
  } catch (err) {
    console.error('Error adding project:', err);
    return res.status(500).send({ error: 'Internal server error' });
  }
};
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { Project_Name, Role, Start_Date, End_Date, Description, Stage, Project_manager } = req.body;
  const userRole = (req.user.role || '').toLowerCase();
  const userEmailId = req.user.email;

  try {
    const [existingProject] = await conn.query('SELECT * FROM Projects WHERE Project_id = ?', [id]);

    if (existingProject.length === 0) {
      return res.status(404).send({ error: "Project not found" });
    }

    const currentProject = existingProject[0];
    const [participant] = await conn.query('SELECT ID FROM Participant WHERE Email_id = ?', [userEmailId]);

    if (participant.length === 0) {
      return res.status(403).send({ error: "Participant not found for this user" });
    }
  
    const participantId = participant[0].ID;
  
    if (userRole !== 'admin' && currentProject.Participant_id !== participantId) {
      return res.status(403).send({ error: "Forbidden: Only admin can update this record" });
    }

    const updatedProject = {
      Project_Name: Project_Name ?? currentProject.Project_Name,
      Role: Role ?? currentProject.Role,
      Stage: Stage ?? currentProject.Stage,
      Project_manager: Project_manager ?? currentProject.Project_manager,
      Start_Date: Start_Date ? formatDate(Start_Date) : currentProject.Start_Date,
      End_Date: End_Date ? formatDate(End_Date) : currentProject.End_Date,
      Description: Description ?? currentProject.Description,
    };

    await conn.query(
      'UPDATE Projects SET Project_Name = ?, Role = ?,Stage=?,Project_manager=?, Start_Date = ?, End_Date = ?, Description = ? WHERE Project_id = ?',
      [updatedProject.Project_Name, updatedProject.Role, updatedProject.Stage, updatedProject.Project_manager, updatedProject.Start_Date, updatedProject.End_Date, updatedProject.Description,  id]
    );

    return res.status(200).send({ success: true, message: "Project updated successfully" });
  } catch (err) {
    console.error("Error updating project:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const userRole = (req.user.role || '').toLowerCase();
  const userEmailId = req.user.email;
  
try {
  const [project] = await conn.query('SELECT * FROM Projects WHERE Project_id = ?', [id]);

  if (project.length === 0) {
    return res.status(404).send({ error: "Project not found" });
  }

  const existingProject = project[0];
  const [participant] = await conn.query('SELECT ID FROM Participant WHERE Email_id = ?', [userEmailId]);

  if (participant.length === 0) {
    return res.status(403).send({ error: "Participant not found for this user" });
  }

  const participantId = participant[0].ID;

  // Check if the user is an admin or the owner of the project
  if (userRole !== 'admin' && existingProject.Participant_id !== participantId) {
    return res.status(403).send({ error: "Forbidden: Only admin can  delete this project" });
  }

  await conn.query('START TRANSACTION');
  await conn.query('DELETE FROM Projects WHERE Project_id = ?', [id]);
  await conn.query('COMMIT');

  return res.status(200).send({ success: true, message: "Project deleted successfully" });

} catch (err) {
  // Rollback in case of an error
  await conn.query('ROLLBACK');
  console.error("Error deleting project:", err);
  return res.status(500).send({ error: "Internal server error" });
}
};
