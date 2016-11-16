var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  createur: String,
    nom: String,
    description: String,
    nb_participant: Number,
    dates: [
    {
        participants:
        [
        {
            id: Schema.Types.ObjectId,
            status: Boolean
        }],
        date: Object
    }],
    prix: Number,
    adresse: {
        line: String,
        postalCode: String,
        city: String,
        country: String
    },
    picture: String
});

module.exports = mongoose.model('Event', EventSchema );
