var databaseURL = 'todos';
var collections = ["Todo"];
var mongojs = require('mongojs');
var db = mongojs.connect(databaseURL, collections);

module.exports = {
  db: db,
  mongojs: mongojs 
}