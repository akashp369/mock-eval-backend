const { Post } = require("../model/post.model");
const { UserModel } = require("../model/user.model");


const createPost = async (req, res) => {
    try {
      const { userId, description, picturePath } = req.body;
      const user = await UserModel.findById(userId);
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: [],
      });
      await newPost.save();
  
      const post = await Post.find();
      res.status(201).json(post);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }

  module.exports={createPost}