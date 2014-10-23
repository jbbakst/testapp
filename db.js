var databaseURL = 'localhost:27017';
var collections = ["Todo"];
var db = require('mongojs').connect(databaseURL, collections);

module.exports = db;