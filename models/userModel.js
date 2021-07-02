const mongoose = require('mongoose')
const { Schema, model } = mongoose
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"]
  },
  email: {
    type: String,
    isEmail: [true, "Please enter an valid email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    minLength: [6, "Min. length is 6 characters"]
  },
})

UserSchema.pre("save", async function(next){
const salt = await bcrypt.genSalt()
this.password = await bcrypt.hash(this.password, salt)
next()
})
UserSchema.statics.login = async function (email, password) {

  const user = await this.findOne({ email })
  if(user)
  {
    const result = await bcrypt.compare(password, user.password)
    console.log(result)
    if(result)
    {
      return user;
    }
    throw Error("Password incorrect")
  }
  throw Error("Email not registered")

}

const User = new model('user', UserSchema)

module.exports = { User }