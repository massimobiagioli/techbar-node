'use strict';

var calculator = {};

calculator.sum = function(a, b, callback) {
	callback(a + b);
};

var test = function() {
	calculator.sum(2, 3, function(result) {		
		calculator.sum(result, 4, function(result1) {			
			calculator.sum(result1, 5, function(result2) {				
				calculator.sum(result2, 6, function(result3) {					
					calculator.sum(result3, 7, function(result4) {
						console.log("Result: " + result4);
					});
				});
			});
		});
	});
};

test();