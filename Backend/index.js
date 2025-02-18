const express=require('express')
const mongooose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv')
const app=express()
const router= express.router()

router.get('/',(req,res)=>{
    console.log("Welcome to Notes API")
})

router..get('/router')


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
})
