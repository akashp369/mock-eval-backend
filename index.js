const express=require("express");
const bodyParser = require('body-parser');
const multer=require('multer')
const cors=require('cors')
require('dotenv').config()


const { connection } = require('./config/db');
const { authmiddleware } = require('./middleware/authmiddleware');
const { auth } = require("./route/auth");
const { userDataRoute } = require("./route/getuser");
const { signup } = require("./controller/signup");
const { postRoute } = require("./route/post.route");
const { createPost } = require("./controller/postcreate");




const app= express();
app.use(express.json())
app.use(cors());



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

app.post("/auth/signup", upload.single("picture"),signup);  // for the signup page
app.post('/posts/create', authmiddleware, createPost)

//this all are the routes
app.use('/auth', auth);
app.use('/user',authmiddleware, userDataRoute);
app.use('/posts', authmiddleware, postRoute)




app.listen(process.env.PORT, async()=>{
    try {
        await connection()
        console.log("db is connected")
    } catch (error) {
        console.log("db is not connected")
    }
})