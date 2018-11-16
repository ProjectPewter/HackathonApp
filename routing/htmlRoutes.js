var express = require('express')
var path = require("path");
var router = express.Router()

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
})

router.get('/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname, "../public/dash.html"));
})

// router.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/home.html"));
// });

module.exports = router