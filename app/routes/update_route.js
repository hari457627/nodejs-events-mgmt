var express  = require('express'),
    router   = express.Router(),
    Update  = require('./../models/Update'),
    _      = require('underscore'),
    config  = require('config');


router.route('/')

    .get(function (request, response) {
        Update.find({approved:true}).then(function (Update) {
            response.status(200).send(Update);
        }).catch(function (error) {
            response.json(error);
        })
    });

module.exports = router;
