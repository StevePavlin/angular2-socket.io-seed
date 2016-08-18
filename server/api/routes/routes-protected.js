var sender = require('./../models/sender');
var User = require('./../models/user');
var user = new User();

/**
 * Every property is documented as to the 'data' it will return in the 'result' object
 * All API calls will return: {
 *    success: <true if the call was success, false if not>
 *    result: <data from the request>
 *    error: <only defined if success is false, the error that occurred>
 * }
 */

module.exports = {

  configure: function (app, baseURL) {

    // Simple middleware to display error if the user isnt logged in
    app.use(function (req, res, next) {
      if (!req.session.user) {
        return sender.send(res, new Error("Not logged in."));
      }

      for (var key in req.body) {
        if (req.body.hasOwnProperty(key) && !req.body[key]) {
          return sender.send(res, new Error("Invalid input."));
        }
      }


      // Checks passed, check all routes
      require('./routes-chat').configure(app, baseURL);
      require('./routes-user').configure(app, baseURL);

      next();
    });
  }
};
