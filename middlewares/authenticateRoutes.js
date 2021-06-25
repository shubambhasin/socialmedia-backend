const jwt = require('jsonwebtoken')

const mySecret = process.env['secret']
const secret = mySecret

const authenticateRoutes = (req, res, next) => {
  const token = req.headers.authorization
  // console.log("Token recieved", token)
  if(token)
  {
    jwt.verify(token, secret, ( error, decodeToken) => {
      if(error)
      {
        console.log("Error from auth verify:", error.message)
        res.json({error: error.message})
      }
      else{
        console.log("User verified:", decodeToken.id)
        next()
      }
    })
  } else {
    console.log("No auth token")
    res.json({error: "No auth token recieved"})
  }
}
module.exports = { authenticateRoutes }


