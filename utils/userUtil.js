const SignupSchema = require('../models/userModel')

SignupSchema.pre("save", async function(next){
const salt = await bcrypt.genSalt()
this.password = await bcrypt.hash(this.password, salt)
next()
})