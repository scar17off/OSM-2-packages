var WorldOfPixels = OWOP; // stolen from yourworldofpixels.glitch.me
    	  	OWOP.chat.colorsDisabled = false;
    	  	let cdes = OWOP.chat.colorsDisabled;
    	  	let cont;
    	  	document.getElementsById("no-colors").onchange = () => {
    	  		if(cdes){
    	  			OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("Custom Style", { // thx gorenz
            closeable: false
            moveable: false
        }, function(win) {
        	cont = win.container;
        	cont.height = "1px";
        	cont.wight = "1px";
        	cont.parentElement.insertAdjacentHTML(`afterbegin`, `<style>
#chat-messages > li a:link { color: #82c9ff; }
#chat-messages > li a:visited { color: #ab80f9; }
#chat-messages > li a:hover { color: #76b0dc; }
#chat-messages > li > .nick {
	color: #3ab2ff;
}
#chat-messages > li.moderator {
	color: #86ff41;
}
#chat-messages > li.admin {
  color: rgba(160, 43, 255, 1);
}
#chat-messages > li.discord > .nick {
	color: #6cffe7;
}
#chat-messages > li.server {
	color: #ff41e4;
}
#chat-messages > li.tell, #chat-messages > li > .tell {
	color: #ffb735;
}
</style>`);
        }).move(9999, 9999));
    	  			cdes = false;
    	  		} else {
    	  			cont.parentElement.insertAdjacentHTML(`afterbegin`, `<style>
#chat-messages > li a:link {
	color: #FFFFFF;
}
#chat-messages > li a:visited {
	color: #FFFFFF;
}
#chat-messages > li a:hover {
	color: #FFFFFF;
}
#chat-messages > li > .nick {
	color: #FFFFFF;
}
#chat-messages > li.moderator {
	color: #FFFFFF;
}
#chat-messages > li.admin {
  color: #FFFFFF;
}
#chat-messages > li.discord > .nick {
	color: #FFFFFF;
}
#chat-messages > li.server {
	color: #FFFFFF;
}
#chat-messages > li.tell, #chat-messages > li > .tell {
	color: #FFFFFF;
}
</style>`);
    	  			cdes = true;
    	  		};
    	  	};
