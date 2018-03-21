const DB_NAME = 'intro'
var mongoose = require('mongoose');
var dbconnection = function() {

  var mongoDB = 'mongodb://127.0.0.1:27017/' + DB_NAME;
  // var mongoDB = process.env.MONGODB_URI
  mongoose.connect(mongoDB);
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

  return db;
}

module.exports = dbconnection;
