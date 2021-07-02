const jwt = require("jsonwebtoken")

const secret = process.env['secret']


const maxAge = 24*60*60
const createToken = ( id ) => {
  return jwt.sign( {id}, secret, {
    expiresIn: maxAge*10
  })
}

module.exports = { createToken }
