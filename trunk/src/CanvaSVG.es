/*****
*
*   CanvaSVG.es
*
*   Author: Antoine Quint
*
*****/

var xhtml_ns = 'http://www.w3.org/1999/xhtml';
var svg_ns = 'http://www.w3.org/2000/svg';
var xlink_ns = 'http://www.w3.org/1999/xlink';

CanvaSVG.VERSION = 0.1;

function CanvaSVG () {
	var svgs = document.getElementsByTagNameNS(svg_ns, 'svg');
	if (svgs.length > 0) {
		for (var i=0; i<svgs.length; i++) {
			var svg = svgs[i];
			new CanvaSVGDocument(svg);
		}
	}
};

CanvaSVG.LogWarning = function (msg, obj) {
	// do something with warnings
};

CanvaSVG.LogError = function (msg, obj) {
	alert('Error on ' + obj + '\n' + msg);
};

