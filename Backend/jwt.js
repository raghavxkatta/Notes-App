// Client (Postman / React App) API pe request bhejta hai aur JWT token bhejta hai.
//  Yeh middleware header se JWT token uthata hai.
//  Agar token nahi mila toh 401 Unauthorized error dega.
//  Agar token mila toh verify karega.
//  Agar token valid hai toh req.jwtPayload mein user ka data store karega.
//  Agar token invalid hai toh 401 Invalid Token error dega.
//  Agar sab kuch sahi hai toh next() call hoga aur request aage ke route pe chali jayegi.
//  Agar user login hota hai toh generateToken() function JWT token generate karega.


import jwt from 'jsonwebtoken';

/* yeh middleware function check karta hai ki incoming request valid JWT token hai ki nhi  */
const jwtAuthMiddleware=(req,res,next)=>{

    /* Checks if the request header contains the Authorization header */
    /* Agar request header mein authorization header nahi hai ya agar authorization header mein bearman se start nahi ho raha hai toh unauthorized error return karenge */
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        return res.status(401).json({ error: 'Unauthorized: No Token Provided' });
    }

    
    /* Extract the JWT token from the request header */
    /* Humne Postman api se bearman method ke through bearman token header mein pass kardiya */
    /* split karne se bearer upar chale jaayega aur token 1 mein aajayega */
    /* Toh hum sirf actual token le rhe Bearer hata kar */
const token =req.headers.authorization.split(' ')[1]
/* agar token nahi mila */
if(!token) return res.status(401).json({error:'Unauthorized'}) 

    /* agar token mil gaya toh verify karenge */ 
try{
/* Verify The JWT token and token ke andar jo payload hai usko bhi extract karta hai */
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

// Generate JWT Token
const generateToken=(user)=>{   
    /* Generate a JWT token */
    /* User ki id ko payload mein daal diya */
    /* JWT_SECRET ko secret key ke ro
    le mein use kiya hai */
    return jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'5d'})
}

export  {jwtAuthMiddleware, generateToken}