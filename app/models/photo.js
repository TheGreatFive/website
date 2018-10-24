/*
    This file contains the schema for photos
*/

var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var PhotoSchema = new Schema({
    photoData: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Photo', PhotoSchema);
