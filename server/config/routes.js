/*
 * Routes
 */ 

module.exports = function(app){
	
	//body parser for accessing post data in request.body
	var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded());

	//controllers
	var Drawings = require(__dirname+'/../controllers/drawings.js');

	//routes
	app.get('/drawings', function(request, response){
		Drawings.index(request, response);
	});

	app.post('/drawings', function(request, response){
		Drawings.update(request, response);
	});
}