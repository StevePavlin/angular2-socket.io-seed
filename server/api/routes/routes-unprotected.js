var user = require('./../models/user');

/**
 * Every property is documented as to the 'data' it will return in the 'result' object
 * All API calls will return: {
 *    success: <true if the call was success, false if not>
 *    result: <data from the request>
 *    error: <only defined if success is false, the error that occurred>
 * }
 */

module.exports = {


  configure: function(app, baseURL) {
    // TODO do some sort of spam check?

    require('./routes-auth').configure(app, baseURL);
  }
};
