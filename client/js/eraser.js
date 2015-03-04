var Erase = function(element, background, drawingApp){
	this.element = element;
	this.element.attr('color', background);

	this.use = function(){
		var newColor = this.element.attr('color');
		console.log("changing color to:", newColor);
		drawingApp.ctx.strokeStyle = newColor;
		return newColor;
	}
}