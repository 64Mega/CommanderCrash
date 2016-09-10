/*
    Commander Crash
    --
    A game made for j13k 2016 by Daniel "64Mega" Lawrence
    --
    Main entry Point
*/

var GAME = {};

#include "strings.h.js"
#include "canvas.h.js"
#include "images.h.js"
#include "text.h.js"
#include "button.h.js"
#include "starfield.h.js"
#include "screen.h.js"
#include "screen.message.h.js"
#include "screen.help.h.js"
#include "world.h.js"
#include "screen.system.h.js"
#include "stats.h.js"
#include "events.h.js"
#include "director.h.js"

GAME.canvas = null;
GAME.timing = {};
GAME.timing.then = Date.now();

// Game Configuration Constants
GAME.width = 800;
GAME.height = 450;
GAME.innerwidth = 400;
GAME.innerheight = 225;
GAME.nativewidth = 400;
GAME.nativeheight = 225;

// Status Bar
GAME.status_text = LOC_UN;
GAME.status_tip = "";

// Buttons
GAME.buttons = [];


GAME.init_buttons = function() {
	var btn_warp = BUTTON.create(74, 149, 252, 12, "WARP TO NEXT WAYPOINT");
	var btn_status = BUTTON.create(74, 162, 252, 12, "SHIP & PLAYER STATUS");
	// var btn_status = BUTTON.create(74, 175, 252, 12, "SHIP INFO");
	var btn_help = BUTTON.create(74,210,252,12,"HELP");
	btn_warp.setAction(function() {
		GAME.push_screen(ScreenSystem());
	});
	//btn_about.setAction(function() {
	//	GAME.push_screen(ScreenAbout());
	//});
	btn_help.setAction(function() {
		GAME.push_screen(ScreenHelp());
	});
	btn_status.setAction(function() {
		GAME.push_screen(ScreenMessage("GAME","Not yet implemented."));		
	})

	GAME.buttons.push(btn_warp, btn_status, btn_help);
};

GAME.init = function() {
	GAME.init_buttons();
	GAME.init_stats();
	EVENTS.init();
	DIRECTOR.init();
	GAME.starfield = StarField(140);

	GAME.warpspeed = 0.1;
};

GAME.getctx = function() {  // Gets Render Context
	return GAME.canvas.context;
}

// Shim for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var dbgswitch = false;

GAME.game_loop = function() {
	var now = Date.now();
	var delta = now - GAME.timing.then;
	var ctx = GAME.canvas.context;

	var BG = IMAGES.get("shipscreen");
	var RET = IMAGES.get("reticle");

	var idex = 0;

	ctx.fillStyle = "black";
	ctx.imageSmoothingEnabled = false;
	ctx.globalAlpha = 1.0 - GAME.warpspeed;
	ctx.fillRect(0,0,400,225);
	ctx.globalAlpha = 1.0;
	// Draw starfield before everything else
	if(GAME.starfield) {
		for(idex = 0; idex < GAME.starfield.length; idex++) {
			GAME.starfield[idex].update(delta);
			GAME.starfield[idex].draw();
		}
	}

	if(BG && BG.ready) { 
		ctx.drawImage(BG, 0, 0);
	}
	if(RET && RET.ready) {
		ctx.drawImage(RET, 141, 65);
	}

	ctx.fillStyle = "black";
	ctx.fillRect(0,0,400,8);

	for(idex = 0; idex < GAME.buttons.length && GAME.screens.length === 0; idex++) {
		if(GAME.buttons[idex]) { 
			GAME.buttons[idex].update();
			GAME.buttons[idex].draw();
		}
	}

	if(GAME.screens.length > 0) {
		GAME.update_screens(delta);
		GAME.draw_screens();
	}

	if(GAME.status_tip.length > 0) {
		hcx = (GAME.status_tip.length * 8) / 2;
		TEXT.draw(200-hcx,0,GAME.status_tip);
	} else
	if(GAME.status_text.length > 0) {
		hcx = (GAME.status_text.length * 8) / 2;
		TEXT.draw(200-hcx,0,GAME.status_text);
	}

	GAME.status_tip = "";
	
	GAME.timing.then = now;
	
	requestAnimationFrame(GAME.game_loop);
};

GAME.main = function() {
	console.log("Game starting!");
	GAME.canvas = CANVAS.init(GAME.width, GAME.height);
	GAME.canvas.context.fillStyle = "black";
	GAME.canvas.context.fillRect(0,0,400,225);

	var cnvl = GAME.canvas.canvas.addEventListener;
	cnvl('mousemove', GAME.mouse.updateXY, false);
	cnvl('mousedown', GAME.mouse.mouseDown, false);
	cnvl('mouseup', GAME.mouse.mouseUp, false);
	cnvl('contextmenu', GAME.mouse.updateRClick, false);

	IMAGES.load_images();

	GAME.timing.then = Date.now();
	GAME.init();
	GAME.game_loop();
};

GAME.mouse = {
	x: 0,
	y: 0,
	clicked: false
};
GAME.mouse.updateXY = function(evt) {
	var rect = GAME.canvas.canvas.getBoundingClientRect();
	GAME.mouse.x = Math.floor((evt.clientX - rect.left)/2);
	GAME.mouse.y = Math.floor((evt.clientY - rect.top)/2);
};

GAME.mouse.mouseDown = function(evt) {
	GAME.mouse.clicked = true;
};

GAME.mouse.mouseUp = function(evt) {
	GAME.mouse.clicked = false;
};

GAME.mouse.updateRClick = function(evt) {
	evt.preventDefault();
	evt.stopPropagation();
};

GAME.main();