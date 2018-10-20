/*
    This file contains the schema definition for location.
    Just a dummy file for testing purposes, will be deleted later
*/

var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var LocationSchema = new Schema ({
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
    },
    zipCode: {
        type: String
    }
});

module.exports = mongoose.model('Location', LocationSchema);
