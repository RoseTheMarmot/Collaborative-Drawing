/*
 * Database Connection Config
 */

var mongoose = 	require('mongoose');
var fs 		   = 	require('fs');
var keys     =  require(__dirname+'/keys.js')

//connect to mongodb server
mongoose.connect(keys.local_db);
//mongoose.connect('mongodb://heroku_app35932629:59r4l84ta376l6l1c112hs32v@ds061631.mongolab.com:61631/heroku_app35932629?replicaSet=rs-ds061631');

//require all .js files in the modles directory
var models_path = __dirname + "/../models";
fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf(".js")>0){
		require(models_path+"/"+file);
	}
});