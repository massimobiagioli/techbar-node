'use strict';

module.exports.create = function(models) {
	
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
		list: list
	};
};