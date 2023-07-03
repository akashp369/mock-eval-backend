const express = require('express');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
require('dotenv').config()
const bodyParser = require('body-parser');
const cors=require('cors')


const { connection } = require('./config/db');
const { UserModel } = require('./model/user.model');
const { authmiddleware } = require('./middleware/authmiddleware');
const { EmployeeRoute } = require('./route/employee');



const app= express();
app.use(express.json())

// this is cors it is very important when u connecting frontend with backend using locahost port 
app.use(cors());

app.post('/signup', (req, res)=>{
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

app.post('/login', async(req, res)=>{
    const {email, password}=req.body
    console.log(email, password)
    const user=await UserModel.findOne({email})
    if(!user){
        return res.send("first signup")
    }
    const hash= user.password
    bcrypt.compare(password, hash, function(err, result) {
        if(err){
            res.send('this is from login error')
        }
        if(result){
            var token = jwt.sign({ userID : user._id }, process.env.MYSECRET);
            res.json({"msg":"login success", "token": token})
        }else{
            res.json("login failed")
        }
    })
    
})


app.use('/employees', authmiddleware, EmployeeRoute);


app.listen(process.env.PORT, async()=>{
    try {
        await connection()
        console.log("db is connected")
    } catch (error) {
        console.log("db is not connected")
    }
})