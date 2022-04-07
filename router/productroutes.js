
const express = require('express')
const router = express.Router()
const Product  = require('../model/productModel')
const token = require('../requireToken')

router.post('/create',token,async (req,res)=>{
    const {name,price,location,pinCode,image,modelNumber,desc} = req.body
    
    const user = req.user._id

    if(!name || !price ||!location||! pinCode || !modelNumber ){
        return res.status(401).json({
            message:"fill form"
        })
    }

    const product = await Product.create({
       user, name,price,location,pinCode,image,modelNumber,desc
    })
    if(product){
        return res.status(200).json({
            message:"item added",
            product
        })
    }
    return res.status(401).json({
        message:"Item not Added"
    })

})

router.get('/getProduct',token,async (req,res)=>{
    const product = await Product.find()

    if(product){
        return res.status(200).json({
            product
        })
    
    }
    return res.status(401).json({
        message:"product not found"
    })


})


router.get  ('/search',token,async(req,res)=>{

    try {
       
        const keyword = req.query.search ?
        {
            $or:[
                {location:{$regex:req.query.search,$options:"i"}},
                {pinCode:{$regex:req.query.search,$options:"i"}},
                {name:{$regex:req.query.search,$options:"i"}},
               
            ]
        }:{}
    
        const product = await Product.find(keyword).populate("user")
        res.send(product)
       
    } catch (error) {
        res.status(401).json({
            message: "you arenot authorized"
        })
    }
  
})

module.exports = router