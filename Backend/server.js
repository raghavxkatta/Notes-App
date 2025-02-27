// Passport is an authentication middleware for Node.js. It is extremely flexible and modular, and can be used to implement almost any authentication strategy.   
//  LocalStrategy is a strategy within Passport that is used to authenticate users based on a USERNAME and password.

import dotenv from 'dotenv';
dotenv.config()
import process from 'process';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';  
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './Models/User.js';
import notesRoutes from './Routes/notes.js'

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

  
  
  
  passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    // Authentication Logic
    try{
      console.log('recieved credentials:', USERNAME,password)
      const user=await User.findOne({username:USERNAME})
      /* Hum check kar rhe user model mein iss naam ka username hai ki nhi (verification) */
      if(!user){
        /* Agar username nhi mila toh error message return karenge */
        /* Done ek callback function hai, aur yeh tab call karte jab authentication complete ho jaaye chaahe successfull ho ya unsucessfull*/
        return done(null,false,{message:'Invalid Credentials'})
      }
      /* Agar username mil gaya toh password check karenge */
      // password check karo ki user ka password jo hai woh jo humne pass kiya hai woh match karta hai ya nhi
      const isPasswordMatch=user.password===password?true:false
      if(isPasswordMatch){
        return done(null,user)
      }
      else{
        return done(null,false,{message:'Invalid Password'})
}
}
catch(err){
  return done(err)
}
}))


// Middleware
app.use(passport.initialize());
/* issey yeh saare routes jo bhi iss backend ke unn sabpe logging time dikhayega, cuz middleware hai */
app.use(logRequest)
app.use(cors());/* cors is used to handle cross-origin requests in your Express server, allowing or restricting access based on origin (domain/port). */
app.use(express.json())
app.use('/api/notes',notesRoutes)












const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
})
