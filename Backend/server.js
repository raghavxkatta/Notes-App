import dotenv from 'dotenv';
dotenv.config()
import process from 'process';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';  
const app=express()

import notesRoutes from './Routes/notes.js'

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



// Middleware
app.use(cors());/* cors is used to handle cross-origin requests in your Express server, allowing or restricting access based on origin (domain/port). */
app.use(express.json())
app.use('/api/notes',notesRoutes)












const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
})
