// System Map Screen

#ifndef SCREEN_SYSTEM_H_JS
#define SCREEN_SYSTEM_H_JS

var ScreenSystem = function() {
	var that = Object.create(GameScreen());
	var btn_close = BUTTON.create(0,12,400,12,GS[5]);
	btn_close.setAction(that.kill);

	var btn_choices = [];
	// Get next Event from Director
	var ev = DIRECTOR.pop();

	(function(){
		if(!ev) { return; }
		var i, sy = 213;
		var btn_tmp;
		for(i = 0; i < ev.choice.length; i += 1) {
			btn_tmp = BUTTON.create(0,sy,400,12,ev.choice[i].label);
			btn_tmp.setActions(ev.choice[i].action, that.kill);
			btn_choices.push(btn_tmp);
			sy -= 13;
		}
	})();
	
	that.update = function(delta) {
		var i;
		btn_close.update();
		for(i = 0; i < btn_choices.length; i += 1) {
			btn_choices[i].update();
		}
	};

	that.draw = function() {
		var i;
		var ctx = GAME.getctx();
		ctx.fillStyle = "#080825";
		ctx.fillRect(0,0,400,225);
		ctx.fillStyle = "#000";
		ctx.fillRect(10,30,380,185);

		// Draw planet selectors here
		if(ev) {
			TEXT.draw(12,24,ev.message);
		}

		btn_close.draw();
		for(i = 0; i < btn_choices.length; i += 1) {
			btn_choices[i].draw();
		}
		
	};

	return that;	
};

#endif