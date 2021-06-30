const express = require("express");
const router = express.Router();
const {Post} = require('../models/postModel')

router.route('/')
.get( async (req, res) => {

  try{

    

    const posts = await Post.find().populate('user')
    console.log(posts)
    res.json({posts})

  }
  catch(error)
  {
    console.log(error)
    res.json({error})
  }
})

module.exports = router