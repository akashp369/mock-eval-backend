const jwt= require('jsonwebtoken');
require('dotenv').config();

const authmiddleware=(req, res, next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(!token){
       return res.send("Access Denied")
    }
    jwt.verify(token, process.env.MYSECRET, function(err, decoded) {
        const {userID}=decoded
        req.body.userID=userID
        if(decoded){
            next()
        }else{
            res.send("please login with write creadential")
        }
    });
}

module.exports={authmiddleware}