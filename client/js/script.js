$(document).ready(function($){
  var App = function(){
    this.canvas = document.createElement('canvas');
    this.canvas.height = 400;
    this.canvas.width = 600;

    $('#draw-box').append(this.canvas).children('canvas').attr('draggable', 'true').css('width', '100%');

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
  
  $("#test").bind('drag',function( event ){
    console.log('dragging', $(this).css('top'), event.originalEvent.offsetY);
    
    $( this ).css({
      top: event.originalEvent.offsetY,
      left: event.originalEvent.offsetX
      });

  });

  $("#draw-box canvas").bind('drag dragstart dragend', function(e){
    var offset, type, x, y;
    type = e.type;
    offset = $(this).offset();
    if(e.originalEvent.clientX == 0 || e.originalEvent.clientY == 0){ //fixes lines-going-to-corner bug
      type = 'dragend';
    }
    e.offsetX = e.originalEvent.clientX - offset.left;
    e.offsetY = e.originalEvent.clientY - offset.top;
    x = e.offsetX;
    y = e.offsetY;
    drawingApp.draw(x, y, type);
  });

});





