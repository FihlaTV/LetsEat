var apiName = '/letseat-api';
var port = 8080;
var databaseName = 'LETSEAT';
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
        if (err)
            console.log(err);
            return res.send(err);

        res.json(users);
    });
});

//Add a User
router.route('/users').post(function(req, res) {
    
    var user = new User(req.body);

    user.save(function(err) {
        if (err) {
            console.log(err);
            return res.send(err);
        }

        res.json({ message: 'User Added' });
    });
});





//Get all events
router.get('/events', function(req, res) {
    Event.find(function(err, events) {
        if (err)
            res.send(err);

        res.send(events);
    });
});

//Get one event
router.route('/event/:id').get(function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        res.json(event);
    });
});

// Create Events
router.route('/event')
    .post(function(req, res) {
    
    var event = new Event(req.body);
    event.date = new Date(req.body.date);

    event.save(function(err) {
    if (err)
        res.send(err);

        res.json({ message: 'Event created!' });
        });
    });

//Delete one event
router.route('/event/:id').delete(function(req, res) {
  Event.remove({
    _id: req.params.id
  }, function(err, event) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Event deleted' });
  });
});

// Update one event
router.route('/event/:id').put(function(req,res){
    Event.findOne({ _id: req.params.id }, function(err, event) {
        if (err) {
            return res.send(err);
        }
        
        event.createur = req.body.createur;
        event.nom = req.body.nom;
        event.description = req.body.description;
        event.nb_participant = req.body.nb_participant;
        event.dates = req.body.dates;
        event.prix = req.body.prix;
        event.adresse = req.body.adresse;
        event.picture = req.body.picture;
     
        // save the event
        event.save(function(err) {
            if (err) {
                return res.send(err);
              }

            res.json({ message: 'Event updated!' });
        });
    });
});
//Start the server
server.listen(port);
console.log('Start on -> localhost:' + port + apiName);