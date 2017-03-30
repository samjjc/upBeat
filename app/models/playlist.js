let mongoose        = require('mongoose');
let Schema          = mongoose.Schema;

let PlaylistSchema  = new Schema({
    name: String
})

module.exports = mongoose.model('Playlist', PlaylistSchema);
