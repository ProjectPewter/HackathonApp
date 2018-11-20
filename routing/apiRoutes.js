var express = require('express')
var router = express.Router()
var connection = require('../config/connection.js')
var passport = require("passport")

router.get('/api/ideas', function (req, res) {
  connection.query("SELECT * FROM ideas", {}, function (err, result) {
    if (err) throw err

    res.json(result)
  })
})

router.get("/users/:id", function(req, res) {
  connection.query("SELECT id, username, email FROM users WHERE ?",
   {id: req.params.id}, function(err, result) {
     res.json(result)
  })
})


router.get('/api/ideas/:id', function (req, res) {
  connection.query("SELECT * FROM ideas WHERE ?", {
    id: req.params.id
  }, function (err, result) {
    if (err) throw err

    res.json(result)
  })
})

router.get('/api/ideas/votes', function (req, res) {
  connection.query("SELECT name, details, tech, difficulty FROM ideas ORDER BY votes DESC", {}, function (err, result){
    if (err) throw err

    res.json(result)
  })
})

router.get('/api/ideas/recent', function (req, res) {
  connection.query("SELECT name, details, tech, difficulty FROM ideas ORDER BY created DESC", {}, function (err, result){
    if (err) throw err

    res.json(result)
  })
})

router.get('/api/ideas/random', function (req, res) {
  connection.query("SELECT name, details, tech, difficulty FROM ideas ORDER BY RAND() LIMIT 1", {}, function (err, result){
    if (err) throw err

    res.json(result)
  })
})

router.get('/api/ideas/difficulty/:difficulty', function (req, res) {
  var diff = req.params.difficulty
  connection.query("SELECT name, details, tech, difficulty FROM ideas WHERE ?", {difficulty: diff}, function (err, result) {
    if (err) throw err

    res.json(result)
  })
})



router.post('/api/ideas', function (req, res) {
  var projectName = req.body.ideaName
  var projectDetails = req.body.details
  var projectTech = req.body.tech
  var projectDiff = req.body.difficulty
  connection.query("INSERT INTO ideas SET ?",
    {
      name: projectName,
      details: projectDetails,
      tech: projectTech,
      difficulty: projectDiff
    }, 
    function (err, result) {
      if (err) throw err

      console.log(result.affectedRows)
    })
})

router.get('/api/user/pinned', function (req, res) {
  if (req.isAuthenticated()) {
    console.log(req.session.passport.user.user_id)
    connection.query("SELECT * FROM pinned WHERE ?", {
      id: req.session.passport.user.user_id
    }, function (err, result) {
      if (err) throw err

      res.json(result)
    })
  } else {
    console.log("Not Logged In")
    res.end()
  }
})

router.post('/api/user/pinned/:id', function (req, res) {
  if (req.isAuthenticated()) {
    console.log(req.session.passport.user.user_id)
    connection.query("INSERT INTO pinned SET ?", {
      id: req.session.passport.user.user_id,
      pin: req.params.id
    }, function (err, result) {
      if (err) throw err

      res.json(result.affectedRows)
    })
  }
  else {
    console.log("Not Logged In")
    res.end()
  }
})

module.exports = router