
// Only one instance needed, annoying to call () in every model after require
module.exports = new Sender();
function Sender() {


}

Sender.prototype.send = function(res, err, data) {
  var json = {
    success: err ? false : true
  };


  if (!json.success) {
    json.error = err;

    if (json.error.code) {
      json.error = 'Database error.';
    } else {
      json.error = err.message;
    }
  } else {
    json.result = data || {};
  }

  return res.json(json);
};

