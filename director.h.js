// Game Director
// -- 
// Queues up Events in a semi-randomized order.

#ifndef DIRECTOR_H_JS
#define DIRECTOR_H_JS

#include "util.h.js"

var DIRECTOR = {};

DIRECTOR.queue = [];

// Prepares a new game queue
DIRECTOR.init = function() {
	DIRECTOR.queue.length = 0;
	var ids_e = [], ids_m = [], ids_h = [];
	var i;
	for(i = 0; i < EVENTS.EASY.length; i += 1) { ids_e.push(i); }
	for(i = 0; i < EVENTS.MID.length; i += 1) { ids_m.push(i); }
	for(i = 0; i < EVENTS.HARD.length; i += 1) { ids_h.push(i); }
	array_shuffle(ids_e);
	array_shuffle(ids_m);
	array_shuffle(ids_h);

	for(i = 0; i < ids_e.length; i += 1) {
		DIRECTOR.queue.push(EVENTS.EASY[ids_e[i]]);
	}
	for(i = 0; i < ids_m.length; i += 1) {
		DIRECTOR.queue.push(EVENTS.MID[ids_m[i]]);
	}
	for(i = 0; i < ids_h.length; i += 1) {
		DIRECTOR.queue.push(EVENTS.HARD[ids_h[i]]);
	}
};

// Return and pop the next item in the queue
DIRECTOR.pop = function() {
	var item = DIRECTOR.queue[0];
	DIRECTOR.queue.splice(0,1);
	console.dir(item);
	return item;
}

#endif