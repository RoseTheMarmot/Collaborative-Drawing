$(document).ready(function(){
  var socket = io.connect();
  var userName = prompt("What's your name?");
  var randNum = Math.floor(Math.random()*899)+100;
  var addMsg = function(message){
    $("#messages").append(message+"</br>");
    $("#messages").scrollTop($("#messages")[0].scrollHeight);
  }
  if(userName == "" || !userName){
    userName = "Anonymous"+randNum;
  };
  socket.emit("new_user", {name: userName});
  socket.on("user_accepted", function(data){
    for(var i=0; i<data.chats.length; i++){
      $("#messages").append(data.chats[i]+"</br>");
    };
    $("#messages").scrollTop($("#messages")[0].scrollHeight);
    
  });
  socket.on("user_entered", function(data){
    addMsg(data.chat);
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
    addMsg(data.chat);
  });
  socket.on("user_disconnected", function(data){
    addMsg(data.chat);
  }); 
});