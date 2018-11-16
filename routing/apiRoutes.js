var express = require('express')
var ideas = require('../data/ideas')
var router = express.Router()
var connection = require('../server')

router.get('/api/ideas', function (req, res) {
  connection.query("SELECT * FROM ideas", {}, function (err, result) {
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

router.get('/api/ideas/newest', function (req, res) {
  connection.query("SELECT name, details, tech, difficulty FROM ideas ORDER BY created DESC", {}, function (err, result){
    if (err) throw err

    res.json(result)
  })
})

router.get('api/ideas/random', function (req, res) {
  connection.query("SELECT name, details, tech, difficulty FROM ideas ORDER BY RAND() LIMIT 1", {}, function (err, result){
    if (err) throw err

    res.json(result)
  })
})

router.get('api/ideas/difficulty/:difficulty', function (req, res) {
  connection.query("SELECT name, details, tech, difficulty FROM ideas WHERE difficulty = ?", { difficulty }, function (err, result) {
    if (err) throw err

    res.json(result)
  })
})

router.post('/api/ideas', function (req, res) {
  ideas.push(req.body)
  var projectName = req.body.project
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

module.exports = router