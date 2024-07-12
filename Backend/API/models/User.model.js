import mysql from '../config/db.cjs'

//const getUser = async (UserId) => {
  export default async function  getUser(UserID){
  const [rows] = await mysql.query('SELECT Email_id,First_Name,Last_Name FROM User ',[UserId]); // Exclude password for security
  return rows;
};


//module.exports = { getUser};

