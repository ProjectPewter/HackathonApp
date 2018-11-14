var express = require('express')
var ideas = require('./../data/ideas')
var router = express.Router()

router.get('/api/ideas', function (req, res) {
  res.json(ideas);
})

router.post('/api/ideas', function (req, res) {
  ideas.push(req.body)
  var projectName = req.body.project
  var projectDetails = req.body.details
  var projectTech = req.body.tech
  var projectDiff = req.body.difficulty
  connection.query("INSERT INTO ideas (name, details, tech, difficulty) VALUES (?, ?, ?, ?)",
    {
      projectName,
      projectDetails,
      projectTech,
      projectDiff
    }, function (err, result) {
      if (err) throw err

      
    })
})

module.exports = router