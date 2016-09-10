/*
    Canvas Management Stuff
*/

#ifndef CANVAS_H_JS
#define CANVAS_H_JS

var CANVAS = {};

CANVAS.init = function(width, height) {
	var canvas = document.createElement("canvas");
	var context = null;
	canvas.width = width;
	canvas.height = height;
	//canvas.style = "position: fixed; top: 50%; left: 50%; margin-top: -225px; margin-left: -400px; border: solid 2px #CCC;";
	context = canvas.getContext("2d");

	document.body.style = "background-color: #010207";
	document.body.appendChild(canvas);
	
	context.scale(2,2);
	//context.imageSmoothingEnabled = false;
	context.mozImageSmoothingEnabled = false;
	context.msImageSmoothingEnabled = false;

	return {"canvas": canvas, "context": context};
};

#endif