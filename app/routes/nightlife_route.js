var express  = require('express'),
    router   = express.Router(),
    Nightlife  = require('./../models/Nightlife'),
    _      = require('underscore'),
    config  = require('config');


router.route('/')

    .get(function (request, response) {
        Nightlife.find({approved:true}).then(function (Nightlife) {
            response.status(200).send(Nightlife);
        }).catch(function (error) {
            response.json(error);
        })
    });

module.exports = router;
