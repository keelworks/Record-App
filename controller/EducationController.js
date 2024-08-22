
import { validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
import conn from '../config/dbConnection.js'
import jwt from 'jsonwebtoken'

// Get all education entries
export const getAllEducation = async (req, res) => {
  const userRole = req.user.role;
  const userEmail = req.user.email;
  try {
    let query = '';
    let queryParams = [];

    if (userRole === 'admin') {
      query = 'SELECT * FROM Education';
    } else {
      const [participantResult] = await conn.query('SELECT ID FROM Participant WHERE Email_id = ?', [userEmail]);

      if (participantResult.length === 0) {
        return res.status(404).send({ error: 'Participant not found' });
      }

      const participantID = participantResult[0].ID;
      query = 'SELECT * FROM Education WHERE Participant_ID = ?';
      queryParams.push(participantID);
    }

    const [results] = await conn.query(query, queryParams);

    return res.status(200).send({ success: true, data: results });
  } catch (err) {
    console.error("Error fetching education entries:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const addEducation = async (req, res) => {
  const { Institution_Name, Degree, Field_of_Study, Year_of_Graduation } = req.body;
  const email = req.user.email;

  try {
    const [participant] = await conn.query('SELECT ID FROM Participant WHERE Email_id = ?', [email]);

    if (participant.length === 0) {
      return res.status(404).send({ error: 'Participant not found' });
    }

    const participantId = participant[0].ID;
    await conn.query(
      'INSERT INTO Education (Institution_Name, Degree, Field_of_Study, Year_of_Graduation, Participant_id) VALUES (?, ?, ?, ?, ?)',
      [Institution_Name, Degree, Field_of_Study, Year_of_Graduation, participantId]
    );

    return res.status(201).send({ success: true, message: 'Education added successfully' });
  } catch (err) {
    console.error('Error adding education:', err);
    return res.status(500).send({ error: 'Internal server error' });
  }
};

export const updateEducation = async (req, res) => {
  const { id } = req.params;
  const { Institution_Name, Degree, Field_of_Study, Year_of_Graduation, Email_id } = req.body;
  const userRole = (req.user.role || '').toLowerCase();
  const userEmailId = req.user.email;

  try {
    const [existingEntry] = await conn.query('SELECT * FROM Education WHERE Education_id = ?', [id]);

    if (existingEntry.length === 0) {
      return res.status(404).send({ error: "Education not found" });
    }

    const currentEntry = existingEntry[0];
    const [participant] = await conn.query('SELECT ID FROM Participant WHERE Email_id = ?', [userEmailId]);

    if (participant.length === 0) {
      return res.status(403).send({ error: "Participant not found for this user" });
    }

    const participantId = participant[0].ID;
    if (userRole !== 'admin' && currentEntry.Participant_id !== participantId) {
      return res.status(403).send({ error: "Forbidden: Only admin can update this record" });
    }

    const updatedEntry = {
      Institution_Name: Institution_Name ?? currentEntry.Institution_Name,
      Degree: Degree ?? currentEntry.Degree,
      Field_of_Study: Field_of_Study ?? currentEntry.Field_of_Study,
      Year_of_Graduation: Year_of_Graduation ?? currentEntry.Year_of_Graduation,
    };

    await conn.query(
      'UPDATE Education SET Institution_Name = ?, Degree = ?, Field_of_Study = ?, Year_of_Graduation = ?  WHERE Education_id = ?',
      [updatedEntry.Institution_Name, updatedEntry.Degree, updatedEntry.Field_of_Study, updatedEntry.Year_of_Graduation, id]
    );

    return res.status(200).send({ success: true, message: "Education updated successfully" });
  } catch (err) {
    console.error("Error updating education:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteEducation = async (req, res) => {

  const { id } = req.params;
  const userRole = (req.user.role || '').toLowerCase();
  const userEmailId = req.user.email;
  try {
    const [educationEntry] = await conn.query('SELECT * FROM Education WHERE Education_id = ?', [id]);

    if (educationEntry.length === 0) {
      return res.status(404).send({ error: "Education record not found" });
    }

    const currentEducationEntry = educationEntry[0];

    if (userRole !== 'admin') {
      const [participant] = await conn.query('SELECT ID FROM Participant WHERE Email_id = ?', [userEmailId]);

      if (participant.length === 0) {
        return res.status(403).send({ error: "Participant not found for this user" });
      }

      const participantId = participant[0].ID;

      if (currentEducationEntry.Participant_id !== participantId) {
        return res.status(403).send({ error: "Forbidden: Only admin can delete this record" });
      }
    }

    await conn.query('START TRANSACTION');
    await conn.query('DELETE FROM Education WHERE Education_id = ?', [id]);
    await conn.query('COMMIT');

    return res.status(200).send({ success: true, message: "Education deleted successfully" });

  } catch (err) {
    // Rollback in case of an error
    await conn.query('ROLLBACK');
    console.error("Error deleting education record:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
