// Starfield Renderer
// --

#ifndef STARFIELD_H_JS
#define STARFIELD_H_JS

#define STAR_MAX_SIZE 4
#define STAR_MIN_SIZE 1
#define STAR_ZDEPTH 320
#define STAR_SPEEDRANGE 0.075

var star_t = function(ax, ay, az, spd) {
	var x = ax; 
	var y = ay;
	var z = az;
	var size = 1;
	var movspeed = STAR_SPEEDRANGE;

	var that = Object.create(Object);

	that.draw = function() {
		var ctx = GAME && GAME.canvas && GAME.canvas.context;
		if(!ctx) { return; }
		var tx = ((x*400)/ +z) + 200;
		var ty = ((y*225)/ +z) + 60;
		var hs = STAR_MAX_SIZE - ((STAR_MAX_SIZE/STAR_ZDEPTH)*z);
		ctx.fillStyle = "white";
		ctx.fillRect(tx-hs,ty-hs,hs,hs);
	};

	that.update = function(delta) {
		z -= (movspeed + GAME.warpspeed*0.25) * delta;
		
		if(z <= 0) {
			x = (Math.random()*400)-200;
			y = (Math.random()*225)-112;
			z = Math.floor(Math.random()*STAR_ZDEPTH);
			movspeed = STAR_SPEEDRANGE + (Math.random()*STAR_SPEEDRANGE);
		}
	};

	return that;
};

var StarField = function (num_stars) {
	var nx, ny, nz, movspeed;
	var idex;
	var stars = [];

	for(idex = 0; idex < num_stars; idex++) {
		nx = (Math.random()*400)-200;
		ny = (Math.random()*225)-112;
		nz = Math.floor(Math.random() * STAR_ZDEPTH);
		movspeed = STAR_SPEEDRANGE + (Math.random() * STAR_SPEEDRANGE);
		stars.push(star_t(nx, ny, nz, movspeed));
	}

	return stars;
};

#endif