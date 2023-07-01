const express = require('express');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
require('dotenv').config()
const bodyParser = require('body-parser');
const cors=require('cors')


const { connection } = require('./db');
const { UserModel } = require('./user.model');



const app= express();
app.use(express.json())

// this is cors it is very important when u connecting frontend with backend using locahost port 
app.use(cors());



app.post('/users', (req, res)=>{
    const {fullName, email, password}=req.body;
    bcrypt.hash(password, 5, async(err,hash)=>{
        if(err) res.send('something went worong by bcrpt')
        const user= new UserModel({
            fullName, email, password:hash
        })
        const u=await user.save()
        res.send({msg:"signup successfully", u})
    })   
})


app.listen(process.env.PORT, async()=>{
    try {
        await connection()
        console.log("db is connected")
    } catch (error) {
        console.log("db is not connected")
    }
})