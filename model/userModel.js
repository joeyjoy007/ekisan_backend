const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const res = require('express/lib/response')


const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    mobileNumber:{
        type:String
    }
    
},{
    timestamps:true
})

// userSchema.pre('save',function(next){
//     const user = this
//     if(!user.isModified("password")){
//         return next()
//     }
//    bcrypt.genSalt(10,(err,salt)=>{
//         if(err){
//            return next(err) 
//         }

//         bcrypt.hash(user.password,salt,(err,hash)=>{
//             if(err){
//                     res.send(err)
//             }
//             user.password = hash;

//             return next()
//    })
//     })
// })

userSchema.pre('save',async function(next){

    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)

})



// userSchema.methods.comparePassword = function(password){
//    const user = this;
//    return new Promise((resolve,reject)=>{
//        bcrypt.compare(password,this.password,(err,isMatch)=>{
//            if(err){
//                return reject(err)
//            }

//            if(!isMatch){
//                return reject(err)
//            }

//            resolve(true)
//        })
//    })
// }



userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
    }

    userSchema.methods.generateResetToken =function(){


        const resetToken = crypto.randomBytes(20).toString("hex")
    
    
       this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      
    
       this.resettPasswordExpire = Date.now()+15*60*1000
    
    
        return resetToken;
    
        
    
    }


const userModel = mongoose.model("User",userSchema)
module.exports = userModel