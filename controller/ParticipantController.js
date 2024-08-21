import conn from '../config/dbConnection.js'
import formatDate from './formateDate.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { JWT_SCRETE } = process.env
// Get all participants
export const getAllParticipants = async (req, res) => {
  const userRole =( req.user.role || '').toLowerCase();  // Extract the role from JWT
    const userEmail = req.user.email; // Extract the email from JWT

    let query = '';
    let countQuery = '';
    let queryParams = [];

    // If the user is an admin, fetch all participants
    if (userRole === 'admin') {
        query = `
            SELECT 
                P.Email_id,
                P.First_Name,
                P.Last_Name,
                P.Role,
                P.Mobile,
                P.Date_of_Birth,
                P.Address,
                P.Gender,
                P.Race_Ethnicity,
                P.Visa_Status,
                P.Disability,
                P.Veteran_Status,
                P.TimeZone,
                -- Project details
                JSON_OBJECT(
                    'Project_id', PR.Project_id,
                    'Project_Name', PR.Project_Name,
                    'Role', PR.Role,
                    'Stage', PR.Stage,
                    'Project_manager', PR.Project_manager,
                    'Start_Date', PR.Start_Date,
                    'End_Date', PR.End_Date,
                    'Description', PR.Description
                ) AS Project,
                -- Experience details
                JSON_OBJECT(
                    'Experience_id', E.Experience_id,
                    'Company_Name', E.Company_Name,
                    'Title', E.Title,
                    'Description', E.Description,
                    'Start_Date', E.Start_Date,
                    'End_Date', E.End_Date
                ) AS Experience,
                -- Education details
                JSON_OBJECT(
                    'Education_id', ED.Education_id,
                    'Institution_Name', ED.Institution_Name,
                    'Degree', ED.Degree,
                    'Field_of_Study', ED.Field_of_Study,
                    'Year_of_Graduation', ED.Year_of_Graduation
                ) AS Education
            FROM 
                Participant P
            LEFT JOIN 
                Projects PR ON P.Project_id = PR.Project_id
            LEFT JOIN 
                Experience E ON P.Experience_id = E.Experience_id
            LEFT JOIN 
                Education ED ON P.Education_id = ED.Education_id;
        `;
        countQuery = `SELECT COUNT(*) AS total_count FROM Participant`; // Count all participants
    } else {
        // Regular user sees only their own records
        query = `
            SELECT 
                P.Email_id,
                P.First_Name,
                P.Last_Name,
                P.Role,
                P.Mobile,
                P.Date_of_Birth,
                P.Address,
                P.Gender,
                P.Race_Ethnicity,
                P.Visa_Status,
                P.Disability,
                P.Veteran_Status,
                P.TimeZone,
                -- Project details
                JSON_OBJECT(
                    'Project_id', PR.Project_id,
                    'Project_Name', PR.Project_Name,
                    'Role', PR.Role,
                    'Stage', PR.Stage,
                    'Project_manager', PR.Project_manager,
                    'Start_Date', PR.Start_Date,
                    'End_Date', PR.End_Date,
                    'Description', PR.Description
                ) AS Project,
                -- Experience details
                JSON_OBJECT(
                    'Experience_id', E.Experience_id,
                    'Company_Name', E.Company_Name,
                    'Title', E.Title,
                    'Description', E.Description,
                    'Start_Date', E.Start_Date,
                    'End_Date', E.End_Date
                ) AS Experience,
                -- Education details
                JSON_OBJECT(
                    'Education_id', ED.Education_id,
                    'Institution_Name', ED.Institution_Name,
                    'Degree', ED.Degree,
                    'Field_of_Study', ED.Field_of_Study,
                    'Year_of_Graduation', ED.Year_of_Graduation
                ) AS Education
            FROM 
                Participant P
            LEFT JOIN 
                Projects PR ON P.Project_id = PR.Project_id
            LEFT JOIN 
                Experience E ON P.Experience_id = E.Experience_id
            LEFT JOIN 
                Education ED ON P.Education_id = ED.Education_id
            WHERE P.Email_id = ?;
        `;
        queryParams.push(userEmail); // Add logged-in user's email as parameter
        countQuery = `SELECT COUNT(*) AS total_count FROM Participant WHERE Email_id = ?`; // Count only the user's own record
        queryParams.push(userEmail); // Add the email for the count query
    }

    try {
        // Run the query and the count query
        const [rows] = await conn.query(query, queryParams); // Fetch participant data
        const [countResult] = await conn.query(countQuery, queryParams); // Fetch total count

        const totalCount = countResult[0].total_count || 0;

        res.json({
            participants: rows,
            total: totalCount
        });
    } catch (error) {
        console.error("Error fetching participants:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};


// Add a new participant
export const addParticipant = async (req, res) => {
  const {
    Email_id, First_Name, Last_Name, Password, Role, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity,
    Visa_Status, Disability, Veteran_Status, TimeZone
  } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcryptjs.hash(Password, 10);
    const formattedDOB = formatDate(Date_of_Birth);

    // Insert the participant into the database
    await conn.query(
      'INSERT INTO Participant (Email_id, First_Name, Last_Name, Password, Role, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity, Visa_Status, Disability, Veteran_Status, TimeZone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [Email_id, First_Name, Last_Name, hashedPassword, Role, Mobile, formattedDOB, Address, Gender, Race_Ethnicity, Visa_Status, Disability, Veteran_Status, TimeZone]
    );

    // Create JWT token with email and role
    // const token = jwt.sign({ Email_id, Role }, JWT_SCRETE, { expiresIn: '6h' });

    // Send response with the generated token
    return res.status(201).send({ success: true, message: "Participant added successfully" });
  } catch (error) {
    // Error handling
    console.error(error);
    return res.status(500).send({ success: false, message: "Failed to add participant" });
  }


};


/// Update an existing participant
export const updateParticipant = async (req, res) => {
  const { id } = req.params;
  const {
    First_Name, Last_Name, Password, Role, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity,
    Visa_Status, Disability, Veteran_Status, TimeZone,Project_id,Experience_id,Education_id
  } = req.body;
  const userRole =(req.user.role || '').toLowerCase(); 
  const userEmailId = req.user.email;
  try {
    const [existingParticipants] = await conn.query('SELECT * FROM Participant WHERE ID = ?', [id]);
    if (existingParticipants.length === 0) {
      return res.status(404).send({ error: "Participant not found" });
    }

    const existingParticipant = existingParticipants[0];
    if (userRole !== 'admin'  && existingParticipant.Email_id !== userEmailId) {
      return res.status(403).send({ error: "Forbidden: You do not have permission to update this record" });
    }

    // Merge existing data with new data
    const updatedParticipant = {
      First_Name: First_Name ?? existingParticipant.First_Name,
      Last_Name: Last_Name ?? existingParticipant.Last_Name,
      Password: Password ? await bcryptjs.hash(Password, 10) : existingParticipant.Password,
      Mobile: Mobile ?? existingParticipant.Mobile,
      Role: Role ?? existingParticipant.Role,
      Date_of_Birth: Date_of_Birth ? formatDate(Date_of_Birth) : existingParticipant.Date_of_Birth,
      Address: Address ?? existingParticipant.Address,
      Gender: Gender ?? existingParticipant.Gender,
      Race_Ethnicity: Race_Ethnicity ?? existingParticipant.Race_Ethnicity,
      Visa_Status: Visa_Status ?? existingParticipant.Visa_Status,
      Disability: Disability ?? existingParticipant.Disability,
      Veteran_Status: Veteran_Status ?? existingParticipant.Veteran_Status,
      TimeZone: TimeZone ?? existingParticipant.TimeZone,
      Project_id: Project_id ?? existingParticipant.Project_id,
      Experience_id: Experience_id ?? existingParticipant.Experience_id,
      Education_id: Education_id ?? existingParticipant.Education_id
    };

    // Check for foreign key constraints
    if (updatedParticipant.Project_id) {
      const [project] = await conn.query('SELECT * FROM Projects WHERE Project_id = ?', [updatedParticipant.Project_id]);
      if (project.length === 0) {
        return res.status(400).send({ error: "Invalid Project_id" });
      }
    }
    if (updatedParticipant.Experience_id) {
      const [experience] = await conn.query('SELECT * FROM Experience WHERE Experience_id = ?', [updatedParticipant.Experience_id]);
      if (experience.length === 0) {
        return res.status(400).send({ error: "Invalid Experience_id" });
      }
    }

    if (updatedParticipant.Education_id) {
      const [education] = await conn.query('SELECT * FROM Education WHERE Education_id = ?', [updatedParticipant.Education_id]);
      if (education.length === 0) {
        return res.status(400).send({ error: "Invalid Education_id" });
      }
    }

    // Update the participant
    await conn.query(
      'UPDATE Participant SET First_Name = ?, Last_Name = ?, Password = ?, Mobile = ?, Role= ?,Date_of_Birth = ?, Address = ?, Gender = ?, Race_Ethnicity = ?, Visa_Status = ?, Disability = ?, Veteran_Status = ?,TimeZone=?,Project_id=?,Experience_id=?,Education_id=? WHERE ID = ?',
      [
        updatedParticipant.First_Name, updatedParticipant.Last_Name, updatedParticipant.Password, updatedParticipant.Mobile, updatedParticipant.Role,
        updatedParticipant.Date_of_Birth, updatedParticipant.Address, updatedParticipant.Gender, updatedParticipant.Race_Ethnicity,
        updatedParticipant.Visa_Status, updatedParticipant.Disability, updatedParticipant.Veteran_Status, updatedParticipant.TimeZone, updatedParticipant.Project_id,updatedParticipant.Education_id,updatedParticipant.Experience_id,id
      ]
    );

    return res.status(200).send({ success: true, message: "Participant updated successfully" });
  } catch (err) {
    console.error("Error updating participant:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
// Delete a participant
export const deleteParticipant = async (req, res) => {
  const { Email_id } = req.params;
  try {
    await conn.query('DELETE FROM Participant WHERE Email_id = ?', [Email_id]);
    return res.status(200).send({ success: true, message: "Participant deleted successfully" });
  } catch (err) {
    console.error("Error deleting participant:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const updateKeys = async (req, res) => {
  const { Project_id, Experience_id, Education_id } = req.body;
  const Email_id = req.user.email

  try {
    // Update the participant's project, experience, and education IDs
    await conn.query(
      `UPDATE Participant SET Project_id = ?, Experience_id = ?, Education_id = ?
            WHERE Email_id = ?`,
      [Project_id, Experience_id, Education_id, Email_id]
    );

    return res.status(200).send({ success: true, message: "Participant updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Failed to update participant" });
  }
}
