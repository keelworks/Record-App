const pool = require('../config/db');

const getParticipant = async () => {
  const [rows] = await pool.query('SELECT Email_id, Firstname ,LastName,Mobile,Address,Gender,Race,VisaStatus,Disability,VeteranStatus FROM Participant'); // Exclude password for security
  return rows;
};

const getParticipantById = async (id) => {
  const [rows] = await pool.query('SELECT Email_id, Firstname ,LastName FROM User WHERE Email_id = ?', [id]); // Prepared statement
  return rows[0] || null; // Return null if user not found
};

const getParticipantExperienceById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM Experience WHERE Email_id = ?', [id]); // Prepared statement
    return rows[0] || null; // Return null if user not found
  };

const getParticipantEducationById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM Education WHERE Email_id = ?', [id]); // Prepared statement
    return rows[0] || null; // Return null if user not found
  };
const getParticipantProjectsById = async (id) => {
const [rows] = await pool.query('SELECT * FROM Projects WHERE Email_id = ?', [id]); // Prepared statement
return rows[0] || null; // Return null if user not found
};

module.exports = { getParticipant, getParticipantById , getParticipantExperienceById,getParticipantEducationById,getParticipantProjectsById};