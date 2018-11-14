var express = require('express')
var ideas = require('./../data/ideas')
var router = express.Router()

router.get('/api/ideas', function (req, res) {
  res.json(ideas);
})

router.post('/api/ideas', function (req, res) {
  ideas.push(req.body)
  connection.query("INSERT INTO ideas (name, details, tech, difficulty) VALUES (?, ?, ?, ?)")
})

module.exports = router