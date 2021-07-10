const express = require("express");
const router = express.Router();
const { Post } = require("../models/postModel");
const { decodeUserId } = require("../utils/decodeUserId");
const { User } = require("../models/userModel");
const { findUser } = require("../utils/findUser");
// const addPost = async (userId, data, res) => {
//   try {
//     const user = await User.find({ userId });
//     const { name, username, email } = await findUser(userId);
//     console.log("User found");
//     if (user) {
//       const posts = await Post.find({ userId });
//       console.log(posts);
//       if (posts.length === 0) {
//         const newPost = new Post({
//           userId: userId,
//           author: {
//             name: name,
//             username: username,
//             email: email,
//           },
//           post: [
//             {
//               text: data.post,
//               imageUrl: data.imageUrl,
//             },
//           ],
//         });
//         const savedPost = await newPost.save();

//         res.json({ success: true, savedPost });
//       } else {
//         Post.findOneAndUpdate(
//           {
//             userId: userId,
//           },
//           {
//             $push: {
//               post: {
//                 text: data.post,
//                 imageUrl: data.imageUrl,
//               },
//             },
//           }
//         ).exec();
//         res.json({ success: true, message: "posts not found" });
//       }
//     }
//   } catch (error) {
//     res.json({ error });
//   }
// };

const addPost = async (userId, data, res) => {

  console.log("From user", data)

try{
     const { name, username, email } = await findUser(userId);

     const newPost = new Post({
       userId,
       post: data.post

     })
    const post = await newPost.save()
    res.status(200).json({success: true, post})
}catch(error)
{
  res.status(400).json({success: false, message: "cannot add post", error})
}

}

const updateLikes = async (userId,post, postId, res) => {
   try {
  //   if(post.likes.includes(userId))
  //   {
  //     console.log("USer already liked")
  //     post.likes.filter((post ) => post !== userId)
  //   }
  //   else{
  //     console.log("USer havent already liked")
  //     post.likes.push(userId)
  //     console.log(post)
  //   }
  //   console.log("lin3 88", post)
  //   post = await post.save()
  //   console.log("line 90", post)
  //   res.json({success: true, post})
    if(post.likes.includes(userId))
    {
      console.log("line 94",post.likes)
      console.log("User already there")
      Post.updateOne({_id: postId}, 
        {
          $pull: {likes: userId}}, (err,likedpost)=>{
        if(err) console.log(err)
        else{
            console.log("unliked successfully")
        }
   })
   const updatedPosts = await Post.find({ userId: userId}).populate("userId")
   res.status(200).json({success: true, message: "Unliked successfully", updatedPosts })
    }
    else{
          console.log("User not there")
      Post.updateOne({_id: postId}, 
        {
          $push: {likes: userId}}, (err,likedpost)=>{
        if(err) console.log(err)
        else{
            console.log("liked successfully")
        }
   })
   const updatedPosts = await Post.find({ userId: userId}).populate("userId")
   res.status(200).json({success: true, message: "liked successfully", updatedPosts })
    
    
  } }catch (error) {
      res.json({ success: false, error, message: "req failed"})
  }
}

const addComments = (userId, postId) => {};

router
  .route("/")
  .get(async (req, res) => {
    const token = req.headers.authorization;
    try {
      const userId = decodeUserId(token);
      findUser(userId);
      const posts = await Post.find({ userId }).populate("userId");
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
    console.log(data)
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

router.route("/:postId/like")
.post(async (req, res) => {
  const { postId } = req.params;
  let post  = req.body
  const token = req.headers.authorization
  console.log("134",post)
  const userId = decodeUserId(token)
  console.log(postId);
  try {
    updateLikes(userId, post, postId, res);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
})
.get( async(req, res) => {
  res.status(200).json({success: true})
})
module.exports = router;
