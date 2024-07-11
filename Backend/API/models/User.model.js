const pool = require('../db');

const getUser = async (UserId) => {
  const [rows] = await pool.query('SELECT * FROM User ',[UserId]); // Exclude password for security
  return rows;
};


module.exports = { getUser};