/*****
*
*   PathParserHandler.es
*
*   Author: Antoine Quint
*
*   This code is licensed under the terms of the CC0 1.0 Universal license.
*   > http://creativecommons.org/about/cc0
*
*****/

function PathParserHandler (context) {
	this.Context = context;
	this.CurrentPoint = [0,0];
	this.CurrentCenter = [0,0];
	this.FirstCommand = true;
};

PathParserHandler.prototype.arcAbs = function(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
	alert('arcs not supported');
};

PathParserHandler.prototype.arcRel = function(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
	alert('arcs not supported');
};

PathParserHandler.prototype.curvetoCubicAbs = function(x1, y1, x2, y2, x, y) {
	this.Context.bezierCurveTo(x1, y1, x2, y2, x, y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x2,y2];
};

PathParserHandler.prototype.curvetoCubicRel = function(x1, y1, x2, y2, x, y) {
	x1 += this.CurrentPoint[0];
	y1 += this.CurrentPoint[1];
	x2 += this.CurrentPoint[0];
	y2 += this.CurrentPoint[1];
	x += this.CurrentPoint[0];
	y += this.CurrentPoint[1];
	this.Context.bezierCurveTo(x1, y1, x2, y2, x, y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x2,y2];
};

PathParserHandler.prototype.curvetoCubicSmoothAbs = function(x2, y2, x, y) {
	var x1 = this.CurrentPoint[0] * 2 - this.CurrentCenter[0];
	var y1 = this.CurrentPoint[1] * 2 - this.CurrentCenter[1];
	this.Context.bezierCurveTo(x1, y1, x2, y2, x, y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x2,y2];
};

PathParserHandler.prototype.curvetoCubicSmoothRel = function(x2, y2, x, y) {
	var x1 = this.CurrentPoint[0] * 2 - this.CurrentCenter[0];
	var y1 = this.CurrentPoint[1] * 2 - this.CurrentCenter[1];
	x2 += this.CurrentPoint[0];
	y2 += this.CurrentPoint[1];
	x += this.CurrentPoint[0];
	y += this.CurrentPoint[1];
	this.Context.bezierCurveTo(x1, y1, x2, y2, x, y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x2,y2];
};

PathParserHandler.prototype.linetoHorizontalAbs = function(x) {
	var y = this.CurrentPoint[1];
	this.Context.lineTo(x,y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x,y];
};

PathParserHandler.prototype.linetoHorizontalRel = function(x) {
	x += this.CurrentPoint[0];
	var y = this.CurrentPoint[1];
	this.Context.lineTo(x,y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x,y];
};

PathParserHandler.prototype.linetoAbs = function(x, y) {
	this.Context.lineTo(x,y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x,y];
};

PathParserHandler.prototype.linetoRel = function(x, y) {
	x += this.CurrentPoint[0];
	y += this.CurrentPoint[1];
	this.Context.lineTo(x,y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x,y];
};

PathParserHandler.prototype.movetoAbs = function(x, y) {
	if (this.FirstCommand) {
		this.FirstCommand = false;
		this.Context.beginPath();
	}
	this.Context.moveTo(x,y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x,y];
};

PathParserHandler.prototype.movetoRel = function(x, y) {
	//alert('relative move-to command is not supported');
	x += this.CurrentPoint[0];
	y += this.CurrentPoint[1];
	this.Context.moveTo(x,y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x,y];	
};

PathParserHandler.prototype.curvetoQuadraticAbs = function(x1, y1, x, y) {
	this.Context.quadraticCurveTo(x1, y1, x, y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x1,y1];
};

PathParserHandler.prototype.curvetoQuadraticRel = function(x1, y1, x, y) {
	x1 += this.CurrentPoint[0];
	y1 += this.CurrentPoint[1];
	x += this.CurrentPoint[0];
	y += this.CurrentPoint[1];
	this.Context.quadraticCurveTo(x1, y1, x, y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x1,y1];
};

PathParserHandler.prototype.curvetoQuadraticSmoothAbs = function(x, y) {
	var x1 = this.CurrentPoint[0] * 2 - this.CurrentCenter[0];
	var y1 = this.CurrentPoint[1] * 2 - this.CurrentCenter[1];
	this.Context.quadraticCurveTo(x1, y1, x, y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x1,y1];
};

PathParserHandler.prototype.curvetoQuadraticSmoothRel = function(x, y) {
	var x1 = this.CurrentPoint[0] * 2 - this.CurrentCenter[0];
	var y1 = this.CurrentPoint[1] * 2 - this.CurrentCenter[1];
	x += this.CurrentPoint[0];
	y += this.CurrentPoint[1];
	this.Context.quadraticCurveTo(x1, y1, x, y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x1,y1];
};

PathParserHandler.prototype.linetoVerticalAbs = function(y) {
	var x = this.CurrentPoint[0];
	this.Context.lineTo(x,y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x,y];
};

PathParserHandler.prototype.linetoVerticalRel = function(y) {
	var x = this.CurrentPoint[0];
	y += this.CurrentPoint[1];
	this.Context.lineTo(x,y);
	this.CurrentPoint = [x,y];
	this.CurrentCenter = [x,y];
};

PathParserHandler.prototype.closePath = function() {
	this.Context.closePath();
};


