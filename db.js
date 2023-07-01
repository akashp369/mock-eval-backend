const mongoose= require('mongoose')
require('dotenv').config();

const connection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        console.log("this error from mongoose connection")
    }
}


module.exports={connection}