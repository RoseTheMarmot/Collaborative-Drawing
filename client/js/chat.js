$(document).ready(function(){
  var socket = io.connect();
  var userName = prompt("What's your name?");
  socket.emit("new_user", {name: userName});
  socket.on("user_accepted", function(data){
    for(var i=0; i<data.chats.length; i++){
      $("#messages").prepend(data.chats[i]+"</br>");
    };
    $("#messages").prepend(data.name+" entered the chatroom!</br>")
  });
  $("#send_btn").click(function(e){
    e.preventDefault();
    socket.emit("msg_send", {message: $("#message").val()});
    $("#message").val("").focus();
  });
  $(document).keydown(function(e){
    if(e.keyCode == 13){
      socket.emit("msg_send", {message: $("#message").val()});
      $("#message").val("").focus();
    };
  });
  socket.on("msg_received", function(data){
    $("#messages").prepend(data.message+"</br>");
  });
  socket.on("user_disconnected", function(data){
    $("#messages").prepend(data.name+" left the chatroom.</br>");
  }); 
});