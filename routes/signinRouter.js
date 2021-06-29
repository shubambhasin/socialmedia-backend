const express = require('express')
const router = express.Router()
const {decodeUserId} = require('../utils/decodeUserId.js')
const { User } = require('../models/userModel.js')
const { createToken } = require('../utils/createToken')

const handleError = (error, res) => {
  console.log(error.message)
  const errors = {
    email: "",
    password: ""
  }
  if(error.message === "Email not registered")
  {
    errors.email = "Email not registered";
    // res.status(404).json({success: false, message: "Email not registered"})
  }
  if(error.message === "Password incorrect")
  {
    errors.password = "Password incorrect"
    // res.status(401).json({success: false, message: "Password incorrect"})
  }
res.json({error: errors})
}

router.route('/')
.get( async( req, res) => {
  res.send("Sign in page")
})
.post( async(req, res) => {
 const { email, password } = req.body
  try {
    const user = await User.login( email, password, res )
    const token = createToken(user._id)
    res.status(200).json({success: true, name:user.name, token})
  } catch(error) {
    handleError(error, res)
    // res.status(401).json({success: false, error})
  }
  

})

module.exports = router

