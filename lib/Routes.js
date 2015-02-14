'use strict';

module.exports.create = function(models) {
	var moment = require('moment');
	
	var list = function(request, response) {
		var title = request.query.title,
			speaker = request.query.speaker,
			where = request.query.where,
			tag = request.query.tag,
			partecipant = request.query.partecipant,
			conditions = {},
			condition,
			subcondition;
		
		if (title || speaker || where || tag || partecipant) {
			conditions.$and = [];
		}
		
		if (title) {
			condition = {};
			condition['title'] = eval('/' + title + '/i');
			conditions.$and.push(condition);
		}
		if (speaker) {
			condition = {};
			condition['speaker'] = eval('/' + speaker + '/i');
			conditions.$and.push(condition);
		}
		if (where) {
			condition = {};
			condition['where'] = eval('/' + where + '/i');
			conditions.$and.push(condition);
		}
		if (tag) {
			condition = {};
			condition['tags'] = eval('/' + tag + '/i');
			conditions.$and.push(condition);
		}
		if (partecipant) {
			condition = {};
			condition.$or = [];
			
			subcondition = {};
			subcondition['partecipants.name'] = eval('/' + partecipant + '/i');
			condition.$or.push(subcondition);

			subcondition = {};
			subcondition['partecipants.email'] = eval('/' + partecipant + '/i');
			condition.$or.push(subcondition);
			
			conditions.$and.push(condition);
		}
		
		models.Event.find(conditions, function(err, result) {
			handleResponse(response, err, result);
		});
	};
	
	var insert = function(request, response) {
		var data = request.body,
			event;
		
		data.when = moment().toDate();
		event = new models.Event(data);
		
		event.save(function(err, result) {
			handleResponse(response, err, result);
		});
	};
	
	var del = function(request, response) {
		var eventId = request.body.eventId;
		
		models.Event.findOne({ "_id": eventId }, function(err, doc) {
			if (!err) {		
				doc.remove(function(errRemove) {
					handleResponse(response, errRemove, eventId);
				});
			} else {
				handleResponse(response, true, 'not found!');
			}			
		});
	};
	
	var handleResponse = function(response, err, result) {
		var returnCode,
			returnMsg;
		
		if (err) {
			returnCode = 500;
			returnMsg = { error: result };
		} else {
			returnCode = 200;
			returnMsg = result;
		}
		
		response.writeHead(returnCode, { "Content-Type": "application/json; charset=utf-8" });
		response.end(JSON.stringify(returnMsg));
	};
	
	return {
		list: list,
		insert: insert,
		del: del
	};
};