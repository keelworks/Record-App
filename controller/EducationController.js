
import { validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
import conn from '../config/dbConnection.js'
import jwt from 'jsonwebtoken'

// Get all education entries
export const getAllEducation = async (req, res) => {
  try {
    const [results] = await conn.query('SELECT * FROM Education');
    return res.status(200).send({ success: true, data: results });
  } catch (err) {
    console.error("Error fetching education entries:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Add a new education entry
export const addEducation = async (req, res) => {
  const { Institution_Name, Degree, Field_of_Study, Year_of_Graduation } = req.body;
  try {
    await conn.query('INSERT INTO Education (Institution_Name, Degree, Field_of_Study, Year_of_Graduation) VALUES (?, ?, ?, ?)', [Institution_Name, Degree, Field_of_Study, Year_of_Graduation]);
    return res.status(201).send({ success: true, message: "Education  added successfully" });
  } catch (err) {
    console.error("Error adding education", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Update an existing education entry
export const updateEducation = async (req, res) => {
  const { id } = req.params;
  const { Institution_Name, Degree, Field_of_Study, Year_of_Graduation } = req.body;
  
  try {
    // Fetch current values from the database
    const [existingEntry] = await conn.query('SELECT * FROM Education WHERE Education_id = ?', [id]);

    if (existingEntry.length === 0) {
      return res.status(404).send({ error: "Education not found" });
    }

    const currentEntry = existingEntry[0];

    // Merge new values with current values
    const updatedEntry = {
      Institution_Name: Institution_Name ?? currentEntry.Institution_Name,
      Degree: Degree ?? currentEntry.Degree,
      Field_of_Study: Field_of_Study ?? currentEntry.Field_of_Study,
      Year_of_Graduation: Year_of_Graduation ?? currentEntry.Year_of_Graduation
    };

    await conn.query(
      'UPDATE Education SET Institution_Name = ?, Degree = ?, Field_of_Study = ?, Year_of_Graduation = ? WHERE Education_id = ?',
      [updatedEntry.Institution_Name, updatedEntry.Degree, updatedEntry.Field_of_Study, updatedEntry.Year_of_Graduation, id]
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
