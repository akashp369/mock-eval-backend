const {Router}=require('express')
const bcrypt=require('bcrypt');
const { UserModel } = require('../model/user.model');
const jwt=require('jsonwebtoken')
require('dotenv').config();

const auth=Router();

// this end point for login  url is /auth/login
auth.post('/login', async(req, res)=>{
    const {email, password}=req.body
    const user=await UserModel.findOne({email})
    if(!user)  return res.send("User does not exist.")

    const hash= user.password;
    bcrypt.compare(password, hash, function(err, result) {
        if(err) return res.send('Invalid Credential')
        if(result){
            var token = jwt.sign({ userID : user._id }, process.env.MYSECRET);
            res.json({"msg":"login success", "token": token})
        }else{
            res.json("login failed")
        }
    })
})


module.exports={auth}