$(document).ready(function(){
  
  /*
   * Initialization
   */
  var socket = io.connect();
  var userName = "";
  var randNum = Math.floor(Math.random()*899)+100;
  var addMsg = function(message){
    $("#messages").append(message+"</br>").scrollTop($("#messages")[0].scrollHeight);
  };

  /*
   * Document listeners, socket emits
   */
  $("#name-modal").modal();
  $("#name-btn").click(function(){
    userName = $("#input-name").val();
    if(userName == "" || !userName){
      userName = "Anonymous"+randNum;
    };
    socket.emit("new_user", {name: userName});
  });
  $("#no-name").click(function(){
    userName = "Anonymous"+randNum;
    socket.emit("new_user", {name: userName});
  });
  $(document).keydown(function(e){
    if(e.keyCode == 13 && userName !== ""){
      socket.emit("msg_send", {message: $("#message").val()});
      $("#message").val("").focus();
    };
  });
  $("#send_btn").click(function(e){
    e.preventDefault();
    socket.emit("msg_send", {message: $("#message").val()});
    $("#message").val("").focus();
  });

  /*
   * Socket listeners
   */
  // showing chat log to new user
  // socket.on("user_accepted", function(data){
  //   for(var i=0; i<data.chats.length; i++){
  //     $("#messages").append(data.chats[i]+"</br>");
  //   };
  //   $("#messages").scrollTop($("#messages")[0].scrollHeight); 
  // });
  socket.on("user_entered", function(data){
    addMsg(data.chat);
  });
  socket.on("msg_received", function(data){
    addMsg(data.chat);
  });
  socket.on("user_disconnected", function(data){
    addMsg(data.chat);
  });
});