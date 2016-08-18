var config = require('../../config');

module.exports = {
  configure: function(app) {
    require('./routes-unprotected').configure(app, config.apiBaseURL);
    require('./routes-protected').configure(app, config.apiBaseURL);
  }
};
