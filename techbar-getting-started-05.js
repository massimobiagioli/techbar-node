'use strict';

var q = require('q');

var calculator = {};

calculator.sum = function(a, b) {
	var deferred = q.defer();
	
	deferred.resolve(a + b);
	
	return deferred.promise;
};

var test = function() {
	var oldResult = 0;
	calculator.sum(2, 3)
		.then(function(result) {			
			oldResult = result;
			return calculator.sum(result, 4);
		})
		.then(function(result1) {			
			oldResult = result1;
			return calculator.sum(result1, 5);
		})
		.then(function(result2) {			
			oldResult = result2;
			return calculator.sum(result2, 6);
		})
		.then(function(result3) {			
			oldResult = result3;
			return calculator.sum(result3, 7);
		})
		.then(function(result4) {
			console.log("Result: " + result4);
		})
		.done();
};

test();