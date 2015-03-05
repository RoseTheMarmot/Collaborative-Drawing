$(document).ready(function($){
  /*
   * Initialization
   */
  var socket = io.connect();
  var canvas = {};
  var colors = {};
  var brushes = {};
  var eraser = {};
  var mousedown = false; //true false if the mouse is down while being moved
  var curColor;
  var curBrush;

  $.get('/drawings', function(data){
      curColor = data.initColor;
      curBrush = data.initSize;
      canvas = new Canvas('#draw-box', data);
      colors = new ColorPicker('#color-picker', data.initColor, canvas);
      brushes = new BrushPicker('#brush-picker', data.initSize, canvas);
      eraser = new Erase($('#erase-button'), '#ffffff', canvas);
    },
    'json');


  /*
   * Document listeners, socket emits
   */
  //selecting a new color from the color picker
  $('#color-picker').on('click', '> div', function(){
    $('#erase-button').removeClass('selected');
    curColor = colors.changeColor($(this));
    socket.emit("color_change", {color: curColor});
    canvas.save();
  });
  //selecting a new brush size
  $('#brush-picker').on('click', '> div', function(){
    curBrush = brushes.changeBrush($(this));
    socket.emit("brush_change", {brush: curBrush});
    canvas.save();
  });
  //selecting the erasor
  $('#erase-button').on('click', function(){
    $('#color-picker > div').removeClass('selected');
    curColor = eraser.use();
    socket.emit("brush_change", {brush: curColor});
  });
  //drawing a line and starting a line
  $("#draw-box").on('mousedown', 'canvas', function(e){
    mousedown = true;
    reset();
    canvas.draw(e.offsetX, e.offsetY, "dragstart");
    socket.emit("drawing", {x: e.offsetX, y: e.offsetY, type: "dragstart"});
  }).on('mousemove', 'canvas', function(e){
    if(mousedown){ 
      canvas.draw(e.offsetX, e.offsetY, "drag");
      socket.emit("drawing", {x: e.offsetX, y: e.offsetY, type: "drag"});
    }
  });
  //ending a line
  $(document).mouseup(function(e){ 
    //listens to whole document so that path will be ended even if user
    //is off the drawing screen
    mousedown = false;
    canvas.draw(e.offsetX, e.offsetY, "dragend");
    socket.emit("drawing", {x: e.offsetX, y: e.offsetY, type: "dragend"});
    canvas.save();
  });
  // clear canvas
  $("#clear_btn").click(function(){
    socket.emit("clear_canvas");
  });
  // undo
  $("#undo_btn").click(function(){
    socket.emit("undoing_move");
  });
  // redo
  $("#redo_btn").click(function(){
    socket.emit("redoing_move");
  });

  function reset(){ //resets the canvas
    socket.emit("color_change", {color: curColor});
    socket.emit("brush_change", {brush: curBrush});
    canvas.ctx.strokeStyle = curColor;
    canvas.ctx.lineWidth = curBrush;
    canvas.history = [];
    canvas.step = -1;
  }

  /*
   * Socket listeners
   */
  // multi-user drawing
  socket.on("draw", function(data){
    canvas.draw(data.x, data.y, data.type);
  });
  // change colors
  socket.on("color_changed", function(data){
    canvas.ctx.strokeStyle = data.color;
  });
  //change brush size
  socket.on("brush_changed", function(data){
    canvas.ctx.lineWidth = data.brush;
  });
  //clear drawing area
  socket.on("cleared", function(){
    canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.save();
  });
  // undo move
  socket.on("undo_move", function(){
    canvas.undoStep();
  });
  // redo move
  socket.on("redo_move", function(){
    canvas.redoStep();
  });
});