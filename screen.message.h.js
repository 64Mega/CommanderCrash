// About Screen

#ifndef SCREEN_ABOUT_H_JS
#define SCREEN_ABOUT_H_JS

var ScreenMessage = function(t, msg) {
		var that = Object.create(GameScreen());
		var title = t;
		var message = msg;
		var x = 50;
		var y = 50;
		var w = 300;
		var h = 125;
		var btn_close = BUTTON.create(x+w-12,y,12,12, "X");

		btn_close.setTip(GS[5]);
		btn_close.setAction(that.kill);

		that.update = function(delta) {
			btn_close.update();
		};

		that.draw = function() {
			ctx = GAME.canvas.context;
			if(!ctx) { return; }
			ctx.fillStyle = "rgb(34,32,52)";
			ctx.fillRect(50,50,300,125);
			
			ctx.strokeStyle = "white";
			ctx.strokeRect(50,50,300,125);

			btn_close.draw();

			TEXT.draw(x,y+2,title)

			ctx.beginPath();

			ctx.moveTo(x,y+12);
			ctx.lineTo(x+w,y+12);
			ctx.strokeStyle = "white";
			ctx.stroke();
			ctx.closePath();

			TEXT.draw(x,y+13,message);
		};

		return that;
};

#endif