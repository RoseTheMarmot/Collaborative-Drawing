$(document).ready(function($){

  /*
   * Initialization
   */
  var socket = io.connect();
  var drawingApp = {};
  var colors = {};
  var brushes = {};
  var mousedown = false; //true false if the mouse is down while being moved

  $.get('/drawings', function(data){
    drawingApp = new App('#draw-box', data);
    colors = new ColorPicker('#color-picker', data.initColor, drawingApp);
    brushes = new BrushPicker('#brush-picker', data.initSize, drawingApp);
  },
  'json');

  /*
   * Document listeners, socket emits
   */
  //selecting a new color from the color picker
  $('#color-picker').on('click', 'div', function(){
    $('#erase-button').removeClass('selected');
    socket.emit("color_change", {color: colors.changeColor($(this))});
    drawingApp.save();
  });
  //selecting a new brush size
  $('#brush-picker').on('click', '> div', function(){
    socket.emit("brush_change", {brush: brushes.changeBrush($(this))});
    drawingApp.save();
  });
  //selecting the erasor
  $('#erase-button').on('click', function(){
    $('#color-picker > div').removeClass('selected');
    $(this).addClass('selected');
    drawingApp.ctx.strokeStyle = "#fff";
    socket.emit("brush_change", {brush: '#fff'});
  });

  //drawing a line and starting a line
  $("#draw-box").on('mousedown', 'canvas', function(e){
    mousedown = true;
    
    socket.emit("color_change", {color: colors.changeColor($('#color-picker .selected'))});
    socket.emit("brush_change", {brush: brushes.changeBrush($('#brush-picker .selected'))});
    drawingApp.draw(e.offsetX, e.offsetY, "dragstart");
    socket.emit("drawing", {x: e.offsetX, y: e.offsetY, type: "dragstart"});
  });
  $("#draw-box").on('mousemove', 'canvas', function(e){
    if(mousedown){ 
      drawingApp.draw(e.offsetX, e.offsetY, "drag");
      socket.emit("drawing", {x: e.offsetX, y: e.offsetY, type: "drag"});
    }
  });
  //ending a line
  $(document).mouseup(function(e){ 
    //listens to whole document so that path will be ended even if user
    //is off the drawing screen
    mousedown = false;
    drawingApp.draw(e.offsetX, e.offsetY, "dragend");
    socket.emit("drawing", {x: e.offsetX, y: e.offsetY, type: "dragend"});
    drawingApp.save();
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
    drawingApp.save();
  });
});