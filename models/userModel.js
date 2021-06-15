const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserSchema = new Schema({

  name: {
    type: String,
    required: [true, "Please enter your name"]
  }
  email: {
    type: String
    isEmail: [true, "Please enter an valid email"]
  },
  password: {
    type: String,
    minLength: [6, "Min. length is 6 characters
  },
 
})

const User = new model('user', UserSchema)

module.exports = { User }