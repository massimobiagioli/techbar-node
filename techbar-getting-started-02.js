'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	http = require('http'),
	morgan = require('morgan'),
	app = express(),
	router = express.Router();

// Esempio di middleware
var printUserAgent = function(req, res, next) {
	var userAgent = req.headers['user-agent'];
	
	if (userAgent.indexOf('Mozilla') > -1) {
		console.log('Dovresti usare IE!!!');
	}
	next();
};

// Configurazione app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(printUserAgent);

// Configurazione Routes
router.get('/hello/:name', function(req, res) {
	res.json({ message: 'hello ' + req.params.name });
});
app.use('/api', router);

// Creazione server
http.createServer(app).listen(3000, 'localhost', function() {
	console.log("Express server listening on port " + 3000);		
});