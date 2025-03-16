import express from 'express'
const router=express.Router()   
import User from '../models/User.js'
import {jwtAuthMidddleware,generateToken} from '../jwt.js'  

/* Signup Route will handle user registrations and issue a JWT token upon successfull registration */
router.post('/signup', async (req, res) => {
try{
const{username,email,password}=req.body
const newUser=new User({username,email,password})

/* Save the user to the database */
const response=await newUser.save()
console.log("response saved")

/* Generate Payload */
const payload={
    id:response._id,
    username:response.username,
    email:response.email
}
console.log(JSON.stringify(payload))

/* Generate JWT Token */
const token=generateToken(response)
console.log("token is ",token)      
return res.status(201).json({message:'User Created Successfully',token:token})
}
catch(err){
    res.status(400).json({message:'Error creating user', error:err.message})
}})

/* Function to generate a JWT token */
const generateToken=(userData)=>{
    /* Generate a JWT token */
    /* User ki id ko payload mein daal diya */
    /* JWT_SECRET ko secret key ke role mein use kiya hai */
    return jwt.sign({id:userData._id},process.env.JWT_SECRET)
}



// LOGIN ROUTE
router.post('/login', async (req, res) => {
    try{
        const{username,password}=req.body
        const user = await User.findOne({username:username})
        /* Agar iss username db mein nhi hoga toh */
        if(!user||!await user.comparePassword(password)){
            return res.status(401).json({message:'Invalid Username or Password'})   
        }

        // Generate Token
        const payload={
            username:user.username,
            email:user.email  
        }
        const token=generateToken(user)
        /* Return token as a response */
        res.json({token})
    }
catch(err){
    res.status(400).json({message:'Error logging in', error:err.message})
}   
})

// PROFILE ROUTE
// This route will be protected by JWT token
router.get('/profile',jwtAuthMidddleware,async(req,res)=>{
    try{
        const userData=req.jwtpayload
        console.log(userData)

        const userId=userData.id
        const user = await User.findById(userId)
        res.status(200).json({user})
    }
    catch(err){
        res.status(400).json({message:'Error fetching user profile', error:err.message})
    }   
})
export default router