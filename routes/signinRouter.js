const express = require('express')
const router = express.Router()

router.route('/')
.get( async( req, res) => {

  res.send("Sign in page")

})
.post( async(req, res) => {

  const token = req.header.authorization
  const userId = decodeUserId

})

module.exports = router

