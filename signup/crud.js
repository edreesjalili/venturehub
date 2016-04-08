'use strict';

var express = require('express');
var bcrypt = require('bcrypt');
var saltRounds = 10;
module.exports = function(model, parser) {

  var router = express.Router();

  // Set Content-Type for all responses for these routes
  router.use(parser, function (req, res, next) {
    res.set('Content-Type', 'text/html');
    next();
  });

  /**
   * POST /signup
   *
   * Create a account.
   */
  // [START add]
  router.post(
    '/',
    function insert(req, res, next) {
      var data = req.body;
      var user = {
        'email': data.email,
        'company': data.company,
        'type': data.type
      };
      bcrypt.hash(data.password, saltRounds, function(err, hash) {
        if(err) {
          return next(err);
        }
        user.password = hash;
        model.create(user, function (err, savedData) {
          if (err) { return next(err); }
          res.status(201).json({success: true});
        });
      });
    }
  );
  // [END add]

  /**
   * Errors on "/signup/*" routes.
   */
  router.use(function handleRpcError(err, req, res, next) {
    // Format error and forward to generic error handler for logging and
    // responding to the request
    err.response = err.message;
    next(err);
  });
  return router;
};
