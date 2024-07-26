
import conn from '../config/dbConnection.js'
import formatDate from './formateDate.js';
// Get all experience entries
export const getAllExperience = async (req, res) => {
  try {
    const [results] = await conn.query('SELECT * FROM Experience');
    return res.status(200).send({ success: true, data: results });
  } catch (err) {
    console.error("Error fetching experience entries:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Add a new experience entry
export const addExperience = async (req, res) => {
  const { Company_Name, Title, Description, Start_Date, End_Date } = req.body;
  try {
    const formattedStartDate = formatDate(Start_Date);
    const formattedEndDate = formatDate(End_Date);

    await conn.query('INSERT INTO Experience (Company_Name, Title, Description, Start_Date, End_Date) VALUES (?, ?, ?, ?, ?)', [Company_Name, Title, Description, formattedStartDate, formattedEndDate]);
    return res.status(201).send({ success: true, message: "Experience  added successfully" });
  } catch (err) {
    console.error("Error adding experience", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
export const updateExperience = async (req, res) => {
  const { id } = req.params;
  const { Company_Name, Title, Description, Start_Date, End_Date } = req.body;

  try {
    // Fetch existing experience entry
    const [existingEntries] = await conn.query('SELECT * FROM Experience WHERE Experience_id = ?', [id]);
    if (existingEntries.length === 0) {
      return res.status(404).send({ error: "Experience  not found" });
    }

    const existingEntry = existingEntries[0];

    // Merge existing fields with updated fields
    const updatedEntry = {
      Company_Name: Company_Name ?? existingEntry.Company_Name,
      Title: Title ?? existingEntry.Title,
      Description: Description ?? existingEntry.Description,
      Start_Date: Start_Date ? formatDate(Start_Date) : existingEntry.Start_Date,
      End_Date: End_Date ? formatDate(End_Date) : existingEntry.End_Date,
    };

    // Update the experience entry with the merged data
    await conn.query('UPDATE Experience SET Company_Name = ?, Title = ?, Description = ?, Start_Date = ?, End_Date = ? WHERE Experience_id = ?', 
      [updatedEntry.Company_Name, updatedEntry.Title, updatedEntry.Description, updatedEntry.Start_Date, updatedEntry.End_Date, id]);

    return res.status(200).send({ success: true, message: "Experience  updated successfully" });
  } catch (err) {
    console.error("Error updating experience ", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};


// Delete an experience entry
export const deleteExperience = async (req, res) => {
  const { id } = req.params;
  try {
    await conn.query('DELETE FROM Experience WHERE Experience_id = ?', [id]);
    return res.status(200).send({ success: true, message: "Experience  deleted successfully" });
  } catch (err) {
    console.error("Error deleting experience ", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
