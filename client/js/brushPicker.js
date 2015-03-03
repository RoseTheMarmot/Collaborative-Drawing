var BrushPicker = function(container_selector, drawingApp){
  var sizes = [2, 5, 8, 11];
  for(var i = 0; i < sizes.length; i++){
    $(container_selector).append(box(sizes[i]));
  }
  function box(size){
    return $("<div size="+size+"><div style='width:"+size+"px;height:"+size+"px;border-radius:"+size+"px;'></div></div>");
  }
  this.changeBrush = function(current){
  	var newBrush = parseInt(current.attr('size'));
    drawingApp.ctx.lineWidth = newBrush;
    current.addClass('selected').siblings().removeClass('selected');
    return newBrush;
  }
}