const express = require("express")
const router = express.Router()
const db = require("../db.js")

router.get('/', (req,res) => res.render('index.html'))

module.exports = function () { // I was gonna implement socket on this one too but eh...

  return router
}
