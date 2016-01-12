var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Post     = require('./post');

var LocationSchema   = new Schema({
    name: String,
    address: String,
    lat: Number,
    long: Number,
    posts: []
});

module.exports = mongoose.model('Location', LocationSchema);
