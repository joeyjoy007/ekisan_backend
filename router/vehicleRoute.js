
const express = require('express')
const router = express.Router()
const Vehicle  = require('../model/transportationVehicle')
const token = require('../requireToken')

router.post('/createVehicle',token,async (req,res)=>{
    const {name,price,location,pinCode,image,loadCapacity,modelNumber,desc} = req.body
    const user = req.user._id

    if(!name || !price ||!location||! pinCode  || !modelNumber){
        return res.status(401).json({
            message:"fill form"
        })
    }

    const vehicle = await Vehicle.create({
       user, name,price,location,pinCode,image,loadCapacity,modelNumber,desc
    })
    if(vehicle){
        return res.status(200).json({
            message:"item added",
            vehicle
        })
    }
    return res.status(401).json({
        message:"Item not Added"
    })

})

router.get('/getVehicle',token,async (req,res)=>{
    const vehicle = await Vehicle.find()
    if(vehicle){
        return res.status(200).json({
            vehicle
        })
    
    }
    return res.status(401).json({
        message:"product not found"
    })


})


router.get  ('/searchVehicle',token,async(req,res)=>{

    try {
        const keyword = req.query.search ?
        {
            $or:[
                {location:{$regex:req.query.search,$options:"i"}},
                {pinCode:{$regex:req.query.search,$options:"i"}},
                {name:{$regex:req.query.search,$options:"i"}},
             
            ]
        }:{}
    
        const vehicle = await Vehicle.find(keyword).populate("user")
        res.send(vehicle)
    } catch (error) {
        res.status(401).json({
            message: "you are not authorized"
        })
    }
  
})

module.exports = router