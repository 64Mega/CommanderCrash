// Game World stuff

#ifndef WORLD_H_JS
#define WORLD_H_JS

#define NUM_SECTORS 8

// LOCATION STRINGS
#define LOC_SPACE "Space"
#define LOC_PLANET "Orbiting Planet"
#define LOC_STATION "Docked at Station"
#define LOC_JUMP "Near Jumpgate"
#define LOC_UN "Location Unknown"

#define LTYPE_EMPTY 0 // Empty Space
#define LTYPE_ENCOUNTER 1 // Empty Space with Encounter
#define LTYPE_EVENT 2 // Empty Space with non-combat event
#define LTYPE_PLANET 3 // As on tin
#define LTYPE_STATION 4 // Space Station
#define LTYPE_DEBRIS 5 // Salvageable Object
#define LTYPE_JUMPGATE 6 // As on tin

var WORLD = {};
WORLD.root = [];

WORLD.sector = function(name, locs) {
	return {
		"name": name,
		"locs": locs
	};
};

WORLD.place = function(type, name, isVisible) {
	return {
		"name": name,
		"type": type,
		"visible": isVisible || true
	};
};

WORLD.populate = function() {
	rt = WORLD.root;
	rt[0] = WORLD.sector("MEM",[
			WORLD.place(LTYPE_EMPTY,"START"),
			WORLD.place(LTYPE_PLANET,"PAGE"),
			WORLD.place(LTYPE_PLANET,"BUFFER"),
			WORLD.place(LTYPE_STATION,"STACK")
		]);
};
#endif