'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	http = require('http'),
	cors = require('cors'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	app = express(),
	router = express.Router(),
	db;
	
// Configurazione app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(cors());

// Configurazione Routes
router.get('/handshake', function(req, res) {
	res.json({ message: 'handshake ok' });
});
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