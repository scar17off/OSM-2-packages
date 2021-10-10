// ==UserScript==
// @name         OWOP DragonHaxxVoider
// @namespace    http://tampermonkey.net/
// @version      2.4
// @description  DragonVoider
// @author       scar17off#4195
// @match        https://ourworldofpixels.com/*
// @match        http://ourworldofpixels.com/*
// @match        *://ourworldofpixels.com/*
// @match        https://owop.me
// @match        https://owop.me/*
// @grant        none
// ==/UserScript==

function runvoid(){
    running = setInterval(function() {
        for (var i = 0; i < Math.abs(x2 - x1); i++) {
            for (var j = 0; j < Math.abs(y2 - y1); j++) {
                if (OWOP.world.getPixel(i + x1, j + y1) != [Rrr, Ggg, Bbb]) {
                    OWOP.world.setPixel(i + x1, j + y1, [Rrr, Ggg, Bbb], false)
                    OWOP.world.setPixel(i + x1, j + y1, [Rrr, Ggg, Bbb], false)
                    OWOP.world.setPixel(i + x1, j + y1, [Rrr, Ggg, Bbb], false)
                    OWOP.world.setPixel(i + x1, j + y1, [Rrr, Ggg, Bbb], false)
                }
            }
        }
    }, 1);
}
function pixelvoider() {
    Rrr = window.prompt("Void Color:\n[R]\n0 - 255","0")
    Ggg = window.prompt("Void Color:\n[G]\n0 - 255","0")
    Bbb = window.prompt("Void Color:\n[B]\n0 - 255","0")
    x1 = 0
    y1 = 0
    x2 = 0
    y2 = 0
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("VOIDER", {closeable: true}, function(win) {
        win.container.title = 'voider';
        win.container.style.height = 'auto';
        win.container.style.width = '150px';
        win.container.style.overflow = 'hidden';
        win.addObj(document.createTextNode('Voider edited by armagan, scar17off\n'))
        win.addObj(document.createTextNode('X1:'));
        var inputx1 = OWOP.util.mkHTML('input', {
            id: 'x1input',
            oninput: function() {
                x1 = parseInt(this.value);
            }
        });
        win.addObj(inputx1);
        win.addObj(document.createTextNode('Y1:'));
        var inputy1 = OWOP.util.mkHTML('input', {
            id: 'y1input',
            oninput: function() {
                y1 = parseInt(this.value);
            }
        });
        win.addObj(inputy1);
        win.addObj(document.createTextNode('X2:'));
        var inputx2 = OWOP.util.mkHTML('input', {
            id: 'x2input',
            oninput: function() {
                x2 = parseInt(this.value);
            }
        });
        win.addObj(inputx2);
        win.addObj(document.createTextNode('Y2:'));
        var inputy2 = OWOP.util.mkHTML('input', {
            id: 'y2input',
            oninput: function() {
                y2 = parseInt(this.value);
            }
        });
        win.addObj(inputy2);
        var button = OWOP.util.mkHTML('button', {
            id: 'voidbutton',
            innerHTML: '<p2>Start</p2>',
            onclick: function() {
                if (document.getElementById("x1input").value != "") {
                    if (document.getElementById("y1input").value != "") {
                        if (document.getElementById("x2input").value != "") {
                            if (document.getElementById("y2input").value != "") {
                                runvoid();
                            }
                        }
                    }
                }
            }
        });
        var button0 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Stop</p2>',
            onclick: function() {
                clearInterval(running)
            }
        });
        var button1 = OWOP.util.mkHTML('button', {
            id: 'voidbutton',
            innerHTML: '<p2>Change color</p2>',
            onclick: function() {
                Rrr = window.prompt("Void Color:\n[R]\n0 - 255","0")
                Ggg = window.prompt("Void Color:\n[G]\n0 - 255","0")
                Bbb = window.prompt("Void Color:\n[B]\n0 - 255","0")
            }
        });
        win.addObj(button);
        win.addObj(button0);
        win.addObj(button1);
    }).move(window.innerWidth - 600, 32));
};
