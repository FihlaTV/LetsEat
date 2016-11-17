var apiName = '/letseat-api';
var apiPort = 8080;
var databasePort = 55097;
var user = 'letseat';
var password = 'letseat34';
var databaseName = 'letseat';
var databaseLink = 'mongodb://' + user + ':' + password + '@ds155097.mlab.com:' + databasePort + '/' + databaseName;

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
router.route('/user/:id_user').get(function(req, res) {

    query = User.find(null);
    query.where('id_user',req.params.id_user);

    query.exec(function (err, user) { 
        if (err) {
            console.log(err);
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
router.route('/user/:id_user').put(function(req, res) {

    User.findById(req.params.id_user, function(err, user) {

        if (err) {
            console.log(err);
            return res.send(err);
        }

        user.id_user = req.body.id_user;
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
router.route('/user/:id_user').delete(function(req, res) {

    User.remove({id_user: req.params.id_user}, function(err, bear) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        res.json({ message: 'User Deleted' });
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

// Get event by country
router.route('/event/country/:country').get(function(req, res) {
    query = Event.find(null);
    query.where('adresse.country',req.params.country);

    query.exec(function (err, event) { 
        if (err) {
            console.log(err);
            return res.send(err);
        }
        res.json(event);
    });
});

//Get event by city and date
router.route('/events/citydate/:city&:date').get(function(req, res) {
    if(req.params.date != 'all')
    {
        query = Event.find({"dates.date"  :  {$regex  : req.params.date}});
    }
    else
    {
        query = Event.find(null);
    }
    query.where('adresse.city',req.params.city);
    query.exec(function (err, event) { 
        if (err) {
            console.log(err);
            return res.send(err);
        }
        res.json(event);
    });  
});


//Get number event by city and date
router.route('/events/citydate/count/:city&:date').get(function(req, res) {
    if(req.params.date != 'all')
    {
        query = Event.find({"dates.date"  :  {$regex  : req.params.date}}).count();
    }
    else
    {
        query = Event.find(null).count();
    }
    query.where('adresse.city',req.params.city);
    query.exec(function (err, event) { 
        if (err) {
            return res.send(err);
        }
        res.json(event);
    });  
});

//Start the server
server.listen(apiPort);
console.log('Start on -> localhost:' + apiPort + apiName);