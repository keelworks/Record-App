
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

    // If the user is an admin, fetch all education records
    if (userRole === 'admin') {
      query = 'SELECT * FROM Education';
    } else {
      // If the user is a participant, fetch only their own education records
      query = 'SELECT * FROM Education WHERE Email_id = ?';
      queryParams.push(userEmail); // Add the logged-in user's email as a query parameter
    }

    const [results] = await conn.query(query, queryParams);

    return res.status(200).send({ success: true, data: results });
  } catch (err) {
    console.error("Error fetching education entries:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Add a new education entry
export const addEducation = async (req, res) => {
  const { Institution_Name, Degree, Field_of_Study, Year_of_Graduation } = req.body;
  const email = req.user.email;
  try {
    await conn.query('INSERT INTO Education (Institution_Name, Degree, Field_of_Study, Year_of_Graduation,Email_id) VALUES (?, ?, ?, ?,?)', [Institution_Name, Degree, Field_of_Study, Year_of_Graduation,email]);
    return res.status(201).send({ success: true, message: "Education  added successfully" });
  } catch (err) {
    console.error("Error adding education", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Update an existing education entry
export const updateEducation = async (req, res) => {
  const { id } = req.params;
  const { Institution_Name, Degree, Field_of_Study, Year_of_Graduation,Email_id } = req.body;
  const userRole =(req.user.role || '').toLowerCase(); 
  const userEmailId = req.user.email; 
  
  try {
    // Fetch current values from the database
    const [existingEntry] = await conn.query('SELECT * FROM Education WHERE Education_id = ?', [id]);

    if (existingEntry.length === 0) {
      return res.status(404).send({ error: "Education not found" });
    }

    const currentEntry = existingEntry[0];

    // Check if the user is an admin or if they are updating their own record
  if (userRole !== 'admin'  && currentEntry.Email_id !== userEmailId) {
    return res.status(403).send({ error: "Forbidden: You do not have permission to update this record" });
  }


    // Merge new values with current values
    const updatedEntry = {
      Institution_Name: Institution_Name ?? currentEntry.Institution_Name,
      Degree: Degree ?? currentEntry.Degree,
      Field_of_Study: Field_of_Study ?? currentEntry.Field_of_Study,
      Year_of_Graduation: Year_of_Graduation ?? currentEntry.Year_of_Graduation,
      Email_id: Email_id ?? currentEntry.Email_id
    };

    await conn.query(
      'UPDATE Education SET Institution_Name = ?, Degree = ?, Field_of_Study = ?, Year_of_Graduation = ?,Email_id = ?  WHERE Education_id = ?',
      [updatedEntry.Institution_Name, updatedEntry.Degree, updatedEntry.Field_of_Study, updatedEntry.Year_of_Graduation,updatedEntry.Email_id, id]
    );

    return res.status(200).send({ success: true, message: "Education updated successfully" });
  } catch (err) {
    console.error("Error updating education:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Delete an education entry
export const deleteEducation = async (req, res) => {
  const { id } = req.params;
  try {
    await conn.query('DELETE FROM Education WHERE Education_id = ?', [id]);
    return res.status(200).send({ success: true, message: "Education deleted successfully" });
  } catch (err) {
    console.error("Error deleting education entry:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
