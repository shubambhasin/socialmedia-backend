const jwt = require('jsonwebtoken')
const mySecret = process.env['secret']

const decodeUserId = (token) => {
    try{
      const decodedToken = jwt.verify(token, mySecret)
          console.log(decodedToken.id)
          return decodedToken.id
        }
      catch(error){
      console.log("Something went wrong",error)
    }
}
module.exports = { decodeUserId }