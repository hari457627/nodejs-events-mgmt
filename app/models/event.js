var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventSchema = new Schema({
        name       :   String,
        description     :   String,
        organizerName   :   String,
        Address:{
            street : {
                type : String, required: true,initial: true
            },
            city : {
                type : String, required: true,initial: true
            },
            state : {
                type : String, required: true,initial: true
            },
            zipcode: {
                type : Number, required: true,initial: true
            }
        },
        event_date: {
            type: Date, required: true, initial : true
        },
        durationOfEvent: {
            type : String, required: true,initial: true
        },
        is_Approved: {
            type: Boolean
        }
    })
    .set('toJSON',{
        virtuals: true,
        versionKey:false,
        transform: function(doc, ret){ delete ret._id }
    });
module.exports = mongoose.model('Event', eventSchema);
