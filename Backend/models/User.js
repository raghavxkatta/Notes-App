// Bcrypt-we don't ever store plain passwords in the database otherwise hackers would be able to easily steal our login details and hack our accounts that is where bcrypt helps us
// Bcrypt puts our plain password in a hash function and returns a hased password which is unrecognizable and can't be decrypted and 

import { Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'


const userSchema= new Schema({
    username:{
type:String,
required:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.pre('save',async function(next){
const user=this
// Hash the password only if it has been modified (or is new)
// because yeh save function hai toh hum koi bhi details change krke save karenge ttoh yeh password hash kardega which is not required
if(!user.isModified('password')){
    return next()
}
    try{
// Hash Password generation
// bcrypt also adds salt which is basically some random text that is added along our unrecogniizable password to make it even more secure
const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(user.password,salt)
/* Plain password ko hashed password bna diya */
user.password=hashedPassword
next()
}
catch(err){
return next(err)   
}
})

/* Yeh iss schema ka method humne create kardiya */
userSchema.methods.comparePassword=async function(candidatePassword){
    try{
/* Use Bcrypt to compare the provided password with the hashed password */
const isMatch=await bcrypt.compare(candidatePassword,this.password)
return isMatch
    }
    catch(err){
        return err  
    }

}
export default model('User',userSchema)