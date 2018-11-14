var express = require('express')
var path = require("path");
var router = express.Router()

router.get('/', function (req, res) {
  res.sendFile(path.join("../app/index.html"));
})

router.get('/dashboard', function (req, res) {
  res.sendFile(path.join("dash.html"));
})

router.get("*", function(req, res) {
  res.sendFile(path.join("../app/index.html"));
});

module.exports = router