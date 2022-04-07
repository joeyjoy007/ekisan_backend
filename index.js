const express = require('express')
const app = express()
const port =process.env.PORT
const bodyParser = require('body-parser')
const router1 = require('./router/userRoute')
const router2 = require('./router/productroutes')
const router3 = require('./router/vehicleRoute')

const requiretoken = require('./requireToken')


require('./db')



app.use(bodyParser.json())
app.use(router3)
app.use(router2)
app.use(router1)

 
app.get('/f',requiretoken,(req,res)=>{
    res.json(req.user)
})
app.get('/a',(req,res)=>{
    res.send("online on server")
})


app.listen(port,()=>{
    console.log("server running on port 4000")
})