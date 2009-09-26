/*****
*
*   ViewBox.es
*
*   Author: Kevin Lindsey
*		Modifs: Antoine Quint
*
*   copyright 2002, Kevin Lindsey
*
*****/

ViewBox.VERSION = "1.0";

function ViewBox (svg_element) {
	this.SVGRoot = svg_element;
	this.init();
}

ViewBox.prototype.init = function() {
	// handle box
	var box = this.SVGRoot.getAttribute('viewBox');
	var par = this.SVGRoot.getAttribute('preserveAspectRatio');
	var params = box.split(/\s*,\s*|\s+/);
	this.x      = parseFloat( params[0] );
	this.y      = parseFloat( params[1] );
	this.width  = parseFloat( params[2] );
	this.height = parseFloat( params[3] );    
	// handle par
	if (par) {
		var params = par.split(/\s+/);
		var align  = params[0];
		if ( align == "none" ) {
			this.alignX = "none";
			this.alignY = "none";
		} else {
			this.alignX = align.substring(1,4);
			this.alignY = align.substring(5,9);
		}
		if ( params.length == 2 ) {
			this.meetOrSlice = params[1];
		} else {
			this.meetOrSlice = "meet";
		}
	} else {
		this.align  = "xMidYMid";
		this.alignX = "Mid";
		this.alignY = "Mid";
		this.meetOrSlice = "meet";
	}
};

ViewBox.prototype.GetTransformInstructions = function () {

	var instructions = [];
	
	function translate (tx, ty) {
		instructions.push({
			Type: 'translate',
			Tx: tx,
			Ty: ty
		});
	}

	function scale (sx, sy) {
		instructions.push({
			Type: 'scale',
			Sx: sx,
			Sy: sy
		});
	}

	var windowWidth  = this.SVGRoot.getAttribute('width');
	var windowHeight = this.SVGRoot.getAttribute('height');

	var x_ratio = this.width  / windowWidth;
	var y_ratio = this.height / windowHeight;

	translate(this.x, this.y);

	if ( this.alignX == "none" ) {
		scale(x_ratio, y_ratio);
	} else {
		if ( x_ratio < y_ratio && this.meetOrSlice == "meet" || x_ratio > y_ratio && this.meetOrSlice == "slice" ) {
			var x_trans = 0;
			var x_diff  = windowWidth * y_ratio - this.width;
			if (this.alignX == "Mid") {
				x_trans = -x_diff/2;
			} else if (this.alignX == "Max") {
				x_trans = -x_diff;		
			}
			translate(x_trans, 0);
			scale(y_ratio, y_ratio);
		}	else if ( x_ratio > y_ratio && this.meetOrSlice == "meet" || x_ratio < y_ratio && this.meetOrSlice == "slice" )	{
			var y_trans = 0;
			var y_diff  = windowHeight * x_ratio - this.height;
			if ( this.alignY == "Mid" ) {
				y_trans = -y_diff/2;
			} else if ( this.alignY == "Max" ) {
				y_trans = -y_diff;
			}
			translate(0, y_trans);
			scale(x_ratio, x_ratio);
		} else {
			scale(x_ratio, x_ratio);
		}
	}

	return instructions;
}

