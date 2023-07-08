const bcrypt =require('bcrypt');
const { UserModel } = require('../model/user.model');
 const signup =(req, res)=>{
    const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
    } = req.body;
    
    bcrypt.hash(password, 5, async(err,hash)=>{
            if(err) res.send('something went worong by bcrpt')
        const user= new UserModel({
            firstName,
            lastName,
            email,
            password: hash,   //this is hash password from bcrypt
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        })
        const d= await UserModel.findOne({email})
        if(d){
            res.send({msg:"user is already exist"})
        }else{
            const u=await user.save()
            res.send({msg:"signup successfully", u})
        }
        
        
    })   
}


module.exports={signup}