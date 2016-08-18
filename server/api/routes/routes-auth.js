var User = require('../models/user');
var user = new User();

module.exports = {
  configure: function (app, baseURL) {
    /**
     * @param POST - username
     * @param POST - password
     * @return no data, local cookie 'connect.sid' will be set
     * this is our token client side to see if a user is logged in
     */
    app.post(baseURL + '/login', function(req, res) {
      console.log('/login cookie ' + req.headers.cookie);


      user.login(
        req,
        res, {
          username: req.body.username,
          password: req.body.password
        }
      );
    });

    /**
     * @param POST - username
     * @param POST - password
     * @todo csrf/captcha?
     * @return no data
     *
     */
    app.post(baseURL + '/register', function(req, res) {
      console.log('/register cookie ' + req.headers.cookie);

      user.register(
        req,
        res, {
          username: req.body.username,
          password: req.body.password
        }
      );
    });
  }
};
