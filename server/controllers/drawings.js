/*
 * Drawing controller
 */

var mongoose 	= require('mongoose');
var Drawing 	= mongoose.model('drawing');

module.exports = {
	index: function(request, response){ //gets the drawing data
		Drawing.find({}).sort({_id: -1}).limit(1).exec(function(err, result){
			if(err){
				console.log(err);
			}else{
				if(result.length > 0){
					//returns the first drawing entry
					//only one entry is kept in the db, and updated.
					//more entries could be for multiple chatrooms
					response.send(result[0]);
				}else{
					//if no privious data exists, the model returns some default values
					response.send({initColor: "#FF4000", initSize:5}); 
				}
			}
		});
	},
	update: function(request, response){ //saves the drawing data
		Drawing.find({}).sort({_id: -1}).limit(1).exec(function(err, result){
			if(err){
				console.log(err);
			}else{ //check for already existing drawing entry
				if(result.length > 0){
					//update
					Drawing.update({__id: result.__id}, {
						initColor: request.body.initColor, 
						initSize: request.body.initSize, 
						initCanvas: request.body.initCanvas}, 
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
						initCanvas: request.body.initCanvas});
					newDrawing.save(function(err, newDrawing){
						if(err){
							console.log(err);
						}
					});
				}
			}
		});
		response.send({}); //important! keeps the jQuery post from timing out
	}
}