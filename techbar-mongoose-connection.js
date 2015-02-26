'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	http = require('http'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	app = express(),
	db;
	
// Configurazione app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

// Connessione a MongoDb
mongoose.connect('mongodb://techbar:techbar@ds031601.mongolab.com:31601/techbar');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
	console.log("Connected to MongoDb");
	http.createServer(app).listen(3000, 'localhost', function() {
		console.log("Express server listening on port " + 3000);		
	});
});