'use strict';

var mongoose = require('mongoose'),
	db,
	moment = require('moment'),
	Models = require('./lib/Models'),
	models = Models.create(mongoose);

// Scrive dati di esempio
var initDb = function() {
	var event;
	
	// #1
	event = new models.Event({
		title: 'Java Night',
		speaker: 'Luigi Bianchi',
		where: 'Cowo42 Coworking Osimo',
		when: moment('2015-01-21').toDate(),
		tags: ['dev', 'java'],
		partecipants: [{
			name: 'Mario Rossi',
			email: 'mario.rossi@gmail.com',
		}, {
			name: 'Anna Verdi',
			email: 'anna.verdi@gmail.com'
		}, {
			name: 'Bruno Neri',
			email: 'neribruno@yahoo.it'
		}]
	});
	event.save();
	
	// #2
	event = new models.Event({
		title: 'Php All Night Long',
		speaker: 'Marco Gialli',
		where: 'Apra Informatica Jesi',
		when: moment('2014-11-22').toDate(),
		tags: ['dev', 'php'],
		partecipants: [{
			name: 'Mario Rossi',
			email: 'mario.rossi@gmail.com',
		}, {
			name: 'Federico Marroni',
			email: 'fedemarroni@libero.it'
		}, {
			name: 'Bruno Neri',
			email: 'neribruno@yahoo.it'
		}]
	});
	event.save();
	
	// #3
	event = new models.Event({
		title: 'Lean After Pizza',
		speaker: 'Roberto Viola',
		where: 'Apra Informatica Jesi',
		when: moment('2014-11-22').toDate(),
		tags: ['lean'],
		partecipants: [{
			name: 'Mario Rossi',
			email: 'mario.rossi@gmail.com',
		}, {
			name: 'Federico Marroni',
			email: 'fedemarroni@libero.it'
		}, {
			name: 'Bruno Neri',
			email: 'neribruno@yahoo.it'
		}, {
			name: 'Anna Verdi',
			email: 'anna.verdi@gmail.com'
		}]
	});
	event.save();
};

// Connessione a MongoDb
mongoose.connect('mongodb://techbar:techbar@ds031601.mongolab.com:31601/techbar');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
	console.log("Connected to MongoDb");
	initDb();
	console.log("InitDb: Done!");
});