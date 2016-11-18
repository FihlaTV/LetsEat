var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Event = new Schema({
    createur: String,
    nom: String,
    description: String,
    nb_participant: Number,
    participants: [
        {
            id: String,
            status: Boolean
        }
    ],
    date: Object,
    prix: Number,
    adresse: {
        line: String,
        postalCode: String,
        city: String,
        country: String
    },
    picture: String
});

module.exports = mongoose.model('Event', Event );
