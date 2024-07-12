// import express from 'express'
// import connectToDatabase  from './config/db.cjs'; 
// //import userRouter from './routes/login.route.js';


// const app=express()
// app.use(express.json())
// //app.use(cors())

// app.get("/",(req,res)=>{
//     return res.status(200).send({message:"Participant Record Application",status:true})
// })

// // app.use("/auth",authRouter)
// // app.use("/user",userRouter)




// export default app
// //export default  app = express();

// // Connect to MySQL
// connectToDatabase()
//   .then(connection => {
//     console.log(' Successfully connected to database:');
//     // ...
//   })
//   .catch(error => {
//     console.error('Error connecting to database:', error);
//   });

  
// const bodyParser = require('body-parser');
// const loginRouter = require('../routes/login.route.js'); // Import login routes


// const port = process.env.PORT || 3000; // Use environment variable for port

// // Body parser middleware for JSON request body parsing
// app.use(bodyParser.json());

// // Mount login routes with a base path (optional)
// app.use('/api/v1', loginRouter); // Replace '/api/v1' with your desired prefix

// // Error handling middleware (optional)
// app.use((err, req, res, next) => {
//   console.error(err.stack); // Log the error for debugging
//   res.status(500).json({ message: 'Internal server error' }); // Send generic error response
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
  

// /*

// // Get a specific user by ID
// app.get('/:id', async (req, res) => {
//   try {
//     const user = await User.getUserById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// app.get('/:id', async (req, res) => {
//     try {
//       const user = await User.getUserById(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   });
  

// const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`Server listening on port ${port}`));*/