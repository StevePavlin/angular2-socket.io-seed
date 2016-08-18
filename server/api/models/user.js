var db = require('../../db');
var sender = require('./sender');
var pusher = require('../pusher/pusher');
var crypto = require('crypto');

const HASH_ALGORITHM = 'sha512';
const SALT_LENGTH = 64;


module.exports = User;
function User() {

}

User.prototype.getUser = function(username) {
  return db.query('SELECT * FROM `users` WHERE username = ?', [username]);
};


User.prototype.setupSession = function(req, data) {
  req.session.user = data;
};


User.prototype.getSessionInfo = function(req, res) {
    sender.send(res, null, req.session.user);
};


User.prototype.updatePassword = function(req, res, data) {
  var self = this;

  var id = req.session.user.id;
  var password = data.password;
  var newPassword = data.newPassword;
  console.log(data);

  db.query('SELECT password, salt FROM `users` WHERE id = ?', [id])
    .then(function(results) {
      if (results.length == 0) {
        throw new Error('Invalid username or password.');
      }

      var row = results[0];
      var hashedPass = crypto.createHmac(HASH_ALGORITHM, row.salt.toString('hex')).update(password).digest("hex");


      if (hashedPass != row.password) {
        throw new Error('Invalid username or password.');
      }

      var salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
      hashedPass = crypto.createHmac(HASH_ALGORITHM, salt).update(newPassword).digest("hex");

      return db.query('UPDATE `users` SET password = ?, salt = ? WHERE id = ?', [hashedPass, salt, id]);
    })

    .then(function(results) {
      sender.send(res, null, {success: true});
    })

    .catch(function(err) {
      console.log(err);
      sender.send(res, err);
    });
};

User.prototype.login = function(req, res, data) {

  var self = this;

  var username = data.username;
  var password = data.password;

  db.query('SELECT password, salt FROM `users` WHERE username = ?', [username])
    .then(function(results) {
      if (results.length == 0) {
        throw new Error('Invalid username or password.');
      }

      var row = results[0];
      var hashedPass = crypto.createHmac(HASH_ALGORITHM, row.salt.toString('hex')).update(password).digest("hex");


      if (hashedPass != row.password) {
        throw new Error('Invalid username or password.');
      }

      return self.getUser(username);
    })

    .then(function(results) {
      self.setupSession(req, results[0]);
      sender.send(res, null);
    })

    .catch(function(err) {
      console.log(err);
      sender.send(res, err);
    });
};

User.prototype.register = function(req, res, data) {

  var self = this;

  var username = data.username;
  var password = data.password;

  db.query('SELECT password, salt FROM `users` WHERE username = ?', [username])
    .then(function(results) {
      if (results.length > 0) {
        throw new Error('Username already exists.');
      }

      var salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
      var hashedPass = crypto.createHmac(HASH_ALGORITHM, salt).update(password).digest("hex");


      return db.query('INSERT INTO users (username, password, salt) VALUES (?, ?, ?)', [username, hashedPass, salt]);
    })

    .then(function(results) {
      return self.getUser(username);
    })

    .then(function(results) {
      self.setupSession(req, results[0]);
      sender.send(res, null);
    })

    .catch(function(err) {
      console.log(err);
      sender.send(res, err);
    });

};

User.prototype.logout = function(req, res) {

  req.session.destroy(function(err) {
    if (err) {
      return sender.send(res, new Error("Error ending session."));
    }

    sender.send(res, null);
  });
};

