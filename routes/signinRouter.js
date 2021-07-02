const express = require('express');
const jwt = require('jsonwebtoken')
const { User } = require('../models/userModel.js')
const router = express.Router()
const { createToken } = require('../utils/createToken')
const mySecret = process.env['secret']
const secret = mySecret

const handleError = (error, res) => {
  console.log(error.message)
  const errors = {
    email: "",
    password: ""
  }
  if(error.message === "Email not registered")
  {
    errors.email = "Email not registered"
  }
  if(error.message === "Password incorrect")
  {
    errors.password = "Password incorrect"
  }
res.json({error: errors})
}

router.route('/')
.post( async ( req, res ) => {
  const { email, password } = req.body
  try {
    const user = await Signup.login( email, password )
    const token = createToken(user._id)
    res.status(200).json({name:user.name, token})
  } catch(error) {
    handleError(error, res)
  }
})

module.exports = router