
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './Models/User.js';

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    // Authentication Logic
    try {
        // console.log('recieved credentials:', USERNAME, password)
        const user = await User.findOne({ username: USERNAME })
        /* Hum check kar rhe user model mein iss naam ka username hai ki nhi (verification) */
        if (!user) {
            /* Agar username nhi mila toh error message return karenge */
            /* Done ek callback function hai, aur yeh tab call karte jab authentication complete ho jaaye chaahe successfull ho ya unsucessfull*/
            return done(null, false, { message: 'Invalid Credentials' })
        }
        /* Agar username mil gaya toh password check karenge */
        // password check karo ki user ka password jo hai woh jo humne pass kiya hai woh match karta hai ya nhi
        const isPasswordMatch = user.password === password ? true : false
        if (isPasswordMatch) {
            return done(null, user)
        }
        else {
            return done(null, false, { message: 'Invalid Password' })
        }
    }
    catch (err) {
        return done(err)
    }
}))


module.exports = passport   
