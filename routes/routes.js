const express = require("express")
const router = express.Router()
const db = require("../db.js")

router.get('/', (req,res) => res.render('index'))

router.get('/users', function(req, res) {
  db.getUsers()
    .then(function(result) {
      res.render('users',{users : result})
    })
})

router.get('/users/managers', function(req, res) {
  db.getUsers(true)
    .then(function(result) {
      res.render('managers',{users : result})
    })
})

router.post('/users/', function(req, res) {
  db.createUser(req.body)
    .then(function(result) {
      req.body.manager ?
        res.redirect('/users/managers') :
        res.redirect('/users')
    })
})

router.delete('/users/:id', function(req, res) {
  db.deleteUser(req.params.id)
    .then(function (result) {
      res.redirect('/users')
    })
})

router.put('/users/:id', function(req, res) {
  db.updateUser(req.params.id, true)
  .then(function (result) {
    res.redirect('/users/managers')
  })
})

router.put('/users/managers/:id', function(req, res) {
  db.updateUser(req.params.id, false)
  .then(function (result) {
    res.redirect('/users/')
  })
})


module.exports = function () {

  return router
}
