const mongoose = require('mongoose')

const OtpSchema = new mongoose.Schema({
   email:{
       type:String
   },
   code:{
       type:String
   },
   expiresIn:{
       type:Number

   }
    
},{
    timestamps:true
})

const otpModel = mongoose.model("Otp",OtpSchema)
module.exports = otpModel