
const mysql = require('mysql2');

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'Record_App'
    });

    connection.connect((error) => {
      if (error) {
        reject(error);
        return; // Early return to prevent unnecessary connection.end()
      }

      console.log('Connected to MySQL database!');
      resolve(connection); // Return the connection object for further use
    });
  });
}

module.exports = connectToDatabase;