import conn from '../config/dbConnection.js'
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
  const { Email_id, First_Name, Last_Name, Password, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity, Visa_Status, Disability, Veteran_Status, Project_id, Experience_id, Education_id } = req.body;
  try {
    await conn.query('INSERT INTO Participant (Email_id, First_Name, Last_Name, Password, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity, Visa_Status, Disability, Veteran_Status, Project_id, Experience_id, Education_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [Email_id, First_Name, Last_Name, Password, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity, Visa_Status, Disability, Veteran_Status, Project_id, Experience_id, Education_id]);
    return res.status(201).send({ success: true, message: "Participant added successfully" });
  } catch (err) {
    console.error("Error adding participant:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

/// Update an existing participant
export const updateParticipant = async (req, res) => {
  const { Email_id } = req.params;
  const { First_Name, Last_Name, Password, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity, Visa_Status, Disability, Veteran_Status, Project_id, Experience_id, Education_id } = req.body;
  try {
    await conn.query(
      'UPDATE Participant SET First_Name = ?, Last_Name = ?, Password = ?, Mobile = ?, Date_of_Birth = ?, Address = ?, Gender = ?, Race_Ethnicity = ?, Visa_Status = ?, Disability = ?, Veteran_Status = ?, Project_id = ?, Experience_id = ?, Education_id = ? WHERE Email_id = ?',
      [First_Name, Last_Name, Password, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity, Visa_Status, Disability, Veteran_Status, Project_id, Experience_id, Education_id, Email_id]
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
