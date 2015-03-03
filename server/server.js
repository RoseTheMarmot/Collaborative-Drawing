/*
 * Server
 */

var express = 	require('express');
var app 	= 	express();

//port
var port = 8000;
var server = app.listen(port, function(){
	console.log("\n****************************\n*  listening on port "+port+"  *\n****************************\n");
});

//client
app.use(express.static(__dirname+"/../client"));

//database
require(__dirname+"/config/mongoose.js");

//routes
require(__dirname+"/config/routes.js")(app);

// sockets
var io = require("socket.io").listen(server);

var users = [];
var chat_msgs = [];

io.sockets.on("connection", function(socket){

	// chat feature
	socket.on("new_user", function(data){
		users[socket.id] = data.name;
		io.emit("user_accepted", {name: data.name, chats: chat_msgs});
	});
	socket.on("msg_send", function(data){
		newMsg = users[socket.id]+": "+data.message;
		io.emit("msg_received", {message: newMsg});
		chat_msgs.push(newMsg);
	});
	// issue: on disconnect, name not showing!
	socket.on("disconnect", function(){
		io.emit("user_disconnected", {name: users[socket.id]});
		if(users[socket.id]){
			delete users[socket.id];
		}
	});

	// multi-user drawing
	socket.on("drawing", function(data){
		socket.broadcast.emit("draw", {x: data.x, y: data.y, type: data.type})
	});

	// color change
	socket.on("color_change", function(data){
		socket.broadcast.emit("color_changed", {color: data.color});
	});

	// clear canvas
	socket.on("clear_canvas", function(){
		socket.broadcast.emit("cleared");
	})
});