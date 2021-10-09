// ==UserScript==
// @name         Icons Tool for OWOP
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http://ourworldofpixels.com/*
// @match        http://73.112.129.121:22900/*
// @grant        none
// ==/UserScript==

function shadeColor2(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function rgbToHex(r, g, b) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function shadeSelectedColor(percent) {
	return [hexToRgb(shadeColor2(rgbToHex(OWOP.player.selectedColor[0], OWOP.player.selectedColor[1], OWOP.player.selectedColor[2]), percent)).r, hexToRgb(shadeColor2(rgbToHex(OWOP.player.selectedColor[0], OWOP.player.selectedColor[1], OWOP.player.selectedColor[2]), percent)).g, hexToRgb(shadeColor2(rgbToHex(OWOP.player.selectedColor[0], OWOP.player.selectedColor[1], OWOP.player.selectedColor[2]), percent)).b];
}
function XI21EFKFE84V5() {
	IconsTool = [];
	IconsTool.Selected = "SmileyFace";
    window.document.styleSheets[0].insertRule('button#tool-icons div { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAYAAACGVs+MAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAA7UlEQVRYR+2VwQ0CMQwEryXe1EB5FMODPugDiW+QIRZ7ZgIJHOZzK81nvVn7gY6plPJX0MwEzUzQzATNFrvNtihxbvRkFDSJWOyMZiJoEl62Px7K6XLGcvdsbjnKRNAkvGw9YD1gPcCKW+U9mQiahJdFRjMRNFv0FPdkFDQzQTMTNDNBMxM0l+St6NHIr/gVUdpbrecDNOTETC8q6r0N9IEO9UtmaK4Xl/bE3tkDHVhQv/lLEP8jjNkBvzwCl5viAa0jvgWXm+gAQ8P2+Fu0r66+i5Y7+mgp6tqHaLFCJZ9SV85FSyNUNkpdFzRNV51I+x6nk1vwAAAAAElFTkSuQmCC) !important;background-position: 0 0 !important; background-repeat: no-repeat; }');
    window.document.styleSheets[0].insertRule('button#tool-icons.selected div { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAYAAACGVs+MAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAAt0lEQVRYR+3UMQ7CMAyF4V6JmTNwAzbuwdVdWSgofvmL0tK4S4Zv4NWy39CymNmlMMyEYSYMM2G45XG72/v1/NLnrmemhiHRxXSgZ0ZhSGaBWWAWmAUuL+D0gD53PTM1DDNhmAnDTBhmwjAThvWbrM/+QV9HM0Tfss4coTvL3jC09Ufi6rm9aF8RBn8VGCUUyC7h95oCLqNEudUcL0aWqO+Eo2pECb0RfpAzS+hu1wTkjBK688OWFfnEjOjqcb2UAAAAAElFTkSuQmCC) !important;background-position: 0 0 !important; }');
    OWOP.tool.addToolObject(new OWOP.tool.class('Icons', OWOP.cursors.brush, OWOP.fx.player.RECT_SELECT_ALIGNED(8), false, function(tool) {
        let inprog = false;
        const set = (x, y, color) => {
            OWOP.net.protocol.lastSentX = x * 16;
            OWOP.net.protocol.lastSentY = y * 16;
            OWOP.net.connection.send(new Int32Array([OWOP.net.protocol.lastSentX, OWOP.net.protocol.lastSentY, 0]).buffer);
            OWOP.world.setPixel(x, y, OWOP.player.selectedColor);
        };
        const eq = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

        function clearChunk(chunkx, chunky) {}
        tool.setEvent('mousemove mousedown', function(mouse, event) {
            if (mouse.buttons != 0) {
                if (mouse.buttons == 1) var brushercolor = OWOP.player.selectedColor;
                else if (mouse.buttons == 2) var brushercolor = [255, 255, 255];
                if (mouse.buttons == 1 || mouse.buttons == 2) {
                    IconsTool.chunkx = Math.floor(OWOP.mouse.tileX / 8) * 8;
                    IconsTool.chunky = Math.floor(OWOP.mouse.tileY / 8) * 8;
					if (IconsTool.Selected === "SmileyFace") {
						OWOP.world.setPixel(IconsTool.chunkx + 2, IconsTool.chunky + 1, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 2, IconsTool.chunky + 2, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 5, IconsTool.chunky + 1, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 5, IconsTool.chunky + 2, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 1, IconsTool.chunky + 5, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 2, IconsTool.chunky + 6, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 3, IconsTool.chunky + 6, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 4, IconsTool.chunky + 6, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 5, IconsTool.chunky + 6, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 6, IconsTool.chunky + 5, OWOP.player.selectedColor);
					} else if (IconsTool.Selected === "QuestionMark") {
						OWOP.world.setPixel(IconsTool.chunkx + 3, IconsTool.chunky + 6, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 4, IconsTool.chunky + 6, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 3, IconsTool.chunky + 4, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 4, IconsTool.chunky + 4, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 5, IconsTool.chunky + 4, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 5, IconsTool.chunky + 3, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 6, IconsTool.chunky + 3, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 5, IconsTool.chunky + 2, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 6, IconsTool.chunky + 2, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 5, IconsTool.chunky + 1, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 4, IconsTool.chunky + 1, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 3, IconsTool.chunky + 1, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 2, IconsTool.chunky + 1, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 2, IconsTool.chunky + 2, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 1, IconsTool.chunky + 2, OWOP.player.selectedColor);
					} else if (IconsTool.Selected === "SadFace") {
						OWOP.world.setPixel(IconsTool.chunkx + 2, IconsTool.chunky + 1, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 2, IconsTool.chunky + 2, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 5, IconsTool.chunky + 1, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 5, IconsTool.chunky + 2, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 1, IconsTool.chunky + 6, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 2, IconsTool.chunky + 5, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 3, IconsTool.chunky + 5, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 4, IconsTool.chunky + 5, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 5, IconsTool.chunky + 5, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 6, IconsTool.chunky + 6, OWOP.player.selectedColor);
					} else if (IconsTool.Selected === "ExclamationMark") {
						OWOP.world.setPixel(IconsTool.chunkx + 3, IconsTool.chunky + 6, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 4, IconsTool.chunky + 6, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 3, IconsTool.chunky + 4, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 4, IconsTool.chunky + 4, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 3, IconsTool.chunky + 3, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 4, IconsTool.chunky + 3, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 3, IconsTool.chunky + 2, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 4, IconsTool.chunky + 2, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 3, IconsTool.chunky + 1, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx + 4, IconsTool.chunky + 1, OWOP.player.selectedColor);
					} else if (IconsTool.Selected === "Home") {
						OWOP.world.setPixel(IconsTool.chunkx+1, IconsTool.chunky+6, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+2, IconsTool.chunky+6, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+5, IconsTool.chunky+6, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+6, IconsTool.chunky+6, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+1, IconsTool.chunky+5, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+2, IconsTool.chunky+5, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+5, IconsTool.chunky+5, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+6, IconsTool.chunky+5, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+1, IconsTool.chunky+4, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+2, IconsTool.chunky+4, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+3, IconsTool.chunky+4, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+4, IconsTool.chunky+4, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+5, IconsTool.chunky+4, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+6, IconsTool.chunky+4, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+1, IconsTool.chunky+3, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+2, IconsTool.chunky+3, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+3, IconsTool.chunky+3, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+4, IconsTool.chunky+3, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+5, IconsTool.chunky+3, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+6, IconsTool.chunky+3, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+2, IconsTool.chunky+2, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+3, IconsTool.chunky+2, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+4, IconsTool.chunky+2, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+5, IconsTool.chunky+2, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+3, IconsTool.chunky+1, OWOP.player.selectedColor);
						OWOP.world.setPixel(IconsTool.chunkx+4, IconsTool.chunky+1, OWOP.player.selectedColor);
					} else if (IconsTool.Selected === "MarioHardBlock") {
						//1
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx, IconsTool.chunky,shadeSelectedColor(-0.832)); }, 100);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+1, IconsTool.chunky,shadeSelectedColor(-0.832)); }, 200);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+2, IconsTool.chunky,shadeSelectedColor(-0.832)); }, 300);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+3, IconsTool.chunky,shadeSelectedColor(-0.832)); }, 400);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+4, IconsTool.chunky,shadeSelectedColor(-0.832)); }, 500);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+5, IconsTool.chunky,shadeSelectedColor(-0.832)); }, 600);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+6, IconsTool.chunky,shadeSelectedColor(-0.832)); }, 700);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+7, IconsTool.chunky,shadeSelectedColor(-0.832)); }, 800);
						//2
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx, IconsTool.chunky+1,shadeSelectedColor(-0.832)); }, 900);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+1, IconsTool.chunky+1,shadeSelectedColor(-0.21)); }, 1000);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+2, IconsTool.chunky+1, OWOP.player.selectedColor); }, 1100);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+3, IconsTool.chunky+1, OWOP.player.selectedColor); }, 1200);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+4, IconsTool.chunky+1, OWOP.player.selectedColor); }, 1300);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+5, IconsTool.chunky+1, OWOP.player.selectedColor); }, 1400);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+6, IconsTool.chunky+1,shadeSelectedColor(-0.21)); }, 1500);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+7, IconsTool.chunky+1,shadeSelectedColor(-0.832)); }, 1600);
						//3
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx, IconsTool.chunky+2,shadeSelectedColor(-0.832)); }, 1500);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+1, IconsTool.chunky+2, OWOP.player.selectedColor); }, 1600);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+2, IconsTool.chunky+2,shadeSelectedColor(-0.21)); }, 1700);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+3, IconsTool.chunky+2, OWOP.player.selectedColor); }, 1800);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+4, IconsTool.chunky+2, OWOP.player.selectedColor); }, 1900);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+5, IconsTool.chunky+2,shadeSelectedColor(-0.21)); }, 2000);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+6, IconsTool.chunky+2,shadeSelectedColor(-0.396)); }, 2100);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+7, IconsTool.chunky+2,shadeSelectedColor(-0.832)); }, 2200);
						//4
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx, IconsTool.chunky+3,shadeSelectedColor(-0.832)); }, 2300);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+1, IconsTool.chunky+3, OWOP.player.selectedColor); }, 2300);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+2, IconsTool.chunky+3, OWOP.player.selectedColor); }, 2400);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+3, IconsTool.chunky+3,shadeSelectedColor(-0.21)); }, 2500);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+4, IconsTool.chunky+3,shadeSelectedColor(-0.21)); }, 2600);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+5, IconsTool.chunky+3,shadeSelectedColor(-0.396)); }, 2700);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+6, IconsTool.chunky+3,shadeSelectedColor(-0.396)); }, 2800);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+7, IconsTool.chunky+3,shadeSelectedColor(-0.832)); }, 2900);
						//5
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx, IconsTool.chunky+4,shadeSelectedColor(-0.832)); }, 3000);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+1, IconsTool.chunky+4, OWOP.player.selectedColor); }, 3100);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+2, IconsTool.chunky+4, OWOP.player.selectedColor); }, 3200);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+3, IconsTool.chunky+4,shadeSelectedColor(-0.21)); }, 3300);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+4, IconsTool.chunky+4,shadeSelectedColor(-0.21)); }, 3400);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+5, IconsTool.chunky+4,shadeSelectedColor(-0.396)); }, 3500);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+6, IconsTool.chunky+4,shadeSelectedColor(-0.396)); }, 3600);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+7, IconsTool.chunky+4,shadeSelectedColor(-0.832)); }, 3700);
						//6
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx, IconsTool.chunky+5,shadeSelectedColor(-0.832)); }, 3800);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+1, IconsTool.chunky+5, OWOP.player.selectedColor); }, 3900);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+2, IconsTool.chunky+5,shadeSelectedColor(-0.21)); }, 4000);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+3, IconsTool.chunky+5,shadeSelectedColor(-0.396)); }, 4100);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+4, IconsTool.chunky+5,shadeSelectedColor(-0.396)); }, 4200);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+5, IconsTool.chunky+5,shadeSelectedColor(-0.6)); }, 4300);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+6, IconsTool.chunky+5,shadeSelectedColor(-0.396)); }, 4400);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+7, IconsTool.chunky+5,shadeSelectedColor(-0.832)); }, 4500);
						//7
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx, IconsTool.chunky+6,shadeSelectedColor(-0.832)); }, 4600);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+1, IconsTool.chunky+6,shadeSelectedColor(-0.21)); }, 4700);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+2, IconsTool.chunky+6,shadeSelectedColor(-0.396)); }, 4800);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+3, IconsTool.chunky+6,shadeSelectedColor(-0.396)); }, 4900);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+4, IconsTool.chunky+6,shadeSelectedColor(-0.396)); }, 5000);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+5, IconsTool.chunky+6,shadeSelectedColor(-0.396)); }, 5100);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+6, IconsTool.chunky+6,shadeSelectedColor(-0.6)); }, 5200);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+7, IconsTool.chunky+6,shadeSelectedColor(-0.832)); }, 5300);
						//8
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx, IconsTool.chunky+7,shadeSelectedColor(-0.832)); }, 5400);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+1, IconsTool.chunky+7,shadeSelectedColor(-0.832)); }, 5500);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+2, IconsTool.chunky+7,shadeSelectedColor(-0.832)); }, 5600);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+3, IconsTool.chunky+7,shadeSelectedColor(-0.832)); }, 5700);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+4, IconsTool.chunky+7,shadeSelectedColor(-0.832)); }, 5800);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+5, IconsTool.chunky+7,shadeSelectedColor(-0.832)); }, 5900);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+6, IconsTool.chunky+7,shadeSelectedColor(-0.832)); }, 6000);
						setTimeout(function(){ OWOP.world.setPixel(IconsTool.chunkx+7, IconsTool.chunky+7,shadeSelectedColor(-0.832)); }, 6100);
					}
                }
            }
            inprog = true;
        });
    }));
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window('Icons', {}, function(win) {
        win.container.style.height = 'auto';
        win.container.style.width = '64px';
        win.container.style.overflow = 'hidden';
        win.container.style.background = '#333';
        var button = OWOP.util.mkHTML('button', {
            id: 'SmileyFace',
            style: "padding: 2px 2px;height: 32px;width: 32px;background-color: #7a7a7a;border: 6px outset #2a2a2a;",
            innerHTML: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuMWMqnEsAAAAGUExURf///////1V89WwAAAABdFJOUwBA5thmAAAAFElEQVQIHWNgYFBhYgADJ6ZfDAwABjwBZR/ms18AAAAASUVORK5CYII=" width="16" height="16">',
            onclick: function() {
				OWOP.sounds.click.play();
                IconsTool.Selected = "SmileyFace";
            }
        });
        win.addObj(button);
        var button = OWOP.util.mkHTML('button', {
            id: 'QuestionMark',
            style: "padding: 2px 2px;height: 32px;width: 32px;background-color: #7a7a7a;border: 6px outset #2a2a2a;",
            innerHTML: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuMWMqnEsAAAAwSURBVChTY/j//z9ejMxBBygKYACDDxNAxzCAoQAZgMXQFWBgdAEYgIshS2LB/xkA5QPOMsEMI2YAAAAASUVORK5CYII=" width="16" height="16">',
            onclick: function() {
				OWOP.sounds.click.play();
                IconsTool.Selected = "QuestionMark";
            }
        });
        win.addObj(button);
        var button = OWOP.util.mkHTML('button', {
            id: 'SadFace',
            style: "padding: 2px 2px;height: 32px;width: 32px;background-color: #7a7a7a;border: 6px outset #2a2a2a;",
            innerHTML: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS4xYyqcSwAAADBJREFUKFN9ioEJAAAIwvr/aSMiUIuEgQ4DwAuPyuojRHbdh5NTMjw8cqhMF+fSQCS0+8k36ptMeQAAAABJRU5ErkJggg==" width="16" height="16">',
            onclick: function() {
				OWOP.sounds.click.play();
                IconsTool.Selected = "SadFace";
            }
        });
        win.addObj(button);
        var button = OWOP.util.mkHTML('button', {
            id: 'ExclamationMark',
            style: "padding: 2px 2px;height: 32px;width: 32px;background-color: #7a7a7a;border: 6px outset #2a2a2a;",
            innerHTML: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS4xYyqcSwAAADNJREFUKFNjgIH////DMQwgs8EAKAAGUC61FYA4YFkggApBFIAIfBhdAAbgYsiSWPB/BgDtEoR8GYzgUQAAAABJRU5ErkJggg==" width="16" height="16">',
            onclick: function() {
				OWOP.sounds.click.play();
                IconsTool.Selected = "ExclamationMark";
            }
        });
        win.addObj(button);
        var button = OWOP.util.mkHTML('button', {
            id: 'Home',
            style: "padding: 2px 2px;height: 32px;width: 32px;background-color: #7a7a7a;border: 6px outset #2a2a2a;",
            innerHTML: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS4xYyqcSwAAACVJREFUKFNj+P//P16MLgADcDFskjCAogAXIF0BBp9oBTjwfwYAk43ZJ/+KrzkAAAAASUVORK5CYII=" width="16" height="16">',
            onclick: function() {
				OWOP.sounds.click.play();
                IconsTool.Selected = "Home";
            }
        });
        win.addObj(button);
        var button = OWOP.util.mkHTML('button', {
            id: 'MarioHardBlock',
            style: "padding: 2px 2px;height: 32px;width: 32px;background-color: #7a7a7a;border: 6px outset #2a2a2a;",
            innerHTML: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS4xYyqcSwAAADhJREFUGFdj0MIBQBInT578jwSAXKgEhAMXnTlzJkICIgQRJU4CLpSdnY2QgItCAFAOKoEFaGkBACt4YTm+fYXMAAAAAElFTkSuQmCC" width="16" height="16">',
            onclick: function() {
				OWOP.sounds.click.play();
                IconsTool.Selected = "MarioHardBlock";
            }
        });
        win.addObj(button);
    }).move(90, 39));
}
XI21EFKFE84V5();
