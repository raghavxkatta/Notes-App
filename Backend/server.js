// Passport is an authentication middleware for Node.js. It is extremely flexible and modular, and can be used to implement almost any authentication strategy.   
//  LocalStrategy is a strategy within Passport that is used to authenticate users based on a USERNAME and password.

import dotenv from 'dotenv';
dotenv.config()
import process from 'process';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';  
import notesRoutes from './Routes/notes.js'
const passport = require('passport');
const User = require('./Models/User.js')
const app=express()


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


/* Middleware-1 */

  const logRequest = (req, res, next) => {  
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
    next();
  }

  const localAuthMiddleware=passport.authenticate('local',{session:false})
  app.get('/', (req,res)=>{  
    res.send('API is running')
  })
  app.use(passport.initialize());

  
  
  

// Middleware
/* issey yeh saare routes jo bhi iss backend ke unn sabpe logging time dikhayega, cuz middleware hai */
app.use(logRequest)
app.use(cors());/* cors is used to handle cross-origin requests in your Express server, allowing or restricting access based on origin (domain/port). */
app.use(express.json())
// ab /api/notes waale jitne bhi routes honge unpe hum localAuthMiddleware lagayenge basically matlab ab saaare routes mein username aur password lagega
app.use('/api/notes',localAuthMiddleware,notesRoutes)






const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
})
