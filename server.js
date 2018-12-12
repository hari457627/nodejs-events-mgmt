var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    morgan      = require('morgan'),
    app         = express(),
    response    = {},
    config      = require('config'),
    path        = require('path'),
    settings    = require('./config/settings');


mongoose.connect(config.get("database.url"), { useMongoClient: true });
var Event_Route=require('./app/routes/events_route');
var Hotdeal_Route=require('./app/routes/hotdeal_route');
var Nightlife_Route=require('./app/routes/nightlife_route');
var Update_Route=require('./app/routes/update_route');

var make_response_as_global = function(req, res, next){
    response = res;
    next();
};

app.use(morgan('combined'));                       //logging
app.use(bodyParser.json());                        //parsing request body
app.use(bodyParser.urlencoded({ extended: true }));//parsing request queries
app.use(make_response_as_global);
app.use(settings.headers);                         // Setting up resquest headers to support Angular applications
app.use('/api/events/', Event_Route);//including routes to application
app.use('/api/hotdeals/', Hotdeal_Route);
app.use('/api/nightlife/', Nightlife_Route);
app.use('/api/updates/', Update_Route);

/* Exception Handling for uncaught Exceptions*/
process.on('uncaughtException', function(err){
    console.log('\n Caught exception:'+ err);
    response.status(500).json({error: "500 internal server error"});
});

module.exports = app;
