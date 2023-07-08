const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    userId: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      location: String,
      description: String,
      picturePath: String,
      userPicturePath: String,
      likes: {
        type: Map,
        of: Boolean,
      },
      comments: {
        type: Array,
        default: [],
      }
})

const Post= mongoose.model('post', userSchema)

module.exports={Post}