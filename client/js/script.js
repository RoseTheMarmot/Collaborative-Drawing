$(document).ready(function($){
  var App = function(){
    
    //initializing the canvas
    this.canvas = document.createElement('canvas');
    this.canvas.height = 500;
    this.canvas.width = 600;

    $('#draw-box').append(this.canvas);

    //initializing the drawing brush
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = "solid";
    this.ctx.strokeStyle = "#baba55";
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
    var colors = ['FF0000', 'FF00BB', 'CC00FF', '0080FF', '00FFFB', '00FF59', 'FFFF00', 'FF9100', 'FF4000'];
    var boxes = colors.length;
    function box(color){
      return "<div style='width:20px;height:20px;display:inline-block;background-color:#"+color+";'></div>";
    }
    /*
    function box(r, g, b){
      return "<div style='width:20px;height:20px;display:inline-block;background-color:rgb("+r+", "+g+", "+b+");'></div>";
    }
    function r(x){
      return Math.round(Math.sin(x*(2*Math.PI/boxes)+(Math.PI/2))*(255/2)+(255/2));
    }
    function g(x){
      return Math.round(Math.sin(x*(2*Math.PI/boxes)-(Math.PI/2))*(255/2)+(255/2));
    }*/
    for(var i = 0; i < boxes; i++){
      $(container_selector).append(box(colors[i]));
    }
  }

  var socket = io.connect();
  var drawingApp = new App();
  var picker = new ColorPicker('#color-picker');
  var mousedown = false; //true false if the mouse is down while being moved
  
  $('#color-picker').on('click', 'div', function(){
    drawingApp.ctx.strokeStyle = $(this).css('background-color');
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

  socket.on("draw", function(data){
    drawingApp.draw(data.x, data.y, data.type);
  });

});





