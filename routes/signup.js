var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

router.route('/')
.post(function (request, reponse) {
    //TODO sign up logic
});

module.exports = router;