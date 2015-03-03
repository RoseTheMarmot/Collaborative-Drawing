/*
 * Drawing controller
 */

var Drawing = require(__dirname+"/../models/Drawing.js");

module.exports = {
	index: function(request, response){
		response.send(Drawing);
	},
	update: function(request, response){
		
	}
}