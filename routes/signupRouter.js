const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { User } = require('../models/userModel.js')
const mySecret = process.env['secret']
const { createToken } = require('../utils/createToken')

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
  if(error.code === 11000)
  {
    errors.email = "Email already registered, please login instead"
    res.json({error: errors})
    return
  }
  if(error.message.includes("user validation failed"))
  {
    Object.values(error.errors).forEach(({properties}) => {
      errors[properties.path]= properties.message;
    })
    return res.json({error: errors})
  }
res.json({error: errors})
}
router.route('/')
.get((req, res) => {
  res.send("SignUp")
})
.post( async (req, res ) => {
    try
    {
      const {name, email, password} = req.body
      const newUser = new User({ 
        name: name, 
        email: email, 
        password: password
    })
      const user = await newUser.save()
      const token = createToken(user._id)
      console.log("New user signedup, savedUser:", user)
      res.json({success: true, name: user.name, token})
    }
    catch(error){
      handleError(error, res)
    }
})

module.exports = router;