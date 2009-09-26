/*****
*
*   PathParserHandler.es
*
*   Author: Antoine Quint
*
*****/

function TransformParserHandler (instructions) {
	this.Instructions = instructions;
}

TransformParserHandler.prototype.matrix = function(a, b, c, d, e, f) {
	//CanvaSVG.LogError('matrix transforms not supported', this.Element);
};

TransformParserHandler.prototype.translate = function(tx, ty) {
  if (arguments.length == 1) {
		ty = 0;
	}
	this.Instructions.push({
		Type: 'translate',
		Tx: Number(tx),
		Ty: Number(ty)
	});
};

TransformParserHandler.prototype.scale = function(sx, sy) {
  if (arguments.length == 1) {
		sy = sx;
	}
	this.Instructions.push({
		Type: 'scale',
		Sx: Number(sx),
		Sy: Number(sy)
	});
};

TransformParserHandler.prototype.rotate = function(angle, cx, cy) {
  if (arguments.length == 1) {
		this.Instructions.push({
			Type: 'rotate',
			Angle: (Number(angle) * Math.PI) / 180
		});
	} else if (arguments.length == 3) {
		this.Instructions.push({
			Type: 'translate',
			Tx: Number(cx),
			Ty: Number(cy)
		});
		this.Instructions.push({
			Type: 'rotate',
			Angle: (Number(angle) * Math.PI) / 180
		});	
		this.Instructions.push({
			Type: 'translate',
			Tx: -Number(cx),
			Ty: -Number(cy)
		});
	}
};

TransformParserHandler.prototype.skewX = function(skew_angle) {
	//CanvaSVG.LogError('skew transforms not supported', this.Element);
};

TransformParserHandler.prototype.skewY = function(skew_angle) {
	//CanvaSVG.LogError('skew transforms not supported', this.Element);
};

