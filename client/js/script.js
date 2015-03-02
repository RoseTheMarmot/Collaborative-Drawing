$(document).ready(function($){
  var App = function(){
    
    //initializing the canvas
    this.canvas = document.createElement('canvas');
    this.canvas.height = 400;
    this.canvas.width = 600;

    //adding canvas to page
    $('#draw-box').append(this.canvas).children('canvas').css('width', '100%');

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

  var drawingApp = new App();

  var mousedown = false; //true false if the mouse is down while being moved
  
  $("#draw-box canvas").mousedown(function(e){
    mousedown = true;
    drawingApp.draw(e.offsetX, e.offsetY, "dragstart");
  }).mousemove(function(e){
    if(mousedown){ 
      drawingApp.draw(e.offsetX, e.offsetY, "drag");
    }
  });
  $(document).mouseup(function(e){
    mousedown = false;
    drawingApp.draw(e.offsetX, e.offsetY, "dragend");
  });

});





