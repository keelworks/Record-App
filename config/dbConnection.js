import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const {DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME,DB_PORT}=process.env

const conn=mysql.createPool({
  host:DB_HOST,
  user:DB_USERNAME,
  password:DB_PASSWORD,
  database:DB_NAME,
  port: DB_PORT ? parseInt(DB_PORT, 10) : 3306
})

conn.getConnection()
  .then(connection => {
    console.log(`${DB_NAME} Database successfully connected`);
    connection.release(); // Release the connection back to the pool
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process if connection fails
  });

export default conn