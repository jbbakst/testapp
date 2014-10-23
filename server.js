// setup
var express = require('express');
var app = express();

var mongojs = require('mongojs');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration
var databaseURL = 'localhost:27017';
mongojs.connect(databaseURL);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended' : 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride);

// start app
var server = app.listen(8080, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Express server listening on http://%s:%s", host, port)
});