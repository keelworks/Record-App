import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import './config/dbConnection.js'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRouter.js'
import session from 'express-session';


const app = express()
// app.use(session({ secret: process.env.JWT_SCRETE, resave: false, saveUninitialized: true, cookie: { secure: false } }));

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({ origin: 'http://localhost:5173',  methods: 'GET,POST,PUT,DELETE',credentials: true }));


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