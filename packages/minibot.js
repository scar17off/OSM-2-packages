// ==UserScript==
// @name        MiniBOT Client
// @version     2.5
// @author      dimden (Leaked by Autoplayer)
// @description Best bots in OWOP.
// @include     https://ourworldofpixels.com/*
// @run-at      document-end
// @grant       none
// ===/UserScript==

if(!OWOP.tool){OWOP.tool = OWOP.tools};
if(!OWOP.tools){OWOP.tools = OWOP.tool};

function install() {
    let BOTS;
    let autoreconnecten = true;
    function MiniBOT() {
        BOTS = [];
        OWOP.util.loadScript("https://raw.githack.com/Olical/EventEmitter/master/EventEmitter.min.js", () => {
            OWOP.util.loadScript("https://www.google.com/recaptcha/api.js");

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
            const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
            let cont;
            let selectedAsset = null;
            let BotCount = parseInt(localStorage.MB_BotCount) || 3;
            let ProxyPasswords = localStorage.MB_ProxyPasswords;
            if(!ProxyPasswords) ProxyPasswords = [];
            if(localStorage.MB_ProxyPasswords) ProxyPasswords = ProxyPasswords.split(",");
            let AutoReconnect = Boolean(localStorage.MB_AutoReconnect);
            if(localStorage.MB_AutoReconnect === "false") AutoReconnect = false;
            let AutoPassword = Boolean(localStorage.MB_AutoPassword);
            if(localStorage.MB_AutoPassword === "false") AutoPassword = false;
            let Pixelization = Boolean(localStorage.MB_Pixelization);
            if(localStorage.MB_Pixelization === "false") Pixelization = false;
            let OldPaste = Boolean(localStorage.MB_OldPaste);
            if(localStorage.MB_OldPaste === "false") OldPaste = false;
            let last = 0;
            let animation = 4;
            let animations = {
                default: 0,
                disk: 1,
                atom: 2,
                random: 3,
                wave: 4,
                line: 5,
                hyperbola: 6
            }
            const SITEKEY = "6LcgvScUAAAAAARUXtwrM8MP0A0N70z4DHNJh-KI";
            let cI = 1;
            let following = false;
            let isCaptchaJoin = false;

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
                let assets = localStorage.MB_Assets;
                if(!assets) assets = [];
                else assets = JSON.parse(assets);
                const assetsDiv = document.getElementById("real-assets-cont");
                assetsDiv.innerHTML = "";

                for(let i in assets) {
                    const image = new Image();
                    image.onload = () => {
                        image.style.width = "48px";
                        image.style.height = "48px";
                        image.style.border = "solid 1px";
                        image.onclick = e => {
                            for(let j in document.getElementById("real-assets-cont").children) {
                                if(typeof(document.getElementById("real-assets-cont").children[j]) !== "object") break;
                                document.getElementById("real-assets-cont").children[j].style.border = "solid 1px";
                            }
                            selectedAsset = assets[i];
                            image.style.border = "solid 1px darkred";
                        };
                        image.oncontextmenu = e => {
                            e.preventDefault();
                            assets.splice(i, 1);
                            localStorage.MB_Assets = JSON.stringify(assets);
                            refreshAssets();
                        }
                        assetsDiv.append(image);
                    };
                    image.src = assets[i];
                }
            };
            const updateServers = () => {
                const servers = document.getElementById("serv-cont");
                servers.innerHTML = "";
                for(let i in ProxyPasswords) {
                    const Proxy = ProxyPasswords[i];
                    const ProxyDiv = `
<div id="proxy-${Proxy}">
<h3>${Proxy}</h3>
Status - <span id="proxystatus-${Proxy}" style="color: orange">Please wait...</span><br>
Connections - <span id="proxyconns-${Proxy}"> [-]</span><br>
<button id="proxyjoin-${Proxy}">Connect</button>
<br>
</div>
`;
                    servers.insertAdjacentHTML("beforeend", ProxyDiv);
                    const WSCheck = new WebSocket(`wss://ws-proxy${Proxy}.glitch.me/?ws=WS-STATUS`);
                    WSCheck.onopen = () => {
                        document.getElementById(`proxyjoin-${Proxy}`).onclick = () => { proxyJoin(Proxy) };
                        document.getElementById(`proxystatus-${Proxy}`).innerText = "Online";
                        document.getElementById(`proxystatus-${Proxy}`).style.color = "blue";
                        WSCheck.send("WS-STATUS");
                    };
                    WSCheck.onmessage = msg => {
                        document.getElementById(`proxyconns-${Proxy}`).innerText = parseInt(msg.data.split(",")[1])-1;
                        WSCheck.close();
                    };
                    WSCheck.onerror = () => {
                        document.getElementById(`proxystatus-${Proxy}`).innerText = "Offline";
                        document.getElementById(`proxystatus-${Proxy}`).style.color = "red";
                    };
                }
            };

            // returns captcha token
            const renderCaptcha = () => new Promise(resolve => {
                OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(`Verification needed (${cI++}/${BotCount})`, {
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
            });

            OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(" ", { closeable: true }, win => {
                const bot_cont = document.createElement("div"),
						serv_cont = document.createElement("div"),
                        assets_cont = document.createElement("div"),
                        bots_btn  = document.createElement("button"),
                        serv_btn  = document.createElement("button"),
                        assets_btn = document.createElement("button");
                bots_btn.onclick = () => {
                        bot_cont.hidden = false;
                        serv_cont.hidden = true;
                        assets_cont.hidden = true;
                };
                serv_btn.onclick = () => {
                        bot_cont.hidden = true;
                        serv_cont.hidden = false;
                        assets_cont.hidden = true;
                };
                assets_btn.onclick = () => {
                        bot_cont.hidden = true;
                        serv_cont.hidden = true;
                        assets_cont.hidden = false;
                };
                serv_cont.id = "serv-cont";
                serv_cont.hidden = true;
                assets_cont.hidden = true;
                assets_cont.id = "assets-cont";
                bot_cont.id = "bot-cont";
                const real_assets = document.createElement("div");
                real_assets.id = "real-assets-cont";

                // assets
                const addAsset = document.createElement("button");
                addAsset.innerText = "Add asset";
                addAsset.onclick = async () => {
                    let assets = localStorage.MB_Assets;
                    if(!assets) assets = [];
                    else assets = JSON.parse(assets);
                    assets.push(await upload("image/*"));
                    localStorage.MB_Assets = JSON.stringify(assets);
                    refreshAssets();
                };
                assets_cont.append(addAsset);
                assets_cont.append(document.createElement("br"));
                assets_cont.append(real_assets);

                // add shit
                win.addObj(document.createElement("br"));
                win.addObj(bots_btn);
                win.addObj(serv_btn);
                win.addObj(assets_btn);
                win.addObj(serv_cont);
                win.addObj(bot_cont);
                win.addObj(assets_cont);
                cont = win.container;
                cont.style.maxHeight = "300px";
                cont.style.width = "680px";
            }).move(window.innerWidth - 1000, 50));

            cont.parentElement.insertAdjacentHTML(`afterbegin`, `
<input type="number" style="width: 33px;border: solid 1px;background-color: #67524d;color: #FFFFFF;" id="bot-count" value="${BotCount}" placeholder="${BotCount}"/>
<button style="font-size: 13px; border: solid 1px #121212" id="bot-join">Join</button>
<button style="font-size: 13px; border: solid 1px #121212" id="bot-follow">Follow</button>
<button style="font-size: 13px; border: solid 1px #008000" id="bot-are">Auto reconnect</button>
<button style="font-size: 13px; border: solid 1px #121212" id="bot-dis">Disconnect</button>
<button style="font-size: 13px; border: solid 1px #121212" id="bot-conf">Config</button>
<select style="font-size: 13px; border: solid 1px #121212;background-color: #67524d;color: #FFFFFF;" id="bot-anim">
<option>Default</option>
<option>Disk</option>
<option>Atom</option>
<option>Random</option>
<option>Wave</option>
<option>Line</option>
<option>Hyperbola</option>
</select>
<input style="width: 45px;border: solid 1px;background-color: #67524d;color: #FFFFFF;" placeholder="Send" id="bot-send"/><br>`);
            updateServers();
            cont = document.getElementById("bot-cont");
            document.getElementById("bot-conf").addEventListener("click", () => {
                OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("MiniBOT Config", { closeable: true }, win => {
                    const textarea = document.createElement("textarea");
                    textarea.id = "bot-config";
                    textarea.width = "450px";
                    textarea.hight = "90px";
                    textarea.value = `# DON'T DELETE ANYTHING | CHANGE ONLY
BOTCOUNT=${BotCount} # Bot count on connect.
PROXYPASSWORDS=${ProxyPasswords} # Proxy servers passwords. Split with ","!
AUTOPASSWORD=${AutoPassword} # When joining world if set to true bots will type world password from localStorage.
AUTORECONNECT=${AutoReconnect} # Auto reconnect on connection close.
PIXELIZATION=${Pixelization} # When pasting, selecting it will do all grid for you.
OLDPASTE=${OldPaste} # Enable old pasting.`;
                    textarea.onchange = () => {
                        const lines = textarea.value.split(String.fromCharCode(10));
                        try {
                            BotCount = parseInt(lines[1].split('=')[1].split('#')[0]);
                            document.getElementById('bot-count').value = BotCount;
                            localStorage.MB_BotCount = BotCount;
                            ProxyPasswords = lines[2].split('=')[1].split('#')[0].slice(0, -1).split(",");
                            localStorage.MB_ProxyPasswords = ProxyPasswords;
                            AutoPassword = lines[3].split('=')[1].split('#')[0].slice(0, -1) === "true" ? true : false;
                            localStorage.MB_AutoPassword = AutoPassword;
                            if(AutoPassword === "false") AutoPassword = false;
                            AutoReconnect = lines[4].split('=')[1].split('#')[0].slice(0, -1) === "true" ? true : false;
                            localStorage.MB_AutoReconnect = AutoReconnect;
                            if(AutoReconnect === "false") AutoReconnect = false;
                            Pixelization = lines[5].split('=')[1].split('#')[0].slice(0, -1) === "true" ? true : false;
                            localStorage.MB_Pixelization = Pixelization;
                            if(Pixelization === "false") Pixelization = false;
                            OldPaste = lines[6].split('=')[1].split('#')[0].slice(0, -1) === "true" ? true : false;
                            localStorage.MB_OldPaste = OldPaste;
                            updateServers();
                        } catch(e) {}
                    };
                    win.addObj(textarea);
                }).move(window.innerWidth - 600, 400))
            });

            const chunkPerSec = document.createElement("div");
            chunkPerSec.style = `border: 5px #aba389 solid;
-o-border-image: url(/img/small_border.png) 5 repeat;
border-image: url(/img/small_border.png) 5 repeat;
border-image-outset: 1px;
background-color: #7e635c;
box-shadow: 0px 0px 5px #000;
position: fixed;
top: -3px;
left: 65%;
color: #FFF;
font: 16px pixel-op, sans-serif;
text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;`;
            chunkPerSec.id = "chunkPerSec";
            chunkPerSec.innerHTML = `<span id="chunkPerSec-chunk">0</span> chunks`;
            document.body.append(chunkPerSec);

            document.getElementById('bot-anim').onchange = () => {
                let val = document.getElementById('bot-anim').value;
                if(val === "Default") animation = animations.default;
                if(val === "Disk") animation = animations.disk;
                if(val === "Atom") animation = animations.atom;
                if(val === "Random") animation = animations.random;
                if(val === "Wave") animation = animations.wave;
                if(val === "Line") animation = animations.line;
                if(val === "Hyperbola") animation = animations.hyperbola;
            };
            document.getElementById("bot-send").addEventListener("keyup", e => {
                if (e.key === "Enter") for (let i = 0; i < BOTS.length; i++) BOTS[i].chat.send(document.getElementById("bot-send").value);
            });

            refreshAssets();

            document.getElementById("bot-join").addEventListener("click", async () => {
                cI = 1;
                isCaptchaJoin = false;
                for (let i = 0; i < BotCount; i++) {
                    const ofo = BOTS.length + 0;
                    BOTS[ofo] = new OJS({ind: ofo});
                    BOTS[ofo].ws.onopen = async () => {
                        if(AutoPassword && JSON.parse(localStorage.worldPasswords)[OWOP.world.name]) BOTS[ofo].chat.send(`/pass ${JSON.parse(localStorage.worldPasswords)[OWOP.world.name]}`);
                    };
                }
            });
            let PI2 = 3 * Math.PI, FOLLOWADD = PI2 / 45, f = 0, folint;
                document.getElementById("bot-follow").addEventListener("click", () => {
                    if (!following) {
                        following = true;
                        document.getElementById("bot-follow").innerHTML = "<s>Follow</s>";
                        folint = setInterval(async () => {
                            let pos = {x: OWOP.mouse.tileX, y: OWOP.mouse.tileY}, i = BOTS.length;
                            while (i--) {
                                if(animation === animations.hyperbola) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + Math.tan(2 * Math.PI*2 / BOTS.length * i + f * BOTS.length);
                                    y = pos.y + 1/Math.tan(2 * Math.PI*2 / BOTS.length * i + f * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                } else if(animation === animations.line) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.cos(2 * Math.PI*2 ** BOTS.length * i + f) * BOTS.length);
                                    y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                } else if(animation === animations.wave) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.cos(2 * Math.PI / BOTS.length * i + f) * BOTS.length);
                                    y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                } else if(animation === animations.random) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.cos(2 * Math.PI*2 / BOTS.length - i + f) * BOTS.length);
                                    y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                } else if(animation === animations.atom) {
                                                if (i >= BOTS.length/2) {
                                                    let x = pos.x + (Math.cos(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length/2),
                                                        y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f + 2) * BOTS.length/2);
                                                    if(!BOTS[i].options.isJoined) continue;
                                                    BOTS[i].world.move(x, y);
                                                } else {
                                                if(!BOTS[i]) return;
                                                if(!BOTS[i].options.isJoined) continue;
                                                    x = pos.x + (Math.cos(2 * Math.PI*2 / BOTS.length * i + f + 2) * BOTS.length/2);
                                                    y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length/2);
                                                    BOTS[i].world.move(x, y);
                                                }
                                } else if(animation === animations.default) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.cos(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                                    y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                } else if(animation === animations.disk) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.cos(2 * Math.PI*2 / BOTS.length * i + f*2) * BOTS.length);
                                    y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                }
                            }
                            f = (f + FOLLOWADD - .5) % PI2;
                        }, 80);
                    } else {
                        following = false;
                        document.getElementById("bot-follow").innerHTML = "Follow";
                        clearInterval(folint);
                    }
                });


            document.getElementById("bot-dis").addEventListener("click", () => {
                // fetch("api/disconnectme");
                for (let i in BOTS) BOTS[i].ws.close();
            });
            document.getElementById("bot-are").addEventListener("click", () => {
                if(autoreconnecten) {
                    autoreconnecten = false;
                    document.getElementById('bot-are').style = "font-size: 13px; border: solid 1px #800000";
                } else {
                    autoreconnecten = true;
                    document.getElementById('bot-are').style = "font-size: 13px; border: solid 1px #008000";
                    //OWOP.on(OWOP.events.net.disconnected, () => {
                    //});
                }
            });
            document.getElementById("bot-count").addEventListener("change", () => {
                BotCount = document.getElementById("bot-count").value;
                localStorage.MB_BotCount = BotCount;
            });

            setInterval(() => {
                let o = 0;
                for(let i in BOTS) o += BOTS[i].utils.bucket.allowance;
                document.getElementById("chunkPerSec-chunk").innerText = (o/256).toFixed(3);
            }, 30);

            /*
                  OWOP.js for browser by DIMDEN
                  It has EVERYTHING that you need for your OWOP Bot.
                  I hope you enjoy!

                  GitHub: https://github.com/dimdenGD/OWOP.js
                  My discord tag: Eff the cops#1877
                */

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
                            cont.insertAdjacentHTML("beforeend", `
<div style="border-bottom: solid 1px #121212" id="bot-${options.ind}">
<h3 id="bot-${options.ind}-logo">BOT-${options.ind}</h3>
<span id="bot-${options.ind}-coords">X: ${OJS.player.x} Y: ${OJS.player.y}</span><br>
<span id="bot-${options.ind}-pq">PQuota: ${Math.round(OJS.utils.bucket.allowance)}</span><br>
<button id="bot-${options.ind}-leave">Leave</button>
</div>`);
                            document.getElementById(`bot-${options.ind}-leave`).addEventListener("click", () => {
                                that.world.leave()
                            });
                            if(options.proxy) document.getElementById(`proxyconns-${options.proxy}`).innerText = parseInt(document.getElementById(`proxyconns-${options.proxy}`).innerText)+1;
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
                            if (document.getElementById(`bot-${options.ind}-coords`)) document.getElementById(`bot-${options.ind}-coords`).innerText = `X: ${Math.round(x)} Y: ${Math.round(y)}`;
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
                    let pqi = setInterval(() => {
                        if (!document.getElementById(`bot-${options.ind}-pq`)) return;
                        for (let i = 0; i < BOTS.length - 1; i++) BOTS[i].utils.bucket.canSpend(0);
                        document.getElementById(`bot-${options.ind}-pq`).innerText = "PQuota: " + Math.round(OJS.utils.bucket.allowance) + ` (${OJS.utils.bucket.rate}x${OJS.utils.bucket.time})`
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
                        clearInterval(pqi);
                        if (document.getElementById(`bot-${options.ind}`)) document.getElementById(`bot-${options.ind}`).remove();
                        if(!AutoReconnect) //OWOP.chat.local(`[${options.ind}]: Closed connection.`)
                            BOTS = BOTS.filter(i => i.options.ind !== options.ind);
                        console.log(`[OWOP.js]: Disconnected.`);
                        if(OJS.options.isJoined && options.proxy) document.getElementById(`proxyconns-${options.proxy}`).innerText = parseInt(document.getElementById(`proxyconns-${options.proxy}`).innerText)-1;
                        if(AutoReconnect) BOTS.push(new struct(options));
                        this.emit("close")
                    };

                };
            };
            let struct = OJS;

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
            OWOP.tool.addToolObject(new OWOP.tool.class('Bot Chunker', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(16), false, function (tool) {
                let pix = 16;
                tool.setEvent('mousemove mousedown', async mouse => {
                    if (mouse.buttons != 0) {
                        if (mouse.buttons || mouse.buttons == 2) {
                            if (Date.now() - LastChunk < 100) return;
                            LastChunk = Date.now();
                            for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = true;
                            let color = mouse.buttons === 1 ? OWOP.player.selectedColor : [255, 255, 255];
                            let chunkx = Math.floor(OWOP.mouse.tileX / pix) * pix;
                            let chunky = Math.floor(OWOP.mouse.tileY / pix) * pix;
                            let armor = pix * pix;
                            //console.log(armor)
                            if (BOTS.length === 0) return OWOP.chat.local("No bots connected!");
                            for (let x = 0; x < pix; x++) {
                                for (let y = 0; y < pix; y++) {
                                    const abc = getFree();
                                    if(BOTS[abc].utils.bucket.allowance === 0) await sleep(42);
                                    BOTS[abc].world.setPixel(chunkx + x, chunky + y, color);
                                };
                            }
                            for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = false;
                        }
                    }
                });
            }));


            OWOP.tool.addToolObject(new OWOP.tool.class('Bot Area', OWOP.cursors.select, OWOP.fx.player.NONE, false, function (tool) {
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
                        let perc = Math.floor((parseFloat(document.getElementById("chunkPerSec-chunk").innerText.substr(0, 5)*256)+(((Math.abs(w)*Math.abs(h))/3)))/(Math.abs(w)*Math.abs(h))*100);
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
                        if (BOTS.length === 0) return OWOP.chat.local("No bots connected!");
                        for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = true;
                        let w = tool.extra.end[0] - tool.extra.start[0];
                        let h = tool.extra.end[1] - tool.extra.start[1];
                        let color = OWOP.player.selectedColor;

                        let chunkx = tool.extra.start[0];
                        let chunky = tool.extra.start[1];
                        let armor = (w * h) * 2;
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
                                        if(!OldPaste) {
                                            BOTS[abc].utils.bucket.canSpend(0);
                                            if(BOTS[abc].utils.bucket.allowance <= 1) await sleep(0);
                                        }
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
            OWOP.tool.addToolObject(new OWOP.tool.class("Bot Paste Asset", OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), OWOP.RANK.USER, tool => {
                tool.setEvent("mousedown mousemove", async e => {
                    if(e.buttons === 1) {
                        if(!selectedAsset) OWOP.chat.local("No asset selected!");
                        if(typeof selectedAsset === "string") {
                            // convert
                            let cnv = document.createElement("canvas");
                            let ctx = cnv.getContext('2d');
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
                        let I = 0;
                        let x = !Pixelization ? OWOP.mouse.tileX : Math.floor(OWOP.mouse.tileX/16)*16,
                            y = !Pixelization ? OWOP.mouse.tileY : Math.floor(OWOP.mouse.tileY/16)*16;
                        for(let Y = 0; Y < selectedAsset.height; Y++)
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
                })
            }));
        });
    };
    MiniBOT();
}

function uninstall() {
    OWOP.windowSys.windows[" "].close();
}

setTimeout(install, 2000)
