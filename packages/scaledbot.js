// ==UserScript==
// @name         ScaledBot
// @namespace    http://tampermonkey.net/
// @version      1.0
// @license      MIT
// @description  OWOP ScaledBot.
// @author       scar17off
// @match        *://augustberchelmann.com/owop/*
// @match        *://ourworldofpixels.com/*
// @match        *://yourworldofpixels.glitch.me/*
// @icon         https://www.google.com/s2/favicons?domain=ourworldofpixels.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

function install(){
    if(!localStorage.scaled_height) {
        localStorage.scaled_height = "315px";
    };
    if(!localStorage.scaled_width) {
        localStorage.scaled_width = "680px";
    };
    let height = localStorage.scaled_height, width = localStorage.scaled_width;
    if(!OWOP.tool){
        OWOP.tool = OWOP.tools;
    };
    if(!OWOP.tools){
        OWOP.tools = OWOP.tool;
    }; 
    let stop121 = false;
    let OldPaste = false;
    let Pixelization = false;
    OWOP.cursors.protect = OWOP.cursors.shield;
    OWOP.cursors.paste = OWOP.cursors.stamp;
    if(!localStorage.scaled_botnick) {
        localStorage.scaled_botnick = "SCALED_BOT";
    };
    let AutoLogin = false;
    let paintfollow = false;
    let AutoNickname = false;
    let AutoPassword = false;
    let folint;
    let FollowInterval;
    if(!localStorage.scaled_followinterval) {
        localStorage.scaled_followinterval = 79;
        FollowInterval = localStorage.scaled_followinterval;
    } else {
        FollowInterval = localStorage.scaled_followinterval;
    };
    let autoreconnecten = false;
    let animation = 0;
    let animations = {
        circle: 0
    };
    let pattern = 0;
    let patterns = {
        lr: 0,
        tb: 1,
        rand: 2,
        square: 3,
        grid: 4
    };
    let imgpattern = 0;
    let imgpatterns = {
        default: 0,
        random: 1,
        leftup: 2,
        grid: 3,
        square: 4
    };  
    let eraserpattern = 0;
    let eraserpatterns = {
        tb: 0,
        lr: 1
    };
    const SITEKEY = "6LcgvScUAAAAAARUXtwrM8MP0A0N70z4DHNJh-KI";
    let cI = 1;
    let following = false;
    let isCaptchaJoin = false;
    let cont;
    let BOTS = [];
    let over, newX, newY, pixel, color
    let rendercaptchaen = true;
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

                if (!options.origin) options.origin = location.href;
                if (!options.ws) options.ws = OWOP.options.serverAddress[0].url;

                if (options.origin) init.origin = options.origin;
                if (options.agent) init.agent = options.agent;
                let OJS = this;

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
                            'protect': 9,
                            'copy': 10
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
                        9: 'protect',
                        10: 'copy'
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
//                        document.getElementById("scaled-bots-menu-list").insertAdjacentHTML("beforeend", `
//<div id="scaled-bots-menu-list-bot-${options.ind}">
//<span id="scaled-bots-menu-list-bot-${options.ind}-logo">ID: ${options.ind}</span>
//<span id="scaled-bots-menu-list-bot-${options.ind}-coords">X: ${OJS.player.x} Y: ${OJS.player.y}</span>
//<span id="scaled-bots-menu-list-bot-${options.ind}-pq">PQuota: ${Math.round(OJS.utils.bucket.allowance)}</span>
//<button id="scaled-bots-menu-list-bot-${options.ind}-leave">Disconnect</button>
//<hr>
//</div>
//`);
                        document.getElementById("scaled-bots-menu-list").insertAdjacentHTML("beforeend", `
<div id="scaled-bots-menu-list-bot-${options.ind}">
<span id="scaled-bots-menu-list-bot-${options.ind}-logo">ID: ${options.ind}</span>
<span id="scaled-bots-menu-list-bot-${options.ind}-coords">X: ${OJS.player.x} Y: ${OJS.player.y}</span>
<span id="scaled-bots-menu-list-bot-${options.ind}-pq">PQuota: ${Math.round(OJS.utils.bucket.allowance)}</span>
<button id="scaled-bots-menu-list-bot-${options.ind}-leave">Disconnect</button>
</div>
`);
                        document.getElementById(`scaled-bots-menu-list-bot-${options.ind}-leave`).addEventListener("click", () => {
                            that.world.leave();
                            document.getElementById(`scaled-bots-menu-list-bot-${options.ind}`).remove();
                        });
                        if(options.proxy) document.getElementById(`scaled-proxy-proxyconns-${options.proxy}`).innerText = parseInt(document.getElementById(`scaled-proxy-proxyconns-${options.proxy}`).innerText)+1;
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
                        dv.setUint8(11, OJS.options.tools.id[OWOP.player.tool.id]);
                        OJS.ws.send(array);
                        OJS.player.x = Math.round(16 * x);
                        OJS.player.y = Math.round(16 * y);
                        if (document.getElementById(`scaled-bots-menu-list-bot-${options.ind}-coords`)) document.getElementById(`scaled-bots-menu-list-bot-${options.ind}-coords`).innerText = `X: ${Math.round(x)} Y: ${Math.round(y)}`;
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
                    setNickname: name => {
                        this.chat.send("/nick "+name);
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
                let pqi = setInterval(() => {
                    if (!document.getElementById(`scaled-bots-menu-list-bot-${options.ind}-pq`)) return;
                    for (let i = 0; i < BOTS.length - 1; i++) BOTS[i].utils.bucket.canSpend(0);
                    document.getElementById(`scaled-bots-menu-list-bot-${options.ind}-pq`).innerText = "PQuota: " + Math.round(OJS.utils.bucket.allowance) + ` (${OJS.utils.bucket.rate}x${OJS.utils.bucket.time})`
                }, 20);
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
                    document.getElementById(`scaled-bots-menu-list-bot-${options.ind}`).remove();
                    if(!autoreconnecten) //OWOP.chat.local(`[${options.ind}]: Closed connection.`)
                        BOTS = BOTS.filter(i => i.options.ind !== options.ind);
                    console.log(`[OWOP.js]: Disconnected.`);
                    if(autoreconnecten) BOTS.push(new struct(options));
                    this.emit("close")
                };
            };
        };
        let struct = OJS;
    append("https://www.google.com/recaptcha/api.js");
    const upload = (accept = "*") => new Promise(resolve => {
        let file = document.createElement('input');
        file.type = "file";
        file.accept = accept;
        file.onchange = () => {
            let reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(file.files[0]);
        };
        file.click();
    });
    let ProxyPasswords = localStorage.scaled_proxies;
    if(!ProxyPasswords) ProxyPasswords = [];
    if(localStorage.scaled_proxies) ProxyPasswords = ProxyPasswords.split(",");
    const updateServers = () => {
        const servers = document.getElementById("scaled-proxies-menu-proxies");
        servers.innerHTML = "";
        for(let i in ProxyPasswords) {
            const Proxy = ProxyPasswords[i];
            const ProxyDiv = `
<div id="scaled-proxy-${Proxy}">
<form>
<fieldset>
<span>${Proxy}</span>
<br>
Status: <span id="scaled-proxy-proxystatus-${Proxy}" style="color: yellow;">=</span>
<br>
Connections: <span id="scaled-proxy-proxyconns-${Proxy}"></span>
<br>
<button id="scaled-proxy-proxyjoin-${Proxy}">Connect</button>
<br>
</fieldset>
</form>
</div>
`;
            servers.insertAdjacentHTML("beforeend", ProxyDiv);
            const WSCheck = new WebSocket(`wss://ws-proxy${Proxy}.glitch.me/?ws=WS-STATUS`);
            WSCheck.onopen = () => {
                onlineproxy += 1;
                checkingproxy -= 1;
                document.getElementById(`scaled-proxy-proxyjoin-${Proxy}`).onclick = () => { proxyJoin(Proxy); };
                document.getElementById(`scaled-proxy-proxystatus-${Proxy}`).innerText = "+";
                document.getElementById(`scaled-proxy-proxystatus-${Proxy}`).style.color = "lightgreen";
                WSCheck.send("WS-STATUS");
            };
            WSCheck.onmessage = msg => {
                document.getElementById(`scaled-proxy-proxyconns-${Proxy}`).innerText = parseInt(msg.data.split(",")[1])-1;
                WSCheck.close();
            };
            WSCheck.onerror = () => {
                onlineproxy -= 1;
                checkingproxy -= 1;
                offlineproxy += 1;
                document.getElementById(`scaled-proxy-proxystatus-${Proxy}`).innerText = "-";
                document.getElementById(`scaled-proxy-proxystatus-${Proxy}`).style.color = "red";
            };
        }
    };
    let allproxy = ProxyPasswords.length;
    let checkingproxy = allproxy;
    let offlineproxy = 0;
    let onlineproxy = 0;
    const renderCaptcha = () => new Promise(resolve => {
        if(rendercaptchaen = true){
            OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(`Captcha`, {
                closeable: true
            }, function (win) {
                grecaptcha.render(win.addObj(OWOP.util.mkHTML("div", {})), {
                    theme: "dark",
                    sitekey: SITEKEY,
                    callback: function callback(token) {
                        win.close();
                        resolve(token);
                    }
                });
            }));
        };
    });
    const getFree = () => {
        let b = BOTS.filter(i => i.ws.readyState === 1);
        if (b.length === 0) return -1;
        if (last >= b.length) last = 0;
        return last++;
    };
    let botslen = 7;
    async function writeChar(matrix, x, y) {
        for (var xx = 0; xx < matrix.length; xx++)
        for (var yy = 0; yy < 8; yy += slen)
        for (var bb = 0; bb < slen; bb++)
        if ((matrix[xx] >> (7 - yy - bb)) & 1 && yy + bb < 8) {
            const abc = getFree();
            BOTS[abc].world.setPixel(x + xx, y + yy + bb, OWOP.player.selectedColor, false);
        };
    };
    async function writeText(str, x, y) {
      if (isNaN(x) || isNaN(y)) return OWOP.chat.local('Invalid Coordinates')
    
      str = str.toUpperCase();
      var len = str.length, ccode, matrix;
      
      for (var i = 0; i < len; i++) {
        ccode = str.charCodeAt(i);
        if (ccode >= 0x41 && ccode <= 0x5a)
            matrix = chars[ccode - 65];
          else if (ccode == 0x20) {
            x += 2;
            continue;
        } else if (ccode >= 0x30 && ccode <= 0x39)
            matrix = NUMS[ccode - 0x30];
          else if (symbols[ccode])
            matrix = symbols[ccode];
          else {
            continue;
        }
        writeChar(matrix, x, y);
        x += matrix.length + 1;
      }
    };
    function isProtected(x, y) {
        let chunks = OWOP.require("main").misc.world.protectedChunks;
        x = Math.floor(x/16);
        y = Math.floor(y/16);
        return chunks[`${x},${y}`] ? true : false;
    };
    const proxyJoin = server => {
        let ws = "wss://ws-proxy" + server + ".glitch.me";
        let BotCount = parseFloat(document.getElementById("scaled-main-menu-botcount").value);
        for (let i = 0; i < BotCount; i++) {
            const ofo = BOTS.length;
            BOTS[ofo] = new OJS({
                ws: ws + `?ws=${OWOP.options.serverAddress[0].url}`,
                origin: location.href,
                ind: ofo,
                proxy: server
            });
            //BOTS[ofo].ws.onopen = async () => {
            //    setTimeout(() => {
            //        if(AutoLogin = true){
            //            if(isNaN(localStorage.worldpasswords)) {
            //                BOTS[ofo].chat.send(`/adminlogin ${localStorage.adminlogin}`);
            //            };
            //        };
            //        if(AutoPassword = true) {
            //            if(AutoPassword && JSON.parse(localStorage.worldPasswords)[OWOP.world.name]) BOTS[ofo].chat.send(`/pass ${JSON.parse(localStorage.worldPasswords)[OWOP.world.name]}`);                    };
            //        if(AutoNickname = true) {
            //            BOTS[ofo].chat.send(`/nickname ${localStorage.scaled_botnick}`);
            //        };
            //    }, 1500);
            //};
        }
    };
    function drawRectbrush(x, y, w, h, color) {//-54 25 57 39
        if(isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
            return;
        }
        color = color || OWOP.player.selectedColor;
        let Y, X, i;
        for (Y = 0; Y < h; Y++) {
            for (X = 0; X < w; X += BOTS.length) {
                for (i = 0; i < BOTS.length; i++) {
                    if (X + i < w) {
                        over = 0;
                        newX = X + i;
                        newY = Y;
                        pixel = OWOP.world.getPixel(x + newX, y + newY);
                        if (pixel[0] !== color[0] || pixel[1] !== color[1] || pixel[2] !== color[2]) {
                            let abc = getFree();
                            BOTS[abc].world.setPixel(x + newX, y + newY, color);
                        } else continue;
                    }
                }
            }
        }
    };
    const refreshAssets = () => {
        let assets = localStorage.scaled_assets;
        if(!assets) assets = [];
        else assets = JSON.parse(assets);
        const assetsDiv = document.getElementById("scaled-assets-menu-assetlist");
        assetsDiv.innerHTML = "";

        for(let i in assets) {
            const image = new Image();
            image.onload = () => {
                image.style.width = "48px";
                image.style.height = "48px";
                image.style.border = "solid 1px";
                image.onclick = e => {
                    for(let j in document.getElementById("scaled-assets-menu-assetlist").children) {
                        if(typeof(document.getElementById("scaled-assets-menu-assetlist").children[j]) !== "object") break;
                        document.getElementById("scaled-assets-menu-assetlist").children[j].style.border = "solid 1px";
                    }
                    selectedAsset = assets[i];
                    image.style.border = "solid 1px red";
                };
                image.oncontextmenu = e => {
                    e.preventDefault();
                    assets.splice(i, 1);
                    localStorage.scaled_assets = JSON.stringify(assets);
                    refreshAssets();
                }
                assetsDiv.append(image);
            };
            image.src = assets[i];
        }
    };
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    let selectedAsset = null;
    let last = 0;
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(" ", {
        closeable: true
    }, function (win) {
        let menu = document.createElement("div");
        let styles = document.createElement("style");
        styles.type = "text/css";
        styles.innerHTML = `
.circle:before{
    text-align: center;
    height: 90px;
    width: 90px;
    content: '';
    position: absolute;
    top:30px;
    left:0px;
    right:0px;
    bottom: 0px;
    border: 20px solid #fff;
    border-radius:50%;
    animation: animate 5s linear infinite;
}
@keyframes animate{
    0%{
        box-shadow: 0 0 50px #0f0,0 0 50px #0f0 inset;
        filter: hue-rotate(0deg);
    }
    20%{
        box-shadow: 0 0 60px #0f0,0 0 60px #0f0 inset;
    }
    40%{
        box-shadow: 0 0 40px #0f0,0 0 40px #0f0 inset;
    }
    60%{
        box-shadow: 0 0 80px #0f0,0 0 80px #0f0 inset;
    }
    80%{
        box-shadow: 0 0 100px #0f0,0 0 100px #0f0 inset;
    }
    100%{
        box-shadow: 0 0 50px #0f0,0 0 50px #0f0 inset;
        filter: hue-rotate(360deg);
    }
}
svg{
    width:0;
    height:0;
}
#scaled-menu-container {
    user-select: none;
    font-size: 14px;
    overflow: hidden;
    color: #fff;
    font-family: Verdana,sans-serif;
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    height: 366px;
    width: 500px;
    margin-top: -183px;
    margin-left: -250px;
    z-index: 2147000000;
}
#scaled-main-menu {
    font-size: 12px;
    user-select: none;
    background-color: rgba(100, 100, 100, 0.4);
    color: #fff;
    font-family: Verdana,sans-serif;
    box-sizing: border-box;
    position: relative;
    height: 100%;
    padding: .5em 1em;
    border-top: none;
    margin-left: 130px;
}
#scaled-proxies-menu {
    font-size: 12px;
    user-select: none;
    color: #fff;
    font-family: Verdana,sans-serif;
    background-color: rgba(100, 100, 100, 0.4);
    box-sizing: border-box;
    position: relative;
    height: 100%;
    padding: .5em 1em;
    border-top: none;
    margin-left: 130px;
}
#scaled-assets-menu {
    font-size: 12px;
    user-select: none;
    color: #fff;
    font-family: Verdana,sans-serif;
    background-color: rgba(100, 100, 100, 0.4);
    box-sizing: border-box;
    position: relative;
    height: 100%;
    padding: .5em 1em;
    border-top: none;
    margin-left: 130px;
}
#scaled-config-menu {
    font-size: 12px;
    user-select: none;
    color: #fff;
    font-family: Verdana,sans-serif;
    background-color: rgba(100, 100, 100, 0.4);
    box-sizing: border-box;
    position: relative;
    height: 100%;
    padding: .5em 1em;
    border-top: none;
    margin-left: 130px;
}
#scaled-bots-menu {
    font-size: 12px;
    user-select: none;
    color: #fff;
    font-family: Verdana,sans-serif;
    background-color: rgba(100, 100, 100, 0.4);
    box-sizing: border-box;
    position: relative;
    height: 100%;
    padding: .5em 1em;
    border-top: none;
    margin-left: 130px;
}
.i-tab-content {
    font-size: 12px;
    user-select: none;
    color: #fff;
    font-family: Verdana,sans-serif;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: rgba(100, 100, 100, 0.4)
}
.i-tab-menu, .sidebar {
    font-size: 12px;
    user-select: none;
    color: #fff;
    font-family: Verdana,sans-serif;
    box-sizing: border-box;
    position: relative;
    background-color: rgba(120, 120, 120, 0.4);
    display: block;
    overflow: auto;
    float: left;
    width: 130px;
    height: 100%;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);
}
.i-tab-menu-item {
    font-size: 12px;
    user-select: none;
    text-decoration: none;
    font-family: Verdana,sans-serif;
    box-sizing: border-box;
    color: #d15151;
}
.i-tab-menu-item:hover {
    background-color: rgb(77, 73, 73, 0.5)
    !important;
}
#scaled-main-menu-item {
    user-select: none;
    color: #fff;
    font-family: Verdana,sans-serif;
    box-sizing: border-box;
    float: left;
    background-color: inherit;
    padding: 8px 8px;
    margin: 0;
    border: none;
    font-size: 14px;
    text-align: center;
    outline: 0;
    transition: .3s;
    width: 100%;
}
#scaled-proxies-menu-item {
    user-select: none;
    color: #fff;
    font-family: Verdana,sans-serif;
    box-sizing: border-box;
    float: left;
    background-color: inherit;
    padding: 8px 8px;
    margin: 0;
    border: none;
    font-size: 14px;
    text-align: center;
    outline: 0;
    transition: .3s;
    width: 100%;
}
#scaled-assets-menu-item {
    user-select: none;
    color: #fff;
    font-family: Verdana,sans-serif;
    box-sizing: border-box;
    float: left;
    background-color: inherit;
    padding: 8px 8px;
    margin: 0;
    border: none;
    font-size: 14px;
    text-align: center;
    outline: 0;
    transition: .3s;
    width: 100%;
}
#scaled-config-menu-item {
    user-select: none;
    color: #fff;
    font-family: Verdana,sans-serif;
    box-sizing: border-box;
    float: left;
    background-color: inherit;
    padding: 8px 8px;
    margin: 0;
    border: none;
    font-size: 14px;
    text-align: center;
    outline: 0;
    transition: .3s;
    width: 100%;
}
#scaled-bots-menu-item {
    user-select: none;
    color: #fff;
    font-family: Verdana,sans-serif;
    box-sizing: border-box;
    float: left;
    background-color: inherit;
    padding: 8px 8px;
    margin: 0;
    border: none;
    font-size: 14px;
    text-align: center;
    outline: 0;
    transition: .3s;
    width: 100%;
}
.i-tab-menu-item {
    user-select: none;
    color: #fff;
    font-family: Verdana,sans-serif;
    box-sizing: border-box;
    float: left;
    background-color: inherit;
    padding: 8px 8px;
    margin: 0;
    border: none;
    font-size: 14px;
    text-align: center;
    outline: 0;
    transition: .3s;
    width: 100%;
}
.is-active {
    background-color: rgb(140, 0, 255, 0.5) !important;
}
label {
    cursor: default;
}
.wincontainer {
    background-color: rgba(53, 53, 53, 1);
}
#windows > div, .winframe {
    position: absolute;
    pointer-events: auto;
    background-color: rgb(22, 21, 21);
    border: 11px solid rgb(22, 21, 21);
    border-width: 11px;
    -o-border-image: url(https://raw.githubusercontent.com/scar17off/OSM-2-packages/main/packages/assets/window_out.png) 11 repeat;
    border-image: url(https://raw.githubusercontent.com/scar17off/OSM-2-packages/main/packages/assets/window_out.png) 11 repeat;
    border-image-outset: 1px;
}
button[id^="tool-"]:not(.selected) > div {
    background-image: url("https://github.com/scar17off/OSM-2-packages/blob/main/packages/assets/scaledbottoolset.png?raw=true") !important;
    background-color: rgba(69, 69, 69, 1);
}
*[id^="scaled-"] {
    font-family: 'Hammersmith One';
    font-size: 13px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
fieldset {
    display: block;
    margin-inline-start: 2px;
    margin-inline-end: 2px;
    padding-block-start: 0.35em;
    padding-inline-start: 0.75em;
    padding-inline-end: 0.75em;
    padding-block-end: 0.625em;
    min-inline-size: min-content;
    border-width: 2px;
    border-style: groove;
    border-image: initial;
    border-color: rgba(115, 115, 115, 1);
}
button[id^="scaled"] {
    border-width: 1px;
    border-style: groove;
    border-image: initial;
    border-color: rgba(115, 115, 115, 1);
    border: solid 1px;
    background-color: #292929;
    color: #919191;
}`;
    menu.innerHTML = `
<div id="scaled-content">
    <div class="circle">
        <svg>
        <filter id = "wavy">
        <feTurbulence x="0" y="0" baseFrequency="0.5" numOctaves="5" seed="7"/>
        <feDisplacementMap in="SourceGraphic" scale="30"/>
        </filter>
        </svg>
    </div>
    <div class="i-tab-menu sidebar">
        <a><h2 class="i-tab-menu-item">Scaled Bot</h2></a>
        <button id="scaled-main-menu-item" class="i-tab-menu-item">Main</button>
        <button id="scaled-proxies-menu-item" class="i-tab-menu-item">Proxies</button>
        <button id="scaled-assets-menu-item" class="i-tab-menu-item">Assets</button>
        <button id="scaled-bots-menu-item" class="i-tab-menu-item">Bots</button>
        <button id="scaled-config-menu-item" class="i-tab-menu-item">Config</button>
        <a><h1 id="scaled-made-by-item" class="i-tab-menu-item" title="made with love">Made by <a href="https://discord.gg/PRhsxYvWHq">scar17off</a>.</h2></a>
        <a><h1 class="i-tab-menu-item"><span id="scaled-info-menu">0 bots, 0.00 chunks </span></h2></a>
    </div>
        <div id="scaled-main-menu">
            <form>
                <fieldset>
                    <legend>Connection Options</legend>
                    <div><input type="number" id="scaled-main-menu-botcount" style="width: 240; border: solid 1px;background-color: #292929; color: #919191; user-select: none;" placeholder="Count" value="5" id="scaled-main-menu-botcount" title="Number of bots to connect."></input></div>
                    <div><input type="checkbox" id="scaled-main-menu-captcharender" name="usecaptcharenderer"></input><label>Captcha Renderer</label></div>
                    <div><input type="checkbox" id="scaled-main-menu-autoreconnect" name="useautoreconnect"></input><label>Auto Reconnect</label></div>
                    <div><input type="checkbox" id="scaled-main-menu-autopassword" name="autopasswordenabler"></input><label>Auto Password</label></div>
                    <div><input type="checkbox" id="scaled-main-menu-autologin" name="autologinenabler"></input><label title="Automatically log ins as Admin or Moderator.">Auto Login</label></div>
                    <div><input type="checkbox" id="scaled-main-menu-autonickname" name="autonicknameenabler"></input><label title="Automatically sets bot nickname.">Auto Nickname</label></div>
                </fieldset>
            </form>
            <hr>
            <form>
                <fieldset>
                    <legend>Bot Connection</legend>
                    <div><button id="scaled-main-menu-connect">Connect</button>
                    <button id="scaled-main-menu-disconnect">Disconnect</button></div>
                </fieldset>
            </form>
            <hr>
            <form>
                <fieldset>
                    <legend>Follow Options</legend>
                    <div>
                        <select style="width: 240; font-size: 13px; border: solid 1px; background-color: #292929; color: #919191;" title="Follow select" id="scaled-main-menu-followselect">
                            <option>Circle</option>
                        </select>
                        <div><input type="checkbox" id="scaled-main-menu-follow" name="followenable">Follow</input></div>
                        <div><input type="checkbox" id="scaled-main-menu-paintfollow" name="paintfollowenable">Paint Follow</input></div>            
                    </div>
                </fieldset>
            </form>
            <hr>
            <form>
                <fieldset>
                    <legend>Chat</legend>
                    <div><input id="scaled-main-menu-send" placeholder="Message to send" title="Send" style="width: 240; border: solid 1px;background-color: #292929; color: #919191; user-select: none;"></input>
                    <button id="scaled-main-menu-botsend">Send</button></div>
                </fieldset>
            </form>
            <hr>
            <form>
                <fieldset>
                    <legend>Paste Options</legend>
                    <div><label>Asset Paster Pattern</label>
                        <select style="width: 240px; font-size: 13px; border: solid 1px; background-color: #292929; color: #919191;" id="scaled-main-menu-assetpasterpattern">
                            <option>Default</option>
                            <option>Random</option>
                            <option>Left - Up</option>
                            <option>Grid</option>
                            <option>Square</option>
                        </select>
                    </div>
                    <div><label>Bot Area Pattern</label>
                        <select style="width: 240px; font-size: 13px; border: solid 1px; background-color: #292929; color: #919191;" id="scaled-main-menu-areapattern">
                            <option>Default</option>
                            <option>Top - Bottom</option>
                            <option>Random</option>
                        </select>
                    </div>
                    <div><label>Chunker Pattern</label>
                        <select style="width: 240px; font-size: 13px; border: solid 1px; background-color: #292929; color: #919191;" id="scaled-main-menu-eraserpattern">
                            <option>Top - Bottom</option>
                            <option>Left - Right</option>
                        </select>
                    </div>
                    <div><input type="checkbox" id="scaled-main-menu-oldpaste" name="oldpasteenabler"></input><label title="Old Paste">Old Paste</label></div>
                </fieldset>
            </form>
        </div>
    <div id="scaled-proxies-menu">
        <form>
            <fieldset>
                <div><input id="scaled-proxies-menu-addproxy" placeholder="xxxx-yyyy" title="Enter your proxy here." style="width: 150px; height: 14px; border: solid 1px;background-color: #292929; color: #919191; user-select: none;"></input>
                <button id="scaled-proxies-menu-add">Add</button>
                <button id="scaled-proxies-menu-refresh">Refresh</button>
                <button id="scaled-proxies-menu-delall">Delete all</button>
                <button id="scaled-proxies-menu-conall">Connect all</button>
                <br>
                <label>Count: ${allproxy}</label>
                <label id="scaled-proxies-menu-onlineproxy">Online proxies: ${onlineproxy}</label>
                <label id="scaled-proxies-menu-offlineproxy">Offline proxies: ${offlineproxy}</label>
                <label id="scaled-proxies-menu-checkingproxy">Checking proxy: ${checkingproxy}</label>
                </div>
            </fieldset>
        </form>
        <hr>
        <div id="scaled-proxies-menu-proxies"></div>
    </div>
    <div id="scaled-assets-menu">
        <form>
            <fieldset>
                <div><button id="scaled-assets-menu-addasset" class="scaled-assets-menu">Add asset</button>
                <button id="scaled-assets-menu-clear" class="scaled-assets-menu">Clear</button></div>
            </fieldset>
        </form>
        <form>
            <fieldset>
                <div id="scaled-assets-menu-assetlist"></div>
            </fieldset>
        </form>
    </div>
    <div id="scaled-config-menu">
        <div><input id="scaled-config-menu-config-proxies" style="border: 1px solid; background-color: #292929; color: #919191; margin: 0px; width: 510px; height: 16px;" placeholder="Proxy Passwords" value=${localStorage.scaled_proxies}></input></div>
        <div><input type="number" id="scaled-config-menu-config-followint" style="border: 1px solid; background-color: #292929; color: #919191; margin: 0px; width: 510px; height: 16px;" placeholder="Follow Interval (ms)" value=${localStorage.scaled_followinterval}></input></div>
        <div><input id="scaled-config-menu-config-botnick" style="border: 1px solid; background-color: #292929; color: #919191; margin: 0px; width: 510px; height: 16px;" placeholder="Bot nickname." value=${localStorage.scaled_botnick}></input></div>
    </div>
    <div id="scaled-bots-menu">
        <form>
            <fieldset>
                <div id="scaled-bots-menu-list"></div>
            </fieldset>
        </form>
    </div>
</div>
`;
        win.addObj(menu);
        win.addObj(styles);
        cont = win.container;
        cont.style.height = height;
        cont.style.maxHeight = height;
        cont.style.width = width;
    }).move(75, 75));

    setInterval(() => {
        document.getElementById("scaled-proxies-menu-onlineproxy").innerText = `Online proxies: ${onlineproxy}`;
        document.getElementById("scaled-proxies-menu-offlineproxy").innerText = `Offline proxies: ${offlineproxy}`;
        document.getElementById("scaled-proxies-menu-checkingproxy").innerText = `Checking proxies: ${checkingproxy}`;        
    }, 25);

    document.getElementById("scaled-main-menu-disconnect").onclick = async () => {
        for (let i in BOTS) BOTS[i].ws.close();
        BOTS = [];
    };

    document.getElementById("scaled-main-menu-eraserpattern").onchange = () => {
        let val = document.getElementById("scaled-main-menu-eraserpattern").value;
        if(val === "Left - Right") eraserpattern = eraserpatterns.lr;
        if(val === "Top - Bottom") eraserpattern = eraserpatterns.tb;
    };

    document.getElementById("scaled-proxies-menu-conall").onclick = () => {
        for (let i in ProxyPasswords) proxyJoin(i);
    };

    document.getElementById("scaled-main-menu-areapattern").onchange = () => {
        let val = document.getElementById("scaled-main-menu-areapattern").value;
        if(val === "Left - Right") pattern = patterns.lr;
        if(val === "Top - Bottom") pattern = patterns.tb;
        if(val === "Random") pattern = patterns.rand;
    };
    document.getElementById("scaled-main-menu-assetpasterpattern").onchange = () => {
        let val = document.getElementById("scaled-main-menu-assetpasterpattern").value;
        if(val == "Default") imgpattern = imgpatterns.default;
        if(val == "Left - Up") imgpattern = imgpatterns.leftup;
        if(val == "Grid") imgpattern = imgpatterns.grid;
        if(val == "Square") imgpattern = imgpatterns.square;
        if(val == "Random") imgpattern = imgpatterns.random;
    };

    document.getElementById("scaled-main-menu-oldpaste").onchange = async () => {
        if(!OldPaste) {
            OldPaste = true;
        } else {
            OldPaste = false;
        };
    };

    document.getElementById("scaled-main-menu-captcharender").onchange = async () => {
        if(!rendercaptchaen) {
            rendercaptchaen = true;
        } else {
            autoreconnecten = false;
        };
    };

    document.getElementById("scaled-assets-menu-clear").onclick = async () => {
        localStorage.scaled_assets = [];
        refreshAssets();
    };

    document.getElementById("scaled-main-menu-paintfollow").onchange = async () => {
        if(!paintfollow) {
            paintfollow = true;
        } else {
            paintfollow = false;
        };
    };

    setInterval(() => {
        let o = 0;
        for(let i in BOTS) o += BOTS[i].utils.bucket.allowance;
        let botchunks = (o/256).toFixed(2);
        let botcount = BOTS.length;
        document.getElementById("scaled-info-menu").innerText = botcount+` bots, `+botchunks+` chunks`;
    }, 25);

    document.getElementById("scaled-main-menu-autopassword").onclick = async () => {
        if(!AutoPassword) {
            AutoPassword = true;
        } else {
            AutoPassword = false;
        };
    };

    document.getElementById("scaled-main-menu-autonickname").onclick = async () => {
        if(!AutoNickname) {
            AutoNickname = true;
        } else {
            AutoNickname = false;
        };
    };

    document.getElementById("scaled-proxies-menu-add").onclick = async () => {
        let prox = document.getElementById("scaled-proxies-menu-addproxy").value;
        if(prox == "") return;
        ProxyPasswords.push(prox);
    };

    document.getElementById("scaled-main-menu-autologin").onchange = async () => {
        if(!AutoLogin) {
            AutoLogin = true;
        } else {
            AutoLogin = false;
        };
    };

    document.getElementById("scaled-main-menu-botsend").onclick = async () => {
        for (let i = 0; i < BOTS.length; i++) BOTS[i].chat.send(document.getElementById("scaled-main-menu-send").value);
    };

    document.getElementById("scaled-proxies-menu-delall").onclick = async () => {
        localStorage.scaled_proxies = [];
        updateServers();
    };

    document.getElementById("scaled-proxies-menu-refresh").onclick = async () => {
        updateServers();
    };

    document.getElementById("scaled-main-menu-connect").onclick = async () => {
        cI = 1;
        isCaptchaJoin = false;
        let BotCount = parseFloat(document.getElementById("scaled-main-menu-botcount").value);
        for (let i = 0; i < BotCount; i++) {
            const ofo = BOTS.length + 0;
            BOTS[ofo] = new OJS({ind: ofo});
            //BOTS[ofo].ws.onopen = async () => {
            //    setTimeout(() => {
            //        if(AutoLogin = true){
            //            if(isNaN(localStorage.worldpasswords)) {
            //                BOTS[ofo].chat.send(`/adminlogin ${localStorage.adminlogin}`);
            //            };
            //        };
            //        if(AutoPassword = true) {
            //            if(AutoPassword && JSON.parse(localStorage.worldPasswords)[OWOP.world.name]) BOTS[ofo].chat.send(`/pass ${JSON.parse(localStorage.worldPasswords)[OWOP.world.name]}`);                    };
            //        if(AutoNickname = true) {
            //            BOTS[ofo].chat.send(`/nickname ${localStorage.scaled_botnick}`);
            //        };
            //    }, 1500);
            //};
        }
    };

    let PI2 = 3 * Math.PI, FOLLOWADD = PI2 / 45, f = 0, x, y;
    document.getElementById("scaled-main-menu-follow").onchange = () => {
        if(!following) {
            following = true;
            folint = setInterval(() => {
                let pos = {x: OWOP.mouse.tileX, y: OWOP.mouse.tileY}, i = BOTS.length;
                while (i--) {
                    if(animation === animations.circle){
                        if(!BOTS[i]) return;
                        x = pos.x + (Math.cos(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                        y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                        BOTS[i].world.move(x, y);
                        if(paintfollow) {BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor);};
                    };
                };
                f = (f + FOLLOWADD - .5) % PI2;
            }, parseInt(localStorage.scaled_followinterval));
        } else {
            following = false;
            clearInterval(folint);
        };
    };

    document.getElementById("scaled-config-menu-config-proxies").onchange = () => {
        let val = document.getElementById("scaled-config-menu-config-proxies").value;
        localStorage.scaled_proxies = val;
    };

    document.getElementById("scaled-config-menu-config-botnick").onchange = () => {
        let val = document.getElementById("scaled-config-menu-config-botnick").value;
        localStorage.scaled_botnick = val;
    };

    document.getElementById("scaled-config-menu-config-followint").onchange = () => {
        let val = document.getElementById("scaled-config-menu-config-followint").value;
        localStorage.scaled_followinterval = val;
    };

    document.getElementById("scaled-assets-menu-addasset").onclick = async () => {
        let assets = localStorage.scaled_assets;
        if(!assets) assets = [];
        else assets = JSON.parse(assets);
        assets.push(await upload("image/*"));
        localStorage.scaled_assets = JSON.stringify(assets);
        refreshAssets();
    };
    updateServers();

    // hidden
    document.getElementById("scaled-main-menu").hidden = false; document.getElementById("scaled-main-menu-item").classList.add("is-active");
    document.getElementById("scaled-proxies-menu").hidden = true; document.getElementById("scaled-proxies-menu-item").classList.remove("is-active");
    document.getElementById("scaled-assets-menu").hidden = true; document.getElementById("scaled-assets-menu-item").classList.remove("is-active");
    document.getElementById("scaled-config-menu").hidden = true; document.getElementById("scaled-config-menu-item").classList.remove("is-active");
    document.getElementById("scaled-bots-menu").hidden = true; document.getElementById("scaled-bots-menu-item").classList.remove("is-active");
    // onclick
    document.getElementById("scaled-main-menu-item").addEventListener("click", () => {
        document.getElementById("scaled-main-menu").hidden = false; document.getElementById("scaled-main-menu-item").classList.add("is-active");
        document.getElementById("scaled-proxies-menu").hidden = true; document.getElementById("scaled-proxies-menu-item").classList.remove("is-active");
        document.getElementById("scaled-assets-menu").hidden = true; document.getElementById("scaled-assets-menu-item").classList.remove("is-active");
        document.getElementById("scaled-config-menu").hidden = true; document.getElementById("scaled-config-menu-item").classList.remove("is-active");
        document.getElementById("scaled-bots-menu").hidden = true; document.getElementById("scaled-bots-menu-item").classList.remove("is-active");
    });
    document.getElementById("scaled-proxies-menu-item").addEventListener("click", () => {
        document.getElementById("scaled-main-menu").hidden = true; document.getElementById("scaled-main-menu-item").classList.remove("is-active");
        document.getElementById("scaled-proxies-menu").hidden = false; document.getElementById("scaled-proxies-menu-item").classList.add("is-active");
        document.getElementById("scaled-assets-menu").hidden = true; document.getElementById("scaled-assets-menu-item").classList.remove("is-active");
        document.getElementById("scaled-config-menu").hidden = true; document.getElementById("scaled-config-menu-item").classList.remove("is-active");
        document.getElementById("scaled-bots-menu").hidden = true; document.getElementById("scaled-bots-menu-item").classList.remove("is-active");
    });
    document.getElementById("scaled-assets-menu-item").addEventListener("click", () => {
        refreshAssets();
        document.getElementById("scaled-main-menu").hidden = true; document.getElementById("scaled-main-menu-item").classList.remove("is-active");
        document.getElementById("scaled-proxies-menu").hidden = true; document.getElementById("scaled-proxies-menu-item").classList.remove("is-active");
        document.getElementById("scaled-assets-menu").hidden = false; document.getElementById("scaled-assets-menu-item").classList.add("is-active");
        document.getElementById("scaled-config-menu").hidden = true; document.getElementById("scaled-config-menu-item").classList.remove("is-active");
        document.getElementById("scaled-bots-menu").hidden = true; document.getElementById("scaled-bots-menu-item").classList.remove("is-active");
    });
    document.getElementById("scaled-config-menu-item").addEventListener("click", () => {
        document.getElementById("scaled-main-menu").hidden = true; document.getElementById("scaled-main-menu-item").classList.remove("is-active");
        document.getElementById("scaled-proxies-menu").hidden = true; document.getElementById("scaled-proxies-menu-item").classList.remove("is-active");
        document.getElementById("scaled-assets-menu").hidden = true; document.getElementById("scaled-assets-menu-item").classList.remove("is-active");
        document.getElementById("scaled-config-menu").hidden = false; document.getElementById("scaled-config-menu-item").classList.add("is-active");
        document.getElementById("scaled-bots-menu").hidden = true; document.getElementById("scaled-bots-menu-item").classList.remove("is-active");
    });
    document.getElementById("scaled-bots-menu-item").addEventListener("click", () => {
        document.getElementById("scaled-main-menu").hidden = true; document.getElementById("scaled-main-menu-item").classList.remove("is-active");
        document.getElementById("scaled-proxies-menu").hidden = true; document.getElementById("scaled-proxies-menu-item").classList.remove("is-active");
        document.getElementById("scaled-assets-menu").hidden = true; document.getElementById("scaled-assets-menu-item").classList.remove("is-active");
        document.getElementById("scaled-config-menu").hidden = true; document.getElementById("scaled-config-menu-item").classList.remove("is-active");
        document.getElementById("scaled-bots-menu").hidden = false; document.getElementById("scaled-bots-menu-item").classList.add("is-active");
    });
    OWOP.tool.addToolObject(new OWOP.tool.class("Bot Brush", OWOP.cursors.brush, OWOP.fx.player.RECT_SELECT_ALIGNED(1), OWOP.RANK.USER, tool => {
                tool.setEvent("mousemove mousedown", async e => {
                    if (e.buttons !== 0) for (let i = -1; i < 2; i++)
                        for (let j = -1; j < 2; j++) if (!OWOP.world.setPixel(OWOP.mouse.tileX + i, OWOP.mouse.tileY + j, e.buttons === 1 ? OWOP.player.selectedColor : [255, 255, 255]))
                        {
                            let abc = getFree();
                            if(Math.floor(BOTS[abc].utils.bucket.allowance) === 1) await sleep(42);
                            BOTS[abc].world.setPixel(OWOP.mouse.tileX + i, OWOP.mouse.tileY + j, e.buttons === 1 ? OWOP.player.selectedColor : [255, 255, 255]);
                        };
                });
            }));
    let LastChunk = Date.now();
    OWOP.tool.addToolObject(new OWOP.tool.class('Bot Chunker', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(16), false, function(tool){
        let queue = [];
        let pix = 16;
        const set = (x, y, color) => {
            OWOP.mouse.lastX = x*16;OWOP.mouse.lastY = y*16;
            OWOP.world.setPixel(x, y, color);
        };
        const eq = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
        function clearChunk(chunkX, chunkY){
            for(let y = 0; y < 16; ++y){
                for(let x = 0; x < 16; ++x){
                    let pos = [chunkX*16 + x, chunkY*16 + y];
                    if((!eq(OWOP.world.getPixel(...pos), [255, 255, 255])) && (queue.filter(i => eq(i, pos)).length < 1)){
                        queue.unshift(pos);
                    }
                }
            }
        }
        tool.setEvent('mousedown mousemove', function(mouse, event){
            if (mouse.buttons === 1) {
                if(eraserpattern === eraserpatterns.tb){
                    let brushercolor = OWOP.player.selectedColor;
                    let antx = Math.floor(OWOP.mouse.tileX/16)
                    let anty = Math.floor(OWOP.mouse.tileY/16)
                    let verx = antx*16
                    let very = anty*16
                    drawRectbrush(verx, very, 16, 16, brushercolor)
                } else if(eraserpattern === eraserpatterns.lr){
                    if (Date.now() - LastChunk < 100) return;
                    LastChunk = Date.now();
                    for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = true;
                    let color = mouse.buttons === 1 ? OWOP.player.selectedColor : [255, 255, 255];
                    let chunkx = Math.floor(OWOP.mouse.tileX / pix) * pix;
                    let chunky = Math.floor(OWOP.mouse.tileY / pix) * pix;
                    let armor = pix * pix;
                    //console.log(armor)
                    for (let x = 0; x < pix; x++) {
                        for (let y = 0; y < pix; y++) {
                            const abc = getFree();
                            //if(BOTS[abc].utils.bucket.allowance === 0) await sleep(42);
                            BOTS[abc].world.setPixel(chunkx + x, chunky + y, color);
                        };
                    }
                    for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = false;
                };
            };
        });
    }));

            OWOP.tools.addToolObject(new OWOP.tools.class('Bot Area', OWOP.cursors.select, OWOP.fx.player.NONE, false, function (tool) {
                tool.setFxRenderer(function (fx, ctx, time) {
                    if (!fx.extra.isLocalPlayer) return 1;
                    let x = fx.extra.player.x;
                    let y = fx.extra.player.y;
                    let fxx = (Math.floor(x / 16) - OWOP.camera.x) * OWOP.camera.zoom;
                    let fxy = (Math.floor(y / 16) - OWOP.camera.y) * OWOP.camera.zoom;
                    let oldlinew = ctx.lineWidth;
                    ctx.lineWidth = 1;
                    if (tool.extra.end) {
                        let s = tool.extra.start;
                        let e = tool.extra.end;
                        let x = (s[0] - OWOP.camera.x) * OWOP.camera.zoom + 0.5;
                        let y = (s[1] - OWOP.camera.y) * OWOP.camera.zoom + 0.5;
                        let w = e[0] - s[0];
                        let h = e[1] - s[1];
                        ctx.beginPath();
                        ctx.rect(x, y, w * OWOP.camera.zoom, h * OWOP.camera.zoom);
                        ctx.globalAlpha = 0.5;
                        ctx.strokeStyle = "#FFFFFF";
                        ctx.stroke();
                        ctx.setLineDash([3, 4]);
                        ctx.strokeStyle = "#000000";
                        ctx.stroke();
                        //ctx.globalAlpha = 0.25 + Math.sin(time / 500) / 4;
                        ctx.fillStyle = OWOP.renderer.patterns.unloaded;
                        ctx.fill();
                        ctx.setLineDash([]);
                        let oldfont = ctx.font;
                        ctx.font = "16px sans-serif";
                        let perc = 2;
                        if(perc > 100) perc = 100;
                        let txt = (!tool.extra.clicking ? "Right click to start pixeling." : "") + '(' + Math.abs(w) + 'x' + Math.abs(h) + ` | ${perc}%)`;
                        let txtx = window.innerWidth >> 1;
                        let txty = window.innerHeight >> 1;
                        txtx = Math.max(x, Math.min(txtx, x + w * OWOP.camera.zoom));
                        txty = Math.max(y, Math.min(txty, y + h * OWOP.camera.zoom));
                        OWOP.drawText = (ctx, str, x, y, centered) => {
                            ctx.strokeStyle = "#000000", ctx.fillStyle = "#FFFFFF", ctx.lineWidth = 2.5, ctx.globalAlpha = 1;
                            if (centered) {
                                x -= ctx.measureText(str).width >> 1;
                            }
                            ctx.strokeText(str, x, y);
                            ctx.globalAlpha = 1;
                            ctx.fillText(str, x, y);
                        };
                        OWOP.drawText(ctx, txt, txtx, txty, true);
                        ctx.font = oldfont;
                        ctx.lineWidth = oldlinew;
                        return 0;
                    } else {
                        ctx.beginPath();
                        ctx.moveTo(0, fxy + 0.5);
                        ctx.lineTo(window.innerWidth, fxy + 0.5);
                        ctx.moveTo(fxx + 0.5, 0);
                        ctx.lineTo(fxx + 0.5, window.innerHeight);

                        //ctx.lineWidth = 1;
                        ctx.globalAlpha = 0.8;
                        ctx.strokeStyle = "#FFFFFF";
                        ctx.stroke();
                        ctx.setLineDash([3]);
                        ctx.strokeStyle = "#000000";
                        ctx.stroke();

                        ctx.setLineDash([]);
                        ctx.lineWidth = oldlinew;
                        return 1;
                    }
                });

                tool.extra.start = null;
                tool.extra.end = null;
                tool.extra.clicking = false;

                tool.setEvent('mousedown', async (mouse, event) => {

                    let s = tool.extra.start;
                    let e = tool.extra.end;
                    let isInside = function isInside() {
                        return mouse.tileX >= s[0] && mouse.tileX < e[0] && mouse.tileY >= s[1] && mouse.tileY < e[1];
                    };
                    if (mouse.buttons === 1 && !tool.extra.end) {
                        tool.extra.start = [Math.floor(mouse.tileX / 16) * 16, Math.floor(mouse.tileY / 16) * 16];
                        tool.extra.clicking = true;
                        tool.setEvent('mousemove', function (mouse, event) {
                            if (tool.extra.start && mouse.buttons === 1) {
                                tool.extra.end = [Math.floor(mouse.tileX / 16) * 16, Math.floor(mouse.tileY / 16) * 16];
                                return 1;
                            }
                        });
                        let finish = function finish() {
                            tool.setEvent('mousemove mouseup deselect', null);
                            tool.extra.clicking = false;
                            let s = tool.extra.start;
                            let e = tool.extra.end;
                            if (e) {
                                if (s[0] === e[0] || s[1] === e[1]) {
                                    tool.extra.start = null;
                                    tool.extra.end = null;
                                }
                                if (s[0] > e[0]) {
                                    let tmp = e[0];
                                    e[0] = s[0];
                                    s[0] = tmp;
                                }
                                if (s[1] > e[1]) {
                                    let tmp = e[1];
                                    e[1] = s[1];
                                    s[1] = tmp;
                                }
                            }
                            OWOP.renderer.render(OWOP.renderer.rendertype.FX);
                        };
                        tool.setEvent('deselect', finish);
                        tool.setEvent('mouseup', function (mouse, event) {
                            if (!(mouse.buttons & 1)) {
                                finish();
                            }
                        });
                    } else if (mouse.buttons === 1 && tool.extra.end) {
                        if (isInside()) {
                            let offx = mouse.tileX;
                            let offy = mouse.tileY;
                            tool.setEvent('mousemove', function (mouse, event) {
                                let dx = mouse.tileX - offx;
                                let dy = mouse.tileY - offy;
                                tool.extra.start = [s[0] + dx, s[1] + dy];
                                tool.extra.end = [e[0] + dx, e[1] + dy];
                            });
                            let end = function end() {
                                tool.setEvent('mouseup deselect mousemove', null);
                            };
                            tool.setEvent('deselect', end);
                            tool.setEvent('mouseup', function (mouse, event) {
                                if (!(mouse.buttons & 1)) {
                                    end();
                                }
                                ;
                            });
                        }
                    } else if (mouse.buttons === 2 && tool.extra.end && isInside()) {
                        if (BOTS.length === 0){
                            let w = tool.extra.end[0] - tool.extra.start[0];
                            let h = tool.extra.end[1] - tool.extra.start[1];
                            for (let x = 0; x < w; x++) {
                                    let chunkx = tool.extra.start[0];
                                    let chunky = tool.extra.start[1];
                                    let color = OWOP.player.selectedColor;
                                    for (let y = 0; y < h; y++) {
                                        OWOP.world.setPixel(chunkx + x, chunky + y, color);
                                }
                            }
                        }
                        for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = true;
                        let w = tool.extra.end[0] - tool.extra.start[0];
                        let h = tool.extra.end[1] - tool.extra.start[1];
                        let color = OWOP.player.selectedColor;

                        let chunkx = tool.extra.start[0];
                        let chunky = tool.extra.start[1];

                        async function drawPattern(pattern) {
                            if(pattern == patterns.lr) {
                                for (let x = 0; x < w; x++) {
                                    for (let y = 0; y < h; y++) {
                                        let abc = getFree();
                                        if(!OldPaste) {
                                            BOTS[abc].utils.bucket.canSpend(0);
                                            if(BOTS[abc].utils.bucket.allowance <= 1) await sleep(0);  
                                        }
                                        BOTS[abc].world.setPixel(chunkx + x, chunky + y, color);
                                    }
                                }
                            } else if(pattern == patterns.tb) {
                                for (let y = 0; y < h; y++) {
                                    for (let x = 0; x < w; x++) {
                                        let abc = getFree();
                                        if(!OldPaste) {
                                            BOTS[abc].utils.bucket.canSpend(0);
                                            if(BOTS[abc].utils.bucket.allowance <= 1) await sleep(0);  
                                        }
                                        BOTS[abc].world.setPixel(chunkx + x, chunky + y, color);
                                    }
                                }
                            } else if(pattern == patterns.rand) {
                                for (let x = 0; x < w*3; x++) {
                                    for (let y = 0; y < h*3; y++) {
                                        let abc = getFree();
                                        if(!OldPaste) {
                                            BOTS[abc].utils.bucket.canSpend(0);
                                            if(BOTS[abc].utils.bucket.allowance <= 1) await sleep(0);  
                                        }
                                        BOTS[abc].world.setPixel(chunkx + Math.floor(Math.random() * w), chunky + Math.floor(Math.random() * h), color);
                                    }
                                }
                            }
                        }

                        drawPattern(pattern)
                        for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = false;
                    } else {
                        tool.extra.start = null;
                        tool.extra.end = null;
                    }
                });
            }));

            OWOP.tool.addToolObject(new OWOP.tool.class('Bot Paster', OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, function (tool) {
                tool.setEvent('mousedown', function (mouse, event) {
                    let sX = !Pixelization ? OWOP.mouse.tileX : Math.floor(OWOP.mouse.tileX/16)*16,
                        sY = !Pixelization ? OWOP.mouse.tileY : Math.floor(OWOP.mouse.tileY/16)*16;
                    if (mouse.buttons != 0) {
                        let input = document.createElement('input');
                        input.type = "file";
                        input.accept = 'image/*';

                        input.click();
                        input.onchange = () => {
                            if (BOTS.length === 0) return OWOP.chat.local("No bots connected!");
                            sleep(15);
                            let imgURL = URL.createObjectURL(input.files[0]);
                            let img = new Image();
                            img.onload = async () => {
                                let cnv = document.createElement('canvas');
                                let ctx = cnv.getContext('2d');
                                let imgWidth = img.naturalWidth;
                                let imgHeight = img.naturalHeight;

                                cnv.width = 3000;
                                cnv.height = 3000;
                                if (imgWidth > 3000) return OJS.chat.local('The width of image is too big!');
                                if (imgHeight > 3000) return OJS.chat.local('The height of image is too big!');
                                ctx.drawImage(img, 0, 0);
                                let imgData = ctx.getImageData(0, 0, imgWidth, imgHeight);
                                let orgPixels = Array.from(imgData.data);
                                let i = 0;
                                let I = 0;
                                let pixels = [];
                                while (i <= orgPixels.length) {
                                    pixels.push([orgPixels[i], orgPixels[i + 1], orgPixels[i + 2], orgPixels[i + 3]]);
                                    i += 4;
                                }
                                ;

                                for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = true;
                                for (i = 0; i < imgHeight; i++)
                                    for (let j = 0; j < imgWidth; j++) {
                                        let abc = getFree();
                                        BOTS[abc].world.setPixel(sX + j, sY + i, pixels[I]);
                                        I++;
                                    }
                                for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = false;
                            };
                            img.src = imgURL;
                        };
                    }
                    ;
                });
            }));
            OWOP.world.protection = {
                intervals: {},
                pixels: {}
            };

            OWOP.tool.addToolObject(new OWOP.tool.class("Bot Protection", OWOP.cursors.shield, OWOP.fx.player.RECT_SELECT_ALIGNED(16), OWOP.RANK.USER, tool => {
                tool.setFxRenderer((fx, ctx) => {
                    const X = fx.extra.player.x,
                          Y = fx.extra.player.y,
                          cX = (16 * Math.floor(X / 256) - OWOP.camera.x) * OWOP.camera.zoom,
                          cY = (16 * Math.floor(Y / 256) - OWOP.camera.y) * OWOP.camera.zoom,
                          tX = fx.extra.player.tileX,
                          tY = fx.extra.player.tileY,
                          chunk = OWOP.world.protection.pixels[`${tX},${tY}`];
                    ctx.globalAlpha = .5;
                    ctx.fillStyle = chunk ? "#00FF00" : "#FF0000";
                    ctx.fillRect(cX, cY, 16 * OWOP.camera.zoom, 16 * OWOP.camera.zoom);
                    return true;
                });

                tool.setEvent("mousedown mousemove", fx => {
                    const X = Math.floor(OWOP.mouse.tileX / OWOP.options.serverAddress[0].proto.chunkSize) * 16,
                          Y = Math.floor(OWOP.mouse.tileY / OWOP.options.serverAddress[0].proto.chunkSize) * 16,
                          chunk = OWOP.world.protection.pixels[`${X},${Y}`];
                    switch (fx.buttons) {
                        case 1:
                            if (chunk) return false;
                            for (let y = 0; y < 16; y++)
                                for (let x = 0; x < 16; x++) {
                                    OWOP.world.protection.pixels[`${X + x},${Y + y}`] = OWOP.world.getPixel(X + x, Y + y);
                                    OWOP.world.protection.intervals[`${X + x},${Y + y}`] = setInterval(() => {
                                        if (!OWOP.world.setPixel(X + x, Y + y, OWOP.world.protection.pixels[`${X + x},${Y + y}`])) {
                                            let abc = getFree();
                                            if(BOTS[abc].utils.bucket.allowance >= 1) BOTS[abc].world.setPixel(X + x, Y + y, OWOP.world.protection.pixels[`${X + x},${Y + y}`]);
                                        }
                                    }, 1);
                                }
                            return true;
                            break;
                        case 2:
                            if (!chunk) return false;
                            for (let y = 0; y < 16; y++)
                                for (let x = 0; x < 16; x++) {
                                    clearInterval(OWOP.world.protection.intervals[`${X + x},${Y + y}`]);
                                    delete OWOP.world.protection.intervals[`${X + x},${Y + y}`];
                                    delete OWOP.world.protection.pixels[`${X + x},${Y + y}`];
                                }
                            break;
                    }
                });
            }));
            OWOP.tools.addToolObject(new OWOP.tools.class('Bot Text', OWOP.cursors.write, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, function (tool) {
                tool.setEvent('mousedown', function (mouse, event) {
                    if (mouse.buttons == 1 || mouse.buttons == 2) {
                        var text = prompt('Text to draw:');
                        writeText(text, mouse.tileX, mouse.tileY);
                    };
                });
            }));
            OWOP.tool.addToolObject(new OWOP.tool.class("Bot Fill", OWOP.cursors.fill, OWOP.fx.player.NONE, OWOP.RANK.USER, e => {
                e.extra.tickAmount = 30;
                let t = [],
                    n = null,
                    o = OWOP.fx.player.RECT_SELECT_ALIGNED(1);
                async function r() {
                    var o = function(e, t) {
                        return e && t && e[0] === t[0] && e[1] === t[1] && e[2] === t[2]
                    }
                    , r = function(e, r) {
                        return !!o(OWOP.world.getPixel(e, r), n) && (t.unshift([e, r]),
                                                                     !0)
                    };
                    if (t.length && n) {
                        var i = OWOP.player.selectedColor
                        , a = 0
                        , s = e.extra.tickAmount;
                        s *= 3;
                        for (a = 0; a < s && t.length; a++) {
                            var l = t.pop()
                            , u = l[0]
                            , d = l[1]
                            , f = OWOP.world.getPixel(u, d);
                            if (o(f, n) && !o(f, i)) {
                                if (!OWOP.world.setPixel(u, d, i)) {
                                    let abc = getFree();
                                    if(BOTS[abc].utils.bucket.allowance === 0) sleep(42).then(i => {
                                        if(!BOTS[abc].world.setPixel(u, d, i)) t.push(l);
                                    });
                                    if(BOTS[abc].utils.bucket.allowance !== 0) if(!BOTS[abc].world.setPixel(u, d, i)) t.push(l);
                                    break
                                }
                                var p = r(u, d - 1)
                                , m = r(u, d + 1)
                                , v = r(u - 1, d)
                                , g = r(u + 1, d);
                                p && v && r(u - 1, d - 1),
                                    p && g && r(u + 1, d - 1),
                                    m && v && r(u - 1, d + 1),
                                    m && g && r(u + 1, d + 1)
                            }
                        }
                    }
                }
                e.setFxRenderer(function(e, r, i) {
                    r.globalAlpha = .8,
                        r.strokeStyle = e.extra.player.htmlRgb;
                    var a = OWOP.camera.zoom;
                    if (n && e.extra.isLocalPlayer) {
                        r.beginPath();
                        for (var s = 0; s < t.length; s++)
                            r.rect((t[s][0] - OWOP.camera.x) * a, (t[s][1] - OWOP.camera.y) * a, a, a);
                        r.stroke()
                    } else
                        o(e, r, i)
                }),
                    e.setEvent("mousedown", function(o) {
                    4 & o.buttons || (n = OWOP.world.getPixel(o.tileX, o.tileY)) && (t.push([o.tileX, o.tileY]),
                                                                                     e.setEvent("tick", r))
                }),
                    e.setEvent("mouseup deselect", function(o) {
                    o && 1 & o.buttons || (n = null,
                                           t = [],
                                           e.setEvent("tick", null))
                });

            }));
            let aboab;
            OWOP.tools.addToolObject(new OWOP.tools.class("Bot Paste Asset", OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, tool => {
                tool.setEvent("mousedown mousemove", async e => {
                    if (e.buttons === 1) {
                        if (!selectedAsset) OWOP.chat.local("No asset selected!");
                        if (typeof selectedAsset === "string") {
                            // convert
                            let cnv = document.createElement("canvas");
                            let ctx = cnv.getContext('2d');
                            aboab = ctx;
                            let img = new Image();
                            img.onload = () => {
                                cnv.width = 2500;
                                cnv.height = 2500;
                                ctx.drawImage(img, 0, 0);
                                selectedAsset = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
                            }
                            img.src = selectedAsset;
                            return OWOP.chat.local("Image is ready.");
                        };
                        let cC0 = 0;
                        let cC1 = 0;
                        let cC2 = 0;
                        let xX = 0;
                        let yY = 0;
                        let x_ = 0;
                        let y_ = 0;
                        let I = 0;
                        let x = !Pixelization ? OWOP.mouse.tileX : Math.floor(OWOP.mouse.tileX / 16) * 16,
                            y = !Pixelization ? OWOP.mouse.tileY : Math.floor(OWOP.mouse.tileY / 16) * 16;
                        if(imgpattern === imgpatterns.default) {
                            async function pastePick() {
                                let I = 0;
                                let x = !Pixelization ? OWOP.mouse.tileX : Math.floor(OWOP.mouse.tileX/16)*16,
                                    y = !Pixelization ? OWOP.mouse.tileY : Math.floor(OWOP.mouse.tileY/16)*16;
                                for(let Y = 0; Y < selectedAsset.height; Y++){
                                    for(let X = 0; X < selectedAsset.width; X++) {
                                        let abc = getFree();
                                        if(!OldPaste) {
                                            BOTS[abc].utils.bucket.canSpend(0);
                                            if(BOTS[abc].utils.bucket.allowance <= 1) await sleep(0);
                                        }
                                        BOTS[abc].world.setPixel(x+X, y+Y, [selectedAsset.data[I++], selectedAsset.data[I++], selectedAsset.data[I++]]);
                                        I++;
                                    }
                                }
                            }
                            pastePick();
                        } else if(imgpattern === imgpatterns.grid) {
                            async function pastePick() {
                                if (!stop121) {
                                    for (let Y = 0; Y < selectedAsset.height; Y += 2) {
                                        for (let X = 0; X < selectedAsset.width; X++) {

                                            //    for(let Y = 0; Y > selectedAsset.height; Y++){
                                            //for(let X = 0; X > selectedAsset.width; X++) {
                                            let abc = getFree();
                                            if (!OldPaste) {
                                                BOTS[abc].utils.bucket.canSpend(0);
                                                if (BOTS[abc].utils.bucket.allowance <= 49) await sleep(0);
                                            }
                                            x_ = X;
                                            //xX = x_;
                                            y_ = Y;
                                            //yY = y_;
                                            BOTS[abc].world.setPixel(x + x_, y + y_, pixColor(aboab, x_, y_));
                                        }
                                    }
                                    for (let Y = 0; Y < selectedAsset.height; Y++) {
                                        for (let X = 0; X < selectedAsset.width; X += 2) {

                                            //    for(let Y = 0; Y > selectedAsset.height; Y++){
                                            //for(let X = 0; X > selectedAsset.width; X++) {
                                            let abc = getFree();
                                            if (!OldPaste) {
                                                BOTS[abc].utils.bucket.canSpend(0);
                                                if (BOTS[abc].utils.bucket.allowance <= 49) await sleep(0);
                                            }
                                            x_ = X;
                                            //xX = x_;
                                            y_ = Y;
                                            //yY = y_;
                                            BOTS[abc].world.setPixel(x + x_, y + y_, pixColor(aboab, x_, y_));
                                        }
                                    }
                                    for (let Y = 0; Y < selectedAsset.height; Y++) {
                                        for (let X = 0; X < selectedAsset.width; X++) {

                                            //    for(let Y = 0; Y > selectedAsset.height; Y++){
                                            //for(let X = 0; X > selectedAsset.width; X++) {
                                            let abc = getFree();
                                            if (!OldPaste) {
                                                BOTS[abc].utils.bucket.canSpend(0);
                                                if (BOTS[abc].utils.bucket.allowance <= 49) await sleep(0);
                                            }
                                            x_ = X;
                                            //xX = x_;
                                            y_ = Y;
                                            //yY = y_;
                                            BOTS[abc].world.setPixel(x + x_, y + y_, pixColor(aboab, x_, y_));
                                        }
                                    }
                                }
                            }
                            for (let Y = 0; Y < selectedAsset.height; Y++) {
                                for (let X = 0; X < selectedAsset.width; X++) {
                                    if ([OWOP.world.getPixel(x + X, y + Y)[0], OWOP.world.getPixel(x + X, y + Y)[1], OWOP.world.getPixel(x + X, y + Y)[2]] != pixColor(aboab, X, Y)) {
                                        await pastePick();
                                        await sleep(1000);
                                        X = 0;
                                        Y = 0;
                                        if (stop121) {
                                            Y = selectedAsset.height;
                                            X = selectedAsset.width;
                                        }
                                    }
                                }
                            } //
                        } else if(imgpattern === imgpatterns.leftup) {
                            async function pastePick() {
                                for (let X = 0; X < selectedAsset.width; X++) {
                                    for (let Y = 0; Y < selectedAsset.height; Y++) {
                                        if (stop121) {
                                            Y = selectedAsset.height;
                                            X = selectedAsset.width;
                                        }
                                        //    for(let Y = 0; Y > selectedAsset.height; Y++){
                                        //for(let X = 0; X > selectedAsset.width; X++) {
                                        let x_ = (selectedAsset.width - X) - 1;
                                        let y_ = (selectedAsset.height - Y) - 1;
                                        let i = getFree();
                                        if (!OldPaste) {
                                            BOTS[i].utils.bucket.canSpend(0);
                                            if (BOTS[i].utils.bucket.allowance <= 1) {
                                                await sleep(0);
                                                Y--
                                            } else {
                                                BOTS[i].world.setPixel(x + x_, y + y_, pixColor(aboab, x_, y_));
                                            }
                                        }
                                    }
                                }
                                //    }
                                //}
                            }
                            pastePick();
                        } else if (imgpattern == imgpatterns.square) {
                            async function pastePick() {
                                let x_2 = 1;
                                let y_2 = selectedAsset.height - 1;
                                let y_1;
                                let x_1 = selectedAsset.width - 1;
                                for (y_ = 0; y_ < selectedAsset.height; y_++) {
                                    for (x_ = 0; x_ < selectedAsset.width; x_++) {
                                        if (stop121) {
                                            x_ = selectedAsset.height;
                                            y_ = selectedAsset.width;
                                            y_1 = selectedAsset.height;
                                        }
                                        let abc = getFree();
                                        if (!OldPaste) {
                                            BOTS[abc].utils.bucket.canSpend(0);
                                            if (BOTS[abc].utils.bucket.allowance <= 1) {
                                                await sleep(0);
                                                x_--
                                            } else {
                                                BOTS[abc].world.setPixel(x + x_, y + y_, pixColor(aboab, x_, y_));
                                            }
                                        }
                                    }
                                    y_1 = y_;
                                    if (x_1 > 0) {
                                        for (y_ = 0; y_ < selectedAsset.height; y_++) {
                                            let abc = getFree();
                                            if (!OldPaste) {
                                                BOTS[abc].utils.bucket.canSpend(0);
                                                if (BOTS[abc].utils.bucket.allowance <= 1) {
                                                    await sleep(0);
                                                    y_--
                                                } else {
                                                    BOTS[abc].world.setPixel(x + x_1, y + y_, pixColor(aboab, x_1, y_));
                                                }
                                            }
                                        }
                                        x_1--
                                    }
                                    y_ = y_1;
                                    if (y_2 != 0) {
                                        for (let x_ = selectedAsset.width - 1; x_ > -1; x_--) {
                                            if (!stop121) {
                                                let abc = getFree();
                                                if (!OldPaste) {
                                                    BOTS[abc].utils.bucket.canSpend(0);
                                                    if (BOTS[abc].utils.bucket.allowance <= 1) {
                                                        await sleep(0);
                                                        x_++
                                                    } else {
                                                        BOTS[abc].world.setPixel(x + x_, y + y_2, pixColor(aboab, x_, y_2));
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    y_2--
                                    y_1 = y_;
                                    if (x_2 < selectedAsset.width) {
                                        for (y_ = selectedAsset.height - 1; y_ > -1; y_--) {
                                            let abc = getFree();
                                            if (!OldPaste) {
                                                BOTS[abc].utils.bucket.canSpend(0);
                                                if (BOTS[abc].utils.bucket.allowance <= 1) {
                                                    await sleep(0);
                                                    y_++
                                                } else {
                                                    BOTS[abc].world.setPixel(x + x_2, y + y_, pixColor(aboab, x_2, y_));
                                                }
                                            }
                                        }
                                        x_2++
                                    }
                                    y_ = y_1;
                                }
                            };
                            pastePick();
                        };
                    };
                });
            }));
    });
    var chars = [
        [0b1111111, 0b1000001, 0b1010111, 0b1010100, 0b1010111, 0b1000001, 0b1111111] /*A*/ ,
        [0b1111111, 0b1000001, 0b1010101, 0b1010101, 0b1010101, 0b1001001, 0b1111111] /*B*/ ,
        [0b1111111, 0b1000001, 0b1011101, 0b1010101, 0b1010101, 0b1010101, 0b1110111] /*C*/ ,
        [0b1111111, 0b1000001, 0b1011101, 0b1010101, 0b1011101, 0b1100011, 0b0111110] /*D*/ ,
        [0b1111111, 0b1000001, 0b1010101, 0b1010101, 0b1010101, 0b1011101, 0b1110111] /*E*/ ,
        [0b1111111, 0b1000001, 0b1010111, 0b1010100, 0b1010100, 0b1011100, 0b1110000] /*F*/ ,
        [0b1111111, 0b1000001, 0b1011101, 0b1010101, 0b1010101, 0b1010001, 0b1111111] /*G*/ ,
        [0b1111111, 0b1000001, 0b1110111, 0b0010100, 0b1110111, 0b1000001, 0b1111111] /*H*/ ,
        [0b1111111, 0b1000001, 0b1111111] /*I*/ ,
        [0b1111111, 0b1010001, 0b1011101, 0b1010101, 0b1011101, 0b1000001, 0b1111111] /*J*/ ,
        [0b1111111, 0b1000001, 0b1110111, 0b0110110, 0b1101011, 0b1011101, 0b1110111] /*K*/ ,
        [0b1111111, 0b1000001, 0b1111101, 0b0000101, 0b0000101, 0b0000101, 0b0000111] /*L*/ ,
        [0b1111111, 0b1000001, 0b1011111, 0b1000001, 0b1011111, 0b1000001, 0b1111111] /*M*/ ,
        [0b1111111, 0b1000001, 0b1011111, 0b1000001, 0b1111101, 0b1000001, 0b1111111] /*N*/ ,
        [0b1111111, 0b1000001, 0b1011101, 0b1010101, 0b1011101, 0b1000001, 0b1111111] /*O*/ ,
        [0b1111111, 0b1000001, 0b1010111, 0b1010100, 0b1010100, 0b1000100, 0b1111100] /*P*/ ,
        [0b1111111, 0b1000001, 0b1011101, 0b1010101, 0b1011101, 0b1000011, 0b1111111] /*Q*/ ,
        [0b1111111, 0b1000001, 0b1010111, 0b1010100, 0b1010111, 0b1001001, 0b1111111] /*R*/ ,
        [0b1111111, 0b1000101, 0b1010101, 0b1010101, 0b1010101, 0b1010001, 0b1111111] /*S*/ ,
        [0b1110000, 0b1010000, 0b1011111, 0b1000001, 0b1011111, 0b1010000, 0b1110000] /*T*/ ,
        [0b1111111, 0b1000001, 0b1111101, 0b0000101, 0b1111101, 0b1000001, 0b1111111] /*U*/ ,
        [0b1111100, 0b1000110, 0b1111011, 0b0001101, 0b1111011, 0b1000110, 0b1111100] /*V*/ ,
        [0b1111110, 0b1000011, 0b1111101, 0b0100011, 0b1111101, 0b1000011, 0b1111110] /*W*/ ,
        [0b1110111, 0b1011101, 0b1101011, 0b0110110, 0b1101011, 0b1011101, 0b1110111] /*X*/ ,
        [0b1111000, 0b1001100, 0b1110111, 0b0011001, 0b1110111, 0b1001100, 0b1111000] /*Y*/ ,
        [0b1111111, 0b1010001, 0b1010101, 0b1010101, 0b1010101, 0b1000101, 0b1111111] /*Z*/ ,
    ];  
    var NUMS = [
        [0b11111, 0b10001, 0b11111] /*0*/ ,
        [0b01000, 0b11111] /*1*/ ,
        [0b10111, 0b10101, 0b11101] /*2*/ ,
        [0b10101, 0b10101, 0b11111] /*3*/ ,
        [0b11100, 0b00100, 0b11111] /*4*/ ,
        [0b11101, 0b10101, 0b10111] /*5*/ ,
        [0b11111, 0b10101, 0b10111] /*6*/ ,
        [0b10000, 0b10000, 0b11111] /*7*/ ,
        [0b11111, 0b10101, 0b11111] /*8*/ ,
        [0b11101, 0b10101, 0b11111] /*9*/
    ];  
    var symbols = {
        "33": [0b11101] /*!*/ ,
        "34": [0b11000, 0b00000, 0b11000] /*"*/ ,
        "35": [0b01010, 0b11111, 0b01010, 0b11111, 0b01010] /*#*/ ,
        "39": [0b11000] /*'*/ ,
        "40": [0b01110, 0b10001] /*(*/ ,
        "41": [0b10001, 0b01110] /*)*/ ,
        "43": [0b00100, 0b01110, 0b00100] /*+*/ ,
        "45": [0b00100, 0b00100, 0b00100] /*-*/ ,
        "46": [0b00001] /*.*/ ,
        "47": [0b00001, 0b00110, 0b11000] /*/*/ ,
        "58": [0b01010] /*:*/ ,
        "61": [0b01010, 0b01010, 0b01010] /*=*/ ,
        "63": [0b10101, 0b01000] /*?*/ ,
        "91": [0b11111, 0b10001] /*[*/ ,
        "93": [0b10001, 0b11111] /*]*/
    };  
};

function pixColor(img, X, Y, RGB) {
    var abab = img.getImageData(X, Y, 1, 1).data
    return [abab[0], abab[1], abab[2]]
};

function append(src, onload) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = onload;
    document.body.appendChild(s);
};

setTimeout(install, 2001);
})();
