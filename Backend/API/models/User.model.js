


import pool from '../config/db.cjs'

class User {
  constructor(email, firstName, lastName, password) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }

  static async findByEmail(email) {
    const sql = `Select * FROM User where email = ?`;
    const [rows] = await pool.query(sql, [email]);
    return rows.length ? new User(...rows[0]) : null; // Map row to User instance
  }
}

module.exports = User;


