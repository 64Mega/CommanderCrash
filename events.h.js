// This module contains the in-game events in a couple of 'pools', EASY, MID, HARD. 
// The game's "director" (director.h.js) selects from these based on progress through the game (With HARD events tending to play out toward the end of the game.
// --

#ifndef EVENTS_H_JS
#define EVENTS_H_JS

var EVENTS = {};

EVENTS.base_id = 0;

EVENTS.START = null;
EVENTS.EASY = [];
EVENTS.MID = [];
EVENTS.HARD = [];
EVENTS.FINAL = null;

// Creates a new event, returns as an object.
// message - what gets displayed in the event window. 
// choices - an array of up to four objects (As explained below) that contains choices that the player can make.
// --
// Choice format:
// A choice is made up of two properties: label, action
// The label is what shows up on the button and action is what happens when you click the button. Nice and simple.

EVENTS.create = function(message, choices) {
	var id = EVENTS.base_id;
	EVENTS.base_id += 1;
	return {
		"id": id,
		"message": message,
		"choice": choices
	};
};

// This method calls a() if a random value between 0 and 100 is less than perc, and b() if otherwise.
EVENTS.chance = function(perc, a, b) {
	var v = Math.round(Math.random()*100);
	v < perc ? a() : b();
};

EVENTS.init = function() {
	EVENTS.EASY.push(
		// Event 1 -- Encounter with a drifting cargo container (Good one)
		EVENTS.create("YOU ENCOUNTER A DRIFTING CARGO CONTAINER IN~OPEN SPACE.", 
		[
			{
				label: "RETRIEVE CARGO",
				action: function() { EVENTS.chance(50, function() {
					GAME.stat_reduce(STAT_PLAYER_HP, 20);
					GAME.push_screen(ScreenMessage("RETRIEVED CARGO","You retrieve the cargo container.~Within you discover a special PATCH.~~+20 HP"));
				},
				function() {
					GAME.stat_increase(STAT_CYCLES, 2);
					GAME.push_screen(ScreenMessage("RETRIEVED CARGO","You retrieve the cargo container.~Within you discover some CYCLES.~~+2 CYCLES"));
				})}
			},
			{
				label: "DESTROY CARGO",
				action: function() {
					EVENTS.chance(50, function() {
						GAME.push_screen(ScreenMessage("DESTROYED CARGO","A piece of debris clips the wing of~your ship, damaging it slightly.~~-1 HULL"));
					}, function() {
						GAME.push_screen(ScreenMessage("DESTROYED CARGO","You destroy the cargo container~and move on."));
					});
				}
			},
			{
				label: "IGNORE AND CONTINUE",
				action: function() { 
					GAME.push_screen(ScreenMessage("IGNORED CARGO","Deciding you're low on time, you~ignore the cargo container and~continue onward."));
				}
			}
		]),
		// Event 2 - A rest event
		EVENTS.create("YOU WARP INTO OPEN SPACE.~YOUR SCANNERS CANNOT DETECT ANY~OTHER VESSELS.~~THIS MAY BE A GOOD OPPORTUNITY~TO REST UP BEFORE RESUMING YOUR JOURNEY.",
		[
			{
				label: "REST UP (-1 RAM, GAIN 10 HP)",
				action: function() {
					GAME.stat_increase(STAT_PLAYER_HP, 10);
					GAME.stat_increase(STAT_PLAYER_HUNGER, 5);
				}
			},
			{
				label: "CONTINUE WITHOUT RESTING",
				action: function() {
					// Do nothing
				}
			}
		]),
		// Event 3 - Encounter with a not-so-good cargo container
		EVENTS.create("YOU ENCOUNTER A DRIFTING CARGO CONTAINER IN~OPEN SPACE.", 
		[
			{
				label: "RETRIEVE CARGO",
				action: function() { EVENTS.chance(50, function() {
					GAME.stat_reduce(STAT_PLAYER_HP, 20);
					GAME.push_screen(ScreenMessage("RETRIEVED CARGO","You retrieve the cargo container.~Inside is a Moonbear cub~~Your face got mauled~-30 HP"));
				},
				function() {
					GAME.stat_increase(STAT_CYCLES, 2);
					GAME.push_screen(ScreenMessage("RETRIEVED CARGO","You retrieve the cargo container.~Some kind of strange gas is released~from within.~~+25 VIRAL INFECTION"));
				})}
			},
			{
				label: "DESTROY CARGO",
				action: function() {
					EVENTS.chance(50, function() {
						GAME.push_screen(ScreenMessage("DESTROYED CARGO","A piece of debris clips the wing of~your ship, damaging it slightly.~~-1 HULL"));
					}, function() {
						GAME.push_screen(ScreenMessage("DESTROYED CARGO","You destroy the cargo container~and move on."));
					});
				}
			},
			{
				label: "IGNORE AND CONTINUE",
				action: function() { 
					GAME.push_screen(ScreenMessage("IGNORED CARGO","Deciding you're low on time, you~ignore the cargo container and~continue onward."));
				}
			}
		])
		
	);
};

#endif
