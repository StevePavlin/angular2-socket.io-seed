var Chat = require('../models/chat');
var chat = new Chat();

module.exports = {
  configure: function (app, baseURL) {
    app.get(baseURL + '/chat', function (req, res) {

      chat.getHistory(
        req,
        res
      )
    });

    app.post(baseURL + '/chat/send', function (req, res) {
      console.log(req.body);
      res.json({
        success: req.body.message == "test",
        err: (req.body.message == "test") ? "" : "err"
      })
    });
  }
};
