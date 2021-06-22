const jwt = require('jsonwebtoken')
const mySecret = process.env['secret']
const maxAge = 24*60*60


const createToken = ( id ) => {
  return jwt.sign( {id}, mySecret, {
    expiresIn: maxAge*10
  })
}

module.exports = { createToken }