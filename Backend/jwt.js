const jwt = require('jsonwebtoken');

const jwtAuthMidddleware=(req,res,next)=>{
    
    /* Extract the JWT token from the request header */
    /* Humne Postman api se bearman method ke through bearman token header mein pass kardiya */
    /* split karne se bearer upar chale jaayega aur token 1 mein aajayega */
const token =req.headers.authorization.split(' ')[1]
/* agar token nahi mila */
if(!token) return res.status(401).json({error:'Unauthorized'}) 

    /* agar token mil gaya toh verify karenge */ 
try{
/* Verify The JWT token */
const decoded=jwt.verify(token,process.env.JWT_SECRET)

/* Attach User information to the request object */
req.jwtPayload=decoded
next()
}
catch(err){
    console.log(err)
    return res.status(401).json({error:'Invalid Token'})
}
}

export default jwtAuthMidddleware