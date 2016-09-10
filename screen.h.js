// A "Screen" of the game

#ifndef SCREEN_H_JS
#define SCREEN_H_JS

var GameScreen = function() {
	var that = Object.create(Object);

	that.propagate = false;
	that.dead = false;

	that.update = function(delta) {

	};

	that.draw = function() {

	};

	that.kill = function() { 
		that.dead = true;
	};

	return that;
};

GAME.screens = [];

GAME.push_screen= function(screen) {
	GAME.screens.push(screen);
};	

GAME.update_screens = function(delta) {
	var idex;
	for(idex = GAME.screens.length-1; idex >= 0; idex--) {
		if(GAME.screens[idex] === undefined ||
		   GAME.screens[idex].dead) {
			GAME.screens.splice(idex,1);
			continue;
		}
		GAME.screens[idex].update(delta);

		if(!GAME.screens[idex].propagate) {
			break;
		}
	}
};

GAME.draw_screens = function() {
	var idex;
	for(idex = 0; idex < GAME.screens.length; idex++) {
		GAME.screens[idex].draw();
	}
};


#endif