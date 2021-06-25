const express = require('express')
const router = express.Router()
const {Post} = require('../models/postModel')

router.route('/')
.get( async ( req, res ) => {

  res.send("Post router get")
})
.post( async ( req, res ) => {
  const data = req.body

try{
    const newPost = new Post({

    userId: data.userId,

    post: {
      text: data.text,
      imageUrl: data.imageUrl,
      likes: data.userId
    }

  })

  const savedPost = await newPost.save()
  res.status(200).json({message: "success", savedPost})
} catch(error){
  console.log("Error", error.message)
  res.status(400).json({success: false, error: error.message})
}
})

module.exports = router
