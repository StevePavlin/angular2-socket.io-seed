var config = require('../config');
var cookieparser = require('cookie-parser');
var sharedsession = require('express-socket.io-session');

function Socket() {
  this.io = null;
}

Socket.prototype.configure = function(app, session) {

  // Socket.io
  this.io = require('socket.io')(app);
  var redis = require('socket.io-redis');

  // Setup
  this.io.adapter(redis({
    host: config.redisHost,
    port: config.redisPort
  }));



  this.io.set('authorization', function(handshake, accept) {
    session(handshake, {}, function (err) {
      if (err) return accept(err);
      var session = handshake.session;

      accept(null, session.user ? session.user.id != null : false)
    })
  });


  // Only accepts one socket currently, so users cant have multiple tabs open

  var self = this;
  this.io.on('connect', function (socket) {
    session(socket.handshake, {}, function (err) {
      if (err) { /* handle error */ }
      var session = socket.handshake.session;

      session.sockets = [];
      session.sockets.push(socket.id);


      /* If we add multiple sockets, we can do something like this
       to prune old sockets if not done automatically

      for (var i = 0 ; i < session.sockets.length; i++) {
        var userSocket = session.sockets[i];

        if (Date.now() - userSocket.connected > 2.16e+7) {
          session.sockets.splice()
        }
      }
      */
      // and save session
      session.save(function (err) { /* handle error */ })
    });


    socket.on('disconnect', function () {

      session(socket.handshake, {}, function (err) {
        if (err) { /* handle error */ }
        var session = socket.handshake.session;

        session.sockets.splice(session.sockets.indexOf(socket.id));


        // and save session
        session.save(function (err) { /* handle error */ })
      })
    });
  }.bind(this));




  console.log('Socket.io listening on port ' + app.address().port);





  // Listen for redis messages, if no target, publish to all
  // else search for target user and publish to all their socket ids
};
module.exports = new Socket();
