var orm = require('../config/orm')

var hacker = {
  all: function(cb) {
    orm.selectAll("ideas", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.insertOne("ideas", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.updateOne("ideas", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("ideas", condition, function(res) {
      cb(res);
    });
  }
}

module.exports = hacker