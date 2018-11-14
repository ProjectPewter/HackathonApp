var express = require('express')
var path = require("path");
var router = express.Router()

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
})

router.get('/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname, "dash.html"));
})

router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

module.exports = router