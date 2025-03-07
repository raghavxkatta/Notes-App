import express from 'express'
const router=express.Router()   
import User from '../models/User.js'


/* Signup Route will handle user registrations and issue a JWT token upon successfull registration */
router.post('/signup', async (req, res) => {
try{
const{username,email,password}=req.body
const newUser=new User({
    username,
    email,
    password
})
await newUser.save()
}
catch(err){
    res.status(400).json({message:'Error creating user', error:err.message})
}})


export default router