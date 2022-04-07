
const jwt = require('jsonwebtoken')
const User = require('./model/userModel')

const requireToken =async (req,res,next)=>{
    let token;


    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
       

        try {
        
            
            token = req.headers.authorization.split(" ")[1];
 

            const decode = await jwt.verify(token,"GARVITJAIN")


            req.user = await User.findById(decode.id).select("-password")

            next()
            
        } catch (error) {
            res.status(400)
            return res.status(400).json({
                message:"failed"
            })
        
            // throw new Error("Failed")
        }
    }

    if(!token){
        res.status(503)
        res.json({
            message:"not authorized"
        })
        // throw new Error("Not authorized")
    }

} 


module.exports = requireToken