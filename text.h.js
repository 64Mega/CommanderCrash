// Text Renderer

#ifndef TEXT_H_JS
#define TEXT_H_JS

#define GLYPH_WIDTH 8
#define GLYPH_HEIGHT 8

/*
	Text drawing module. Renders a bitmap font.
	The ~ character is treated as a newline, allowing for denser draw statements.
*/

TEXT = {
	draw : function(x, y, str) {
		var img = IMAGES && IMAGES.get("font");
		var ctx = GAME && GAME.canvas && GAME.canvas.context;
		var idex = 0;
		var nx = x, ny = y;
		var char = 0, sx = 0, sy = 0;
		if(!img) { return; }
		if(!ctx) { return; }
		for(idex = 0; idex < str.length; idex++) {
			char = str.charCodeAt(idex) - 32;
			if(char < 0) { continue; }
			if(str[idex] === '~') {
				nx = x;
				ny += GLYPH_HEIGHT;
				continue;
			}
			sx = char % 32;
			sy = Math.floor(char / 32);
			ctx.drawImage(img, sx*GLYPH_WIDTH, sy*GLYPH_HEIGHT, GLYPH_WIDTH, GLYPH_HEIGHT, nx, ny, GLYPH_WIDTH, GLYPH_HEIGHT);
			nx+=GLYPH_WIDTH;
		}
	}
};

#endif