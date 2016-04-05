var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
    video_url: String,
    name: String,
    description: String
});

module.exports   = mongoose.model('Post', PostSchema);
