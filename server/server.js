/*
 * Server
 */

var express = 	require('express');
var app 	= 	express();

//port
var port = 8000;
app.listen(port, function(){
	console.log("\n****************************\n*  listening on port "+port+"  *\n****************************\n");
});

//client
app.use(express.static(__dirname+"/../client"));

//database
require(__dirname+"/config/mongoose.js");

//routes
require(__dirname+"/config/routes.js")(app);

// sockets
io = require("socket.io").listen(app);
io.sockets.on("connection", function(data){
	// on draw event: 
	// socket.on("drawing", function(socket){
	// socket.broadcast.emit("drawing", {drawing coordinates})
	// })

})