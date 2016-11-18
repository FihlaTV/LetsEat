var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
    nom: String,
    participants: [{id_user: String}],
    messages: [
        {
            id_user: String,
            messages: String
        }
    ]
    
});

module.exports = mongoose.model('Room', Room );
