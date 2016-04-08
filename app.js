'use strict';

//modules
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();

//local modules
var logger = require('./logger');
var config = require('./config')();
var model = require('./signup/model-mongodb')(config);
app.use(logger);

app.use(express.static('public'));

//routers
app.use('/signup', require('./signup/crud')(model, urlencodedParser));

// Redirect root to /signup
app.get('/', function (req, res) {
  res.redirect('/signup');
});

// Basic 404 handler
app.use(function (req, res) {
  res.status(404).send('Not Found');
});

// Basic error handler
app.use(function (err, req, res, next) {
  /* jshint unused:false */
  console.error(err);
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});

if (module === require.main) {
  // Start the server
  var server = app.listen(config.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });
}

module.exports = app;
