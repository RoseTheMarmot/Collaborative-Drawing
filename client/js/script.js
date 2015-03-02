$(document).ready(function($){
  var App = function(){
    this.canvas = document.createElement('canvas');
    this.canvas.height = 400;
    this.canvas.width = 600;

    $('#draw-box').append(this.canvas).children('canvas').css('width', '100%');
    //.attr('draggable', 'true')

    this.ctx = this.canvas.getContext('2d');

    this.ctx.fillStyle = "solid";
    this.ctx.strokeStyle = "#baba55";
    this.ctx.lineWidth = 5;
    this.ctx.lineCap = "round";

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

  var mousedown = false;
  
  $("#draw-box canvas").mousedown(function(e){
    mousedown = true;
    drawingApp.draw(e.offsetX, e.offsetY, "dragstart");
  }).mousemove(function(e){
    if(mousedown){
      console.log(e);
      drawingApp.draw(e.offsetX, e.offsetY, "drag");
    }
  });
  $(document).mouseup(function(e){
    mousedown = false;
    drawingApp.draw(e.offsetX, e.offsetY, "dragend");
  });

});





