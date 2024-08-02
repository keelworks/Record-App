import conn from '../config/dbConnection.js'
import formatDate from './formateDate.js';
// Get all participants
export const getAllParticipants = async (req, res) => {
  try {
    const query = `
     SELECT 
        Participant.*,
        Projects.Project_Name AS project_name,
        Projects.Role AS project_role,
        Projects.Start_Date AS project_start_date,
        Projects.End_Date AS project_end_date,
        Projects.Description AS project_description,
        Experience.Company_Name AS experience_company,
        Experience.Title AS experience_title,
        Experience.Description AS experience_description,
        Experience.Start_Date AS experience_start_date,
        Experience.End_Date AS experience_end_date,
        Education.Institution_Name AS education_institution,
        Education.Degree AS education_degree,
        Education.Field_of_Study AS education_field_of_study,
        Education.Year_of_Graduation AS education_year_of_graduation
      FROM Participant
      LEFT JOIN Projects ON Participant.Project_id = Projects.Project_id
      LEFT JOIN Experience ON Participant.Experience_id = Experience.Experience_id
      LEFT JOIN Education ON Participant.Education_id = Education.Education_id;
    `;
    const [results] = await conn.query(query);

    // Fetch count of projects
    const [countResults] = await conn.query('SELECT COUNT(*) AS total FROM Participant');
    const totalProjects = countResults[0].total;
    const response = results.map(participant => ({
      Email_id: participant.Email_id,
      First_Name: participant.First_Name,
      Last_Name: participant.Last_Name,
      Password: participant.Password,
      Mobile: participant.Mobile,
      Date_of_Birth: participant.Date_of_Birth,
      Address: participant.Address,
      Gender: participant.Gender,
      Race_Ethnicity: participant.Race_Ethnicity,
      Visa_Status: participant.Visa_Status,
      Disability: participant.Disability,
      Veteran_Status: participant.Veteran_Status,        
      TimeZone: participant.TimeZone,
      project: {
        project_id: participant.Project_id,
        project_name: participant.project_name,
        role: participant.project_role,
        start_date: participant.project_start_date,
        end_date: participant.project_end_date,
        description: participant.project_description
      },
      experience: {
        experience_id: participant.Experience_id,
        company_name: participant.experience_company,
        title: participant.experience_title,
        description: participant.experience_description,
        start_date: participant.experience_start_date,
        end_date: participant.experience_end_date
      },
      education: {
        education_id: participant.Education_id,
        institution_name: participant.education_institution,
        degree: participant.education_degree,
        field_of_study: participant.education_field_of_study,
        year_of_graduation: participant.education_year_of_graduation
      }
    }));

    return res.status(200).send({ success: true, data: response, total: totalProjects });
  } catch (err) {
    console.error("Error fetching participants:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Add a new participant
export const addParticipant = async (req, res) => {
  const {
    Email_id, First_Name, Last_Name, Password, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity,
    Visa_Status, Disability, Veteran_Status, Project_id, Experience_id, Education_id
  } = req.body;

  try {
    // Format the date to match SQL DATE format (YYYY-MM-DD)
    const DateOfBirth = formatDate(Date_of_Birth);

    // Check for foreign key constraints
    const [project] = await conn.query('SELECT Project_id FROM Projects WHERE Project_id = ?', [Project_id]);
    const [experience] = await conn.query('SELECT Experience_id FROM Experience WHERE Experience_id = ?', [Experience_id]);
    const [education] = await conn.query('SELECT Education_id FROM Education WHERE Education_id = ?', [Education_id]);

    if (Project_id && project.length === 0) {
      return res.status(400).send({ error: "Invalid Project_id" });
    }
    if (Experience_id && experience.length === 0) {
      return res.status(400).send({ error: "Invalid Experience_id" });
    }
    if (Education_id && education.length === 0) {
      return res.status(400).send({ error: "Invalid Education_id" });
    }

    // Insert the participant
    await conn.query(
      'INSERT INTO Participant (Email_id, First_Name, Last_Name, Password, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity, Visa_Status, Disability, Veteran_Status, Project_id, Experience_id, Education_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [Email_id, First_Name, Last_Name, Password, Mobile, DateOfBirth, Address, Gender, Race_Ethnicity, Visa_Status, Disability, Veteran_Status, Project_id, Experience_id, Education_id]
    );
    return res.status(201).send({ success: true, message: "Participant added successfully" });

  } catch (err) {
    console.error("Error adding participant:", err);
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).send({ error: "Invalid foreign key reference" });
    }
    return res.status(500).send({ error: "Internal server error" });
  }
};


/// Update an existing participant
export const updateParticipant = async (req, res) => {
  const { id } = req.params;
  const {
    First_Name, Last_Name, Password, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity,
    Visa_Status, Disability, Veteran_Status, Project_id, Experience_id, Education_id
  } = req.body;

  try {
    // Fetch the existing participant data
    const [existingParticipants] = await conn.query('SELECT * FROM Participant WHERE Email_id = ?', [id]);
    if (existingParticipants.length === 0) {
      return res.status(404).send({ error: "Participant not found" });
    }

    const existingParticipant = existingParticipants[0];

    // Merge existing data with new data
    const updatedParticipant = {
      First_Name: First_Name ?? existingParticipant.First_Name,
      Last_Name: Last_Name ?? existingParticipant.Last_Name,
      Password: Password ?? existingParticipant.Password,
      Mobile: Mobile ?? existingParticipant.Mobile,
      Date_of_Birth: Date_of_Birth ?? existingParticipant.Date_of_Birth,
      Address: Address ?? existingParticipant.Address,
      Gender: Gender ?? existingParticipant.Gender,
      Race_Ethnicity: Race_Ethnicity ?? existingParticipant.Race_Ethnicity,
      Visa_Status: Visa_Status ?? existingParticipant.Visa_Status,
      Disability: Disability ?? existingParticipant.Disability,
      Veteran_Status: Veteran_Status ?? existingParticipant.Veteran_Status,
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
      'UPDATE Participant SET First_Name = ?, Last_Name = ?, Password = ?, Mobile = ?, Date_of_Birth = ?, Address = ?, Gender = ?, Race_Ethnicity = ?, Visa_Status = ?, Disability = ?, Veteran_Status = ?, Project_id = ?, Experience_id = ?, Education_id = ? WHERE Email_id = ?',
      [
        updatedParticipant.First_Name, updatedParticipant.Last_Name, updatedParticipant.Password, updatedParticipant.Mobile,
        updatedParticipant.Date_of_Birth, updatedParticipant.Address, updatedParticipant.Gender, updatedParticipant.Race_Ethnicity,
        updatedParticipant.Visa_Status, updatedParticipant.Disability, updatedParticipant.Veteran_Status, updatedParticipant.Project_id,
        updatedParticipant.Experience_id, updatedParticipant.Education_id, id
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
  const { id } = req.params;
  try {
    await conn.query('DELETE FROM Participant WHERE Email_id = ?', [id]);
    return res.status(200).send({ success: true, message: "Participant deleted successfully" });
  } catch (err) {
    console.error("Error deleting participant:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
