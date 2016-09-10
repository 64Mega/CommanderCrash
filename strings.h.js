// String Tables and utilities

#ifndef STRINGS_H_JS
#define STRINGS_H_JS

// Pardon the compacted var names here, these are written like this to reduce unnecessary space usage as much as possible.

var GS = []; // Game Strings
var SU = {}; // String Utils

// Concatenates an array of strings into a single string. 
SU.cat = function(strs) {
	var buf = "", i;
	for(i = 0; i < strs.length; i++) {
		buf += strs[i];
	}
	return buf;
}

// Misc strings
GS[0] = "COMMANDER CRASH"; // Game Title
GS[1] = "0.1.1"; // Version String
GS[2] = "64MEGA"; // Author String
GS[3] = "JS13K 2016"; // Compo
GS[4] = "WWW.64MEGA.SPACE"; // Site
GS[5] = "CLOSE WINDOW";

// Dictionary Words/Phrases
GS[100] = "PLANET";
GS[101] = "SYSTEM";
GS[102] = "SPACE";
// Final Game Strings
GS[1000] = SU.cat([GS[0], " ", GS[1], "~~MADE FOR ", GS[3], "~~BY ", GS[2], "~~(", GS[4], ")"]); // About Screen message


#endif