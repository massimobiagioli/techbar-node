'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	http = require('http'),
	cors = require('cors'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	app = express(),
	router = express.Router(),
	db,
	Models = require('./lib/Models'),
	models = Models.create(mongoose),
	Routes = require('./lib/Routes'),
	routes = Routes.create(models);
	
// Configurazione app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cors());
app.use(express.static(__dirname + '/public'));

// Configurazione Routes
router.get('/list', routes.list);
router.post('/insert', routes.insert);
router.delete('/delete', routes.del);
router.get('/mapReduceDemo', routes.mapReduceDemo);
app.use('/api', router);

// Connessione a MongoDb
mongoose.connect('mongodb://techbar:techbar@ds031601.mongolab.com:31601/techbar');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
	http.createServer(app).listen(3000, 'localhost', function() {
		console.log("Express server listening on port " + 3000);		
	});
});