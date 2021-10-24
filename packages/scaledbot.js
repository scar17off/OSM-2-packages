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
    let folint;
    let FollowInterval;
    if(!localStorage.scaled_followinterval) {
        localStorage.scaled_followinterval = 79;
        FollowInterval = localStorage.scaled_followinterval;
    } else {
        FollowInterval = localStorage.scaled_followinterval;
    };
    let autoreconnecten = false;
    let log = "false";
    let animation = 0;
    let animations = {
        circle: 0
    }
    const SITEKEY = "6LcgvScUAAAAAARUXtwrM8MP0A0N70z4DHNJh-KI";
    let cI = 1;
    let following = false;
    let isCaptchaJoin = false;
    let cont;
    let BOTS = [];
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
<span>${Proxy}</span>
<br>
Status: <span id="scaled-proxy-proxystatus-${Proxy}">-</span>
<br>
Connections: <span id="scaled-proxy-proxyconns-${Proxy}"> Wait...</span>
<br>
<button id="scaled-proxy-proxyjoin-${Proxy}">Connect</button>
<br>
<hr>
</div>
`;
            servers.insertAdjacentHTML("beforeend", ProxyDiv);
            const WSCheck = new WebSocket(`wss://ws-proxy${Proxy}.glitch.me/?ws=WS-STATUS`);
            WSCheck.onopen = () => {
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
                document.getElementById(`scaled-proxy-proxystatus-${Proxy}`).innerText = "-";
                document.getElementById(`scaled-proxy-proxystatus-${Proxy}`).style.color = "red";
            };
        }
    };
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
            BOTS[ofo].ws.onopen = async () => {
                if(AutoPassword && JSON.parse(localStorage.worldPasswords)[OWOP.world.name]) BOTS[ofo].chat.send(`/pass ${JSON.parse(localStorage.worldPasswords)[OWOP.world.name]}`);
            };
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
* {
    user-select: none;
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
        <button id="scaled-config-menu-item" class="i-tab-menu-item">Config</button>
        <a><h1 class="i-tab-menu-item" title="made with love">Made by <a href="https://discord.gg/PRhsxYvWHq">scar17off</a>.</h2></a>
        <a><h1 class="i-tab-menu-item"><span>0 bots, 0.00 chunks </span></h2></a>
    </div>
        <div id="scaled-main-menu">
            <hr>
            <div><p1>Main</p1></div>
            <div><label>Connection Options</label></div>
            <div><input type="number" id="scaled-main-menu-botcount" style="width: 240; border: solid 1px;background-color: #212121; color: #737373; user-select: none;" placeholder="Count" value="5" id="scaled-main-menu-botcount" title="Number of bots to connect."></input></div>
            <div><input type="checkbox" id="scaled-main-menu-captcharender" name="usecaptcharenderer" checked></input><label>Render captcha?</label></div>
            <div><input type="checkbox" id="scaled-main-menu-autoreconnect" name="useautoreconnect"></input><label>Auto Reconnect</label></div>
            <hr>
            <div><label>Bot Connection</label></div>
            <div><button id="scaled-main-menu-connect">Connect</button>
            <button id="scaled-main-menu-disconnect">Disconnect</button></div>
            <hr>
            <div><label>Follow Options</label></div>
            <div>
                <select style="width: 240; font-size: 13px; border: solid 1px; background-color: #212121; color: #737373;" title="Follow select" id="scaled-main-menu-followselect">
                    <option>Circle</option>
                </select>
                <div><input type="checkbox" id="scaled-main-menu-follow" name="followenable">Follow</input></div>
            </div>
            <hr>
            <div><label>Chat</label></div>
            <div><input id="scaled-main-menu-send" placeholder="Message to send" title="Send" style="width: 240; border: solid 1px;background-color: #212121; color: #737373; user-select: none;"></send>
            <button id="scaled-main-menu-botsend">Send</button></div>
        </div>
    <div id="scaled-proxies-menu">
        <hr>
        <div><label>Proxies</label></div>
        <div><input id="scaled-proxies-menu-addproxy" placeholder="xxxx-yyyy" title="Enter your proxy here." style="width: 150px; height: 14px; border: solid 1px;background-color: #212121; color: #737373; user-select: none;"></input>
        <button id="scaled-proxies-menu-add">Add</button>
        <button id="scaled-proxies-menu-refresh">Refresh</button>
        <button id="scaled-proxies-menu-delall">Delete all</button></div>
        <hr>
        <div id="scaled-proxies-menu-proxies"></div>
    </div>
    <div id="scaled-assets-menu">
        <hr>
        <div><label>Assets</label></div>
        <div id="scaled-assets-menu-assetlist"></div>
        <div><button id="scaled-assets-menu-addasset" class="scaled-assets-menu">Add asset</button></div>
    </div>
    <div id="scaled-config-menu">
        <hr>
        <div><label>Config</label></div>
        <div><input id="scaled-config-menu-config-proxies" style="border: 1px solid; background-color: rgb(33, 33, 33); color: rgb(115, 115, 115); margin: 0px; width: 510px; height: 16px;" placeholder="Proxy Passwords" value=${localStorage.scaled_proxies}></input></div>
        <div><input type="number" id="scaled-config-menu-config-followint" style="border: 1px solid; background-color: rgb(33, 33, 33); color: rgb(115, 115, 115); margin: 0px; width: 510px; height: 16px;" placeholder="Follow Interval (ms)" value=${localStorage.scaled_followinterval}></input></div>
    </div>
</div>
`;
        win.addObj(menu);
        win.addObj(styles);
        cont = win.container;
        cont.style.height = "280px";
        cont.style.maxHeight = "300px";
        cont.style.width = "680px";
    }).move(75, 75));

    document.getElementById("scaled-main-menu-disconnect").onclick = async () => {
        for (let i in BOTS) BOTS[i].ws.close();
    };

    document.getElementById("scaled-main-menu-captcharender").onchange = async () => {
        if(!rendercaptchaen) {
            rendercaptchaen = true;
        } else {
            autoreconnecten = false;
        };
    };

    document.getElementById("scaled-proxies-menu-add").onclick = async () => {
        let prox = document.getElementById("scaled-proxies-menu-addproxy").value;
        if(prox == "") return;
        ProxyPasswords.push(prox);
    };

    document.getElementById("scaled-main-menu-autoreconnect").onchange = async () => {
        if(!autoreconnecten) {
            autoreconnecten = true;
        } else {
            autoreconnecten = false;
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
    // onclick
    document.getElementById("scaled-main-menu-item").addEventListener("click", () => {
        document.getElementById("scaled-main-menu").hidden = false; document.getElementById("scaled-main-menu-item").classList.add("is-active");
        document.getElementById("scaled-proxies-menu").hidden = true; document.getElementById("scaled-proxies-menu-item").classList.remove("is-active");
        document.getElementById("scaled-assets-menu").hidden = true; document.getElementById("scaled-assets-menu-item").classList.remove("is-active");
        document.getElementById("scaled-config-menu").hidden = true; document.getElementById("scaled-config-menu-item").classList.remove("is-active");
    });
    document.getElementById("scaled-proxies-menu-item").addEventListener("click", () => {
        document.getElementById("scaled-main-menu").hidden = true; document.getElementById("scaled-main-menu-item").classList.remove("is-active");
        document.getElementById("scaled-proxies-menu").hidden = false; document.getElementById("scaled-proxies-menu-item").classList.add("is-active");
        document.getElementById("scaled-assets-menu").hidden = true; document.getElementById("scaled-assets-menu-item").classList.remove("is-active");
        document.getElementById("scaled-config-menu").hidden = true; document.getElementById("scaled-config-menu-item").classList.remove("is-active");
    });
    document.getElementById("scaled-assets-menu-item").addEventListener("click", () => {
        refreshAssets();
        document.getElementById("scaled-main-menu").hidden = true; document.getElementById("scaled-main-menu-item").classList.remove("is-active");
        document.getElementById("scaled-proxies-menu").hidden = true; document.getElementById("scaled-proxies-menu-item").classList.remove("is-active");
        document.getElementById("scaled-assets-menu").hidden = false; document.getElementById("scaled-assets-menu-item").classList.add("is-active");
        document.getElementById("scaled-config-menu").hidden = true; document.getElementById("scaled-config-menu-item").classList.remove("is-active");
    });
    document.getElementById("scaled-config-menu-item").addEventListener("click", () => {
        document.getElementById("scaled-main-menu").hidden = true; document.getElementById("scaled-main-menu-item").classList.remove("is-active");
        document.getElementById("scaled-proxies-menu").hidden = true; document.getElementById("scaled-proxies-menu-item").classList.remove("is-active");
        document.getElementById("scaled-assets-menu").hidden = true; document.getElementById("scaled-assets-menu-item").classList.remove("is-active");
        document.getElementById("scaled-config-menu").hidden = false; document.getElementById("scaled-config-menu-item").classList.add("is-active");
    });
    });
};

function append(src, onload) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = onload;
    document.body.appendChild(s);
};

setTimeout(install, 2001);
})();
