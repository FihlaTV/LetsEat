var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Note = new Schema({
    
    rating: Number,
    description: String
});


var User = new Schema({
    
	nom: String,
    prenom: String,
    picture: String,
    age: Number,
    sexe: String,
    email: String,
    ville: String,
    phone: String,
    notes: [Note] 
});

module.exports = mongoose.model('User', User);