var db = require('../../db');
var config = require('../../config');
var models = require('./pusher-models');

function Pusher() {

  this.io = require('socket.io-emitter')({ host: config.redisHost, port: config.redisPort });
}

Pusher.prototype._verifyDataArgs = function(event, data) {

  var valid = false;
  Object.keys(models).forEach(function(model) {
    if (model == event) {
      // Verify we are sending correct arguments

      models[model].forEach(function(property) {
        if (!data.hasOwnProperty(property)) {
          console.log("Missing property '" + property + "' for message '" + event + "'");
          return false;
        }
      });

      // Check for additional arguments
      Object.keys(data).forEach(function(property) {
        if (models[model].indexOf(property) == -1) {
          console.log("Additional property '" + property + "' for message '" + event + "'");
          return false;
        }
      });

      valid = true;
    }
  });

  if (!valid) {
    console.log("'" + event + "' is not a valid push event.");
  }

  return valid;
};

Pusher.prototype.pushTo = function(socketIds, event, data) {
  if (!this._verifyDataArgs(event, data)) return;


  // TODO Get users sockets and emit
  socketIds.forEach(function(socketId) {
    this.io.to(socketId).emit(event, data);
  }.bind(this));

};

Pusher.prototype.pushToAll = function(event, data) {
  if (!this._verifyDataArgs(event, data)) return;

  this.io.emit(event, data);
};

module.exports = new Pusher();
