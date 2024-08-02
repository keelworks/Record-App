
import conn from '../config/dbConnection.js'
import formatDate from './formateDate.js';


// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const [results] = await conn.query('SELECT * FROM Projects');

     // Fetch count of projects
     const [countResults] = await conn.query('SELECT COUNT(*) AS total FROM Projects');
     const totalProjects = countResults[0].total;
    return res.status(200).send({ success: true, data: results ,total:totalProjects});
  } catch (err) {
    console.error("Error fetching projects:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Add a new project
export const addProject = async (req, res) => {
  const { Project_Name, Role, Start_Date, End_Date, Description } = req.body;
  
  try {
    const formattedStartDate = formatDate(Start_Date);
    const formattedEndDate = formatDate(End_Date);

    await conn.query(
      'INSERT INTO Projects (Project_Name, Role,Stage,Project_manager, Start_Date, End_Date, Description) VALUES (?, ?, ?, ?, ?,?,?)',
      [Project_Name, Role, formattedStartDate, formattedEndDate, Description]
    );

    return res.status(201).send({ success: true, message: 'Project added successfully' });
  } catch (err) {
    console.error('Error adding project:', err);
    return res.status(500).send({ error: 'Internal server error' });
  }
};
// Update an existing project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { Project_Name, Role, Start_Date, End_Date, Description,Stage,Project_manager } = req.body;
  
  try {
    // Fetch current values from the database
    const [existingProject] = await conn.query('SELECT * FROM Projects WHERE Project_id = ?', [id]);

    if (existingProject.length === 0) {
      return res.status(404).send({ error: "Project not found" });
    }

    const currentProject = existingProject[0];

    // Merge new values with current values
    const updatedProject = {
      Project_Name: Project_Name ?? currentProject.Project_Name,
      Role: Role ?? currentProject.Role,
      Stage:Stage ?? currentProject.Stage,
      Project_manager :Project_manager ?? currentProject.Project_manager,
      Start_Date: Start_Date ? formatDate(Start_Date) : currentProject.Start_Date,
      End_Date: End_Date ? formatDate(End_Date) : currentProject.End_Date,
      Description: Description ?? currentProject.Description
    };

    await conn.query(
      'UPDATE Projects SET Project_Name = ?, Role = ?,Stage=?,Project_manager=?, Start_Date = ?, End_Date = ?, Description = ? WHERE Project_id = ?',
      [updatedProject.Project_Name, updatedProject.Role,updatedProject.Stage ,updatedProject.Project_manager,updatedProject.Start_Date, updatedProject.End_Date, updatedProject.Description, id]
    );

    return res.status(200).send({ success: true, message: "Project updated successfully" });
  } catch (err) {
    console.error("Error updating project:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
// Delete a project
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await conn.query('DELETE FROM Projects WHERE Project_id = ?', [id]);
    return res.status(200).send({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
