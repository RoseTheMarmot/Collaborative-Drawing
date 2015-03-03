var ColorPicker = function(container_selector, drawingApp){
  var colors = ['000000', 'FFFFFF', 'FF00BB', 'C2255E', '752070', 'CC00FF', 'C567F5', '7A19D4', '3800D4', '2015ED', '3B76FF', '3B9DFF', '95C5F5', '36608A', '2FBAD6', '0E444F', '0E4F31', '37CC87', '43CC37', '14F000', 'BDEB91', '9FA896', 'FFF89C', 'F7E80A', '968E11', '966C11', '4F3A0B', '453C2A', 'A15805', 'FC8803', 'F7BA7C', 'F26118', 'B04109', '781708', 'FCACAC', 'FF4000'];
  var boxes = colors.length;
  function box(color){
    return $("<div style='background-color:#"+color+";'></div>");
  }

  for(var i = 0; i < boxes; i++){
    $(container_selector).append(box(colors[i]));
  }

  this.changeColor = function(current){
  	var newColor = current.css("background-color");
    drawingApp.ctx.strokeStyle = newColor;
    current.addClass('selected').siblings().removeClass('selected');
    return newColor;
  }
}