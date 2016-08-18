var app = require('express')();
var config = require('./config');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var router = require('./api/routes/router');
var socket = require('./socket/socket');
var cors = require('cors');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

app.use(cookieparser());
app.use(bodyparser.json());

// Cross node session storage
var sessionInstance = session({
  store: new RedisStore({
    host: config.redisHost,
    port: config.redisPort,
    logErrors: true,
    secure: false,
    httpOnly: false
  }),

  cookie: {
    maxAge: 2600000,
    secure: false,
    httpOnly: true
  },
  saveUninitialized: false,
  secret: config.sessionSecret
});
app.use(sessionInstance);

app.use(cors({
  origin: 'http://127.0.0.1:4200',
  credentials: true
}));


router.configure(app);

var server = app.listen(4201, function() {
  console.log('Express listening on port ' + server.address().port);
});


socket.configure(server, sessionInstance);
