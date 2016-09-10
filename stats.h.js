// Player stats
// --

#ifndef STATS_H_JS
#define STATS_H_JS

var STATS = [];

#define STAT_HULL 0
#define STAT_PLAYER_HP 1
#define STAT_CYCLES 2
#define STAT_RAM 3
#define STAT_STORE 4
#define STAT_PATCHES 5
#define STAT_HOTFIXES 6
#define STAT_ANTIVIRUS 7
#define STAT_PLAYER_VIRUS 8
#define STAT_PLAYER_HUNGER 9

GAME.init_stats = function() {
	STATS[STAT_HULL] = 10; // Start with 10 hull points
	STATS[STAT_CYCLES] = 5; // And 5 Cycles (Basically fuel, or number of remaining moves)
	STATS[STAT_RAM] = 2; // 2 RAM, the currency stand-in.
	STATS[STAT_STORE] = 3; // 3 STORE, food.
	STATS[STAT_PATCHES] = 1; // Patches. Used to repair things, like your ship... and the Glitch. So use sparingly.
	STATS[STAT_HOTFIXES] = 0; // Hotfixes restore player HP
	STATS[STAT_ANTIVIRUS] = 0; // Reduces virus infection level
	STATS[STAT_PLAYER_HUNGER] = 0; // Hunger level. Hitting 100 hunger kills you.
	STATS[STAT_PLAYER_VIRUS] = 0; // Virus Infection Level. Hitting 100% Virus Infection Level kills you too.
	STATS[STAT_PLAYER_HP] = 100; // 100 Health Points
};

GAME.stat_reduce = function(stat_id, amount) {
	STATS[stat_id] -= amount;
};

GAME.stat_increase = function(stat_id, amount) {
	STATS[stat_id] += amount;
};

#endif