var User = require('../models/user');
var user = new User();

module.exports = {
  configure: function (app, baseURL) {
    /**
     * Updates user's password
     * @return success
     */
    app.post(baseURL + '/update/password', function (req, res) {
      console.log('/update/password cookie ' + req.headers.cookie);
      console.log(req.body);
      user.updatePassword(
        req,
        res,
        {
          password: req.body.password,
          newPassword: req.body.newPassword
        }
      )
    });

    /**
     * Get a users session information
     * @return user table row for this user
     */
    app.get(baseURL + '/user', function (req, res) {
      console.log('/user cookie ' + req.headers.cookie);

      user.getSessionInfo(
        req,
        res
      )
    });

    /**
     * Logout a user
     * @return no data
     */
    app.get(baseURL + '/logout', function (req, res) {
      console.log('/logout cookie ' + req.headers.cookie);

      user.logout(
        req,
        res
      );
    });
  }
};
