const express = require('express')
const router = express.Router()
const { User } = require('../models/userModel')
const { createToken } = require('../utils/createToken')
router.route('/')
.get( async( req, res) => {
    const token = req.headers.authorization
    res.send("Signup page")
})
.post( async(req, res) => {

  try
    {
      const {name, username, email, password} = req.body
      const newUser = new User({ 
        name: name,
        username: username, 
        email: email, 
        password: password
    })
      const user = await newUser.save()
      const token = createToken(user._id)
      res.json({success: true, name: user.name, token})
    }
    catch(error){
      // handleError(error, res)
      res.status(400).json({error: error.message})
    }

})

module.exports = router

