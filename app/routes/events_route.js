var express  = require('express'),
    router   = express.Router(),
    Event  = require('./../models/event'),
    _      = require('underscore'),
    config  = require('config');


router.route('/')
    .post(function(request, response) {
        Event.create(request.body, function (error, event) {
            if(error)

                return response.status(500).json({error: error});
            else
                response.json(event);
        });
    })

    .get(function (request, response) {
        Event.find({$and: [{'is_Approved': true}, {'is_Ticketable': true},{"is_Featured":false}, {"event_date": {"$gte": new Date()}}]}).sort({"event_date": -1}).then(function (event) {
            
            
            if(event.length !==0){
                var newEvents = [];
                for(var i=0; i < event.length;i++){
                    var doc = event[i];
                    var obj= doc.toObject({virtuals:true});
                    if(obj.hasOwnProperty('event_pic')){
                        obj.eventpic_url = config.get('uploads.url')+obj.event_pic.url;
                    }
                    else{
                        obj.eventpic_url = "https://upload.wikimedia.org/wikipedia/commons/5/5a/No_image_available_500_x_500.svg";
                    }
                    newEvents.push(obj);
                }
                response.json(newEvents);
            }
            else{
                response.json(event);
            }
            
            
            
        }).catch(function (error) {
            response.json(error);
        })
    });

router.route('/featured')
    
    .get(function (request, response) {
        Event.find({$and: [{'is_Approved': true}, {'is_Ticketable': true},{"is_Featured":true}, {"event_date": {"$gte": new Date()}}]}).sort({"event_date": -1}).then(function (event) {

            if(event.length !==0) {
                var newEvents = [];
                for (var i = 0; i < event.length; i++) {
                    var doc = event[i];
                    var obj = doc.toObject({virtuals: true});
                    if (obj.hasOwnProperty("event_pic")) {
                        obj.eventpic_url = config.get('uploads.url') + obj.event_pic.url;
                    }
                    else {
                        obj.eventpic_url = "https://upload.wikimedia.org/wikipedia/commons/5/5a/No_image_available_500_x_500.svg";
                    }
                    newEvents.push(obj);
                }
                response.json(newEvents);
            }
            else{
                response.json(event);
            }

        }).catch(function (error) {
            response.json(error);
        })
    });

router.route('/:id')

    .get(function (request, response) {
        Event.findOne({_id:request.params.id}).then(function (event) {
            
            var doc = event;
            var obj= doc.toObject({virtuals:true});
            if(obj.hasOwnProperty("event_pic")){
                obj.eventpic_url = config.get('uploads.url')+obj.event_pic.url;
            }
            else{
                obj.eventpic_url = "https://upload.wikimedia.org/wikipedia/commons/5/5a/No_image_available_500_x_500.svg";
            }
            response.json(obj);
            
        }).catch(function (error) {
            response.json(error);
        })
    });




module.exports = router;
