var db = require('../../db');
var sender = require('./sender');

module.exports = Chat;
function Chat() {

}

Chat.prototype.getHistory = function(req, res) {
  db.query('SELECT c.message, c.sent, u.username FROM `chat` c LEFT JOIN `users` u ON c.uid =  u.id')
    .then(function(results) {
      sender.send(res, null, results);
    })
    .catch(function(err) {
      console.log(err);
      sender.send(res, err);
    });
};

Chat.prototype.sendMessage = function(req, res) {
  // TODO
};

