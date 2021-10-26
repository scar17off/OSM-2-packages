OWOP.tool.addToolObject(new OWOP.tool.class('Chess chunker', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(16), false, function (tool) {
	let inprog = false;
	const set = (x, y, color) => {
		OWOP.net.protocol.lastSentX = x * 16;
		OWOP.net.protocol.lastSentY = y * 16;
		OWOP.net.connection.send(new Int32Array([OWOP.net.protocol.lastSentX, OWOP.net.protocol.lastSentY, 0]).buffer);
		OWOP.world.setPixel(x, y, color);
	};
	const eq = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

	function clearChunk(chunkX, chunkY) {}
	tool.setEvent('mousemove mousedown', function (mouse, event) {
		if (mouse.buttons != 0) {
			if (mouse.buttons == 1) var brushercolor = OWOP.player.selectedColor;
			else if (mouse.buttons == 2) var brushercolor = [255, 255, 255];
			if (mouse.buttons == 1 || mouse.buttons == 2) {
				var secl = OWOP.player.selectedColor;
				var shiny = OWOP.player.selectedColor;
				var outline = OWOP.player.selectedColor;
				var shade = OWOP.player.selectedColor;

				heartcolors = [
					[outline[0], outline[1], outline[2]], secl, [shade[0], shade[1], shade[2]],
					[shiny[0], shiny[1], shiny[2]]
				];
				//outline, main, shade, shine
				let i = getFree();
				chunkx = Math.floor(OWOP.mouse.tileX / 16) * 16
				chunky = Math.floor(OWOP.mouse.tileY / 16) * 16
				BOTS[i].world.setPixel(chunkx + 0, chunky + 0, secl)
				BOTS[i].world.setPixel(chunkx + 0, chunky + 2, secl)
				BOTS[i].world.setPixel(chunkx + 0, chunky + 4, secl)
				BOTS[i].world.setPixel(chunkx + 0, chunky + 6, secl)
				BOTS[i].world.setPixel(chunkx + 0, chunky + 8, secl)
				BOTS[i].world.setPixel(chunkx + 0, chunky + 10, secl)
				BOTS[i].world.setPixel(chunkx + 0, chunky + 12, secl)
				BOTS[i].world.setPixel(chunkx + 0, chunky + 14, secl)
				BOTS[i].world.setPixel(chunkx + 1, chunky + 1, secl)
				BOTS[i].world.setPixel(chunkx + 1, chunky + 3, secl)
				BOTS[i].world.setPixel(chunkx + 1, chunky + 5, secl)
				BOTS[i].world.setPixel(chunkx + 1, chunky + 7, secl)
				BOTS[i].world.setPixel(chunkx + 1, chunky + 9, secl)
				BOTS[i].world.setPixel(chunkx + 1, chunky + 11, secl)
				BOTS[i].world.setPixel(chunkx + 1, chunky + 13, secl)
				BOTS[i].world.setPixel(chunkx + 1, chunky + 15, secl)
				BOTS[i].world.setPixel(chunkx + 2, chunky + 0, secl)
				BOTS[i].world.setPixel(chunkx + 2, chunky + 2, secl)
				BOTS[i].world.setPixel(chunkx + 2, chunky + 4, secl)
				BOTS[i].world.setPixel(chunkx + 2, chunky + 6, secl)
				BOTS[i].world.setPixel(chunkx + 2, chunky + 8, secl)
				BOTS[i].world.setPixel(chunkx + 2, chunky + 10, secl)
				BOTS[i].world.setPixel(chunkx + 2, chunky + 12, secl)
				BOTS[i].world.setPixel(chunkx + 2, chunky + 14, secl)
				BOTS[i].world.setPixel(chunkx + 3, chunky + 1, secl)
				BOTS[i].world.setPixel(chunkx + 3, chunky + 3, secl)
				BOTS[i].world.setPixel(chunkx + 3, chunky + 5, secl)
				BOTS[i].world.setPixel(chunkx + 3, chunky + 7, secl)
				BOTS[i].world.setPixel(chunkx + 3, chunky + 9, secl)
				BOTS[i].world.setPixel(chunkx + 3, chunky + 11, secl)
				BOTS[i].world.setPixel(chunkx + 3, chunky + 13, secl)
				BOTS[i].world.setPixel(chunkx + 3, chunky + 15, secl)
				BOTS[i].world.setPixel(chunkx + 4, chunky + 0, secl)
				BOTS[i].world.setPixel(chunkx + 4, chunky + 2, secl)
				BOTS[i].world.setPixel(chunkx + 4, chunky + 4, secl)
				BOTS[i].world.setPixel(chunkx + 4, chunky + 6, secl)
				BOTS[i].world.setPixel(chunkx + 4, chunky + 8, secl)
				BOTS[i].world.setPixel(chunkx + 4, chunky + 10, secl)
				BOTS[i].world.setPixel(chunkx + 4, chunky + 12, secl)
				BOTS[i].world.setPixel(chunkx + 4, chunky + 14, secl)
				BOTS[i].world.setPixel(chunkx + 5, chunky + 1, secl)
				BOTS[i].world.setPixel(chunkx + 5, chunky + 3, secl)
				BOTS[i].world.setPixel(chunkx + 5, chunky + 5, secl)
				BOTS[i].world.setPixel(chunkx + 5, chunky + 7, secl)
				BOTS[i].world.setPixel(chunkx + 5, chunky + 9, secl)
				BOTS[i].world.setPixel(chunkx + 5, chunky + 11, secl)
				BOTS[i].world.setPixel(chunkx + 5, chunky + 13, secl)
				BOTS[i].world.setPixel(chunkx + 5, chunky + 15, secl)
				BOTS[i].world.setPixel(chunkx + 6, chunky + 0, secl)
				BOTS[i].world.setPixel(chunkx + 6, chunky + 2, secl)
				BOTS[i].world.setPixel(chunkx + 6, chunky + 4, secl)
				BOTS[i].world.setPixel(chunkx + 6, chunky + 6, secl)
				BOTS[i].world.setPixel(chunkx + 6, chunky + 8, secl)
				BOTS[i].world.setPixel(chunkx + 6, chunky + 10, secl)
				BOTS[i].world.setPixel(chunkx + 6, chunky + 12, secl)
				BOTS[i].world.setPixel(chunkx + 6, chunky + 14, secl)
				BOTS[i].world.setPixel(chunkx + 7, chunky + 1, secl)
				BOTS[i].world.setPixel(chunkx + 7, chunky + 3, secl)
				BOTS[i].world.setPixel(chunkx + 7, chunky + 5, secl)
				BOTS[i].world.setPixel(chunkx + 7, chunky + 7, secl)
				BOTS[i].world.setPixel(chunkx + 7, chunky + 9, secl)
				BOTS[i].world.setPixel(chunkx + 7, chunky + 11, secl)
				BOTS[i].world.setPixel(chunkx + 7, chunky + 13, secl)
				BOTS[i].world.setPixel(chunkx + 7, chunky + 15, secl)
				BOTS[i].world.setPixel(chunkx + 8, chunky + 0, secl)
				BOTS[i].world.setPixel(chunkx + 8, chunky + 2, secl)
				BOTS[i].world.setPixel(chunkx + 8, chunky + 4, secl)
				BOTS[i].world.setPixel(chunkx + 8, chunky + 6, secl)
				BOTS[i].world.setPixel(chunkx + 8, chunky + 8, secl)
				BOTS[i].world.setPixel(chunkx + 8, chunky + 10, secl)
				BOTS[i].world.setPixel(chunkx + 8, chunky + 12, secl)
				BOTS[i].world.setPixel(chunkx + 8, chunky + 14, secl)
				BOTS[i].world.setPixel(chunkx + 9, chunky + 1, secl)
				BOTS[i].world.setPixel(chunkx + 9, chunky + 3, secl)
				BOTS[i].world.setPixel(chunkx + 9, chunky + 5, secl)
				BOTS[i].world.setPixel(chunkx + 9, chunky + 7, secl)
				BOTS[i].world.setPixel(chunkx + 9, chunky + 9, secl)
				BOTS[i].world.setPixel(chunkx + 9, chunky + 11, secl)
				BOTS[i].world.setPixel(chunkx + 9, chunky + 13, secl)
				BOTS[i].world.setPixel(chunkx + 9, chunky + 15, secl)
				BOTS[i].world.setPixel(chunkx + 10, chunky + 0, secl)
				BOTS[i].world.setPixel(chunkx + 10, chunky + 2, secl)
				BOTS[i].world.setPixel(chunkx + 10, chunky + 4, secl)
				BOTS[i].world.setPixel(chunkx + 10, chunky + 6, secl)
				BOTS[i].world.setPixel(chunkx + 10, chunky + 8, secl)
				BOTS[i].world.setPixel(chunkx + 10, chunky + 10, secl)
				BOTS[i].world.setPixel(chunkx + 10, chunky + 12, secl)
				BOTS[i].world.setPixel(chunkx + 10, chunky + 14, secl)
				BOTS[i].world.setPixel(chunkx + 11, chunky + 1, secl)
				BOTS[i].world.setPixel(chunkx + 11, chunky + 3, secl)
				BOTS[i].world.setPixel(chunkx + 11, chunky + 5, secl)
				BOTS[i].world.setPixel(chunkx + 11, chunky + 7, secl)
				BOTS[i].world.setPixel(chunkx + 11, chunky + 9, secl)
				BOTS[i].world.setPixel(chunkx + 11, chunky + 11, secl)
				BOTS[i].world.setPixel(chunkx + 11, chunky + 13, secl)
				BOTS[i].world.setPixel(chunkx + 11, chunky + 15, secl)
				BOTS[i].world.setPixel(chunkx + 12, chunky + 0, secl)
				BOTS[i].world.setPixel(chunkx + 12, chunky + 2, secl)
				BOTS[i].world.setPixel(chunkx + 12, chunky + 4, secl)
				BOTS[i].world.setPixel(chunkx + 12, chunky + 6, secl)
				BOTS[i].world.setPixel(chunkx + 12, chunky + 8, secl)
				BOTS[i].world.setPixel(chunkx + 12, chunky + 10, secl)
				BOTS[i].world.setPixel(chunkx + 12, chunky + 12, secl)
				BOTS[i].world.setPixel(chunkx + 12, chunky + 14, secl)
				BOTS[i].world.setPixel(chunkx + 13, chunky + 1, secl)
				BOTS[i].world.setPixel(chunkx + 13, chunky + 3, secl)
				BOTS[i].world.setPixel(chunkx + 13, chunky + 5, secl)
				BOTS[i].world.setPixel(chunkx + 13, chunky + 7, secl)
				BOTS[i].world.setPixel(chunkx + 13, chunky + 9, secl)
				BOTS[i].world.setPixel(chunkx + 13, chunky + 11, secl)
				BOTS[i].world.setPixel(chunkx + 13, chunky + 13, secl)
				BOTS[i].world.setPixel(chunkx + 13, chunky + 15, secl)
				BOTS[i].world.setPixel(chunkx + 14, chunky + 0, secl)
				BOTS[i].world.setPixel(chunkx + 14, chunky + 2, secl)
				BOTS[i].world.setPixel(chunkx + 14, chunky + 4, secl)
				BOTS[i].world.setPixel(chunkx + 14, chunky + 6, secl)
				BOTS[i].world.setPixel(chunkx + 14, chunky + 8, secl)
				BOTS[i].world.setPixel(chunkx + 14, chunky + 10, secl)
				BOTS[i].world.setPixel(chunkx + 14, chunky + 12, secl)
				BOTS[i].world.setPixel(chunkx + 14, chunky + 14, secl)
				BOTS[i].world.setPixel(chunkx + 15, chunky + 1, secl)
				BOTS[i].world.setPixel(chunkx + 15, chunky + 3, secl)
				BOTS[i].world.setPixel(chunkx + 15, chunky + 5, secl)
				BOTS[i].world.setPixel(chunkx + 15, chunky + 7, secl)
				BOTS[i].world.setPixel(chunkx + 15, chunky + 9, secl)
				BOTS[i].world.setPixel(chunkx + 15, chunky + 11, secl)
				BOTS[i].world.setPixel(chunkx + 15, chunky + 13, secl)
				BOTS[i].world.setPixel(chunkx + 15, chunky + 15, secl)

			}
		}
		inprog = true;
	});
}));
