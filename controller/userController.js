import { validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
import conn from '../config/dbConnection.js'
import jwt from 'jsonwebtoken'
import crypto from'crypto'
import nodemailer from 'nodemailer'


const { JWT_SCRETE } = process.env


export const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { Email_id, Password, First_name, Last_name } = req.body

  try {
    const [existingUser] = await conn.query(
      `SELECT * FROM User WHERE LOWER(Email_id) = LOWER(?)`,
      [Email_id]
    );

    if (existingUser.length) {
      return res.status(409).send("Email is already in use");
    }

    const hashedPassword = await bcryptjs.hash(Password, 10);

    const [result] = await conn.query(
      `INSERT INTO User (Email_id, First_name, Last_name, Password) VALUES (?, ?, ?, ?)`,
      [Email_id, First_name, Last_name, hashedPassword]
    );

    return res.status(201).send({ msg: "User has been registered" });
  } catch (err) {
    console.error("Error in registration:", err);
    return res.status(500).send({ msg: "Internal server error" });
  }


}
export const login = async (req, res) => {
  const errors = validationResult(req);
  const { Email_id, Password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [result] = await conn.query(
      'SELECT * FROM User WHERE Email_id = ? ',
      [Email_id]
    );

    if (!result.length) {
      return res.status(401).send({ msg: 'Email or password is incorrect' });
    }

    const match = await bcryptjs.compare(Password, result[0]['Password']);
    if (!match) {
      return res.status(401).send({ msg: 'Email or password is incorrect' });
    }

    // Create the token including email in the payload
    const token = jwt.sign(
      { id: result[0]['ID'], email: result[0]['Email_id'] }, // Ensure email is included here
      JWT_SCRETE,
      { expiresIn: '4hr' }
    );

    // Log the token to verify
    console.log("JWT Token:", token);

    // Log the decoded token payload to verify
    const decodedToken = jwt.decode(token);

    return res.status(200).send({ msg: 'Logged in', token, user: result[0] });
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).send({ msg: 'Internal server error' });
  }
};

export const getUser = async (req, res) => {

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(404).send({ error: "Token not found" });
  }

  try {

    const [result] = await conn.query('SELECT * FROM User');
    return res.status(200).send({ success: true, data: result, message: "Fetch successful" });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).send({ error: "Internal server error" });
  }

}

export const getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Token not found" });
    }

    // Decode the token to get user information
    const decodedToken = jwt.verify(token, JWT_SCRETE); // Verify and decode the token
    const userEmail = decodedToken.email; // Assuming your JWT payload includes email

    // Query the database to get user details based on userEmail
    const [result] = await conn.query('SELECT * FROM User WHERE Email_id = ?', [userEmail]);

    if (!result.length) {
      return res.status(404).send({ error: "User not found" });
    }

    return res.status(200).send({ success: true, data: result[0], message: "User details fetched successfully" });
  } catch (err) {
    console.error("Error fetching current user:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const forgetPassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { Email_id } = req.body;

  try {
    // Check if the user exists
    const [rows] = await conn.query('SELECT * FROM User WHERE Email_id = ? LIMIT 1', [Email_id]);
    const token = jwt.sign(
      { id: rows[0]['ID'], email: rows[0]['Email_id'] }, // Ensure email is included here
      JWT_SCRETE,
      { expiresIn: '4hr' }
    );

    if (rows.length > 0) {
      const randomString = randomstring.generate();
      const mailSubject = 'Forget password';
      const content = `<p>Hiiii, ${rows[0].First_Name},</p><p>Please <a href="http://localhost:5173/reset-password/${rows[0].ID}/${token}">Click here</a> to reset your password.</p>`;

      // Send the reset email
      await sendMail(Email_id, mailSubject, content);

      // Delete existing token
      await conn.query('DELETE FROM ForgetPassword WHERE Email_id = ?', [Email_id]);

      // Insert new token
      await conn.query('INSERT INTO ForgetPassword (Email_id, token) VALUES (?, ?)', [Email_id, randomString]);

      return res.status(200).send({ message: 'Mail sent successfully for forget password', Status: 'Success' });
    } else {
      return res.status(401).send({ message: 'Email does not exist' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

};

export const ResetPassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id, token } = req.params;
  const { password } = req.body;

  try {

    jwt.verify(token, JWT_SCRETE);

    const hashedPassword = await bcryptjs.hash(password, 10);

    const [results] = await conn.query('UPDATE User SET Password = ? WHERE ID = ?', [hashedPassword, id]);

    if (results.affectedRows > 0) {
      res.send({ Status: 'Success' });
    } else {
      res.send({ Status: 'User not found' });
    }
  } catch (err) {
    res.json({ Status: 'Error with token' });
  }


}