import conn from '../config/dbConnection.js'
import formatDate from './formateDate.js';
// Get all participants
export const getAllParticipants = async (req, res) => {
  try {
    const [results] = await conn.query('SELECT * FROM Participant');
    return res.status(200).send({ success: true, data: results });
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
