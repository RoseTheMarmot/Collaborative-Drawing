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
    }else{ //dragend
      return this.ctx.closePath();
    }
  }
}