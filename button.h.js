// Button

#ifndef BUTTON_H_JS
#define BUTTON_H_JS

var BUTTON = {
	mbLeft : false,

	create : function(pos_x, pos_y, width, height, label) {
		// var ctx = GAME.canvas.context;
		var x = pos_x || 0;
		var y = pos_y || 0;
		var w = width || 20;
		var h = height || 20;
		var txt = label || "X";

		var that = Object.create(Object);

		var mouseover = false;
		var clicked = 0;
		var tip = "";
		var actions = [];

		that.drawButton = function(mode) {
			var ctx = GAME.getctx();
			ctx.fillStyle = "rgb(0,0,0)";
			if(mode === "normal") {
				ctx.fillStyle = "rgb(34,32,52)";
				ctx.fillRect(x,y,w,h);
			}
			if(mode === "hover") {
				ctx.fillStyle = "rgb(141,133,216)";
				ctx.fillRect(x,y,w,h);
			}
			if(mode === "press") {
				ctx.fillStyle = "rgb(15,9,13)";
				ctx.fillRect(x,y,w,h);
			}

			ctx.fillStyle = "#000000";
			
			ctx.strokeStyle = "rgb(4,12,32)";
			ctx.strokeRect(x,y,w,h);
		}

		that.draw = function() {
			var mode = mouseover ? "hover" : "normal";
			if(clicked > 0) { mode = "press"; }
			// var ctx = GAME && GAME.canvas && GAME.canvas.context;

			that.drawButton(mode);
			hcx = (x+w/2)-((txt.length * 8) / 2);
			if(TEXT) {
				TEXT.draw(hcx,y+2,txt);
			}
		};

		that.update = function() {
			mx = GAME.mouse.x;
			my = GAME.mouse.y;

			if(GAME.mouse.clicked === false) { clicked = 0; BUTTON.mbLeft = false; }
			
			mouseover = !(mx < x || mx > x+w || my < y || my > y+h);

			if(mouseover && GAME.mouse.clicked) { clicked += 1; }

			if(clicked === 1 && actions.length > 0 && BUTTON.mbLeft === false) {
				var i;
				for(i = 0; i < actions.length; i+=1) {
					if(actions[i]) { actions[i](); }
				}
				BUTTON.mbLeft = true;
			}

			if(tip.length > 0 && mouseover) {
				GAME.status_tip = tip;
			}
		};

		that.setTip = function(atip) {
			tip = atip;
		};

		that.setAction = function(func) {
			actions.length = 0;
			actions.push(func);
		};

		that.setActions = function() {
			var i;
			for(i = 0; i < arguments.length; i+=1) {
				actions.push(arguments[i]);
			}
		}

		return that;
	}
};

#endif