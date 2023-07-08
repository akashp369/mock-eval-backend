const {Router}=require('express');
const { UserModel } = require('../model/user.model');


const userDataRoute=Router();

userDataRoute.get("/", async (req, res) => {
    try {
      const { userID } = req.body;
      const id= userID
      const user = await UserModel.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });

userDataRoute.get("/friends", async (req, res) => {
    try {
        const { userID } = req.body;
        const id= userID
      const user = await UserModel.findById(id);
  
      const friends = await Promise.all(
        user.friends.map((id) => UserModel.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return { _id, firstName, lastName, occupation, location, picturePath };
        }
      );
      res.status(200).json(formattedFriends);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });

/* UPDATE */
userDataRoute.patch("/:friendId", async (req, res) => {
    try {
        const { userID } = req.body;
        const id= userID
        const { friendId } = req.params;
        const user = await UserModel.findById(id);
        const friend = await UserModel.findById(friendId);
  
      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== id);
      } else {
        user.friends.push(friendId);
        friend.friends.push(id);
      }
      await user.save();
      await friend.save();
  
      const friends = await Promise.all(
        user.friends.map((id) => UserModel.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return { _id, firstName, lastName, occupation, location, picturePath };
        }
      );
  
      res.status(200).json(formattedFriends);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });



module.exports={userDataRoute}
