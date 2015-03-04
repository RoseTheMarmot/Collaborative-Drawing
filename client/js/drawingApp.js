var App = function(container_selector, init){
  //initializing the canvas
  this.canvas = document.createElement('canvas');
  this.canvas.height = 500;
  this.canvas.width = parseInt($('#draw-box').css('width')); //600
  
  //initializing the drawing brush
  this.ctx = this.canvas.getContext('2d');
  this.ctx.fillStyle = "solid";
  this.ctx.strokeStyle = init.initColor;
  this.ctx.lineWidth = init.initSize;
  this.ctx.lineCap = "round";
  setDrawing(this);
  
  //adding the drawing area to the page
  $(container_selector).append(this.canvas);

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

  //saves drawing settings
  this.save = function(){
    $.post(
      '/drawings', 
      {initColor: this.ctx.strokeStyle, initSize: this.ctx.lineWidth, initCanvas: this.canvas.toDataURL()},
      function(data){},
      'json');
  }

  //loads previous drawings into the canvas
  function setDrawing(app){
    var img = new Image;
    img.onload = function(){
      app.ctx.drawImage(img,0,0);
    };
    img.src = init.initCanvas;
  }
}