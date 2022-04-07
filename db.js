const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://jay123:jay123@cluster0.yqg9t.mongodb.net/ekisaan?retryWrites=true&w=majority').then(()=>{
    console.log("database connected")
}).catch((error)=>{
    console.log(error.message)
})

module.exports = mongoose