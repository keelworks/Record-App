
import conn from '../config/dbConnection.js'
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
    await conn.query('INSERT INTO Experience (Company_Name, Title, Description, Start_Date, End_Date) VALUES (?, ?, ?, ?, ?)', [Company_Name, Title, Description, Start_Date, End_Date]);
    return res.status(201).send({ success: true, message: "Experience entry added successfully" });
  } catch (err) {
    console.error("Error adding experience entry:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Update an existing experience entry
export const updateExperience = async (req, res) => {
  const { Experience_id } = req.params;
  const { Company_Name, Title, Description, Start_Date, End_Date } = req.body;
  try {
    await conn.query('UPDATE Experience SET Company_Name = ?, Title = ?, Description = ?, Start_Date = ?, End_Date = ? WHERE Experience_id = ?', [Company_Name, Title, Description, Start_Date, End_Date, Experience_id]);
    return res.status(200).send({ success: true, message: "Experience entry updated successfully" });
  } catch (err) {
    console.error("Error updating experience entry:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

// Delete an experience entry
export const deleteExperience = async (req, res) => {
  const { Experience_id } = req.params;
  try {
    await conn.query('DELETE FROM Experience WHERE Experience_id = ?', [Experience_id]);
    return res.status(200).send({ success: true, message: "Experience entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting experience entry:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
