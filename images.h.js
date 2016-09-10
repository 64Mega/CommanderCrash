/*
	Loads images and keeps track of their state.
*/

#ifndef IMAGES_H_JS
#define IMAGES_H_JS

var IMAGES = {};
IMAGES.images = {};

IMAGES.set_image_ready = function(img) {
	img.ready = true;
};

IMAGES.get = function(i_alias) {
	var retimg = IMAGES.images[i_alias];
	return IMAGES.images[i_alias];
};

IMAGES.load = function(i_alias, i_path) {
	var newImage = new Image();
	newImage.src = i_path;
	newImage.ready = false;
	newImage.onload = IMAGES.set_image_ready(newImage);

	IMAGES.images[i_alias] = newImage;
};

IMAGES.load_images = function() {
	// Load images here
	IMAGES.load("font","img/font2-sheet.png");
	IMAGES.load("shipscreen","img/shipscreen2.png");
	IMAGES.load("reticle", "img/reticle.png");
};

#endif