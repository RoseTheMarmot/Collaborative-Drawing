$(document).ready(function($){

  /*
   * Initialization
   */
  var socket = io.connect();
  var drawingApp = new App('#draw-box');
  var colors = new ColorPicker('#color-picker', drawingApp);
  var brushes = new BrushPicker('#brush-picker', drawingApp);
  var mousedown = false; //true false if the mouse is down while being moved


  /*
   * Document listeners, socket emits
   */
  $('#color-picker').on('click', 'div', function(){
    $('#erase-button').removeClass('selected');
    socket.emit("color_change", {color: colors.changeColor($(this))});
  });
  $('#brush-picker').on('click', '> div', function(){
    socket.emit("brush_change", {brush: brushes.changeBrush($(this))});
  });
  $('#erase-button').on('click', function(){
    $('#color-picker > div').removeClass('selected');
    $(this).addClass('selected');
    drawingApp.ctx.strokeStyle = "#fff";
    socket.emit("brush_change", {brush: '#fff'})
  });
  $("#draw-box canvas").mousedown(function(e){
    mousedown = true;
    drawingApp.draw(e.offsetX, e.offsetY, "dragstart");
    socket.emit("drawing", {x: e.offsetX, y: e.offsetY, type: "dragstart"});
  }).mousemove(function(e){
    if(mousedown){ 
      drawingApp.draw(e.offsetX, e.offsetY, "drag");
      socket.emit("drawing", {x: e.offsetX, y: e.offsetY, type: "drag"});
    }
  });
  $(document).mouseup(function(e){ 
    //listens to whole document so that path will be ended even if user
    //is off the drawing screen
    mousedown = false;
    drawingApp.draw(e.offsetX, e.offsetY, "dragend");
    socket.emit("drawing", {x: e.offsetX, y: e.offsetY, type: "dragend"});
  });
  // clear canvas
  $("#clear_btn").click(function(){
    socket.emit("clear_canvas");
  });


  /*
   * Socket listeners
   */
  // multi-user drawing
  socket.on("draw", function(data){
    drawingApp.draw(data.x, data.y, data.type);
  });
  // change colors
  socket.on("color_changed", function(data){
    drawingApp.ctx.strokeStyle = data.color;
  });
  //change brush size
  socket.on("brush_changed", function(data){
    drawingApp.ctx.lineWidth = data.brush;
  });
  //clear drawing area
  socket.on("cleared", function(){
    drawingApp.ctx.clearRect(0, 0, drawingApp.canvas.width, drawingApp.canvas.height);
  });
});