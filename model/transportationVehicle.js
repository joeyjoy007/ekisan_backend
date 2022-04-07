const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",
        required:true
    },
    name:{
        type:String
    },
    modelNumber:{
        type:String
    },
    image:{
        type:String,
        default:"https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg"
    },
    desc:{
        type:String,
        default:"No description added"
    },
  
    price:{
        type:Number
    },
    location:{
        type:String
    },
    pinCode:{
        type:String
    },
    
},{
    timestamps:true
})

const vehicleModel = mongoose.model("Vehicle",vehicleSchema)
module.exports = vehicleModel