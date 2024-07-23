import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import './config/dbConnection.js'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRouter.js'
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import conn from './config/dbConnection.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'




// Write JWT_SECRET to .env file

const app = express()
app.use(session({ secret: process.env.JWT_SCRETE, resave: false, saveUninitialized: true, cookie: { secure: false } }));

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({ origin: 'http://localhost:5173',  methods: 'GET,POST,PUT,DELETE',credentials: true }));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// })
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new GoogleStrategy({
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   callbackURL: 'http://localhost:3000/auth/google/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     const [results] = await conn.query('SELECT * FROM User WHERE google_id = ?', [profile.id]);
//     if (results.length > 0) {
//       return done(null, results[0]);
//     } else {
//       const newUser = {
//         google_id: profile.id,
//         Email_id: profile.emails ? profile.emails[0].value : '',
//         First_Name: profile.name ? profile.name.givenName : '',
//         Last_name: profile.name ? profile.name.familyName : '',
//         provider: 'google'
//       };
//       const [insertResult] = await conn.query('INSERT INTO User SET ?', newUser);
//       newUser.id = insertResult.insertId;
//       return done(null, newUser);
//     }
//   } catch (err) {
//     return done(err);
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.ID);
// });

// passport.deserializeUser(async (id, done) => {
//   // const user=await conn.execute('SELECT * FROM User WHERE ID = ?', [id]).catch((err)=>{
//   //   console.log("Error deserlizing",err);
//   //   cb(err,null)
//   // })
//   // if(user) cb(null,user)

//   try {
//     const [results] = await conn.execute('SELECT * FROM User WHERE ID = ?', [id]);
//     if (results.length > 0) {
//       done(null, results[0]); // Return user data
//     } else {
//       done(null, false); // User not found
//     }
//   } catch (err) {
//     console.error("Error in deserializeUser:", err); // Log any errors that occur
//     done(err); // Pass error to Passport.js
//   }
// });
// Google auth routes
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//   const user={
//     Email_id:req.user.Email_id,
//     First_Name:req.user.First_Name,
//     Last_Name:req.user.Last_Name,

//   }
  
//   // res.send("login in success")
//   const token = jwt.sign({
//     email: user.Email_id,
//     firstName: user.First_Name,
//     lastName: user.Last_Name
//   }, process.env.JWT_SCRETE, { expiresIn: '4h' });

//   res.cookie('jwt', token, {
//     httpOnly: false, // Allow JavaScript access
//     secure: false, // Set to true if using HTTPS
//     path: '/',
//     sameSite: 'Lax'
//   });

//   res.cookie('user', JSON.stringify(user), {
//     httpOnly: false, // Allow JavaScript access
//     secure: false, // Set to true if using HTTPS
//     path: '/',
//     sameSite: 'Lax'
//   });
//   setTimeout(()=>{
//     res.redirect(`http://localhost:5173/home`);

//   },2000)

// })

app.use('/api', userRoutes)

app.use((err, req, res, next) => {
  console.error("Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ message });

})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})