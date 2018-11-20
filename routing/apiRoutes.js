var express = require('express')
var router = express.Router()
var connection = require('../config/connection.js')
var passport = require("passport")

router.get('/api/ideas', function (req, res) {
  connection.query("SELECT * FROM ideas", function (err, result) {
    if (err) throw err

    res.json(result)
  })
})

router.get("/users/:id", function (req, res) {
  connection.query("SELECT id, username, email FROM users WHERE ?",
    { id: req.session.passport.user.user_id }, function (err, result) {
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

router.get('/api/ideas/votes/order', function (req, res) {
  connection.query("SELECT * FROM ideas ORDER BY votes DESC", function (err, result) {
    if (err) throw err

    res.json(result)
  })
})

router.get('/api/ideas/recent/order', function (req, res) {
  connection.query("SELECT * FROM ideas ORDER BY id DESC", function (err, result) {
    if (err) throw err

    res.json(result)
  })
})

router.get('/api/ideas/random/random', function (req, res) {
  connection.query("SELECT * FROM ideas ORDER BY RAND() LIMIT 1", function (err, result) {
    if (err) throw err

    res.json(result)
  })
})

router.get('/api/ideas/difficulty/:difficulty', function (req, res) {
  var diff = req.params.difficulty
  connection.query("SELECT * FROM ideas WHERE ?", { difficulty: diff }, function (err, result) {
    if (err) throw err

    res.json(result)
  })
})



router.post('/api/ideas', function (req, res) {
  if (req.isAuthenticated()) {
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

        res.json(result.affectedRows)
      })  
  } else {
    console.log("Not Logged In")
    res.end()
  }
})

router.post('/api/user/own/', function (req, res) {
  if (req.isAuthenticated()) {
    connection.query("INSERT INTO own SET ?", {
      id: req.session.passport.user.user_id,
      idea: req.body.ideaName
    }, function (err, result) {
      if (err) throw err
    
      res.json(result.affectedRows)
    })
  } else {
    console.log("Not Logged In")
    res.end()
  }
})


router.get('/api/user/pinned', function (req, res) {
  if (req.isAuthenticated()) {
    // console.log(req.session.passport.user.user_id)
    connection.query("SELECT DISTINCT pin FROM pinned WHERE ?", {
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

router.get('/api/user/voted/:id', function (req, res) {
  if (req.isAuthenticated()) {
    // console.log(req.session.passport.user.user_id)
    connection.query("SELECT DISTINCT * FROM voted WHERE ?", {
      id: req.session.passport.user.user_id,
      // vote: req.params.id
    }, function (err, result) {
      if (err) throw err

      res.json(result)
    })
  } else {
    console.log("Not Logged In")
    res.end()
  }
})

router.get('/api/user/own', function (req, res) {
  if (req.isAuthenticated()) {
    // console.log(req.session.passport.user.user_id)
    connection.query("SELECT DISTINCT idea FROM own WHERE ?", {
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

router.post('/api/user/votes/:id', function (req, res) {
  if (req.isAuthenticated()) {
    // console.log(req.session.passport.user.user_id)
    connection.query("UPDATE ideas SET ? WHERE ?", [
      {
        votes: req.body.votes
      },
      {
        id: req.params.id
      }], function (err, result) {
        if (err) throw err

        res.json(result.affectedRows)
      })
  }
  else {
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