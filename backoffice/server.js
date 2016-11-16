var apiName = '/letseat-api';
var port = 8080;
var databaseName = 'letseatdb';
var databaseIP = 'localhost';
var databaseLink = 'mongodb://' + databaseIP + '/' + databaseName;

//Dependencies
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var server = express();
var router = express.Router();

//Models
var User = require('./models/user');
var Event = require('./models/event');

//Configure server
server.use(bodyParser());
server.use(bodyParser.urlencoded({     
    extended: true
}));
server.use(apiName, router);

//Configure router
router.use(function(req, res, next) {
    console.log('Pok');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(databaseLink);

//Bienvenue
router.get('/', function(req, res) {
    res.send('<h2>Bienvenue sur API de Let\'s Eat !</h2>');	
});

//Get all users
router.route('/users').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.error(err);
            return res.send(err);
        }
        res.json(users);
    });
});

//Get one user
router.route('/user/:id').get(function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            console.error(err);
            return res.send(err);
        }
        res.json(user);
    });
});

//Add a User
router.route('/user').post(function(req, res) {
    
    var user = new User(req.body);

    user.save(function(err) {
        if (err) {
            console.error(err);
            return res.send(err);
        }
        res.json({ message: 'User Added' });
    });
});

//Modif one user
router.route('/user/:id').put(function(req, res) {
    
    User.findById(req.params.id, function(err, user) {
        
        if (err) {
            console.log(err);
            return res.send(err);
        }
        
        user.nom = req.body.nom;
        user.prenom = req.body.prenom;
        user.picture = req.body.picture;
        user.age = req.body.age;
        user.sexe = req.body.sexe;
        user.email = req.body.email;
        user.ville = req.body.ville;
        user.phone = req.body.phone;
        user.notes = req.body.notes;
        
        user.save(function(err) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            res.json({ message: 'User Modified' });
        });
        
    });
});

//Delete one user
router.route('/user/:id').delete(function(req, res) {
    
    User.remove({_id: req.params.id}, function(err, bear) {
        if (err) {
                console.log(err);
                return res.send(err);
            }
            res.json({ message: 'User Deleted' });
    });
});

//Start the server
server.listen(port);
console.log('Start on -> localhost:' + port + apiName);