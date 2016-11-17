var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    
    id_user: String,
	nom: String,
    prenom: String,
    picture: String,
    age: Number,
    sexe: String,
    email: String,
    ville: String,
    phone: String,
    notes: [{
        rating: Number,
        description: String
    }] 
});

module.exports = mongoose.model('User', User);