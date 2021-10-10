// ==UserScript==
// @name         OWOP DragonHaxxBOT
// @namespace    http://tampermonkey.net/
// @version      2.8
// @description  DragonBots
// @author       scar17off#4195
// @match        https://ourworldofpixels.com/*
// @match        http://ourworldofpixels.com/*
// @match        *://ourworldofpixels.com/*
// @match        https://owop.me
// @match        https://owop.me/*
// @grant        none
// ==/UserScript==

var followtype = "1"
musiclist = [
"https://cdn.discordapp.com/attachments/817175680088408070/824069424402661396/hmmmmmm.mp3",
"https://cdn.discordapp.com/attachments/853090184097562647/853090394216988712/Jake_Hill_-_All_Along.mp3",
"https://cdn.discordapp.com/attachments/853090184097562647/853090585615663144/Hippie_Sabotage_-_Options.mp3"
]

var OJS = OPM.require("owop-js");
dragonhaxxbot()

function dragonhaxxbot() {
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("DragonHaxxBOT v2.8 [PRIVATE]", {closeable: true}, function(win0) {
        win0.container.style.height = 'auto';
        win0.container.style.width = '700px';
        win0.container.style.overflow = 'hidden';
        var button0 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Connect</p2>',
            onclick: function() {
                botstart()
            }
        });
        var button1 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Follow</p2>',
            onclick: function() {
                follow()
            }
        });
        var button4 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Discord</p2>',
            onclick: function() {
                window.open("https://discord.gg/aT3ak9pftX", '_blank').focus();
            }
        });
        var button5 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Load tools</p2>',
            onclick: function() {
                loadtools()
            }
        });
        var button6 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Disconnect</p2>',
            onclick: function() {
                botstop()
            }
        });
        var button7 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>ScriptManager</p2>',
            onclick: function() {
                dragonhaxxscriptmanager()
            }
        });
        var button8 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>BotController</p2>',
            onclick: function() {
                dragonbotcontroller()
            }
        });
        var button9 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Unfollow</p2>',
            onclick: function() {
                unfollow()
            }
        });
        var button10 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Secured</p2>',
            onclick: function() {
                var inputpass = window.prompt("Enter access password: ")
                if(inputpass == "a"){
                    code(inputpass)
                }
            }
        });
        var button11 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Bot config</p2>',
            onclick: function() {
                botsettings()
            }
        });
        win0.addObj(button0)
        win0.addObj(button1)
        win0.addObj(button9)
        win0.addObj(button4)
        win0.addObj(button5)
        win0.addObj(button6)
        win0.addObj(button7)
        win0.addObj(button8)
        win0.addObj(button10)
        win0.addObj(button11)
    }).move(window.innerWidth - 600, 32));
}
function botsettings() {
    var playercolor = OWOP.player.selectedcolor
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("𝓘𝓬𝓮𝓓𝓯𝓲𝓻𝓮 𝓑𝓸𝓽 𝓒𝓸𝓷𝓯𝓲𝓰", {closeable: true}, function(win9) {
        win9.container.style.height = 'auto';
        win9.container.style.width = '300px';
        win9.container.style.overflow = 'hidden';
        win9.addObj(document.createTextNode('Follow type:'));
        var inputx1 = OWOP.util.mkHTML('input', {
            id: 'x1input',
            oninput: function() {
                followtype = parseInt(this.value);
            }
        });
    win9.addObj(inputx1)
}).move(window.innerWidth - 600, 32));
}
function playermusic() {
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("Dragon MusicPlayer", {closeable: true}, function(win5) {
        win5.container.style.height = 'auto';
        win5.container.style.width = 'auto';
        win5.container.style.overflow = 'hidden';
        var button0 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Start music</p2>',
            onclick: function() {
                musicplayer()
            }
        });
        var button1 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Pause</p2>',
            onclick: function() {
                stopmusic()
            }
        });
        var button2 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Resume</p2>',
            onclick: function() {
                resumemusic()
            }
        });
    win5.addObj(button0)
    win5.addObj(button1)
    win5.addObj(button2)
    }).move(window.innerWidth - 600, 32));
}
function dragonhaxxscriptmanager(){
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("DragonScriptManager", {closeable: true}, function(win1) {
        win1.container.style.height = '200px';
        win1.container.style.width = '400px';
        win1.container.style.overflow = 'hidden';
        var script0 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Reload DGH</p2>',
            onclick: function() {
                reloadpage()
            }
        });
        var script1 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>DragonBotController</p2>',
            onclick: function() {
                dragonbotcontroller()
            }
        });
        var script2 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Dragon MusicPlayer</p2>',
            onclick: function() {
                playermusic()
            }
        });
        win1.addObj(script0)
        win1.addObj(script1)
        win1.addObj(script2)

    }).move(window.innerWidth - 600, 32));
}
function dragonbotcontroller(){
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("DragonBotController", {closeable: true}, function(win2) {
        win2.container.style.height = 'auto';
        win2.container.style.width = '500px';
        win2.container.style.overflow = 'hidden';
        var botf0 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Select bot tool</p2>',
            onclick: function() {
                var bottoolid = window.prompt("Enter tool ID:\n0 - 7","3")
                settool(bottoolid)
            }
        });
        var botf1 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Change bot color</p2>',
            onclick: function() {
               var cr = window.prompt("Enter R: ")
               var cg = window.prompt("Enter G: ")
               var cb = window.prompt("Enter B: ")
               Client0.world.setColor(color = [cr, cg, cb])
               Client1.world.setColor(color = [cr, cg, cb])
               Client2.world.setColor(color = [cr, cg, cb])
               Client3.world.setColor(color = [cr, cg, cb])
            }
        });
        var botf2 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>PixelVoider</p2>',
            onclick: function() {
               pixelvoider()
            }
        });
        var botf3 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Autoreconnect</p2>',
            onclick: function() {
                botstop()
                Client0 = new OJS.Client({reconnect: true});
                Client1 = new OJS.Client({reconnect: true});
                Client2 = new OJS.Client({reconnect: true});
                Client3 = new OJS.Client({reconnect: true});

                Client0.on("join", () => {settool(8);});
                Client1.on("join", () => {settool(8);});
                Client2.on("join", () => {settool(8);});
                Client3.on("join", () => {settool(8);});
            }
        });
        win2.addObj(botf0)
        win2.addObj(botf1)
        win2.addObj(botf2)
        win2.addObj(botf3)

    }).move(window.innerWidth - 600, 32));
}
function runvoid(){
    running = setInterval(function() {
        for (var i = 0; i < Math.abs(x2 - x1); i++) {
            for (var j = 0; j < Math.abs(y2 - y1); j++) {
                if (OWOP.world.getPixel(i + x1, j + y1) != [Rrr, Ggg, Bbb]) {
                    Client0.world.setPixel(i + x1, j + y1, [Rrr, Ggg, Bbb], false)
                    Client1.world.setPixel(i + x1, j + y1, [Rrr, Ggg, Bbb], false)
                    Client2.world.setPixel(i + x1, j + y1, [Rrr, Ggg, Bbb], false)
                    Client3.world.setPixel(i + x1, j + y1, [Rrr, Ggg, Bbb], false)
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
        win.addObj(button)
        win.addObj(button0)
        win.addObj(button1)
    }).move(window.innerWidth - 600, 32));
}
function code(pass) {
    if(pass == "a"){
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("", {closeable: true}, function(win4) {
        win4.container.title = 'cv';
        win4.container.style.height = 'auto';
        win4.container.style.width = '150px';
        win4.container.style.overflow = 'hidden';
        win4.addObj(document.createTextNode('Exploits'));
        var button = OWOP.util.mkHTML('button', {
            id: 'voidbutton',
            innerHTML: '<p2>MassJoin</p2>',
            onclick: function() {
                var massjoinloop = setInterval(function() {
                    botstop()
                    botstart()
                }, 450);
            }
        })
        var button3 = OWOP.util.mkHTML('button', {
            id: 'voidbutton',
            innerHTML: '<p2>Stop MassJoin</p2>',
            onclick: function() {
                clearInterval(massjoinloop)
            }
        })
        var button0 = OWOP.util.mkHTML('button', {
            id: 'voidbutton',
            innerHTML: '<p2>MassPixel</p2>',
            onclick: function() {
                follow()
                var posx = OWOP.mouse.tileX
                var posy = OWOP.mouse.tileY
                masspixelloop = setInterval(function() {
                    Client0.world.setPixel(posx, posy, [r6, g6, b6], false)
                    Client1.world.setPixel(posx, posy, [r6, g6, b6], false)
                    Client2.world.setPixel(posx, posy, [r6, g6, b6], false)
                    Client3.world.setPixel(posx, posy, [r6, g6, b6], false)
                }, 55);
            }
        })
        var button1 = OWOP.util.mkHTML('button', {
            id: 'voidbutton',
            innerHTML: '<p2>MassPixel color</p2>',
            onclick: function() {
                r6 = window.prompt("Enter R:")
                g6 = window.prompt("Enter G:")
                b6 = window.prompt("Enter B:")
            }
        })
        var button2 = OWOP.util.mkHTML('button', {
            id: 'voidbutton',
            innerHTML: '<p2>Stop MassPixel</p2>',
            onclick: function() {
                clearInterval(masspixelloop)
                unfollow()
            }
        })
        var button4 = OWOP.util.mkHTML('button', {
            id: 'voidbutton',
            innerHTML: '<p2>Load Mod Tools</p2>',
            onclick: function() {
                loadmodtools()
            }
        })
        win4.addObj(button)
        win4.addObj(button0)
        win4.addObj(button1)
        win4.addObj(button2)
        win4.addObj(button3)
        win4.addObj(button4)
        }).move(window.innerWidth - 600, 32));
    }
}
// funx
function sleep(ms) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < ms);
}
function settool(idq){
    Client0.world.setTool(id = idq)
    Client1.world.setTool(id = idq)
    Client2.world.setTool(id = idq)
    Client3.world.setTool(id = idq)
}
function musicplayer() {
    var musictoplay = musiclist[Math.floor(Math.random() * musiclist.length)]
    var audio = new Audio(musictoplay)
    audio.play()
}
function stopmusic() {
    audio.pause()
}
function resumemusic() {
    audio.play()
}
function botstart() {
    Client0 = new OJS.Client({reconnect: false});
    Client1 = new OJS.Client({reconnect: false});
    Client2 = new OJS.Client({reconnect: false});
    Client3 = new OJS.Client({reconnect: false});

    Client0.on("join", () => {settool(8);});
    Client1.on("join", () => {settool(8);});
    Client2.on("join", () => {settool(8);});
    Client3.on("join", () => {settool(8);});
}
function botstop() {
    Client0.world.destroy()
    Client1.world.destroy()
    Client2.world.destroy()
    Client3.world.destroy()
}
function randomnum(number) {
  var result = Math.floor(Math.random()*number);
  return result;
}
function createSocket() {
    var bot4 = new OJS.Client({reconnect: false});
}
function closeSocket() {
    botstop()
}
function follow() {
    followLoop = setInterval(followint, 1)
}
function unfollow() {
    clearInterval(followLoop);
}
function followint(){
    var posx = OWOP.mouse.tileX
    var posy = OWOP.mouse.tileY
    if(followtype == "1"){
        Client0.world.move(x = posx-3, y = posy)
        Client1.world.move(x = posx+3, y = posy)
        Client2.world.move(x = posx, y = posy+3)
        Client3.world.move(x = posx, y = posy-3)
    }
    if(followtype == "2"){
        Client0.world.move(x = posx+3, y = posy+3)
        Client1.world.move(x = posx-3, y = posy+3)
        Client2.world.move(x = posx+3, y = posy-3)
        Client3.world.move(x = posx-3, y = posy-3)
    }
    if(followtype == "3"){
        Client0.world.move(x = posx+3, y = posy+3)
        Client1.world.move(x = posx+6, y = posy)
        Client2.world.move(x = posx-3, y = posy+3)
        Client3.world.move(x = posx-6, y = posy)
    }
    if(followtype == "4"){
        Client0.world.move(x = posx+3, y = posy)
        Client1.world.move(x = posx+6, y = posy)
        Client2.world.move(x = posx-3, y = posy)
        Client3.world.move(x = posx-6, y = posy)
    }
}
function openInNewTab(url) {
 window.open(url, '_blank').focus();
}
function reloadpage(){
    location.reload()
}
function loadtools(){
    OWOP.tool.addToolObject(new OWOP.tool.class('Chess Tool', OWOP.cursors.wand, OWOP.fx.player.NONE, OWOP.RANK.USER, function(tool) {
                        tool.extra.tickAmount = 32;
                        var queue = [];
                        var fillingColor = null;
                        var defaultFx = OWOP.fx.player.RECT_SELECT_ALIGNED(1);
                        tool.setFxRenderer(function(fx, ctx, time) {
                            ctx.globalAlpha = 0.8;
                            ctx.strokeStyle = fx.extra.player.htmlRgb;
                            var z = OWOP.camera.zoom;
                            if (!fillingColor || !fx.extra.isLocalPlayer)
                                defaultFx(fx, ctx, time);
                            else {
                                ctx.beginPath();
                                for (var i = 0; i < queue.length; i++)
                                    ctx.rect((queue[i][0] - OWOP.camera.x) * z, (queue[i][1] - OWOP.camera.y) * z, z, z);
                                ctx.stroke();
                            }
                        });
                        function tick() {
                            var eq = function eq(a, b) {
                                return a && b && a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
                            };
                            var slientCheck = function slientCheck(x, y) {
                                return eq(OWOP.world.getPixel(x, y), fillingColor);
                            };
                            var check = function check(x, y) {
                                if (slientCheck(x, y)) {
                                    queue.unshift([x, y]);
                                    return true;
                                }
                                return false;
                            };

                            if (!queue.length || !fillingColor) {
                                return;
                            }

                            var selClr = OWOP.player.selectedColor;
                            var painted = 0;
                            var tickAmount = tool.extra.tickAmount;
                            for (var painted = 0; painted < tickAmount && queue.length; painted++) {
                                var current = queue.pop();
                                var x = current[0];
                                var y = current[1];
                                var thisClr = OWOP.world.getPixel(x, y);
                                if (eq(thisClr, fillingColor) && !eq(thisClr, selClr)) {

                                    if (!OWOP.world.setPixel(x, y, selClr)) {
                                        queue.push(current);
                                       break;
                                    }

                                    var top = slientCheck(x, y - 1);
                                    var bottom = slientCheck(x, y + 1);
                                    var left = slientCheck(x - 1, y);
                                    var right = slientCheck(x + 1, y);

                                    if (top && left) {
                                        check(x - 1, y - 1);
                                    }
                                    if (top && right) {
                                        check(x + 1, y - 1);
                                    }
                                    if (bottom && left) {
                                        check(x - 1, y + 1);
                                    }
                                    if (bottom && right) {
                                        check(x + 1, y + 1);
                                    }

                                }
                            }
                        }
                        tool.setEvent('mousedown', function(mouse) {
                            if (!(mouse.buttons & 4)) {
                                fillingColor = OWOP.world.getPixel(mouse.tileX, mouse.tileY);
                                if (fillingColor) {
                                    queue.push([mouse.tileX, mouse.tileY]);
                                    tool.setEvent('tick', tick);
                                }
                            }
                        });
                        tool.setEvent('mouseup deselect', function(mouse) {
                            if (!mouse || !(mouse.buttons & 1)) {
                                fillingColor = null;
                                queue = [];
                                tool.setEvent('tick', null);
                            }
                        });
                    }));
    OWOP.tool.addToolObject(new OWOP.tool.class('Fast 6x6', OWOP.cursors.cursor, OWOP.fx.player.RECT_SELECT_ALIGNED(6), false, function(tool) {
    tool.setEvent('mousemove mousedown', function(mouse, event){
        if(mouse.buttons === 1){
            var antx = Math.floor(OWOP.mouse.tileX/16)
            var anty = Math.floor(OWOP.mouse.tileY/16)
            var verx = antx*16
            var very = anty*16
            var myid = OWOP.player.id
            var brushercolor = OWOP.player.selectedColor
            var xpos = OWOP.mouse.tileX
            var ypos = OWOP.mouse.tileY

            OWOP.world.setPixel(xpos+1, ypos+1, brushercolor, 0)
            OWOP.world.setPixel(xpos+1, ypos+2, brushercolor, 0)
            OWOP.world.setPixel(xpos+1, ypos+3, brushercolor, 0)
            OWOP.world.setPixel(xpos+1, ypos+4, brushercolor, 0)
            OWOP.world.setPixel(xpos+1, ypos+5, brushercolor, 0)
            OWOP.world.setPixel(xpos+1, ypos+6, brushercolor, 0)
            OWOP.world.setPixel(xpos+2, ypos+1, brushercolor, 0)
            OWOP.world.setPixel(xpos+2, ypos+3, brushercolor, 0)
            OWOP.world.setPixel(xpos+2, ypos+2, brushercolor, 0)
            OWOP.world.setPixel(xpos+2, ypos+3, brushercolor, 0)
            OWOP.world.setPixel(xpos+2, ypos+5, brushercolor, 0)
            OWOP.world.setPixel(xpos+2, ypos+6, brushercolor, 0)
            OWOP.world.setPixel(xpos+2, ypos+4, brushercolor, 0)
            OWOP.world.setPixel(xpos+5, ypos+3, brushercolor, 0)
            OWOP.world.setPixel(xpos+6, ypos+6, brushercolor, 0)

            Client0.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+2, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+3, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+4, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+5, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+6, brushercolor, false)
            Client0.world.setPixel(xpos+2, ypos+1, brushercolor, false)
            Client0.world.setPixel(xpos+2, ypos+2, brushercolor, false)
    
            Client1.world.setPixel(xpos+2, ypos+4, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+5, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+6, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+1, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+2, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+3, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+4, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+5, brushercolor, false)
    
            Client2.world.setPixel(xpos+4, ypos+1, brushercolor, false)
            Client2.world.setPixel(xpos+4, ypos+2, brushercolor, false)
            Client2.world.setPixel(xpos+4, ypos+3, brushercolor, false)
            Client2.world.setPixel(xpos+4, ypos+4, brushercolor, false)
            Client2.world.setPixel(xpos+4, ypos+5, brushercolor, false)
            Client2.world.setPixel(xpos+4, ypos+6, brushercolor, false)
            Client2.world.setPixel(xpos+5, ypos+1, brushercolor, false)
            Client2.world.setPixel(xpos+5, ypos+2, brushercolor, false)
    
            Client3.world.setPixel(xpos+5, ypos+4, brushercolor, false)
            Client3.world.setPixel(xpos+5, ypos+5, brushercolor, false)
            Client3.world.setPixel(xpos+5, ypos+6, brushercolor, false)
            Client3.world.setPixel(xpos+6, ypos+1, brushercolor, false)
            Client3.world.setPixel(xpos+6, ypos+2, brushercolor, false)
            Client3.world.setPixel(xpos+6, ypos+3, brushercolor, false)
            Client3.world.setPixel(xpos+6, ypos+4, brushercolor, false)
            Client3.world.setPixel(xpos+6, ypos+5, brushercolor, false)
        }
    });
}));
OWOP.tool.addToolObject(new OWOP.tool.class('SigmaVoid 2x2 rewrite', OWOP.cursors.brush, OWOP.fx.player.RECT_SELECT_ALIGNED(2), false, function(tool) {
    tool.setEvent('mousemove mousedown', function(mouse, event){
        if(mouse.buttons === 1){
            var antx = Math.floor(OWOP.mouse.tileX/8)
            var anty = Math.floor(OWOP.mouse.tileY/8)
            var verx = antx*8
            var very = anty*8
            var brushercolor = OWOP.player.selectedColor
            var xpos = OWOP.mouse.tileX
            var ypos = OWOP.mouse.tileY

            OWOP.world.setPixel(xpos+1, ypos, brushercolor, false)
            OWOP.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            OWOP.world.setPixel(xpos+2, ypos, brushercolor, false)
            OWOP.world.setPixel(xpos+2, ypos+1, brushercolor, false)

            Client0.world.setPixel(xpos+1, ypos, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            Client0.world.setPixel(xpos+2, ypos, brushercolor, false)
            Client0.world.setPixel(xpos+2, ypos+1, brushercolor, false)

            Client1.world.setPixel(xpos+1, ypos, brushercolor, false)
            Client1.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            Client1.world.setPixel(xpos+2, ypos, brushercolor, false)
            Client1.world.setPixel(xpos+2, ypos+1, brushercolor, false)

            Client2.world.setPixel(xpos+1, ypos, brushercolor, false)
            Client2.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            Client2.world.setPixel(xpos+2, ypos, brushercolor, false)
            Client2.world.setPixel(xpos+2, ypos+1, brushercolor, false)

            Client3.world.setPixel(xpos+1, ypos, brushercolor, false)
            Client3.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            Client3.world.setPixel(xpos+2, ypos, brushercolor, false)
            Client3.world.setPixel(xpos+2, ypos+1, brushercolor, false)
        }
    });
}));
    OWOP.tool.addToolObject(new OWOP.tool.class('SigmaVoid 6x6 rewrite', OWOP.cursors.wand, OWOP.fx.player.RECT_SELECT_ALIGNED(6), false, function(tool) {
    tool.setEvent('mousemove mousedown', function(mouse, event){
        if(mouse.buttons === 1){
            settool(8)
            var antx = Math.floor(OWOP.mouse.tileX/8)
            var anty = Math.floor(OWOP.mouse.tileY/8)
            var verx = antx*8
            var very = anty*8
            var brushercolor = OWOP.player.selectedColor
            var xpos = OWOP.mouse.tileX
            var ypos = OWOP.mouse.tileY
            
            Client0.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+2, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+2, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+3, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+4, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+5, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+6, brushercolor, false)
            Client0.world.setPixel(xpos+2, ypos+1, brushercolor, false)
            Client0.world.setPixel(xpos+2, ypos+2, brushercolor, false)
            Client0.world.setPixel(xpos+2, ypos+3, brushercolor, false)
            Client0.world.setPixel(xpos+2, ypos+3, brushercolor, false)

            Client1.world.setPixel(xpos+2, ypos+4, brushercolor, false)
            Client1.world.setPixel(xpos+1, ypos+3, brushercolor, false)
            Client1.world.setPixel(xpos+1, ypos+4, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+5, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+6, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+1, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+2, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+3, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+4, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+5, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+6, brushercolor, false)

            Client2.world.setPixel(xpos+4, ypos+1, brushercolor, false)
            Client2.world.setPixel(xpos+1, ypos+5, brushercolor, false)
            Client2.world.setPixel(xpos+1, ypos+6, brushercolor, false)
            Client2.world.setPixel(xpos+4, ypos+2, brushercolor, false)
            Client2.world.setPixel(xpos+4, ypos+3, brushercolor, false)
            Client2.world.setPixel(xpos+4, ypos+4, brushercolor, false)
            Client2.world.setPixel(xpos+4, ypos+5, brushercolor, false)
            Client2.world.setPixel(xpos+4, ypos+6, brushercolor, false)
            Client2.world.setPixel(xpos+5, ypos+1, brushercolor, false)
            Client2.world.setPixel(xpos+5, ypos+2, brushercolor, false)
            Client2.world.setPixel(xpos+5, ypos+3, brushercolor, false)

            Client3.world.setPixel(xpos+5, ypos+4, brushercolor, false)
            Client3.world.setPixel(xpos+2, ypos+1, brushercolor, false)
            Client3.world.setPixel(xpos+2, ypos+2, brushercolor, false)
            Client3.world.setPixel(xpos+5, ypos+5, brushercolor, false)
            Client3.world.setPixel(xpos+5, ypos+6, brushercolor, false)
            Client3.world.setPixel(xpos+6, ypos+1, brushercolor, false)
            Client3.world.setPixel(xpos+6, ypos+2, brushercolor, false)
            Client3.world.setPixel(xpos+6, ypos+3, brushercolor, false)
            Client3.world.setPixel(xpos+6, ypos+4, brushercolor, false)
            Client3.world.setPixel(xpos+6, ypos+5, brushercolor, false)
            Client3.world.setPixel(xpos+6, ypos+6, brushercolor, false)
        }
    });
}));
    OWOP.tool.addToolObject(new OWOP.tool.class('3x3', OWOP.cursors.cursor, OWOP.fx.player.RECT_SELECT_ALIGNED(2), false, function(tool) {
    tool.setEvent('mousemove mousedown', function(mouse, event){
        if(mouse.buttons === 1){
            var antx = Math.floor(OWOP.mouse.tileX/2)
            var anty = Math.floor(OWOP.mouse.tileY/2)
            var verx = antx*2
            var very = anty*2
            var xpos = OWOP.mouse.tileX
            var ypos = OWOP.mouse.tileY
            var brushercolor = OWOP.player.selectedColor

            OWOP.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            OWOP.world.setPixel(xpos+1, ypos+2, brushercolor, false)
            OWOP.world.setPixel(xpos+1, ypos+3, brushercolor, false)
            OWOP.world.setPixel(xpos+2, ypos+1, brushercolor, false)
            OWOP.world.setPixel(xpos+2, ypos+2, brushercolor, false)
            OWOP.world.setPixel(xpos+2, ypos+3, brushercolor, false)
            OWOP.world.setPixel(xpos+3, ypos+1, brushercolor, false)
            OWOP.world.setPixel(xpos+3, ypos+2, brushercolor, false)
            OWOP.world.setPixel(xpos+3, ypos+3, brushercolor, false)

            Client0.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+2, brushercolor, false)
            Client0.world.setPixel(xpos+1, ypos+3, brushercolor, false)
            Client0.world.setPixel(xpos+2, ypos+1, brushercolor, false)
            Client0.world.setPixel(xpos+2, ypos+2, brushercolor, false)
            Client0.world.setPixel(xpos+2, ypos+3, brushercolor, false)
            Client0.world.setPixel(xpos+3, ypos+1, brushercolor, false)
            Client0.world.setPixel(xpos+3, ypos+2, brushercolor, false)
            Client0.world.setPixel(xpos+3, ypos+3, brushercolor, false)

            Client1.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            Client1.world.setPixel(xpos+1, ypos+2, brushercolor, false)
            Client1.world.setPixel(xpos+1, ypos+3, brushercolor, false)
            Client1.world.setPixel(xpos+2, ypos+1, brushercolor, false)
            Client1.world.setPixel(xpos+2, ypos+2, brushercolor, false)
            Client1.world.setPixel(xpos+2, ypos+3, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+1, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+2, brushercolor, false)
            Client1.world.setPixel(xpos+3, ypos+3, brushercolor, false)

            Client2.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            Client2.world.setPixel(xpos+1, ypos+2, brushercolor, false)
            Client2.world.setPixel(xpos+1, ypos+3, brushercolor, false)
            Client2.world.setPixel(xpos+2, ypos+1, brushercolor, false)
            Client2.world.setPixel(xpos+2, ypos+2, brushercolor, false)
            Client2.world.setPixel(xpos+2, ypos+3, brushercolor, false)
            Client2.world.setPixel(xpos+3, ypos+1, brushercolor, false)
            Client2.world.setPixel(xpos+3, ypos+2, brushercolor, false)
            Client2.world.setPixel(xpos+3, ypos+3, brushercolor, false)

            Client3.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            Client3.world.setPixel(xpos+1, ypos+2, brushercolor, false)
            Client3.world.setPixel(xpos+1, ypos+3, brushercolor, false)
            Client3.world.setPixel(xpos+2, ypos+1, brushercolor, false)
            Client3.world.setPixel(xpos+2, ypos+2, brushercolor, false)
            Client3.world.setPixel(xpos+2, ypos+3, brushercolor, false)
            Client3.world.setPixel(xpos+3, ypos+1, brushercolor, false)
            Client3.world.setPixel(xpos+3, ypos+2, brushercolor, false)
            Client3.world.setPixel(xpos+3, ypos+3, brushercolor, false)
        }
    });
}));
}
function loadmodtools(){
    OWOP.tool.addToolObject(new OWOP.tool.class('Protector tool', OWOP.cursors.shield, OWOP.fx.player.RECT_SELECT_ALIGNED(16), false, function(tool) {
    tool.setEvent('mousemove mouseup', function(mouse, event){
        if(mouse.buttons === 1){
            OWOP.player.selectedColor = [0,255,0]
        }
    })
}));

}
