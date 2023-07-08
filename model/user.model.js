const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 1,
        max: 50,
      },
      lastName: {
        type: String,
        required: true,
        min: 1,
        max: 50,
      },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 5,
      },
      picturePath: {
        type: String,
        default: "",
      },
      friends: {
        type: Array,
        default: [],
      },
      location: String,
      occupation: String,
      viewedProfile: Number,
      impressions: Number,
    
})

const UserModel= mongoose.model('user', userSchema)

module.exports={UserModel}