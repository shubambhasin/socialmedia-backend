const { User } = require('../models/userModel')

const findUser = async (userId) => {

  try {
    const user = await User.findById({ _id: userId })
    console.log("user details", user)
    if (user.length !== 0) {
      return user
    }
    else return null
  } catch (error) {
    console.log(error)
  }

}

module.exports = { findUser }