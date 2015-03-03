/*
 * Database Connection Config
 */

var mongoose = 	require('mongoose');
var fs 		 = 	require('fs');

//connect to mongodb server
mongoose.connect('mongodb://localhost/CollaborativeDrawing');

//require all .js files in the modles directory
var models_path = __dirname + "/../models";
fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf(".js")>0){
		require(models_path+"/"+file);
	}
});