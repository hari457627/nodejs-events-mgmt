var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('underscore'),
    config  = require('config');

var hotdealSchema = new Schema({
    profilepic:   {type: mongoose.Schema.Types.Mixed}
}).set('toJSON', {
    virtuals:  true,
    versionKey:false
});

var options = {
    url : config.get('uploads.url')
}

hotdealSchema.virtual('profilepic_url')
    .get(function(){
        if(!_.isUndefined(this.profilepic))
            return (options.url+""+this.profilepic.url)
    });

module.exports = mongoose.model('Hotdeal', hotdealSchema);
