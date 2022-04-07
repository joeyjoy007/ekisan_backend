const express = require('express')

const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const Otp = require('../model/otpModel')
const sendEmail = require('../nodemailer/Nodemailer')
const requireToken = require('../requireToken')
const crypto = require('crypto')
const generateToken = require('../utils/generateToken')

router.post('/signup',async(req,res)=>{
    const{email,password,name,mobileNumber} = req.body
console.log(mobileNumber)
    if(!name ||!email || !password ||!mobileNumber){
        res.status(400);
        throw new Error("please enter all fields")
    }
    console.log(1)
    const userExists = await User.findOne({email})
console.log(2)
    if(userExists){
        res.status(400).json({
            message:"user already exist"
        })
        return 
    }
    console.log(3)
    const user = await User.create({
        email,
        password,
        name,
        mobileNumber
    })
    console.log(4)

    if(user){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            mobileNumber:user.mobileNumber,
           
            token:generateToken(user._id)
        })
        console.log(5)
    }

    else{
        res.status(400)
        return res.status(401).json({
            message:"user not created"
        })
    
        // throw new Error("user not created")
    }

    

    
})


router.post('/signin',async(req,res)=>{
    console.log(2333)
    const{email,password} = req.body

    if(!email || !password ){
        return res.status(401).json({
            message:"fill form"
        })
    }

    const user = await User.findOne({email})

    if(user && (await user.comparePassword(password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            
            token:generateToken(user._id)
        })
    }
    else{
        return res.status(400).send({
            message:"invalid credentials"
        })
    
        // throw new Error("invalid credentials")
    }

 

})





router.get('/user',requireToken,(req,res)=>{
    User.findById(req.user._id).select("-password").
    then((user)=>res.status(200).json(user))
})

router.post('/forgotPassword',async(req,res)=>{

    const user = await User.findOne({email:req.body.email})
    const response = {}


    if(user){
        
       let otpCode = Math.floor((Math.random()*10000)+1);
       let otpData = new Otp({
           email:req.body.email,
           code:otpCode,
           expiresIn:new Date().getTime()+300*1000
       })

       let otpResponse = await otpData.save()
      

       

       const message = `Password Recovery Otp Code ${otpCode}  if u not requested it then ignore it .Valid for 5 minutes`;``
   
       try {
   
   
           await sendEmail({
           
               email:user.email,
               subject:"Password Recovery",
               message:message
           });
           console.log("In process")
   
           res.status(200).json({
               success:true,
   
               message:"Email sent successfully"
           })
   
           
       } catch (error) {
   
          res.status(400).json({
              message:error.message
          })
       
          await user.save({validateBeforeSave:false})
           
       }


    }
    else{
        response.statusText="error"
        response.message="Email Id not exist"
    }
 
    res.status(200).json(response)   

})

router.put('/resetPassword',async(req,res)=>{
  


      let data = await Otp.find({email:req.body.email,code:req.body.otpCode})
      
   
try {
    if(data && data[0].code ){
        let currentTime = new Date().getTime();
        let diff = data[0].expiresIn - currentTime
        if(diff < 0){
          res.status(400).json({
              message:"Invalid Otp "
          })
        }
        else{
            console.log(5)
            let user = await User.findOne({email:req.body.email})
            user.password = req.body.password
            user.save()
            res.status(200).json({
              message:"Password Updated"
          })
        }
    }
    else{
     res.status(400).json({
         message:"Invalid Otp"
     })
    }


    
} catch (error) {
    res.status(500).json({
        message:error.message
    })
}
     
     
       
    
    
    }
)
 
  





module.exports = router

