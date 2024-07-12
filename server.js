import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import './config/dbConnection.js'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRouter.js'



const app=express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors({ origin: '*', credentials: true }));

app.use('/api',userRoutes)

app.use((err,req,res,next)=>{
  err.statusCode=err.statusCode || 500
  err.message=err.message || "Internal server Error"

  res.send(err.statusCode).json({
    message:err.message
  })

})

const PORT=3000
app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}` );
})