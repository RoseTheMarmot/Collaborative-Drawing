var Erase = function(element, background, drawingApp){
	this.element = element;
	this.element.attr('color', background);

	this.use = function(){
		var newColor = this.element.attr('color');
		this.element.addClass('selected');
		drawingApp.ctx.strokeStyle = newColor;
		return newColor;
	}
}