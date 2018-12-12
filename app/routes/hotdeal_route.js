var express  = require('express'),
    router   = express.Router(),
    Hotdeal  = require('./../models/Hotdeal'),
    _      = require('underscore'),
    config  = require('config');


router.route('/')
    .get(function (request, response) {
        Hotdeal.find({'approved':true}).exec().then(function(artists){
            response.json(artists);
        }).catch(function(error){
            response.status(500).json({error: error});
        });
    });

module.exports = router;
