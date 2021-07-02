const express = require('express')
const router = express.Router()

router.route('/')
.get( async(req, res) => {

  res.send("notes here !")

})
.post( async(req, res) => {
  res.send("notes post here !")
})

module.exports = router