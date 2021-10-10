// ==UserScript==
// @name         𝓘𝓬𝓮𝓓𝓯𝓲𝓻𝓮 𝓞𝓦𝓞𝓟 𝓑𝓸𝓽
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  IceDfire
// @author       scar17off#4195
// @match        https://ourworldofpixels.com/*
// @match        http://ourworldofpixels.com/*
// @match        *://ourworldofpixels.com/*
// @match        https://owop.me
// @match        https://owop.me/*
// @grant        none
// @code         NsqXTThLXvXTTsqhXTTLXv
// ==/UserScript==

if(!OWOP.tool){
    OWOP.tool = OWOP.tools;
};
if(!OWOP.tools){
    OWOP.tools = OWOP.tool;
};

var versionBoxx = document.createElement("span");
versionBoxx.textContent = "𝓘𝓬𝓮𝓓𝓯𝓲𝓻𝓮 𝓞𝓦𝓞𝓟 𝓑𝓸𝓽";
versionBoxx.className = "framedf whitetext";
versionBoxx.style.position = "absolute";
versionBoxx.style.top = "-4px";
versionBoxx.style.right = "200px";
document.body.appendChild(versionBoxx);

function append(src, onload) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = onload;
    document.body.appendChild(s);
};
append("https://raw.githack.com/Olical/EventEmitter/master/EventEmitter.min.js", () => {
    function Bucket(rate, time) {
            this.lastCheck = Date.now();
            this.allowance = rate;
            this.rate = rate;
            this.time = time;
            this.infinite = false;
        }

        Bucket.prototype.canSpend = function (count) {
            if (this.infinite) {
                return true;
            }
            this.allowance += (Date.now() - this.lastCheck) / 1000 * (this.rate / this.time);
            this.lastCheck = Date.now();
            if (this.allowance > this.rate) {
                this.allowance = this.rate;
            }
            if (this.allowance < count) {
                return false;
            }
            this.allowance -= count;
            return true;
        };
var OJS = class extends EventEmitter {
            //  Options: "no_log", "ws", "origin", "agent", "index"
            constructor(options) {
                super();
                let init = {};
                let that = this;
        
                if (!options.ws) options.ws = OWOP.options.serverAddress[0].url;
        
                if (options.origin) init.origin = options.origin;
                if (options.agent) init.agent = options.agent;
                const OJS = this;
        
                this.ws = new WebSocket(options.ws, null, init);
                this.ws.binaryType = 'arraybuffer';
                this.RANKS = {
                    ADMIN: 3,
                    MOD: 2,
                    USER: 1,
                    NONE: 0
                };
                this.options = {
                    isJoined: false,
                    id: options.ind,
                    ind: options.ind,
                    index: options.ind,
                    busy: false,
                    canSay: true,
                    tickAmount: 30,
                    special: 0,
                    class: null,
                    chunkSize: 16,
                    netUpdateSpeed: 20,
                    clusterChunkAmount: 64,
                    maxWorldNameLength: 24,
                    worldBorder: 0xFFFFF,
                    chatBucket: [4, 6],
                    captchaState: {
                        CA_WAITING: 0,
                        CA_VERIFYING: 1,
                        CA_VERIFIED: 2,
                        CA_OK: 3,
                        CA_INVALID: 4
                    },
                    captchaNames: {
                        0: "WAITING",
                        1: "VERIFYING",
                        2: "VERIFIED",
                        3: "OK",
                        4: "INVALID"
                    },
                    tools: {
                        id: {
                            'cursor': 0,
                            'move': 1,
                            'pipette': 2,
                            'eraser': 3,
                            'zoom': 4,
                            'fill': 5,
                            'paste': 6,
                            'export': 7,
                            'line': 8,
                            'protect': 9
                        },
                        0: 'cursor',
                        1: 'move',
                        2: 'pipette',
                        3: 'eraser',
                        4: 'zoom',
                        5: 'fill',
                        6: 'paste',
                        7: 'export',
                        8: 'line',
                        9: 'protect'
                    },
                    misc: {
                        worldVerification: OWOP.options.serverAddress[0].proto.misc.worldVerification,
                        chatVerification: OWOP.options.serverAddress[0].proto.misc.chatVerification,
                        tokenVerification: OWOP.options.serverAddress[0].proto.misc.tokenVerification
                    },
                    opCode: {
                        setId: 0,
                        worldUpdate: 1,
                        chunkLoad: 2,
                        teleport: 3,
                        setRank: 4,
                        captcha: 5,
                        setPQuota: 6,
                        chunkProtected: 7
                    }
                };
                this.chat = {
                    recvModifier: msg => msg,
                    sendModifier: msg => msg,
                    send: msg => OJS.ws.send(OJS.chat.sendModifier(msg) + OJS.options.misc.chatVerification),
                    sendWS: msg => {
                        OJS.ws.send(msg)
                    },
                    firstdata: () => OJS.chat.history[0],
                    lastdata: () => OJS.chat.history[OJS.chat.history.length - 1],
                    history: []
                };
                this.world = {
                    join: (world = "main") => {
                        if (OJS.ws.readyState !== 1) OJS.ws = new WebSocket(options.ws, null, init);
                        let ints = [];
                        world = world.toLowerCase();
        
                        for (let i = 0; i < world.length && i < 24; i++) {
                            let charCode = world.charCodeAt(i);
                            if ((charCode < 123 && charCode > 96) || (charCode < 58 && charCode > 47) || charCode === 95 || charCode === 46) {
                                ints.push(charCode);
                            }
                        }
                        let array = new ArrayBuffer(ints.length + 2);
                        let dv = new DataView(array);
                        for (let i = ints.length; i--;) {
                            dv.setUint8(i, ints[i]);
                        }
                        dv.setUint16(ints.length, OJS.options.misc.worldVerification, true);
                        OJS.ws.send(array);
                        OJS.utils.log("Joining world: " + world);
                        OJS.emit(OJS.events.CONNECT);
                        OJS.world.name = world;
                        OJS.options.isJoined = true;
                        return true;
                    },
                    leave: () => {
                        OJS.ws.close()
                    },
                    move: (x, y) => {
                        if (this.ws.readyState !== 1) return;
                        let array = new ArrayBuffer(12);
                        let dv = new DataView(array);
        
                        dv.setInt32(0, 16 * x, true);
                        dv.setInt32(4, 16 * y, true);
                        dv.setUint8(8, OWOP.player.selectedColor[0]);
                        dv.setUint8(9, OWOP.player.selectedColor[1]);
                        dv.setUint8(10, OWOP.player.selectedColor[2]);
                        if(randomfollowtoolenabled) {
                            if(location.href == "http://augustberchelmann.com/owop/#main") dv.setUint8(11, getRandomInt(1,14))
                            else {dv.setUint8(11, OJS.options.tools.id[getRandomInt(1,10)]);};
                        } else{dv.setUint8(11, OJS.options.tools.id[OWOP.player.tool.id]);};
                        OJS.ws.send(array);
                        OJS.player.x = Math.round(16 * x);
                        OJS.player.y = Math.round(16 * y);
                    },
                    setPixel: async function (x = OJS.player.x, y = OJS.player.y, color = OJS.player.color) {
                        let c = OWOP.world.getPixel(x, y);
                        //if(isProtected(x, y)) return;
                        if (c) if (c[0] === color[0] && c[1] === color[1] && c[2] === color[2]) return;
                        OJS.world.move(x, y);
                        if (!OJS.utils.bucket.canSpend(1)) return false;
                        let array = new ArrayBuffer(11);
                        let dv = new DataView(array);
        
                        dv.setInt32(0, x, true);
                        dv.setInt32(4, y, true);
                        dv.setUint8(8, color[0]);
                        dv.setUint8(9, color[1]);
                        dv.setUint8(10, color[2]);
                        OJS.player.color = [color[0], color[1], color[2]];
        
                        OJS.ws.send(array);
                        return true;
                    },
                    clearChunk: (x = OJS.player.x, y = OJS.player.y) => {
                        if (OJS.player.rank >= OJS.RANKS.MOD) {
                            let array = new ArrayBuffer(9);
                            let dv = new DataView(array);
                            dv.setInt32(0, x, true);
                            dv.setInt32(4, y, true);
                            OJS.ws.send(array);
                            return true;
                        } else {
                            console.error("[ERROR]: You are not admin!");
                            return false
                        }
                    },
                    setColor: function (rgb) {
                        if (typeof rgb !== "object") return OJS.utils.log(`Please use array.`);
                        let array = new ArrayBuffer(12);
                        let dv = new DataView(array);
                        dv.setInt32(0, OJS.player.x, true);
                        dv.setInt32(4, OJS.player.y, true);
                        dv.setUint8(8, rgb[0]);
                        dv.setUint8(9, rgb[1]);
                        dv.setUint8(10, rgb[2]);
                        dv.setUint8(11, OJS.player.tool);
                        OJS.ws.send(array);
                        OJS.player.color = [rgb[0], rgb[1], rgb[2]];
                    },
                    setTool: function (toolId) {
                        let array = new ArrayBuffer(12);
                        let dv = new DataView(array);
                        dv.setInt32(0, OJS.player.x, true);
                        dv.setInt32(4, OJS.player.y, true);
                        dv.setUint8(8, OJS.player.color[0]);
                        dv.setUint8(9, OJS.player.color[1]);
                        dv.setUint8(10, OJS.player.color[2]);
                        dv.setUint8(11, toolId);
                        OJS.ws.send(array);
                        OJS.player.tool = toolId;
                    },
                    protectChunk: function (x, y, newState) {
                        if (OJS.player.rank >= OJS.RANKS.MOD) {
                            let array = new ArrayBuffer(10);
                            let dv = new DataView(array);
                            dv.setInt32(0, x, true);
                            dv.setInt32(4, y, true);
                            dv.setUint8(8, newState);
                            OJS.ws.send(array);
                        } else {
                            console.error("[ERROR]: No permission.")
                        }
                    },
                    getPixel: OWOP.world.getPixel,
                    name: null
                };
                this.player = {
                    id: 0,
                    rank: 1,
                    x: 0,
                    y: 0,
                    color: [0, 0, 0],
                    tool: 1
                };
                this.players = {};
                this.utils = {
                    bucket: new Bucket(32, 4),
                    log: msg => {
                        if (!options.no_log && msg[0] !== "[" && isNaN(parseInt(msg[0]))) console.log(`${options.index ? `(${options.index}) ` : ""}` + `[OWOP.js]: ${msg}`)
                    },
                    dataHandler: async data => {
                        if (typeof data !== "object") return;
                        let op = OJS.options.opCode;
                        data = new DataView(data);
                        switch (data.getUint8(0)) {
                            case op.setId:
                                OJS.player.id = data.getUint32(1);
                                OJS.utils.log(`Joined world ${OJS.world.name}, your ID is: ${data.getUint32(1)}.`);
                                OJS.emit(OJS.events.ID, OJS.player.id);
                                break;
                            case op.worldUpdate:
                                let updated = false;
                                let updates = {};
                                for (let i = data.getUint8(1); i--;) {
                                    updated = true;
                                    let pid = data.getUint32(2 + i * 16);
                                    let pmx = data.getUint32(2 + i * 16 + 4);
                                    let pmy = data.getUint32(2 + i * 16 + 8);
                                    let pr = data.getUint8(2 + i * 16 + 12);
                                    let pg = data.getUint8(2 + i * 16 + 13);
                                    let pb = data.getUint8(2 + i * 16 + 14);
                                    let ptool = data.getUint8(2 + i * 16 + 15);
                                    updates[pid] = {
                                        x: pmx,
                                        y: pmy,
                                        rgb: [pr, pg, pb],
                                        tool: OJS.options.tools[ptool]
                                    };
                                    OJS.players[pid] = {
                                        x: updates[pid].x >> 4,
                                        y: updates[pid].y >> 4,
                                        rgb: updates[pid].rgb,
                                        tool: updates[pid].tool
                                    };
                                }
                                if (updated) OJS.emit(OJS.events.UPDATE, updates);
                                break;
                            case op.setRank:
                                OJS.utils.log(`Got rank ${data.getUint8(1)}`);
                                OJS.player.rank = data.getUint8(1);
                                OJS.emit(OJS.events.RANK, OJS.player.rank);
                                break;
                            case op.captcha:
                                console.log(OJS.options.captchaNames[data.getUint8(1)]);
                                switch(data.getUint8(1)) {
                                    case OJS.options.captchaState.CA_WAITING:
                                        this.options.captcha = true;
                                        if(!localStorage.owopcaptcha) OJS.ws.send(OWOP.options.serverAddress[0].proto.misc.tokenVerification + await renderCaptcha())
                                        else OJS.ws.send(`CaptchALETMEINPLZ${localStorage.owopcaptcha}`);
                                        break;
                                    case OJS.options.captchaState.CA_OK:
                                        OJS.world.join(OWOP.world.name);
                                };
                                OJS.emit(OJS.events.CAPTCHA);
                                break;
                            case op.teleport:
                                let x = data.getInt32(1, !0),
                                    y = data.getInt32(5, !0);
                                OJS.emit(OJS.events.TELEPORT, x, y);
                                break;
                            case op.setPQuota:
                                let rate = data.getUint16(1, !0),
                                    time = data.getUint16(3, !0);
                                OJS.utils.bucket = new Bucket(rate, time);
                                OJS.emit(OJS.events.PQUOTA, rate, time);
                                OJS.utils.log(`Got new PQuota: ${rate}x${time}.`);
                                break;
                        }
                    }
                };
                this.events = {
                    CONNECT: 0,
                    data: 1,
                    ID: 2,
                    RANK: 3,
                    DISCONNECT: 4,
                    UPDATE: 5,
                    TELEPORT: 6,
                    CAPTCHA: 7,
                    PQUOTA: 8,
                    CHUNK: 9
                };
                this.ws.onopen = () => {
                    this.emit("open")
                };
                this.ws.onmessage = msg => {
                    OJS.utils.dataHandler(msg.data);
                    if (typeof msg.data !== "string") return;
                    if (msg.data.startsWith('<')) return;
                    OJS.utils.log(OJS.chat.recvModifier(msg.data));
                    this.emit("data", OJS.chat.recvModifier(msg.data));
                };
                this.ws.onclose = () => {
                    clearInterval(pqi);
                    if(!AutoReconnect) //OWOP.chat.local(`[${options.ind}]: Closed connection.`)
                        BOTS = BOTS.filter(i => i.options.ind !== options.ind);
                    console.log(`[OWOP.js]: Disconnected.`);
                    if(AutoReconnect) BOTS.push(new struct(options));
                    this.emit("close")
                };
            };
        };
    

function icedfire() {
	console.log("IceDfire OWOP Bot loaded!")
	var playercolor = OWOP.player.selectedcolor
	OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("𝓘𝓬𝓮𝓓𝓯𝓲𝓻𝓮 𝓞𝓦𝓞𝓟 𝓑𝓸𝓽", {closeable: true}, function(win0) {
        win0.container.style.height = 'auto';
        win0.container.style.width = '700px';
        win0.container.style.overflow = 'hidden';
        var button0 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Connect</p2>',
            onclick: function() {
                botstart()
            }
        });
        var button1 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Disconnect</p2>',
            onclick: function() {
                botstop()
            }
        });
        var button2 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Enable tool follow</p2>',
            onclick: function() {
              starttoolfollowint()  
            }
        });
        var button3 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Disable tool follow</p2>',
            onclick: function() {
                stoptoolfollowint() 
            }
        });
        var button4 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Auto Reconnect</p2>',
            onclick: function() {
                autoreconnect()
            }
        });
        var button5 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Follow</p2>',
            onclick: function() {
                follow()
            }
        });
        var button6 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Unfollow</p2>',
            onclick: function() {
                unfollow()
            }
        });
        var button7 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Image paster</p2>',
            onclick: function() {
            }
        });
        var button8 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Bot settings</p2>',
            onclick: function() {
                botsettings()
            }
        });
        var button9 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Connect with captcha</p2>',
            onclick: function() {
                botstart()
            }
        });
        var button10 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Pixel Voider</p2>',
            onclick: function() {
               pixelvoider()
            }
        });
        var button11 = OWOP.util.mkHTML('button', { id: 'voidbutton', innerHTML: '<p2>Reload IceDfire</p2>',
            onclick: function() {
                reloadpage()
            }
        });
	win0.addObj(button0)
	win0.addObj(button1)
	win0.addObj(button2)
    win0.addObj(button3)
    win0.addObj(button4)
    win0.addObj(button5)
    win0.addObj(button6)
    win0.addObj(button7)
    win0.addObj(button8)
    win0.addObj(button9)
    win0.addObj(button10)
    win0.addObj(button10)
}).move(window.innerWidth - 600, 32));
}
function botsettings() {
    var playercolor = OWOP.player.selectedcolor
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("𝓘𝓬𝓮𝓓𝓯𝓲𝓻𝓮 𝓑𝓸𝓽 𝓢𝓮𝓽𝓽𝓲𝓷𝓰𝓼", {closeable: true}, function(win1) {
        win1.container.style.height = 'auto';
        win1.container.style.width = '300px';
        win1.container.style.overflow = 'hidden';
        win1.addObj(document.createTextNode('Follow type:'));
        var inputx1 = OWOP.util.mkHTML('input', {
            id: 'x1input',
            oninput: function() {
                x1 = parseInt(this.value);
            }
        });
    win1.addObj(inputx1)
}).move(window.innerWidth - 600, 32));
}
///////////////////////////////////////
function follow() {
    followLoop = setInterval(followint, 1)
}
function unfollow() {
    clearInterval(followLoop);
}
function followint(){
    var posx = OWOP.mouse.tileX
    var posy = OWOP.mouse.tileY
    var followtype = x1
    if(followtype == "1"){
        Client0.world.move(x = posx+3, y = posy-3)
        Client1.world.move(x = posx-3, y = posy+3)
        Client2.world.move(x = posx, y = posy+3)
        Client3.world.move(x = posx, y = posy-3)
    }
    if(followtype == "2"){
        Client0.world.move(x = posx-3, y = posy)
        Client1.world.move(x = posx+3, y = posy)
        Client2.world.move(x = posx, y = posy+3)
        Client3.world.move(x = posx, y = posy-3)
    }
    if(followtype == "3"){
        Client0.world.move(x = posx+3, y = posy+3)
        Client1.world.move(x = posx-3, y = posy+3)
        Client2.world.move(x = posx+3, y = posy-3)
        Client3.world.move(x = posx-3, y = posy-3)
    }
    if(followtype == "4"){
        Client0.world.move(x = posx+3, y = posy+3)
        Client1.world.move(x = posx+6, y = posy+6)
        Client2.world.move(x = posx-3, y = posy-3)
        Client3.world.move(x = posx-6, y = posy-6)
    }
    if(followtype == "5"){
        Client0.world.move(x = posx+3, y = posy-3)
        Client1.world.move(x = posx+6, y = posy-6)
        Client2.world.move(x = posx-3, y = posy+3)
        Client3.world.move(x = posx-6, y = posy+6)
    }
    if(followtype == "6"){
        Client0.world.move(x = posx-3, y = posy-3)
        Client1.world.move(x = posx-6, y = posy-6)
        Client2.world.move(x = posx+3, y = posy+3)
        Client3.world.move(x = posx+6, y = posy+6)
        Client0.world.move(x = posx+3, y = posy+3)
        Client1.world.move(x = posx+6, y = posy+6)
        Client2.world.move(x = posx-3, y = posy-3)
        Client3.world.move(x = posx-6, y = posy-6)
    }
    if(followtype == "7"){
        Client0.world.move(x = posx+3, y = posy+3)
        Client1.world.move(x = posx+6, y = posy+6)
        Client2.world.move(x = posx-3, y = posy+3)
        Client3.world.move(x = posx-6, y = posy+6)
    }
    if(followtype == "8"){
        Client0.world.move(x = posx+3, y = posy+3)
        Client1.world.move(x = posx+6, y = posy)
        Client2.world.move(x = posx-3, y = posy+3)
        Client3.world.move(x = posx-6, y = posy)
    }
    if(followtype == "9"){
        Client0.world.move(x = posx+3, y = posy)
        Client1.world.move(x = posx+6, y = posy)
        Client2.world.move(x = posx-3, y = posy)
        Client3.world.move(x = posx-6, y = posy)
    }
}
function stoptoolfollowint(){
	clearInterval(toolfollow)
}
function starttoolfollowint(){
	toolfollow = setInterval(function() {
		var playerselectedtool = OWOP.player.toolId
		settool(playerselectedtool)
	}, 1);
}
function createSocket(){
	sock = new OJS({ws: OWOP.options.serverAddress[0].url, origin: location.href});
}
function closeSocket(){
	sock.world.destroy()
}
function sleep(ms) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < ms);
}
function botstart() {
    Client0 = new OJS({ws: OWOP.options.serverAddress[0].url, origin: location.href});
    Client1 = new OJS({ws: OWOP.options.serverAddress[0].url, origin: location.href});
    Client2 = new OJS({ws: OWOP.options.serverAddress[0].url, origin: location.href});
    Client3 = new OJS({ws: OWOP.options.serverAddress[0].url, origin: location.href});
    var playerselectedtool = OWOP.player.toolId
    Client0.on("join", () => {settool(playerselectedtool)});
    Client1.on("join", () => {settool(playerselectedtool)});
    Client2.on("join", () => {settool(playerselectedtool)});
    Client3.on("join", () => {settool(playerselectedtool)});
}
function botstop() {
    Client0.world.destroy()
    Client1.world.destroy()
    Client2.world.destroy()
    Client3.world.destroy()
}
function randomnum(num) {
  var result = Math.floor(Math.random()*number);
  return result;
}
function createSocket() {
    var bot0 = new OJS({ws: OWOP.options.serverAddress[0].url, origin: location.href});
}
function closeSocket() {
    botstop()
}
function openInNewTab(url) {
    window.open(url, '_blank').focus();
}
function reloadpage(){
    location.reload()
}
function autoreconnect(){
	botstop()
	reconnect()
}
function reconnect(){
    Client0 = new OJS({ws: OWOP.options.serverAddress[0].url, origin: location.href});
    Client1 = new OJS({ws: OWOP.options.serverAddress[0].url, origin: location.href});
    Client2 = new OJS({ws: OWOP.options.serverAddress[0].url, origin: location.href});
    Client3 = new OJS({ws: OWOP.options.serverAddress[0].url, origin: location.href});
    var playerselectedtool = OWOP.player.toolId
    Client0.on("join", () => {settool(playerselectedtool)});
    Client1.on("join", () => {settool(playerselectedtool)});
    Client2.on("join", () => {settool(playerselectedtool)});
    Client3.on("join", () => {settool(playerselectedtool)});
}
function settool(idq){
    Client0.world.setTool(id = idq)
    Client1.world.setTool(id = idq)
    Client2.world.setTool(id = idq)
    Client3.world.setTool(id = idq)
}
function run(){
    icedfire()
    loadtools()
    botsettings()
}
function loadtools(){
    OWOP.tool.addToolObject(new OWOP.tool.class('Checker Tool', OWOP.cursors.wand, OWOP.fx.player.NONE, OWOP.RANK.USER, function(tool) {
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
            sleep("0.08")
            OWOP.world.setPixel(xpos+1, ypos+2, brushercolor, 0)
            sleep("0.08")
            OWOP.world.setPixel(xpos+1, ypos+3, brushercolor, 0)
            sleep("0.08")
            OWOP.world.setPixel(xpos+1, ypos+4, brushercolor, 0)
            sleep("0.08")
            OWOP.world.setPixel(xpos+1, ypos+5, brushercolor, 0)
            sleep("0.08")
            OWOP.world.setPixel(xpos+1, ypos+6, brushercolor, 0)
            sleep("0.08")
            OWOP.world.setPixel(xpos+2, ypos+1, brushercolor, 0)
            sleep("0.08")
            OWOP.world.setPixel(xpos+2, ypos+3, brushercolor, 0)
            sleep("0.08")
            OWOP.world.setPixel(xpos+2, ypos+2, brushercolor, 0)
            sleep("0.08")
            OWOP.world.setPixel(xpos+2, ypos+3, brushercolor, 0)
            sleep("0.08")
            OWOP.world.setPixel(xpos+2, ypos+5, brushercolor, 0)
            sleep("0.08")
            OWOP.world.setPixel(xpos+2, ypos+6, brushercolor, 0)
            sleep("0.08")
            OWOP.world.setPixel(xpos+2, ypos+4, brushercolor, 0)
            sleep("0.08")
            OWOP.world.setPixel(xpos+5, ypos+3, brushercolor, 0)
            sleep("0.08")
            OWOP.world.setPixel(xpos+6, ypos+6, brushercolor, 0)

            Client0.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            sleep("0.08")
            Client0.world.setPixel(xpos+1, ypos+2, brushercolor, false)
            sleep("0.08")
            Client0.world.setPixel(xpos+1, ypos+3, brushercolor, false)
            sleep("0.08")
            Client0.world.setPixel(xpos+1, ypos+4, brushercolor, false)
            sleep("0.08")
            Client0.world.setPixel(xpos+1, ypos+5, brushercolor, false)
            sleep("0.08")
            Client0.world.setPixel(xpos+1, ypos+6, brushercolor, false)
            sleep("0.08")
            Client0.world.setPixel(xpos+2, ypos+1, brushercolor, false)
            sleep("0.08")
            Client0.world.setPixel(xpos+2, ypos+2, brushercolor, false)
    
            Client1.world.setPixel(xpos+2, ypos+4, brushercolor, false)
            sleep("0.08")
            Client1.world.setPixel(xpos+3, ypos+5, brushercolor, false)
            sleep("0.08")
            Client1.world.setPixel(xpos+3, ypos+6, brushercolor, false)
            sleep("0.08")
            Client1.world.setPixel(xpos+3, ypos+1, brushercolor, false)
            sleep("0.08")
            Client1.world.setPixel(xpos+3, ypos+2, brushercolor, false)
            sleep("0.08")
            Client1.world.setPixel(xpos+3, ypos+3, brushercolor, false)
            sleep("0.08")
            Client1.world.setPixel(xpos+3, ypos+4, brushercolor, false)
            sleep("0.08")
            Client1.world.setPixel(xpos+3, ypos+5, brushercolor, false)
    
            Client2.world.setPixel(xpos+4, ypos+1, brushercolor, false)
            sleep("0.08")
            Client2.world.setPixel(xpos+4, ypos+2, brushercolor, false)
            sleep("0.08")
            Client2.world.setPixel(xpos+4, ypos+3, brushercolor, false)
            sleep("0.08")
            Client2.world.setPixel(xpos+4, ypos+4, brushercolor, false)
            sleep("0.08")
            Client2.world.setPixel(xpos+4, ypos+5, brushercolor, false)
            sleep("0.08")
            Client2.world.setPixel(xpos+4, ypos+6, brushercolor, false)
            sleep("0.08")
            Client2.world.setPixel(xpos+5, ypos+1, brushercolor, false)
            sleep("0.08")
            Client2.world.setPixel(xpos+5, ypos+2, brushercolor, false)
    
            Client3.world.setPixel(xpos+5, ypos+4, brushercolor, false)
            sleep("0.08")
            Client3.world.setPixel(xpos+5, ypos+5, brushercolor, false)
            sleep("0.08")
            Client3.world.setPixel(xpos+5, ypos+6, brushercolor, false)
            sleep("0.08")
            Client3.world.setPixel(xpos+6, ypos+1, brushercolor, false)
            sleep("0.08")
            Client3.world.setPixel(xpos+6, ypos+2, brushercolor, false)
            sleep("0.08")
            Client3.world.setPixel(xpos+6, ypos+3, brushercolor, false)
            sleep("0.08")
            Client3.world.setPixel(xpos+6, ypos+4, brushercolor, false)
            sleep("0.08")
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
            sleep("0.08")
            Client0.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            sleep("0.08")
            Client0.world.setPixel(xpos+2, ypos, brushercolor, false)
            sleep("0.08")
            Client0.world.setPixel(xpos+2, ypos+1, brushercolor, false)

            Client1.world.setPixel(xpos+1, ypos, brushercolor, false)
            sleep("0.08")
            Client1.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            sleep("0.08")
            Client1.world.setPixel(xpos+2, ypos, brushercolor, false)
            sleep("0.08")
            Client1.world.setPixel(xpos+2, ypos+1, brushercolor, false)

            Client2.world.setPixel(xpos+1, ypos, brushercolor, false)
            sleep("0.08")
            Client2.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            sleep("0.08")
            Client2.world.setPixel(xpos+2, ypos, brushercolor, false)
            sleep("0.08")
            Client2.world.setPixel(xpos+2, ypos+1, brushercolor, false)

            Client3.world.setPixel(xpos+1, ypos, brushercolor, false)
            sleep("0.08")
            Client3.world.setPixel(xpos+1, ypos+1, brushercolor, false)
            sleep("0.08")
            Client3.world.setPixel(xpos+2, ypos, brushercolor, false)
            sleep("0.08")
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
    OWOP.tool.addToolObject(new OWOP.tool.class('16x16 Protector tool', OWOP.cursors.shield, OWOP.fx.player.RECT_SELECT_ALIGNED(16), false, function(tool) {
    tool.setEvent('mousemove mousedown', function(mouse, event){
        if(mouse.buttons === 1){
            OWOP.player.selectedColor = [0,255,0]
        }
        if(mouse.buttons === 2){
            OWOP.player.selectedColor = [255,0,0]
        }
    });
}));
    OWOP.tool.addToolObject(new OWOP.tool.class('8x8 Protector tool', OWOP.cursors.shield, OWOP.fx.player.RECT_SELECT_ALIGNED(8), false, function(tool) {
    tool.setEvent('mousemove mousedown', function(mouse, event){
        if(mouse.buttons === 1){
            OWOP.player.selectedColor = [0,255,0]
        }
        if(mouse.buttons === 2){
            OWOP.player.selectedColor = [255,0,0]
        }
    });
}));
    const addTool = OWOP.tool.addToolObject;
    const Tool = OWOP.tool.class;
    const cursors = OWOP.cursors;
    const PLAYERFX = OWOP.fx.player;
    const RANK = OWOP.RANK;
    const protocol = OWOP.require("conf").protocol;
    const player = OWOP.player;
    const misc = OWOP.misc;
    const tools = OWOP.tool.allTools;
    const updateToolbar = OWOP.tool.updateToolbar;
    let tool;

    tool = new Tool("Bot Pixel Eraser", cursors.erase, PLAYERFX.RECT_SELECT_ALIGNED(16), false, function(tool) {
            let index = 0;
            let color;
            let activeChunk = [null, null];
            function tick() {
                for (let i=0; i<256; i++) {
                    let x = activeChunk[0] * 16 + index % 16;
                    let y = activeChunk[1] * 16 + Math.floor(index / 16);
                    
                    let oldPixel = misc.world.getPixel(x, y);
                    
                    if (oldPixel[0] !== color[0] || oldPixel[1] !== color[1] || oldPixel[2] !== color[2]) {
                        if (!setpxl(x, y, color)) break;
                        if (!misc.world.setPixel(x, y, color)) break;
                    }
                    
                    index = (index + 1) % 256;
                }
            }
            function fillChunk(chunkX, chunkY, color) {
                let chunk = misc.world.getChunkAt(chunkX, chunkY);
                if (!chunk) return;
                
                let byteColor = color[2] << 16 | color[1] << 8 | color[0];
                
                for (let y=0; y<protocol.chunkSize; y++) {
                    for (let x=0; x<protocol.chunkSize; x++) {
                        if ((chunk.get(x, y) & 0xFFFFFF) === byteColor) continue;
                        
                        queue.push([x, y]);
                    }
                }
            }
            tool.setEvent("mousedown mousemove", function(mouse) {
                if (mouse.buttons & 0b1) {
                    color = player.selectedColor;
                } else if (mouse.buttons & 0b10) {
                    color = [255, 255, 255];
                } else {
                    return;
                }
                
                let x = Math.floor(mouse.tileX / protocol.chunkSize);
                let y = Math.floor(mouse.tileY / protocol.chunkSize);
                
                if (activeChunk[0] !== x || activeChunk[1] !== y) {
                    index = 0;
                    activeChunk = [x, y];
                }
                tool.setEvent("tick", tick);
            });
            tool.setEvent("mouseup deselect", function(mouse) {
                if (!mouse || !(mouse.buttons & 0b1)) {
                    activeChunk = [null, null];
                    tool.setEvent("tick", null);
                }
            });
        });
        addTool(tool);
OWOP.tool.addToolObject(new OWOP.tool.class('Bot eraser 4x4', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(4), false, function(tool) {
    tool.setEvent('mousemove mousedown', function(mouse, event){
        if(mouse.buttons === 1){
            var posx = OWOP.mouse.tileX
            var posy = OWOP.mouse.tileY
            var playercolor = OWOP.player.selectedcolor
            setpxl(posx,posy,playercolor)

            setpxl(posx,posy+1,playercolor)
            setpxl(posx,posy+2,playercolor)
            setpxl(posx,posy+3,playercolor)
        }
    });
}));
    OWOP.tool.addToolObject(new OWOP.tool.class('Bot eraser 4x4 with your support', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(4), false, function(tool) {
    tool.setEvent('mousemove mousedown', function(mouse, event){
        if(mouse.buttons === 1){
            var posx = OWOP.mouse.tileX
            var posy = OWOP.mouse.tileY
            var playercolor = OWOP.player.selectedcolor
            setpxl(posx,posy,playercolor)

            setpxl(posx,posy+1,playercolor)
            setpxl(posx,posy+2,playercolor)
            setpxl(posx,posy+3,playercolor)

            setpxl2(posx,posy,playercolor)

            setpxl2(posx,posy+1,playercolor)
            setpxl2(posx,posy+2,playercolor)
            setpxl2(posx,posy+3,playercolor)
        }
    });
}));
    OWOP.tool.addToolObject(new OWOP.tool.class('Brush 2x2', OWOP.cursors.brush, OWOP.fx.player.RECT_SELECT_ALIGNED(2), false, function(tool) {
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
        }
    });
}));
    OWOP.tool.addToolObject(new OWOP.tool.class('Paste Image', OWOP.cursors.copy, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, function(tool) {
    //tool.setEvent('mousemove mousedown', function(mouse, event){
    //    if(mouse.buttons === 1){
    //        
    //    }
    //});
}));
}
function setpxl(x, y, selClr){
    Client0.world.setPixel(x,y,selClr)
    Client1.world.setPixel(x+1,y,selClr)
    Client2.world.setPixel(x+2,y,selClr)
    Client3.world.setPixel(x+3,y,selClr)
}
function setpxl2(x, y, selClr){
    Client0.world.setPixel(x,y,selClr)
    Client1.world.setPixel(x+1,y,selClr)
    Client2.world.setPixel(x+2,y,selClr)
    Client3.world.setPixel(x+3,y,selClr)

    OWOP.world.setPixel(x+4,y,selClr)
    OWOP.world.setPixel(x+5,y,selClr)
    OWOP.world.setPixel(x+6,y,selClr)
    OWOP.world.setPixel(x+7,y,selClr) 
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
run()
});
