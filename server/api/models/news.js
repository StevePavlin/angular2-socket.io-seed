var db = require('../../db');
var sender = require('./sender');

module.exports = News;
function News() {

}

News.prototype.getHistory = function(req, res) {
  db.query('SELECT n.message, n.posted, u.username FROM `news` n LEFT JOIN `users` u ON n.uid =  u.id')
    .then(function(results) {
      sender.send(res, null, results);
    })
    .catch(function(err) {
      console.log(err);
      sender.send(res, err);
    });
};

News.prototype.add = function(req, res) {
  // TODO
};

