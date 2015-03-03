$(document).ready(function($){
  var App = function(){
    
    //initializing the canvas
    this.canvas = document.createElement('canvas');
    this.canvas.height = 500;
    this.canvas.width = parseInt($('#draw-box').css('width')); //600

    $('#draw-box').append(this.canvas);

    //initializing the drawing brush
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = "solid";
    this.ctx.strokeStyle = "#ff0000";
    this.ctx.lineWidth = 5;
    this.ctx.lineCap = "round";

    //draws lines on the canvas
    this.draw = function(x,y,type){
      if(type == "dragstart"){
        this.ctx.beginPath();
        return this.ctx.moveTo(x,y);
      }else if(type == "drag"){
        this.ctx.lineTo(x,y);
        return this.ctx.stroke();
      }else{
        return this.ctx.closePath();
      }
    }
  }

  var ColorPicker = function(container_selector){
    var colors = ['FF00BB', 'C2255E', '752070', 'CC00FF', 'C567F5', '7A19D4', '3800D4', '2015ED', '3B76FF', '3B9DFF', '95C5F5', '36608A', '2FBAD6', '0E444F', '0E4F31', '37CC87', '43CC37', '14F000', 'BDEB91', '9FA896', 'FFF89C', 'F7E80A', '968E11', '966C11', '4F3A0B', '453C2A', 'A15805', 'FC8803', 'F7BA7C', 'F26118', 'B04109', '781708', 'FCACAC', 'FF4000'];
    var boxes = colors.length;
    function box(color){
      return $("<div style='background-color:#"+color+";'></div>");
    }
    for(var i = 0; i < boxes; i++){
      if(i+1 === boxes){
        $(container_selector).append(box(colors[i]).addClass('selected'));
      }else{
        $(container_selector).append(box(colors[i]));
      }
    }
  }

  var BrushPicker = function(container_selector){
    var sizes = [1, 3, 5, 7];
    function box(size){
      return $("<div style='width:"+size+"px;height:"+size+"px;border-radius:"+size+"px;'></div>");
    }
    for(var i = 0; i < sizes.length; i++){
      $(container_selector).append(box(sizes[i]));
    }
  }

  var socket = io.connect();
  var drawingApp = new App();
  var picker = new ColorPicker('#color-picker');
  var brushes = new BrushPicker('#brush-picker');
  var mousedown = false; //true false if the mouse is down while being moved
  
  $('#color-picker').on('click', 'div', function(){
    var newColor = $(this).css("background-color");
    drawingApp.ctx.strokeStyle = newColor;
    socket.emit("color_change", {color: newColor});
    $(this).addClass('selected').siblings().removeClass('selected');
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
    mousedown = false;
    drawingApp.draw(e.offsetX, e.offsetY, "dragend");
    socket.emit("drawing", {x: e.offsetX, y: e.offsetY, type: "dragend"});
  });

  // multi-user drawing
  socket.on("draw", function(data){
    drawingApp.draw(data.x, data.y, data.type);
  });

  // change colors
  socket.on("color_changed", function(data){
    drawingApp.ctx.strokeStyle = data.color;
  });

  // clear canvas
  $("#clear_btn").on("click", function(){
    socket.emit("clear_canvas");
  })
  socket.on("cleared", function(){
    drawingApp.ctx.clearRect(0, 0, canvas.width, canvas.height);
  })
});