const express = require("express");
const router = express.Router();
const { Post } = require("../models/postModel");
const { decodeUserId } = require("../utils/decodeUserId");
const { User } = require("../models/userModel");
const { findUser } = require('../utils/findUser')
const addPost = async (userId, data, res) => {
  try {
    const user = await User.find({ userId });
    const {name, username, email } = await findUser(userId)
    console.log("USer found");
    if (user) {
      const posts = await Post.find({ userId });
      console.log(posts);
      if (posts.length === 0) {
        const newPost = new Post({
          userId: userId,
          author:{
            name: name,
            username: username,
            email: email
          },
          post: [
            {
              text: data.post,
              imageUrl: data.imageUrl,
            },
          ],
        });
        const savedPost = await newPost.save();

        res.json({ success: true, savedPost });
      } else {
        Post.findOneAndUpdate(
          {
            userId: userId,
          },
          {
            $push: {
              post: {
                text: data.post,
                imageUrl: data.imageUrl,
              },
            },
          }
        ).exec();
        res.json({ success: true, message: "posts not found" });
      }
    }
  } catch (error) {
    res.json({ error });
  }
};

const updateLikes = (userId, postId) => {};

const addComments = (userId, postId) => {};

router
  .route("/")
  .get(async (req, res) => {
    const token = req.headers.authorization;
    try {
      const userId = decodeUserId(token);
      findUser(userId)
      const posts = await Post.find({ userId }).populate("user");
      // console.log(posts);
      if (posts.length !== 0) {
        res.json({ success: true, posts });
      } else {
        res.json({ success: false, posts });
      }
    } catch (error) {
      res.json({ error });
    }
  })
  .post(async (req, res) => {
    const data = req.body;
    const token = req.headers.authorization;
    try {
      const userId = decodeUserId(token);
      console.log("user id from try 17 line", userId);
      await addPost(userId, data, res);
    } catch (error) {
      console.log("Error", error.message);
      res.status(400).json({ success: false, error: error.message });
    }
  });

module.exports = router;
