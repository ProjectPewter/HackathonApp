var express = require('express')
var ideas = require('./../data/ideas')
var router = express.Router()

router.get('/api/ideas', function (req, res) {
  res.json(ideas);
})

module.exports = router