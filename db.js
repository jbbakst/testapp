var databaseURL = 'todosdb';
var collections = ["Todo"];
var db = require('mongojs').connect(databaseURL, collections);

module.exports = db;