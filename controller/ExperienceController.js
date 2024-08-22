
import conn from '../config/dbConnection.js'
import formatDate from './formateDate.js';


// Get all experience entries
export const getAllExperience = async (req, res) => {
  const userRole = req.user.role;
  const userEmail = req.user.email;
  try {
    let query = '';
    let queryParams = [];

    if (userRole === 'admin') {
      query = 'SELECT * FROM Experience';
    } else {
      const [participantResult] = await conn.query('SELECT ID FROM Participant WHERE Email_id = ?', [userEmail]);

      if (participantResult.length === 0) {
        return res.status(404).send({ error: 'Participant not found' });
      }

      const participantID = participantResult[0].ID;

      query = 'SELECT * FROM Experience WHERE Participant_ID = ?';
      queryParams.push(participantID);
    }

    const [results] = await conn.query(query, queryParams);

    return res.status(200).send({ success: true, data: results });
  } catch (err) {
    console.error("Error fetching experience entries:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const addExperience = async (req, res) => {
  const { Company_Name, Title, Description, Start_Date, End_Date } = req.body;
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
      'INSERT INTO Experience (Company_Name, Title, Description, Start_Date, End_Date, Participant_id) VALUES (?, ?, ?, ?, ?, ?)',
      [Company_Name, Title, Description, formattedStartDate, formattedEndDate, participantId]
    );

    return res.status(201).send({ success: true, message: 'Experience added successfully' });
  } catch (err) {
    console.error('Error adding experience:', err);
    return res.status(500).send({ error: 'Internal server error' });
  }
};
export const updateExperience = async (req, res) => {
  const { id } = req.params;
  const { Company_Name, Title, Description, Start_Date, End_Date } = req.body;
  const userRole = (req.user.role || '').toLowerCase();
  const userEmailId = req.user.email;
  
  try {
    const [existingEntries] = await conn.query('SELECT * FROM Experience WHERE Experience_id = ?', [id]);
    if (existingEntries.length === 0) {
      return res.status(404).send({ error: "Experience  not found" });
    }

    const existingEntry = existingEntries[0];
    const [participant] = await conn.query('SELECT ID FROM Participant WHERE Email_id = ?', [userEmailId]);

    if (participant.length === 0) {
      return res.status(403).send({ error: "Participant not found for this user" });
    }

    const participantId = participant[0].ID;
    if (userRole !== 'admin' && existingEntry.Participant_id !== participantId) {
      return res.status(403).send({ error: "Forbidden:Only admin can update this record" });
    }
    // Merge existing fields with updated fields
    const updatedEntry = {
      Company_Name: Company_Name ?? existingEntry.Company_Name,
      Title: Title ?? existingEntry.Title,
      Description: Description ?? existingEntry.Description,
      Start_Date: Start_Date ? formatDate(Start_Date) : existingEntry.Start_Date,
      End_Date: End_Date ? formatDate(End_Date) : existingEntry.End_Date,
    };

    // Update the experience entry with the merged data
    await conn.query('UPDATE Experience SET Company_Name = ?, Title = ?, Description = ?, Start_Date = ?, End_Date = ?  WHERE Experience_id = ?',
      [updatedEntry.Company_Name, updatedEntry.Title, updatedEntry.Description, updatedEntry.Start_Date, updatedEntry.End_Date, id]);

    return res.status(200).send({ success: true, message: "Experience  updated successfully" });
  } catch (err) {
    console.error("Error updating experience ", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};


export const deleteExperience = async (req, res) => {

  const { id } = req.params;
  const userRole = (req.user.role || '').toLowerCase();
  const userEmailId = req.user.email;
  try {
    const [experienceEntry] = await conn.query('SELECT * FROM Experience WHERE Experience_id = ?', [id]);

    if (experienceEntry.length === 0) {
      return res.status(404).send({ error: "Experience record not found" });
    }

    const currentExperienceEntry = experienceEntry[0];

    if (userRole !== 'admin') {
      const [participant] = await conn.query('SELECT ID FROM Participant WHERE Email_id = ?', [userEmailId]);

      if (participant.length === 0) {
        return res.status(403).send({ error: "Participant not found for this user" });
      }

      const participantId = participant[0].ID;

      if (currentExperienceEntry.Participant_id !== participantId) {
        return res.status(403).send({ error: "Forbidden: Only admin can delete this record" });
      }
    }

    await conn.query('START TRANSACTION');
    await conn.query('DELETE FROM Experience WHERE Experience_id = ?', [id]);
    await conn.query('COMMIT');

    return res.status(200).send({ success: true, message: "Experience deleted successfully" });

  } catch (err) {
    // Rollback in case of an error
    await conn.query('ROLLBACK');
    console.error("Error deleting experience record:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
