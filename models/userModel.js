const mongoose = require('mongoose')
const { Schema, model} = mongoose
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is a required field"],
    unique: true
  },
  name: {
    type: String,
    required: [true, "Name is a required field"]
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: [isEmail, "Please enter an valid Email"]
  },
  password: {
      type: String,
       type: String,
    minlength: [6,"password should be atleast of 6 characters"]
  }
})

// hooks

UserSchema.pre("save", async function(next){
const salt = await bcrypt.genSalt()
this.password = await bcrypt.hash(this.password, salt)
next()
})
UserSchema.statics.login = async function (email, password, res) {

  const user = await this.findOne({ email })
  if(user)
  {
    const result = await bcrypt.compare(password, user.password)
    console.log(result)
    if(result)
    {
      return user;
    }
    // throw Error("Password incorrect")
  res.status(401).json({success: false, message: "Password incorrect"})
  }
  res.status(404).json({success: false, message: "Email not registered"})
}



const User = new model('user', UserSchema)
module.exports = { User, UserSchema }