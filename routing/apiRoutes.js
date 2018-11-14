var express = require('express')
var ideas = require('./../data/ideas')
var router = express.Router()
var connection = require('./../server')

router.get('/api/ideas', function (req, res) {
  res.json(ideas);
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