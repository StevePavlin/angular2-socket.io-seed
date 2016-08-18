var db = require('mysql-promise')();
var config = require('./config');


db.configure({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
});

module.exports = db;
