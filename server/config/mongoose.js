/*
 * Database Connection Config
 */

var mongoose = 	require('mongoose');
var fs 		   = 	require('fs');
var keys     =  require(__dirname+'/sdjfhklj.js');

//connect to mongodb server
mongoose.connect(keys.remote_db);

//require all .js files in the modles directory
var models_path = __dirname + "/../models";
fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf(".js")>0){
		require(models_path+"/"+file);
	}
});