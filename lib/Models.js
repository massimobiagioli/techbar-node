'use strict';

module.exports.create = function(mongoose) {
	
	/**
	 * Schemi
	 */
	var EventSchema = new mongoose.Schema({
		title: {type: String, required: true},
		speaker: {type: String, required: true},
		where: {type: String, required: true},
		when: {type: Date, required: true},
		tags: [String],
		partecipants: [{
			name: {type: String, required: true},
			email: {type: String, required: true}
		}]
	}, {
		collection: 'events'
	});
			
	/**
	 * Modelli
	 */
	var Event = mongoose.model('Event', EventSchema);
	
	return {
		Event: Event
	};
};