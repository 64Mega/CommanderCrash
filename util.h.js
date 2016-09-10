// Utilities

#ifndef UTIL_H_JS
#define UTIL_H_JS

var array_shuffle = function(ar) {
	// Quick implementation of the Durstenfeld Shuffle
	var i, j, temp;
	for(i = ar.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		temp = ar[i];
		ar[i] = ar[j];
		ar[j] = temp;
	}
}

#endif