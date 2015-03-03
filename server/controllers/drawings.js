/*
 * Drawing controller
 */

var mongoose 	= require('mongoose');
var Drawing 	= mongoose.model('drawing');
var Drawing2	= require(__dirname+"/../models/Drawing.js");

module.exports = {
	index: function(request, response){
		Drawing.find({}).sort({_id: -1}).limit(1).exec(function(err, result){
			if(err){
				console.log(err);
			}else{
				if(result.length > 0){
					response.send(result[0]);
				}else{
					response.send(Drawing2);
				}
			}
		});
	},
	update: function(request, response){
		Drawing.find({}).sort({_id: -1}).limit(1).exec(function(err, result){
			if(err){
				console.log(err);
			}else{
				if(result.length > 0){
					//update
					Drawing.update({__id: result.__id}, {
						initColor: request.body.initColor, 
						initSize: request.body.initSize, 
						initCanvas: ""}, 
						function(err){
							if(err){
								console.log(err);
							}
					});
				}else{
					//add to db
					var newDrawing = new Drawing({
						initColor: request.body.initColor, 
						initSize: request.body.initSize, 
						initCanvas: ""});
					newDrawing.save(function(err, newDrawing){
						if(err){
							console.log(err);
						}
					});
				}
			}
		});
	}
}