// Help Screen
// --

#ifndef SCREEN_HELP_H_JS
#define SCREEN_HELP_H_JS

var ScreenHelp = function() {
	var that = Object.create(GameScreen());
	var btns = [];
	btns[0] = BUTTON.create(0,213,400,12,GS[5]);
	//btns[1] = BUTTON.create(0,213,400,12,"NEXT PAGE");
	//btns[2] = BUTTON.create(0,201,400,12,"PREV PAGE");

	btns[0].setAction(that.kill);

	that.update = function(delta) {
		btns[0].update();
		//btns[1].update();
		//btns[2].update();
	};

	that.draw = function(delta) {
		ctx = GAME.getctx();
		ctx.fillStyle = "#050505";
		ctx.fillRect(0,0,400,225);

		TEXT.draw(4,12,"COMMANDER CRASH: BASIC HELP~---------------------------~~Reach the BLUE HOLE and fix the SYSTEM GLITCH.~Each warp will lead to a decision that must be~made in order to continue.~Choose wisely, some choices will hurt you.~~TERMINOLOGY:~HP: Pilot's Health~HULL: Ship's Health~VIRUS: Viral infection level (100 is bad)~HUNGER: Hunger level (100 is bad)~CYCLES: Your fuel. Each warp == -1 cycle~RAM: Your food.~STORE: Currency~PATCHES: Repairs ship and other things~HOTFIX: Heals HP~ANTIVIRUS: Heals Viral Infection~~The game is semi-randomized, so it may be a bit~unfair at times.~Good luck and enjoy!");

		btns[0].draw();
		//btns[1].draw();
		//btns[2].draw();
	};

	return that;
}

#endif