var WorldOfPixels = OWOP; // stolen from yourworldofpixels.glitch.me
let cont;
// hider
var scaledbot = document.getElementById("hide-scaledbot");
let bot = false; // Not hidden
scaledbot.onchange = () => {
	if(bot){
		bot = false;
		OWOP.windowSys.windows[" "].move(9999, 9999);
	} else {
		bot = true;
		OWOP.windowSys.windows[" "].move(350, 200);
	};
};
