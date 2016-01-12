var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LocationSchema   = new Schema({
    name: String,
    address: String,
    lat: Number,
    long: Number
});

module.exports = mongoose.model('Location', LocationSchema);
