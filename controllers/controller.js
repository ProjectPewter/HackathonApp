var express = require('express')
var router = express.Router();
var hacker = require('../models/hack')

router.get("/", function(req, res) {
  hacker.all(function(data) {
    var hbsObject = {
      hack: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/hack", function(req, res) {
  hacker.create([
    "name", "details", "tech", "difficulty", "karma"
  ], [
    req.body.name, req.body.details, req.body.tech, req.body.difficulty, req.body.karma
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

// router.put("/api/hack/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   hacker.update({
//     name: req.body.name
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/hack/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   hacker.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

module.exports = router