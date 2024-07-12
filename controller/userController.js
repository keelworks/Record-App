import { validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
import conn from '../config/dbConnection.js'
import jwt from 'jsonwebtoken'
import crypto from'crypto'
import nodemailer from 'nodemailer'

const { JWT_SECRET } = process.env


export const register = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { Email_id, Password, First_name, Last_name } = req.body

  conn.query(
    `SELECT * FROM users WHERE LOWER(email)=LOWER(${conn.escape(Email_id)})`, (err, result) => {
      if (result && result.length) {
        return res.status(409).send("Email is already in use")
      }
      else {
        bcryptjs.hash(Password, 10, (err, hash) => {
          if (err) {
            return res.status(400).send({ msg: err })
          }
          else {
            conn.query(`INSERT INTO User (Email_id,First_name,Last_name,Password) VALUES (${conn.escape(Email_id)},'${First_name}','${Last_name}',${conn.escape(hash)})`, (err, result) => {
              if (err) {
                return res.status(400).send({ msg: err })
              }
              return res.status(500).send({ msg: "user has been registered" })
            })

          }
        })
      }
    }
  )

}
export const login = (req, res) => {

  const errors = validationResult(req)

  const { Email_id, Password } = req.body
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  conn.query(
    'SELECT * FROM User WHERE Email_id = ?',
    [Email_id],
    (err, result) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email or password is incorrect',
        });
      }

      bcryptjs.compare(Password, result[0]['Password'], (berr, bres) => {
        if (berr) {
          return res.status(400).send({ msg: berr });
        }
        if (bres) {
          const token = jwt.sign(
            { id: result[0]['ID'] },
            JWT_SECRET,
            { expiresIn: '4hr' }
          );

          return res.status(200).send({
            msg: 'Logged in',
            token,
            user: result[0],
          });
        }
        return res.status(401).send({
          msg: 'Email or password is incorrect',
        });
      });
    }
  );

}

export const getUser = (req, res) => {

  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(404).send({ error: "token not found" })
  }
  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Invalid token" });
    }
    // Execute the query to fetch user data
    conn.query('SELECT * FROM User WHERE ID = ?', [decoded.id], (err, result, fields) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send({ success: false, message: "Database query error" });
      }

      // Check if user data is found
      if (result.length === 0) {
        return res.status(404).send({ success: false, message: "User not found" });
      }

      // Send the user data as response
      return res.status(200).send({ success: true, data: result[0], message: "Fetch successful" });
    });
  })


}

export const forgetPassword=(req,res)=>{
 

}