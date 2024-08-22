import conn from '../config/dbConnection.js'
import formatDate from './formateDate.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Get all participants

export const getAllParticipants = async (req, res) => {
  const userRole = (req.user.role || '').toLowerCase(); 
    const userEmail = req.user.email;
    try {
      let participantsQuery = 'SELECT * FROM Participant';
      let projectsQuery = 'SELECT * FROM Projects WHERE Participant_ID = ?';
      let experiencesQuery = 'SELECT * FROM Experience WHERE Participant_ID = ?';
      let educationQuery = 'SELECT * FROM Education WHERE Participant_ID = ?';
  
      if (userRole === 'admin') {
        const [participants] = await conn.query(participantsQuery);
        const result = [];
  
        for (const participant of participants) {
          const [projects] = await conn.query(projectsQuery, [participant.ID]);
          const [experiences] = await conn.query(experiencesQuery, [participant.ID]);
          const [education] = await conn.query(educationQuery, [participant.ID]);
  
          result.push({
            ...participant,
            Projects: projects,
            Experiences: experiences,
            Education: education
          });
        }
  
        const [totalParticipants] = await conn.query('SELECT COUNT(*) AS total FROM Participant');
  
        return res.status(200).send({
          participants: result,
          total: totalParticipants[0].total
        });
  
      } else  {
        const [participant] = await conn.query('SELECT * FROM Participant WHERE Email_id = ?', [userEmail]);
  
        if (participant.length === 0) {
          return res.status(404).send({ success: true, data: [] });
        }
  
        const [projects] = await conn.query(projectsQuery, [participant[0].ID]);
        const [experiences] = await conn.query(experiencesQuery, [participant[0].ID]);
        const [education] = await conn.query(educationQuery, [participant[0].ID]);

        const [totalOtherParticipants] = await conn.query('SELECT COUNT(*) AS total FROM Participant WHERE Email_id != ?', [userEmail]);
        return res.status(200).send({
          ...participant[0],
          Projects: projects,
          Experiences: experiences,
          Education: education,
          total: totalOtherParticipants[0].total
        });
      } 
    } catch (err) {
      console.error('Error fetching participants:', err);
      return res.status(500).send({ error: 'Internal server error' });
    }
};

export const addParticipant = async (req, res) => {
  const {
    Email_id, First_Name, Last_Name, Password, Role, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity,
    Visa_Status, Disability, Veteran_Status, TimeZone
  } = req.body;

  try {
    const hashedPassword = await bcryptjs.hash(Password, 10);

    const formattedDOB = formatDate(Date_of_Birth); // If Date_of_Birth is already formatted correctly, no need for extra function

    await conn.query(
      'INSERT INTO Participant (Email_id, First_Name, Last_Name, Password, Role, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity, Visa_Status, Disability, Veteran_Status, TimeZone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [Email_id, First_Name, Last_Name, hashedPassword, Role, Mobile, formattedDOB, Address, Gender, Race_Ethnicity, Visa_Status, Disability, Veteran_Status, TimeZone]
    );

    // Send success response
    return res.status(201).send({ success: true, message: "Participant added successfully" });
  } catch (error) {
    console.error("Error adding participant:", error);
    return res.status(500).send({ success: false, message: "Failed to add participant" });
  }
};
export const updateParticipant = async (req, res) => {
  const { id } = req.params;
  const {First_Name, Last_Name, Password, Role, Mobile, Date_of_Birth, Address, Gender, Race_Ethnicity,
    Visa_Status, Disability, Veteran_Status, TimeZone } = req.body;

  const userRole =(req.user.role || '').toLowerCase(); 
  const userEmailId = req.user.email;
  try {
    const [existingParticipants] = await conn.query('SELECT * FROM Participant WHERE ID = ?', [id]);
    if (existingParticipants.length === 0) {
      return res.status(404).send({ error: "Participant not found" });
    }

    const existingParticipant = existingParticipants[0];
    if (userRole !== 'admin'  && existingParticipant.Email_id !== userEmailId) {
      return res.status(403).send({ error: "Forbidden:Only admin can update this record" });
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
      
    };
    
    await conn.query(
      'UPDATE Participant SET First_Name = ?, Last_Name = ?, Password = ?, Mobile = ?, Role= ?,Date_of_Birth = ?, Address = ?, Gender = ?, Race_Ethnicity = ?, Visa_Status = ?, Disability = ?, Veteran_Status = ?,TimeZone=? WHERE ID = ?',
      [
        updatedParticipant.First_Name, updatedParticipant.Last_Name, updatedParticipant.Password, updatedParticipant.Mobile, updatedParticipant.Role,
        updatedParticipant.Date_of_Birth, updatedParticipant.Address, updatedParticipant.Gender, updatedParticipant.Race_Ethnicity,
        updatedParticipant.Visa_Status, updatedParticipant.Disability, updatedParticipant.Veteran_Status, updatedParticipant.TimeZone,id
      ]
    );

    return res.status(200).send({ success: true, message: "Participant updated successfully" });
  } catch (err) {
    console.error("Error updating participant:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
export const deleteParticipant = async (req, res) => {
  const { id } = req.params;
  const userRole = (req.user.role || '').toLowerCase(); 
  const userEmailId = req.user.email;     
  try {
    if (userRole === 'admin') {
      await conn.query('DELETE FROM Projects WHERE Participant_ID = ?', [id]);
      await conn.query('DELETE FROM Experience WHERE Participant_ID = ?', [id]);
      await conn.query('DELETE FROM Education WHERE Participant_ID = ?', [id]);
      await conn.query('DELETE FROM Participant WHERE ID = ?', [id]);
      return res.status(200).send({ success: true, message: "Participant and related records deleted successfully" });
    } else {
      const [participant] = await conn.query('SELECT * FROM Participant WHERE ID = ?', [id]);
  
      if (participant.length === 0) {
        return res.status(404).send({ error: "Participant not found" });
      }
  
      if (participant[0].Email_id !== userEmailId) {
        return res.status(403).send({ error: "Forbidden:Only admin can delete this record" });
      }
  
      // Proceed to delete related records
      await conn.query('DELETE FROM Projects WHERE Participant_ID = ?', [id]);
      await conn.query('DELETE FROM Experience WHERE Participant_ID = ?', [id]);
      await conn.query('DELETE FROM Education WHERE Participant_ID = ?', [id]);
      await conn.query('DELETE FROM Participant WHERE ID = ?', [id]);
      return res.status(200).send({ success: true, message: "Your record and related records have been deleted successfully" });
    }
  } catch (err) {
    console.error("Error deleting participant:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
}


