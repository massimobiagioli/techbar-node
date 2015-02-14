'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	http = require('http'),
	morgan = require('morgan'),
	app = express(),
	router = express.Router();
	
// Configurazione app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

// Configurazione Routes
router.get('/handshake', function(req, res) {
	res.json({ message: 'handshake ok' });
});
app.use('/api', router);

// Creazione server
http.createServer(app).listen(3000, 'localhost', function() {
	console.log("Express server listening on port " + 3000);		
});