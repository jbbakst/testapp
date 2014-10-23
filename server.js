// setup
var express = require('express');
var app = express();

var db = require('./db');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended' : 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// routes
app.get('/api/todos', function(req, res) {
    db.Todo.find(function(err, todos) {
        if (err) res.send(err); // send error
        res.json(todos);  // return todos in JSON
    });
});

// create todo
app.post('/api/todos', function(req, res) {
    // create todo, info comes from AJAX request from Angular
    db.Todo.save({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err) res.send(err);

        // get and return all todos after creating one
        db.Todo.find(function(err, todos) {
          if (err) res.send(err); // send error
          res.json(todos);  // return todos in JSON
       });
    });
});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    db.Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err) res.send(err);

        db.Todo.find(function(err, todos) {
            if (err) res.send(err);
            res.json(todos);
        });
    });
});

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

// start app
var server = app.listen(8080, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Express server listening on http://%s:%s", host, port)
});