
import conn from '../config/dbConnection.js'
import formatDate from './formateDate.js';


// Get all projects
export const getAllProjects = async (req, res) => {
  const userRole =(req.user.role || '').toLowerCase(); 
  const userEmail = req.user.email; 
  try {
    let query = '';
    let queryParams = [];
    let countQuery = '';
    let countQueryParams = [];
    
    // If the user is an admin, fetch all education records
    if (userRole === 'admin') {
      query = 'SELECT * FROM Projects';
      countQuery = 'SELECT COUNT(*) AS total_count FROM Projects'; 
    } else {
      // If the user is a participant, fetch only their own education records
      query = 'SELECT * FROM Projects WHERE Email_id = ?';
      queryParams.push(userEmail); // Add the logged-in user's email as a query parameter
      countQuery = 'SELECT COUNT(*) AS total_count FROM Projects WHERE Email_id = ?'; // Total count for the user's own projects
      countQueryParams.push(userEmail); 
    }

     // Execute the query to fetch project records
     const [projects] = await conn.query(query, queryParams);

     // Execute the count query
     const [countResult] = await conn.query(countQuery, countQueryParams);
 
     const totalCount = countResult[0].total_count || 0;
 
     return res.status(200).send({ success: true, data: projects, total: totalCount });
  } catch (err) {
    console.error("Error fetching projects entries:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Add a new project
export const addProject = async (req, res) => {
  const { Project_Name, Role,Stage,Project_manager, Start_Date, End_Date, Description } = req.body;
  const email=req.user.email
  
  try {
    const formattedStartDate = formatDate(Start_Date);
    const formattedEndDate = formatDate(End_Date);

    await conn.query(
      'INSERT INTO Projects (Project_Name, Role,Stage,Project_manager, Start_Date, End_Date, Description,Email_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [Project_Name, Role, Stage,Project_manager,formattedStartDate, formattedEndDate, Description,email]
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
  const { Project_Name, Role, Start_Date, End_Date, Description,Stage,Project_manager,Email_id } = req.body;
  const userRole =(req.user.role || '').toLowerCase(); 
  const userEmailId = req.user.email;
  
  try {
    // Fetch current values from the database
    const [existingProject] = await conn.query('SELECT * FROM Projects WHERE Project_id = ?', [id]);

    if (existingProject.length === 0) {
      return res.status(404).send({ error: "Project not found" });
    }

    const currentProject = existingProject[0];
    if (userRole !== 'admin'  && currentProject.Email_id !== userEmailId) {
      return res.status(403).send({ error: "Forbidden: You do not have permission to update this record" });
    }

    // Merge new values with current values
    const updatedProject = {
      Project_Name: Project_Name ?? currentProject.Project_Name,
      Role: Role ?? currentProject.Role,
      Stage:Stage ?? currentProject.Stage,
      Project_manager :Project_manager ?? currentProject.Project_manager,
      Start_Date: Start_Date ? formatDate(Start_Date) : currentProject.Start_Date,
      End_Date: End_Date ? formatDate(End_Date) : currentProject.End_Date,
      Description: Description ?? currentProject.Description,
      Email_id:Email_id ?? currentProject.Email_id
    };

    await conn.query(
      'UPDATE Projects SET Project_Name = ?, Role = ?,Stage=?,Project_manager=?, Start_Date = ?, End_Date = ?, Description = ?,Email_id=? WHERE Project_id = ?',
      [updatedProject.Project_Name, updatedProject.Role,updatedProject.Stage ,updatedProject.Project_manager,updatedProject.Start_Date, updatedProject.End_Date, updatedProject.Description, updatedProject.Email_id,id]
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
