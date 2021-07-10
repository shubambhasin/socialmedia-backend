const express = require("express");
const router = express.Router();
const { User } = require('../models/userModel')

router.route('/')
  .get(async (req, res) => {

    try {
      const users = await User.find()
      console.log(users)
      res.json({ users })

    }
    catch (error) {
      console.log(error)
      res.json({ error })
    }
  })

router.route('/:id')
.get( async (req, res) => {

  const { id } = req.params
  const user = await User.findById({_id: id})
 res.json({success: true, id, user})

})

module.exports = router