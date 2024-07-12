import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const {DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME,DB_PORT}=process.env

const conn=mysql.createConnection({
  host:DB_HOST,
  user:DB_USERNAME,
  password:DB_PASSWORD,
  database:DB_NAME,
  port: DB_PORT ? parseInt(DB_PORT, 10) : 3306
})

conn.connect(function(err){
  if(err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
  console.log(DB_NAME+"Databse successfully connect");
})

export default conn