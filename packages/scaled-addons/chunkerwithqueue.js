let pixqueue = [];
OWOP.tool.addToolObject(new OWOP.tool.class('Chunker with queue', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(16), false, function (tool) {
	let inprog = false;
	var color = OWOP.player.selectedColor;
	var color1 = color[0];
	var color2 = color[1];
	var color3 = color[2];
	window.onmousewheel = function () {
		color = OWOP.player.selectedColor;
		color1 = color[0];
		color2 = color[1];
		color3 = color[2];
	};
	const set = (x, y, color) => {
		OWOP.net.protocol.lastSentX = x * 16;
		OWOP.net.protocol.lastSentY = y * 16;
		OWOP.net.connection.send(new Int32Array([OWOP.net.protocol.lastSentX, OWOP.net.protocol.lastSentY, 0]).buffer);
		OWOP.world.setPixel(x, y, color);
	};
	const eq = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
 
	function clearChunk(chunkX, chunkY) {
		for (let y = 0; y < 16; ++y) {
			for (let x = 0; x < 16; ++x) {
				let pos = [chunkX * 16 + x, chunkY * 16 + y];
				pixqueue.unshift({
					pos: pos,
					color: [color1, color2, color3]
				});
			}
		}
	}
	tool.setEvent('mousemove mousedown', function (mouse, event) {
		if (mouse.buttons === 1) {
			clearChunk(Math.floor(OWOP.mouse.tileX / 16), Math.floor(OWOP.mouse.tileY / 16));
		}
		inprog = true;
	});
}));
 
function clearBuffer() {
	pixqueue = [];
};
