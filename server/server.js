/*
 * Server
 */

var express = 	require('express');
var app 	= 	express();

//port
var port = 8000;
<<<<<<< HEAD
var server = app.listen(port, function(){
=======
server = app.listen(port, function(){
>>>>>>> Nikki
	console.log("\n****************************\n*  listening on port "+port+"  *\n****************************\n");
});

//client
app.use(express.static(__dirname+"/../client"));

//database
require(__dirname+"/config/mongoose.js");

//routes
require(__dirname+"/config/routes.js")(app);

// sockets
<<<<<<< HEAD
io = require("socket.io").listen(server);
io.sockets.on("connection", function(data){
	// on draw event: 
	// socket.on("drawing", function(socket){
	// socket.broadcast.emit("drawing", {drawing coordinates});
	// })

=======
var io = require("socket.io").listen(server);

var users = [];
var chat_msgs = [];

io.sockets.on("connection", function(socket){
	// socket.on("draw", function(data){
	// 	socket.broadcast.emit **line info
	// })

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
	socket.on("disconnect", function(socket){
		io.emit("user_disconnected", {name: users[socket.id]});
		if(users[socket.id]){
			delete users[socket.id];
		};
	});
>>>>>>> Nikki
});