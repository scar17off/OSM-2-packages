// ==UserScript==
// @name        MiniNOT Client
// @version     1.6.6
// @author      dimden, modded by NoT_BoT
// @description Best bots in OWOP.
// @include     https://ourworldofpixels.com/*
// @run-at      document-end
// @grant       none
// ==/UserScript==
// s%3AYGFzaicJ3ON2erJqgmKXGBAq4VwDjc0f.%2BUSiZ1i9JeU%2BC%2FuTbAMs1WpiBGUpqdiQf6%2F1Pfh7QUw
// CREATED BY dimden, leaked by Autoplayer, modded by NoT_BoT
function install() {
    let alfa = false;
    let alpha = 1;
    let kik121 = false;
    let PlayrebanX;
    let PlayrebanY;
    let BOT;
    var radius121 = 0;
    var state = 0;
    var maxradius = 10;
    var speed121 = 100;
    let TooOlL = localStorage.MN_TooOlL;
    let pastrezim = localStorage.MN_pastrezim;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    let bruhingProx;
    let ggez;
    let stop121 = false;
    setInterval(() => {
        let RN = Math.floor((Math.random() * 14) + 1);
        if (RN === 1) {
            ggez = [255, 0, 0];
        } else if (RN === 2) {
            ggez = [255, 128, 0];
        } else if (RN === 3) {
            ggez = [255, 255, 0];
        } else if (RN === 4) {
            ggez = [128, 255, 0];
        } else if (RN === 5) {
            ggez = [0, 255, 0];
        } else if (RN === 6) {
            ggez = [0, 255, 128];
        } else if (RN === 7) {
            ggez = [0, 255, 255];
        } else if (RN === 8) {
            ggez = [0, 128, 255];
        } else if (RN === 9) {
            ggez = [0, 0, 255];
        } else if (RN === 10) {
            ggez = [127, 0, 255];
        } else if (RN === 11) {
            ggez = [255, 0, 255];
        } else if (RN === 12) {
            ggez = [255, 0, 127];
        } else if (RN === 13) {
            ggez = [128, 128, 128];
        } else {
            ggez = [255, 255, 255];
        };
    }, 250);
    let ui;
    //////////don't change ANYMORE! pls//////////
    let BOTS;
    let autoreconnecten = true;
    let radius = 3;
    let speedss = 0.15;
    /////////////////////////////////////////////
    function MiniBOT() {
        BOTS = [];
        let OK = [];
        append("https://raw.githack.com/Olical/EventEmitter/master/EventEmitter.min.js", () => {
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
            const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
            let cont;
            let selectedAsset = null;
            let BotCount = parseInt(localStorage.MB_BotCount) || 3;
            let ProxyPasswords = localStorage.MmB_ProxyPasswords;
            if (!ProxyPasswords) ProxyPasswords = [];
            if (localStorage.MmB_ProxyPasswords) ProxyPasswords = ProxyPasswords.split(",");
            let AutoReconnect = Boolean(localStorage.MB_AutoReconnect);
            if (localStorage.MB_AutoReconnect === "false") AutoReconnect = false;
            let AutoPassword = Boolean(localStorage.MB_AutoPassword);
            if (localStorage.MB_AutoPassword === "false") AutoPassword = false;
            let Pixelization = Boolean(localStorage.MB_Pixelization);
            if (localStorage.MB_Pixelization === "false") Pixelization = false;
            let OldPaste = false;
            let protPlaser = Boolean(localStorage.MB_protPlaser);
            if (localStorage.MB_protPlaser === "false") protPlaser = false;
            //protPlaser
            let last = 0;
            let animation = 0;
            let animations = {
                default: 0,
                god: 1,
                disk: 2,
                atom: 3,
                random: 4,
                wave: 5,
                line: 6,
                hyperbola: 7
            }
            let mode = 0;
            let modes = {
                normal: 0,
                random: 1
            }
            const SITEKEY = "6LcgvScUAAAAAARUXtwrM8MP0A0N70z4DHNJh-KI";
            let cI = 1;
            let following = false;
            let isCaptchaJoin = false;

            const getFree = () => {
                //let b = BOTS.filter(i => i.ws.readyState === 1);
                let b = BOTS;
                //
                if (b.length === 0) return -1;
                if (last >= b.length) last = 0;
                return last++;
            };

            function isProtected(x, y) {
                let chunks = OWOP.require("main").misc.world.protectedChunks;
                x = Math.floor(x / 16);
                y = Math.floor(y / 16);
                return chunks[`${x},${y}`] ? true : false;
            };
            //let ws = "wss://ws-proxy" + server + ".glitch.me/?ws=wss://ourworldofpixels.com/";
            const proxyJoin = server => {
                let ws = "wss://ws-proxy" + server + ".glitch.me/?ws=wss://ourworldofpixels.com/";
                for (let i = 0; i < BotCount; i++) {
                    const ofo = BOTS.length;
                    BOTS[ofo] = new OJS({
                        ws: ws,
                        origin: location.href,
                        ind: ofo,
                        proxy: server
                    });
                    BOTS[ofo].ws.onopen = async () => {
                        if (AutoPassword && JSON.parse(localStorage.worldPasswords)[OWOP.world.name]) BOTS[ofo].chat.send(`/pass ${JSON.parse(localStorage.worldPasswords)[OWOP.world.name]}`);
                        //OWOP.chat.local(` `);
                    };
                }
            };
            const refreshAssets = () => {
                let assets = localStorage.MB_Assets;
                if (!assets) assets = [];
                else assets = JSON.parse(assets);
                const assetsDiv = document.getElementById("real-assets-cont");
                assetsDiv.innerHTML = "";

                for (let i in assets) {
                    const image = new Image();
                    image.onload = () => {
                        image.style.width = "48px";
                        image.style.height = "48px";
                        image.style.border = "solid 1px";
                        image.onclick = e => {
                            for (let j in document.getElementById("real-assets-cont").children) {
                                if (typeof(document.getElementById("real-assets-cont").children[j]) !== "object") break;
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
                for (let i in ProxyPasswords) {
                    const Proxy = ProxyPasswords[i];
                    const ProxyDiv = `
<div id="proxy-${Proxy}">
<span>${Proxy}</span>
Status - <span id="proxystatus-${Proxy}" style="color: orange">Checking...</span>
Connections - <span id="proxyconns-${Proxy}"> [-]</span>
<button id="proxyjoin-${Proxy}">Connect</button>
</div>
`;
                    servers.insertAdjacentHTML("beforeend", ProxyDiv);
                    const WSCheck = new WebSocket(`wss://ws-proxy${Proxy}.glitch.me/?ws=WS-STATUS`);
                    WSCheck.onopen = () => {
                        document.getElementById(`proxyjoin-${Proxy}`).onclick = () => {
                            proxyJoin(Proxy)
                        };
                        document.getElementById(`proxystatus-${Proxy}`).innerText = "Online";
                        document.getElementById(`proxystatus-${Proxy}`).style.color = "green";
                        WSCheck.send("WS-STATUS");
                    };
                    WSCheck.onmessage = msg => {
                        document.getElementById(`proxyconns-${Proxy}`).innerText = parseInt(msg.data.split(",")[1]) - 1;
                        //console.log("test " + msg + " " + Proxy);
                        WSCheck.close();
                    };
                    WSCheck.onerror = () => {
                        //document.getElementById(`proxystatus-${Proxy}`).innerText = "Offline";
                        //document.getElementById(`proxystatus-${Proxy}`).style.color = "red";
                        document.getElementById(`proxy-${Proxy}`).style.cssText = "display:none";

                    };
                }
            };

            // returns captcha token
            const renderCaptcha = () => new Promise(resolve => {
                OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(`Verification needed (${cI++}/${BotCount})`, {
                    closeable: true
                }, function(win) {
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

            OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(" ", {
                closeable: true
            }, win => {
                win.addObj(document.createTextNode("MiniNOT Client от НеБота. Реал кринж боты"));
                const bot_cont = document.createElement("div"),
                    serv_cont = document.createElement("div"),
                    assets_cont = document.createElement("div"),
                    custom_cont = document.createElement("div"),
                    bots_btn = document.createElement("button"),
                    serv_btn = document.createElement("button"),
                    assets_btn = document.createElement("button"),
                    custom_btn = document.createElement("button"); //CoNeCt
                bots_btn.insertAdjacentHTML(`afterbegin`, `
                <button style="font-size: 13px; border: solid 1px #121212">bots_btn</button>
                `)
                serv_btn.insertAdjacentHTML(`afterbegin`, `
                <button style="font-size: 13px; border: solid 1px #121212">serv_btn</button>
                `)
                assets_btn.insertAdjacentHTML(`afterbegin`, `
                <button style="font-size: 13px; border: solid 1px #121212">assets_btn</button>
                `)
                custom_btn.insertAdjacentHTML(`afterbegin`, `
                <button style="font-size: 13px; border: solid 1px #121212">Сервир наба. ака NoT_BoT ака nab</button>
                `)
                bots_btn.onclick = () => {
                    bot_cont.hidden = false;
                    serv_cont.hidden = true;
                    assets_cont.hidden = true;
                    custom_cont.hidden = true;
                };
                serv_btn.onclick = () => {
                    bot_cont.hidden = true;
                    serv_cont.hidden = false;
                    assets_cont.hidden = true;
                    custom_cont.hidden = true;
                };
                assets_btn.onclick = () => {
                    bot_cont.hidden = true;
                    serv_cont.hidden = true;
                    assets_cont.hidden = false;
                    custom_cont.hidden = true;
                };
                custom_btn.onclick = () => {
                    window.open("https://ourworldofpixels.com/121");
                };
                serv_cont.id = "serv-cont";
                serv_cont.hidden = true;
                custom_cont.id = "custom-cont";
                custom_cont.hidden = true;
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
                    if (!assets) assets = [];
                    else assets = JSON.parse(assets);
                    assets.push(await upload("image/*"));
                    localStorage.MB_Assets = JSON.stringify(assets);
                    refreshAssets();
                };
                assets_cont.append(addAsset);
                assets_cont.append(document.createElement("br"));
                assets_cont.append(real_assets);

                const customxtext = document.createElement("input")
                customxtext.placeholder = "custom x"
                customxtext.id = "customtextx"
                const customytext = document.createElement("input")
                customytext.placeholder = "custom y"
                customytext.id = "customtexty"
                custom_cont.append(customxtext);
                custom_cont.append(document.createElement("br"));
                custom_cont.append(customytext);


                // add shit
                win.addObj(document.createElement("br"));
                win.addObj(bots_btn);
                win.addObj(serv_btn);
                win.addObj(assets_btn); //custom_btn
                win.addObj(custom_btn);
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
<button style="font-size: 13px; border: solid 1px #008000" id="StopBruh">StopBruh</button>
<button style="font-size: 13px; border: solid 1px #008000" id="kickBruh">kickBruh</button>
<button style="font-size: 13px; border: solid 1px #008000" id="alfa">alpha</button>
<button style="font-size: 13px; border: solid 1px #121212" id="bot-dis">Disconnect</button>
<button style="font-size: 13px; border: solid 1px #121212" id="bot-conf">Config</button><br>
<select style="font-size: 13px; border: solid 1px #121212;background-color: #67524d;color: #FFFFFF;" id="bot-anim">
<option>Default</option>
<option>Disk</option>
<option>Atom</option>
<option>Random</option>
<option>Wave</option>
<option>Line</option>
<option>Hyperbola</option>
<option>NabFollow</option>
<option>YouText</option>
</select>
<select style="font-size: 13px; border: solid 1px #121212;background-color: #67524d;color: #FFFFFF;" id="bot-tool">
<option>Cursor</option>
<option>Pipette</option>
<option>Fill</option>
<option>Zoom</option>
<option>Export</option>
<option>Line</option>
<option>Copy</option>
<option>Random</option>
</select>
<select style="font-size: 13px; border: solid 1px #121212;background-color: #67524d;color: #FFFFFF;" id="bot-pastrezim">
<option>Random</option>
<option>Left-Up</option>
<option>CeTo4Ka</option>
<option>Туда-суда</option>
<option>Вправо-вниз</option>
</select>
<input style="width: 8BQAzQwVETtFWGmAFZjAwNSYA7M4EczfocpPa2kZ6AiC1tVQuAhJTRjLG5Nkk4QqFWHxiKBdi6RuUFjC5zMhvhUyK7tatMA"/>
<input style="width: 45px;border: solid 1px;background-color: #67524d;color: #FFFFFF;" placeholder="alpha" id="alpha121"/>
<input style="width: 45px;border: solid 1px;background-color: #67524d;color: #FFFFFF;" placeholder="Send" id="bot-send"/>
`);
            updateServers();
            cont = document.getElementById("bot-cont");
            document.getElementById("bot-conf").addEventListener("click", () => {
                OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("MiniBOT Config", {
                    closeable: true
                }, win => {
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
OLDPASTE=${ui} # Enable old pasting.
protPlaser=${protPlaser} # Enable protPlaser.`; //protPlaser
                    textarea.onchange = () => {
                        const lines = textarea.value.split(String.fromCharCode(10));
                        try {
                            BotCount = parseInt(lines[1].split('=')[1].split('#')[0]);
                            document.getElementById('bot-count').value = BotCount;
                            localStorage.MB_BotCount = BotCount;
                            ProxyPasswords = lines[2].split('=')[1].split('#')[0].slice(0, -1).split(",");
                            localStorage.MmB_ProxyPasswords = ProxyPasswords;
                            AutoPassword = lines[3].split('=')[1].split('#')[0].slice(0, -1) === "true" ? true : false;
                            localStorage.MB_AutoPassword = AutoPassword;
                            if (AutoPassword === "false") AutoPassword = false;
                            AutoReconnect = lines[4].split('=')[1].split('#')[0].slice(0, -1) === "true" ? true : false;
                            localStorage.MB_AutoReconnect = AutoReconnect;
                            if (AutoReconnect === "false") AutoReconnect = false;
                            Pixelization = lines[5].split('=')[1].split('#')[0].slice(0, -1) === "true" ? true : false;
                            localStorage.MB_Pixelization = Pixelization;
                            if (Pixelization === "false") Pixelization = false;
                            protPlaser = lines[7].split('=')[1].split('#')[0].slice(0, -1) === "true" ? true : false;
                            localStorage.MB_protPlaser = protPlaser;
                            updateServers();
                        } catch (e) {}
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
            chunkPerSec.innerHTML = `<span id="chunkPerSec-chunk">0</span>`;
            document.body.append(chunkPerSec);

            document.getElementById('bot-anim').onchange = () => {
                let val = document.getElementById('bot-anim').value;
                if (val === "Default") animation = animations.default;
                if (val === "God") animation = animations.god;
                if (val === "Disk") animation = animations.disk;
                if (val === "Atom") animation = animations.atom;
                if (val === "Random") animation = animations.random;
                if (val === "Wave") animation = animations.wave;
                if (val === "Line") animation = animations.line;
                if (val === "Hyperbola") animation = animations.hyperbola;
                if (val === "NabFollow") animation = animations.NabFollow;
                if (val === "YouText") animation = animations.YouText;
                //<option>NabFollow</option>
                //<option>YouText  </option>
            };

            document.getElementById('bot-tool').onchange = () => {
                let val = document.getElementById('bot-tool').value;
                if (val === "Cursor") {
                    TooOlL = 0;
                    localStorage.MN_TooOlL = 0;
                }
                if (val === "Move") {
                    TooOlL = 1;
                    localStorage.MN_TooOlL = 1;
                }
                if (val === "Pipette") {
                    TooOlL = 2;
                    localStorage.MN_TooOlL = 2;
                }
                if (val === "Zoom") {
                    TooOlL = 4;
                    localStorage.MN_TooOlL = 4;
                }
                if (val === "Fill") {
                    TooOlL = 5;
                    localStorage.MN_TooOlL = 5;
                }
                if (val === "Export") {
                    TooOlL = 7;
                    localStorage.MN_TooOlL = 7;
                }
                if (val === "Line") {
                    TooOlL = 8;
                    localStorage.MN_TooOlL = 8;
                }
                if (val === "Copy") {
                    TooOlL = 10;
                    localStorage.MN_TooOlL = 10;
                }
                if (val === "Random") {
                    TooOlL = 10;
                    localStorage.MN_TooOlL = 10;
                }
            };
            document.getElementById('bot-pastrezim').onchange = () => {
                let val = document.getElementById('bot-pastrezim').value;
                if (val == "Random") {
                    pastrezim = 0;
                    localStorage.MN_pastrezim = 0;
                }
                if (val == "Left-Up") {
                    pastrezim = 1;
                    localStorage.MN_pastrezim = 1;
                }
                if (val == "CeTo4Ka") {
                    pastrezim = 2;
                    localStorage.MN_pastrezim = 2;
                }
                if (val == "Туда-суда") {
                    pastrezim = 3;
                    localStorage.MN_pastrezim = 3;
                }
                if (val == "Вправо-вниз") {
                    pastrezim = 4;
                    localStorage.MN_pastrezim = 2;
                }
            }; //bot-pastrezim//alpha121
            document.getElementById("alpha121").addEventListener("keyup", e => {
                if (e.key === "Enter") {
                    if (alfa) {
                        alpha = document.getElementById("alpha121").value / 255;
                    } else {
                        alpha = 1;
                    }
                }
            })
            document.getElementById("bot-dis").addEventListener("click", () => {
                for (let i in BOTS) BOTS[i].ws.close();
                BOTS = [];
            });
            document.getElementById("bot-send").addEventListener("keyup", e => {
                if (e.key === "Enter")
                    for (let i = 0; i < BOTS.length; i++) BOTS[i].chat.send(document.getElementById("bot-send").value);
            });

            document.getElementById("bot-join").addEventListener("click", async () => {
                cI = 1;
                isCaptchaJoin = false;
                for (let i = 0; i < BotCount; i++) {
                    const ofo = BOTS.length + 0;
                    BOTS[ofo] = new OJS({ind: ofo});
                    BOTS[ofo].ws.onopen = async () => {
                        if(AutoPassword && JSON.parse(localStorage.worldPasswords)[OWOP.world.name]) BOTS[ofo].chat.send(`/pass ${JSON.parse(localStorage.worldPasswords)[OWOP.world.name]}`);
                    };
                };
            });
            let f1 = 0;
            let PI2 = 2 * Math.PI,
                FOLLOWADD = PI2 / 45,
                f = 0,
                folint; //alfa
            document.getElementById("kickBruh").addEventListener("click", () => {
                let i;
                setInterval(async () => {
                    if (kik121) {
                        i = BOTS.length;
                        while (i--) {
                            BOTS[i].world.move(PlayrebanX, PlayrebanY);
                        }
                    }
                }, 0);
            });
            document.getElementById("bot-follow").addEventListener("click", () => {
                if (!following) {
                    following = true;
                    document.getElementById("bot-follow").innerHTML = "<s>Follow</s>";
                    folint = setInterval(async () => {
                        let pos = {
                                x: OWOP.mouse.tileX,
                                y: OWOP.mouse.tileY
                            },
                            i = BOTS.length;
                        while (i--) {
                            if (animation === animations.hyperbola) {
                                if (!BOTS[i]) return;
                                if (!BOTS[i].options.isJoined) continue;
                                let x1;
                                let y1;
                                let x;
                                let y;
                                if (i >= BOTS.length / 2) {
                                    x1 = pos.x + (Math.cos(2 * Math.PI * 2 / (BOTS.length / 2) * i) * (BOTS.length / 2));
                                    y1 = pos.y + (Math.sin(2 * Math.PI * 2 / (BOTS.length / 2) * i) * (BOTS.length / 2));
                                    x = x1 + (Math.cos(2 * Math.PI * 2 / 4 * i + f) * 4);
                                    y = y1 + (Math.sin(2 * Math.PI * 2 / 4 * i + f) * 4);
                                } else {
                                    x = pos.x + (Math.cos(2 * Math.PI * 2 / (BOTS.length / 2) * i) * (BOTS.length / 2));
                                    y = pos.y + (Math.sin(2 * Math.PI * 2 / (BOTS.length / 2) * i) * (BOTS.length / 2));
                                }
                                BOTS[i].world.move(x, y);
                            } else if (animation === animations.line) {
                                if (!BOTS[i]) return;
                                if (!BOTS[i].options.isJoined) continue;
                                x = pos.x + (Math.cos(2 * Math.PI * 2 ** BOTS.length * i + f) * BOTS.length);
                                y = pos.y + (Math.sin(2 * Math.PI * 2 / BOTS.length * i + f) * BOTS.length);
                                BOTS[i].world.move(x, y);
                            } else if (animation === animations.wave) {
                                if (!BOTS[i]) return;
                                if (!BOTS[i].options.isJoined) continue;
                                x = pos.x + (Math.cos(2 * Math.PI / BOTS.length * i + f) * BOTS.length);
                                y = pos.y + (Math.sin(2 * Math.PI * 2 / BOTS.length * i + f) * BOTS.length);
                                BOTS[i].world.move(x, y);
                            } else if (animation === animations.random) {
                                if (!BOTS[i]) return;
                                if (!BOTS[i].options.isJoined) continue;
                                x = pos.x + (Math.cos(2 * Math.PI * 2 / BOTS.length - i + f) * BOTS.length);
                                y = pos.y + (Math.sin(2 * Math.PI * 2 / BOTS.length * i + f) * BOTS.length);
                                BOTS[i].world.move(x, y);
                            } else if (animation === animations.atom) {
                                if (i >= BOTS.length / 2) {
                                    let x = pos.x + (Math.cos(2 * Math.PI * 2 / BOTS.length * i + f) * BOTS.length / 2),
                                        y = pos.y + (Math.sin(2 * Math.PI * 2 / BOTS.length * i + f + 2) * BOTS.length / 2);
                                    if (!BOTS[i].options.isJoined) continue;
                                    BOTS[i].world.move(x, y);
                                } else {
                                    if (!BOTS[i]) return;
                                    if (!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.cos(2 * Math.PI * 2 / BOTS.length * i + f + 2) * BOTS.length / 2);
                                    y = pos.y + (Math.sin(2 * Math.PI * 2 / BOTS.length * i + f) * BOTS.length / 2);
                                    BOTS[i].world.move(x, y);
                                }
                            } else if (animation === animations.default) {
                                if (!BOTS[i]) return;
                                if (!BOTS[i].options.isJoined) continue;
                                x1 = pos.x + (Math.cos(2 * Math.PI * 2 / BOTS.length * i - f1) * BOTS.length);
                                y1 = pos.y + (Math.sin(2 * Math.PI * 2 / BOTS.length * i - f1) * BOTS.length);
                                x = x1 + (Math.cos(3 * Math.PI * 3 / BOTS.length * i + f) * BOTS.length);
                                y = y1 + (Math.sin(3 * Math.PI * 3 / BOTS.length * i + f) * BOTS.length);
                                BOTS[i].world.move(x, y);
                            } else if (animation === animations.disk) {
                                if (!BOTS[i]) return;
                                if (!BOTS[i].options.isJoined) continue;
                                x = pos.x + (Math.cos(2 * Math.PI * 2 / 3 * i + f * 2) * 3);
                                y = pos.y + (Math.sin(2 * Math.PI * 2 / 3 * i + f) * 3);
                                BOTS[i].world.move(x, y);
                            } else if (animation === animations.NabFollow) {
                                if (!BOTS[i]) return;
                                if (!BOTS[i].options.isJoined) continue;
                                if (state === 1) {
                                    radius121 -= 0.1;
                                    speed121 -= 1;
                                    if (radius121 <= 1) {
                                        state = 2
                                    }
                                } else {
                                    radius121 += 0.2;
                                    speed121 += 2;
                                    if (radius121 >= maxradius) {
                                        state = 1
                                    }
                                }
                                if (state == 2) {
                                    x = pos.x + (Math.cos(2 * Math.PI * 2 / BOTS.length * i + f) * radius121);
                                    y = pos.y + (Math.sin(2 * Math.PI * 2 / BOTS.length * i + f) * radius121);
                                } else {
                                    x = pos.x + (Math.cos(2 * Math.PI * 2 / BOTS.length * i - f) * radius121);
                                    y = pos.y + (Math.sin(2 * Math.PI * 2 / BOTS.length * i - f) * radius121);
                                }
                                BOTS[i].world.move(x, y);
                            }
                            //NabFollow
                            //YouText
                        }
                    }, 80);
                } else {
                    following = false;
                    document.getElementById("bot-follow").innerHTML = "Follow";
                    clearInterval(folint);
                }
            });
            setInterval(() => {
                f1 = (f1 + FOLLOWADD) % PI2;
            }, speed121)
            setInterval(() => {
                f = (f + FOLLOWADD - .5) % PI2;
            }, 50)


            document.getElementById("bot-dis").addEventListener("click", () => {
                fetch("api/disconnectme");
                for (let i in BOTS) BOTS[i].ws.close();
            });
            document.getElementById("StopBruh").addEventListener("click", () => {
                if (stop121) {
                    stop121 = false;
                    document.getElementById('StopBruh').style = "font-size: 13px; border: solid 1px #800000";
                } else {
                    stop121 = true;
                    document.getElementById('StopBruh').style = "font-size: 13px; border: solid 1px #008000";
                    //OWOP.on(OWOP.events.net.disconnected, () => {
                    //});
                }
            });
            document.getElementById("alfa").addEventListener("click", () => {
                if (alfa) {
                    alpha = 1;
                    alfa = false;
                    document.getElementById('alfa').style = "font-size: 13px; border: solid 1px #800000";
                } else {
                    alfa = true;
                    document.getElementById('alfa').style = "font-size: 13px; border: solid 1px #008000";
                    //OWOP.on(OWOP.events.net.disconnected, () => {
                    //});
                }
            });
            document.getElementById("kickBruh").addEventListener("click", () => {
                if (kik121) {
                    kik121 = false;
                    document.getElementById('kickBruh').style = "font-size: 13px; border: solid 1px #800000";
                } else {
                    kik121 = true;
                    document.getElementById('kickBruh').style = "font-size: 13px; border: solid 1px #008000";
                    //OWOP.on(OWOP.events.net.disconnected, () => {
                    //});
                }
            });
            document.getElementById("bot-are").addEventListener("click", () => {
                if (autoreconnecten) {
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

            //setInterval(() => {
            //let o = 0;
            //for (let i in BOTS) o += BOTS[i].utils.bucket.allowance;
            //document.getElementById("chunkPerSec-chunk").innerText = (o / 256).toFixed(3);
            document.getElementById("chunkPerSec-chunk").innerText = "miniNoT v.1.5.6";
            //}, 30);

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

            Bucket.prototype.canSpend = function(count) {
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
                } else {
                    this.allowance -= count;
                    return true;
                }
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
                    if (e.buttons !== 0)
                        for (let i = -1; i < 2; i++)
                            for (let j = -1; j < 2; j++)
                                if (!OWOP.world.setPixel(OWOP.mouse.tileX + i, OWOP.mouse.tileY + j, e.buttons === 1 ? OWOP.player.selectedColor : [255, 255, 255])) {
                                    let abc = getFree();
                                    if (Math.floor(BOTS[abc].utils.bucket.allowance) === 1) await sleep(42);
                                    BOTS[abc].world.setPixel(OWOP.mouse.tileX + i, OWOP.mouse.tileY + j, e.buttons === 1 ? OWOP.player.selectedColor : [255, 255, 255]);
                                };
                });
            }));
            let LastChunk = Date.now();
            OWOP.tool.addToolObject(new OWOP.tool.class('Bot Chunker', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(16), false, function(tool) {
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
                                    if (BOTS[abc].utils.bucket.allowance === 0) await sleep(42);
                                    BOTS[abc].world.setPixel(chunkx + x, chunky + y, color);
                                };
                            }
                            for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = false;
                        }
                    }
                });
            }));


            OWOP.tool.addToolObject(new OWOP.tool.class('Bot Area', OWOP.cursors.select, OWOP.cursors.select, false, function(tool) {
                tool.setFxRenderer(function(fx, ctx, time) {
                    if (!fx.extra.isLocalPlayer) return 1;
                    let x = fx.extra.player.x;
                    let y = fx.extra.player.y;
                    let fxx = (Math.floor(x / 1) - OWOP.camera.x) * OWOP.camera.zoom;
                    let fxy = (Math.floor(y / 1) - OWOP.camera.y) * OWOP.camera.zoom;
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
                        let perc = Math.floor((parseFloat(document.getElementById("chunkPerSec-chunk").innerText.substr(0, 5) * 256) + (((Math.abs(w) * Math.abs(h)) / 3))) / (Math.abs(w) * Math.abs(h)) * 100);
                        if (perc > 100) perc = 100;
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
                        tool.extra.start = [Math.floor(mouse.tileX / 1) * 1, Math.floor(mouse.tileY / 1) * 1];
                        tool.extra.clicking = true;
                        tool.setEvent('mousemove', function(mouse, event) {
                            if (tool.extra.start && mouse.buttons === 1) {
                                tool.extra.end = [Math.floor(mouse.tileX / 1) * 1, Math.floor(mouse.tileY / 1) * 1];
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
                        tool.setEvent('mouseup', function(mouse, event) {
                            if (!(mouse.buttons & 1)) {
                                finish();
                            }
                        });
                    } else if (mouse.buttons === 1 && tool.extra.end) {
                        if (isInside()) {
                            let offx = mouse.tileX;
                            let offy = mouse.tileY;
                            tool.setEvent('mousemove', function(mouse, event) {
                                let dx = mouse.tileX - offx;
                                let dy = mouse.tileY - offy;
                                tool.extra.start = [s[0] + dx, s[1] + dy];
                                tool.extra.end = [e[0] + dx, e[1] + dy];
                            });
                            let end = function end() {
                                tool.setEvent('mouseup deselect mousemove', null);
                            };
                            tool.setEvent('deselect', end);
                            tool.setEvent('mouseup', function(mouse, event) {
                                if (!(mouse.buttons & 1)) {
                                    end();
                                };
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
                                if (stop121) {
                                    x = w;
                                    y = h;
                                }
                                let abc = getFree();
                                if (!OldPaste) {
                                    BOTS[abc].utils.bucket.canSpend(0);
                                    if (BOTS[abc].utils.bucket.allowance <= 20) await sleep(0);
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




            OWOP.tool.addToolObject(new OWOP.tool.class('Text tool', OWOP.cursors.write, OWOP.fx.player.NONE, false, function(tool) {
                const camera = OWOP.camera;
                async function drawChar(matrix, x, y) {
                    for (var xx = 0; xx < matrix.length; xx++)
                        for (var yy = 0; yy < 8; yy += 1)
                            for (var bb = 0; bb < 1; bb++)
                                if ((matrix[xx] >> (7 - yy - bb)) & 1 && yy + bb < 8) {
                                    let abc = getFree();
                                    if (!OldPaste) {
                                        BOTS[abc].utils.bucket.canSpend(0);
                                        if (BOTS[abc].utils.bucket.allowance <= 20) await sleep(20);
                                    }
                                    BOTS[abc].world.setPixel(x + xx, y + yy + bb, OWOP.player.selectedColor);
                                }
                };

                function translit(word) {
                    var answer = '';
                    var converter = {
                        'а': 'a',
                        'б': 'b',
                        'в': 'v',
                        'г': 'g',
                        'д': 'd',
                        'е': 'e',
                        'ё': 'e',
                        'ж': 'zh',
                        'з': 'z',
                        'и': 'i',
                        'й': 'y',
                        'к': 'k',
                        'л': 'l',
                        'м': 'm',
                        'н': 'n',
                        'о': 'o',
                        'п': 'p',
                        'р': 'r',
                        'с': 's',
                        'т': 't',
                        'у': 'u',
                        'ф': 'f',
                        'х': 'h',
                        'ц': 'c',
                        'ч': 'ch',
                        'ш': 'sh',
                        'щ': 'sch',
                        'ь': '',
                        'ы': 'y',
                        'ъ': '',
                        'э': 'e',
                        'ю': 'yu',
                        'я': 'ya',
                        'А': 'A',
                        'Б': 'B',
                        'В': 'V',
                        'Г': 'G',
                        'Д': 'D',
                        'Е': 'E',
                        'Ё': 'E',
                        'Ж': 'Zh',
                        'З': 'Z',
                        'И': 'I',
                        'Й': 'Y',
                        'К': 'K',
                        'Л': 'L',
                        'М': 'M',
                        'Н': 'N',
                        'О': 'O',
                        'П': 'P',
                        'Р': 'R',
                        'С': 'S',
                        'Т': 'T',
                        'У': 'U',
                        'Ф': 'F',
                        'Х': 'H',
                        'Ц': 'C',
                        'Ч': 'Ch',
                        'Ш': 'Sh',
                        'Щ': 'Sch',
                        'Ь': '',
                        'Ы': 'Y',
                        'Ъ': '',
                        'Э': 'E',
                        'Ю': 'Yu',
                        'Я': 'Ya'
                    };
                    for (var i = 0; i < word.length; ++i) {
                        if (converter[word[i]] == undefined) {
                            answer += word[i];
                        } else {
                            answer += converter[word[i]];
                        }
                    }
                    return answer;
                }

                async function writeText(str, x, y) {
                    if (isNaN(x) || isNaN(y)) return OWOP.chat.local('Invalid Coordinates')

                    str = str.toUpperCase();
                    var len = str.length,
                        ccode, matrix;

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
                        await drawChar(matrix, x, y);
                        x += matrix.length + 1;
                    }
                }

                function change(number) {
                    number = number >> 4
                    number = Math.floor(number / (1)) * 1
                    number = number << 4
                    return number
                }

                tool.setFxRenderer(function(fx, ctx, time) {
                    let x = change(fx.extra.player.x);
                    let y = change(fx.extra.player.y);
                    let fxx = Math.floor(x / 16) - camera.x;
                    let fxy = Math.floor(y / 16) - camera.y;
                    if (fx.extra.isLocalPlayer) {
                        let zoom = camera.zoom;
                        ctx.strokeStyle = colorUtils.toHTML(OWOP.player.selectedColor);
                        ctx.strokeRect(fxx * zoom, fxy * zoom, 1 * 1 * zoom, 1 * 1 * zoom);
                        return 0;
                    }
                });
                tool.setEvent('mousedown', function(mouse, event) {
                    if (mouse.buttons == 1 || mouse.buttons == 2) {
                        var text = prompt('Text to Draw')
                        writeText(translit(text), mouse.tileX, mouse.tileY - 1)
                    }
                });
            }));

            OWOP.tool.addToolObject(new OWOP.tool.class('Bot Paster', OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, function(tool) {
                tool.setEvent('mousedown', function(mouse, event) {
                    let sX = !Pixelization ? OWOP.mouse.tileX : Math.floor(OWOP.mouse.tileX / 16) * 16,
                        sY = !Pixelization ? OWOP.mouse.tileY : Math.floor(OWOP.mouse.tileY / 16) * 16;
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
                                };

                                for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = true;
                                for (i = 0; i < imgHeight; i++)
                                    for (let j = 0; j < imgWidth; j++) {
                                        if (stop121) {
                                            i = imgHeight;
                                            j = imgWidth;
                                        }
                                        let abc = getFree();
                                        if (!OldPaste) {
                                            BOTS[abc].utils.bucket.canSpend(0);
                                            if (BOTS[abc].utils.bucket.allowance <= 1) await sleep(0);
                                        }
                                        BOTS[abc].world.setPixel(sX + j, sY + i, pixels[I]);
                                        I++;
                                    }
                                for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = false;
                            };
                            img.src = imgURL;
                        };
                    };
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
                                            if (BOTS[abc].utils.bucket.allowance >= 1) BOTS[abc].world.setPixel(X + x, Y + y, OWOP.world.protection.pixels[`${X + x},${Y + y}`]);
                                        }
                                    }, 2500);
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
            OWOP.tool.addToolObject(new OWOP.tool.class("Bot Pixel Paste", OWOP.cursors.paste, OWOP.fx.player.NONE, OWOP.RANK.USER, function(tool) {
                const misc = OWOP.misc;
                const camera = OWOP.camera;

                let canvas = document.createElement("canvas");
                canvas.width = 0;
                canvas.height = 0;
                let ctx = canvas.getContext("2d");
                let stop = true;
                var last = {
                    x: 0,
                    y: 0
                }
                tool.setFxRenderer(function(fx, ctx, time) {
                    let zoom = camera.zoom;



                    if (stop) {
                        let x = fx.extra.player.x;
                        let y = fx.extra.player.y;
                        let fxx = Math.floor(x / 16) - camera.x;
                        let fxy = Math.floor(y / 16) - camera.y;

                        if (fx.extra.isLocalPlayer && canvas.width && canvas.height) {
                            ctx.globalAlpha = 0.5 + Math.sin(time / 500) / 4;
                            ctx.strokeStyle = "#000000";
                            ctx.scale(zoom, zoom);
                            ctx.drawImage(canvas, fxx, fxy);
                            ctx.scale(1 / zoom, 1 / zoom);
                            ctx.globalAlpha = 0.8;
                            ctx.strokeRect(fxx * zoom, fxy * zoom, canvas.width * zoom, canvas.height * zoom);
                            return 0;
                        }
                    } else {
                        let fxx = Math.floor(last.x << 4 / 16) - camera.x;
                        let fxy = Math.floor(last.y << 4 / 16) - camera.y;
                        if (fx.extra.isLocalPlayer && canvas.width && canvas.height) {
                            ctx.globalAlpha = 0.5 + Math.sin(time / 500) / 4;
                            ctx.strokeStyle = "#000000";
                            ctx.scale(zoom, zoom);
                            ctx.drawImage(canvas, fxx, fxy);
                            ctx.scale(1 / zoom, 1 / zoom);
                            ctx.globalAlpha = 0.8;
                            ctx.strokeRect(fxx * zoom, fxy * zoom, canvas.width * zoom, canvas.height * zoom);
                            return 0;
                        }
                    }

                });

                function lerp(v0, v1, r) {
                    return v0 * (1 - r) + v1 * r;
                }

                async function paste(pasteX, pasteY, col) {
                    last.x = pasteX;
                    last.y = pasteY;
                    stop = false;
                    async function setpix(X2, Y2) {
                        let abc = getFree();
                        if (!OldPaste) {
                            BOTS[abc].utils.bucket.canSpend(0);
                            if (BOTS[abc].utils.bucket.allowance <= 20) await sleep(0);
                        }
                        let x_1 = X2;
                        //xX = x_;
                        let y_1 = Y2;
                        //yY = y_;
                        BOTS[abc].world.setPixel(x_1, y_1, col);
                    }
                    let data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                    for (let y = 0; y < canvas.height; y++) {
                        if (stop) break;
                        for (let x = 0; x < canvas.width; x++) {
                            await sleep(1000000000000000000000000);
                        }
                    }
                    stop = true;
                }
                tool.setEvent("select", function() {
                    let input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    console.log(input);
                    input.addEventListener("change", function() {
                        if (!input.files || !input.files[0]) return;
                        let reader = new FileReader();
                        reader.addEventListener("load", function() {
                            let image = new Image();
                            image.src = reader.result;
                            image.addEventListener("load", function() {
                                image.src = selectedAsset;
                                canvas.width = image.width;
                                canvas.height = image.height;
                                ctx.drawImage(image, 0, 0);
                            });
                        });
                        reader.readAsDataURL(input.files[0]);
                    });
                    input.click();
                });
                tool.setEvent("mousedown", function(mouse) {
                    if (mouse.buttons & 0b1) {
                        if (!stop) {
                            throw new Error("Wait until pasting finishes, or cancel with right click!");
                        }
                        paste(mouse.tileX, mouse.tileY);
                    } else if (mouse.buttons & 0b10) {
                        stop = true;
                    }
                });
                tool.setEvent("deselect", function(mouse) {
                    stop = true;
                });
            }));
            let u1, d1, i1;
            OWOP.tool.addToolObject(new OWOP.tool.class("Bot Fill", OWOP.cursors.fill, OWOP.fx.player.NONE, OWOP.RANK.USER, e => {
                e.extra.tickAmount = 200;
                let t = [],
                    n = null,
                    o = OWOP.fx.player.RECT_SELECT_ALIGNED(1);
                async function r() {
                    var o = function(e, t) {
                            return e && t && e[0] === t[0] && e[1] === t[1] && e[2] === t[2]
                        },
                        r = function(e, r) {
                            return !!o(OWOP.world.getPixel(e, r), n) && (t.unshift([e, r]),
                                !0)
                        };
                    if (t.length && n) {
                        var i = OWOP.player.selectedColor,
                            a = 0,
                            s = e.extra.tickAmount;
                        s *= 3;
                        for (a = 0; a < s && t.length; a++) {
                            var l = t.pop(),
                                u = l[0],
                                d = l[1],
                                f = OWOP.world.getPixel(u, d);
                            if (o(f, n) && !o(f, i)) {
                                let abc = getFree();
                                if (BOTS[abc].utils.bucket.allowance <= 20) {
                                    await sleep(5);
                                } else {
                                    if (u == u1 && d == d1 && i == i1) {} else {
                                        BOTS[abc].utils.bucket.canSpend(0);
                                        BOTS[abc].world.setPixel(u, d, i)
                                        u1 = u;
                                        d1 = d;
                                        i1 = i;
                                    }
                                    //if(!BOTS[abc].world.setPixel(u, d, i));
                                }
                                var p = r(u, d - 1),
                                    m = r(u, d + 1),
                                    v = r(u - 1, d),
                                    g = r(u + 1, d);
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

            function pixColor(img, X, Y, RGB) {
                var abab = img.getImageData(X, Y, 1, 1).data
                return [abab[0], abab[1], abab[2]]
            }

            function pixColor1(img, X, Y, RGB) {
                var abab = img.getImageData(X, Y, 1, 1).data
                return [abab[RGB]]
            }
            let xXx;
            let offx;
            let offy;
            let yYy;

            function dist(x, y) {
                return Math.sqrt(x * x + y * y);
            } //pastrezim
            let aboab;
            OWOP.tool.addToolObject(new OWOP.tool.class("Bot Paste Asset", OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), OWOP.RANK.USER, tool => {
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
                        if (pastrezim == 0) {
                            async function pastePick() {
                                for (let Y = 0; Y < selectedAsset.height * 2; Y++) {
                                    for (let X = 0; X < selectedAsset.width * 2; X++) {
                                        if (stop121) {
                                            Y = selectedAsset.height * 2;
                                            X = selectedAsset.width * 2;
                                        }
                                        x_ = Math.random() * selectedAsset.width | 0;
                                        //xX = x_;
                                        y_ = Math.random() * selectedAsset.height | 0;
                                        //yY = y_;


                                        //    for(let Y = 0; Y > selectedAsset.height; Y++){
                                        //for(let X = 0; X > selectedAsset.width; X++) {
                                        let abc = getFree();
                                        //cC0 = pixColor(aboab,xX,yY,0);
                                        //cC1 = pixColor(aboab,xX,yY,1);
                                        //cC2 = pixColor(aboab,xX,yY,2);
                                        //if(OWOP.world.getPixel(x+xX,y+yY)[0] != cC0 && OWOP.world.getPixel(x+xX,x+yY)[1] != cC1 && OWOP.world.getPixel(x+xX,x+yY)[2] != cC2){
                                        //    BOTS[abc].world.setPixel(x+xX, y+yY, [cC0,cC1,cC2])
                                        //}
                                        if (!OldPaste) {
                                            BOTS[abc].utils.bucket.canSpend(0);
                                            if (BOTS[abc].utils.bucket.allowance <= 20) await sleep(0);
                                        }
                                        BOTS[abc].world.setPixel(x + x_, y + y_, pixColor(aboab, x_, y_));
                                    }
                                }
                            }
                            for (let Y = 0; Y < selectedAsset.height; Y++) {
                                for (let X = 0; X < selectedAsset.width; X++) {
                                    if ([OWOP.world.getPixel(x + X, y + Y)[0], OWOP.world.getPixel(x + X, y + Y)[1], OWOP.world.getPixel(x + X, y + Y)[2]] != pixColor(aboab, X, Y)) {
                                        await pastePick();
                                        await sleep(500);
                                        X = 0;
                                        Y = 0;
                                        if (stop121) {
                                            Y = selectedAsset.height;
                                            X = selectedAsset.width;
                                        }
                                    }
                                }
                            }
                        } else if (pastrezim == 2) {
                            async function pastePick() {
                                if (!stop121) {
                                    for (let Y = 0; Y < selectedAsset.height; Y += 2) {
                                        for (let X = 0; X < selectedAsset.width; X++) {

                                            //    for(let Y = 0; Y > selectedAsset.height; Y++){
                                            //for(let X = 0; X > selectedAsset.width; X++) {
                                            let abc = getFree();
                                            //cC0 = pixColor(aboab,xX,yY,0);
                                            //cC1 = pixColor(aboab,xX,yY,1);
                                            //cC2 = pixColor(aboab,xX,yY,2);
                                            //if(OWOP.world.getPixel(x+xX,y+yY)[0] != cC0 && OWOP.world.getPixel(x+xX,x+yY)[1] != cC1 && OWOP.world.getPixel(x+xX,x+yY)[2] != cC2){
                                            //    BOTS[abc].world.setPixel(x+xX, y+yY, [cC0,cC1,cC2])
                                            //}
                                            if (!OldPaste) {
                                                BOTS[abc].utils.bucket.canSpend(0);
                                                if (BOTS[abc].utils.bucket.allowance <= 10);
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
                                            //cC0 = pixColor(aboab,xX,yY,0);
                                            //cC1 = pixColor(aboab,xX,yY,1);
                                            //cC2 = pixColor(aboab,xX,yY,2);
                                            //if(OWOP.world.getPixel(x+xX,y+yY)[0] != cC0 && OWOP.world.getPixel(x+xX,x+yY)[1] != cC1 && OWOP.world.getPixel(x+xX,x+yY)[2] != cC2){
                                            //    BOTS[abc].world.setPixel(x+xX, y+yY, [cC0,cC1,cC2])
                                            //}
                                            if (!OldPaste) {
                                                BOTS[abc].utils.bucket.canSpend(0);
                                                if (BOTS[abc].utils.bucket.allowance <= 10);
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
                                            //cC0 = pixColor(aboab,xX,yY,0);
                                            //cC1 = pixColor(aboab,xX,yY,1);
                                            //cC2 = pixColor(aboab,xX,yY,2);
                                            //if(OWOP.world.getPixel(x+xX,y+yY)[0] != cC0 && OWOP.world.getPixel(x+xX,x+yY)[1] != cC1 && OWOP.world.getPixel(x+xX,x+yY)[2] != cC2){
                                            //    BOTS[abc].world.setPixel(x+xX, y+yY, [cC0,cC1,cC2])
                                            //}
                                            if (!OldPaste) {
                                                BOTS[abc].utils.bucket.canSpend(0);
                                                if (BOTS[abc].utils.bucket.allowance <= 10);
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
                        } else if (pastrezim == 1) {
                            async function pastePick() {
                                for (let X = 0; X < selectedAsset.width; X++) {
                                    for (let Y = 0; Y < selectedAsset.height; Y++) {
                                        if (stop121) {
                                            Y = selectedAsset.height;
                                            X = selectedAsset.width;
                                        }
                                        //    for(let Y = 0; Y > selectedAsset.height; Y++){
                                        //for(let X = 0; X > selectedAsset.width; X++) {
                                        let abc = getFree();
                                        let x_ = (selectedAsset.width - X) - 1;
                                        let y_ = (selectedAsset.height - Y) - 1;
                                        if (!OldPaste) {
                                            BOTS[abc].utils.bucket.canSpend(0);
                                            if (BOTS[abc].utils.bucket.allowance <= 1) await sleep(0);
                                        }
                                        BOTS[abc].world.setPixel(x + x_, y + y_, pixColor(aboab, x_, y_));
                                        if (!OldPaste) {
                                            BOTS[abc].utils.bucket.canSpend(0);
                                            if (BOTS[abc].utils.bucket.allowance <= 1) await sleep(0);
                                        }
                                        if (!OldPaste) {
                                            BOTS[abc].utils.bucket.canSpend(0);
                                            if (BOTS[abc].utils.bucket.allowance <= 1) await sleep(0);
                                        }
                                    }
                                }
                                //    }
                                //}
                            }
                            pastePick();
                        } else if (pastrezim == 3) {
                            async function pastePick() {
                                function getTrueAlphs(X, Y) {
                                    let data = aboab.getImageData(X, Y, 1, 1).data;
                                    let alpha1 = data[3] / 255;

                                    function lerp(v0, v1, r) {
                                        return v0 * (1 - r) + v1 * r;
                                    }
                                    let pixel = OWOP.world.getPixel(x + X, y + Y);
                                    let color = [
                                        lerp(pixel[0], data[0], alpha1),
                                        lerp(pixel[1], data[1], alpha1),
                                        lerp(pixel[2], data[2], alpha1)
                                    ];
                                    return color;
                                }

                                function getAlphs(X, Y) {
                                    let data = getTrueAlphs(X, Y);

                                    function lerp(v0, v1, r) {
                                        return v0 * (1 - r) + v1 * r;
                                    }
                                    let pixel = OWOP.world.getPixel(x + X, y + Y);
                                    let color = [
                                        lerp(pixel[0], data[0], alpha),
                                        lerp(pixel[1], data[1], alpha),
                                        lerp(pixel[2], data[2], alpha)
                                    ];
                                    return color;
                                }
                                async function setpix(X2, Y2) {
                                    let abc = getFree();
                                    if (!OldPaste) {
                                        BOTS[abc].utils.bucket.canSpend(0);
                                        if (BOTS[abc].utils.bucket.allowance <= 10) await sleep(5);
                                    }
                                    let x_1 = X2;
                                    //xX = x_;
                                    let y_1 = Y2;
                                    //yY = y_;
                                    if(alfa){
                                    BOTS[abc].world.setPixel(x + x_1, y + y_1, getAlphs(x_1, y_1));
                                    } else {
                                    BOTS[abc].world.setPixel(x + x_1, y + y_1, pixColor(aboab, x_1, y_1));
                                    }
                                }
                                for (y_ = 0; y_ < selectedAsset.height; y_++) {
                                    for (x_ = 0; x_ < selectedAsset.width; x_++) {
                                        if (!stop121) {
                                        await setpix(x_, y_);
                                        }
                                    }
                                    y_++
                                    if (y_ < selectedAsset.height) {
                                        for (x_ = selectedAsset.width - 1; x_ > -1; x_--) {
                                            if (!stop121) {
                                            await setpix(x_, y_);
                                            }
                                        }
                                    }
                                }
                            }
                            pastePick();
                        } else if (pastrezim == 4) {
                            async function pastePick() {
                                async function setpix(X2, Y2) {
                                    let abc = getFree();
                                    if (!OldPaste) {
                                        BOTS[abc].utils.bucket.canSpend(0);
                                        if (BOTS[abc].utils.bucket.allowance <= 10) await sleep(0);
                                    }
                                    let x_1 = X2;
                                    let y_1 = Y2;
                                    BOTS[abc].world.setPixel(x + x_1, y + y_1, pixColor(aboab, x_1, y_1));
                                }
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
                                        await setpix(x_, y_);
                                    }
                                    y_1 = y_;
                                    if (x_1 > 0) {
                                        for (y_ = 0; y_ < selectedAsset.height; y_++) {
                                            await setpix(x_1, y_);
                                        }
                                        x_1--
                                    }
                                    y_ = y_1;
                                    if (y_2 != 0) {
                                        for (let x_ = selectedAsset.width - 1; x_ > -1; x_--) {
                                            if (!stop121) {
                                            await setpix(x_, y_2);
                                            }
                                        }
                                    }
                                    y_2--
                                    y_1 = y_;
                                    if (x_2 < selectedAsset.width) {
                                        for (y_ = selectedAsset.height - 1; y_ > -1; y_--) {
                                            await setpix(x_2, y_);
                                        }
                                        x_2++
                                    }
                                    y_ = y_1;
                                }
                            }
                            pastePick()
                        } else if (pastrezim == 6) {
                            async function pastePick() {
                                let pixelStack = [];
                            async function setpix(X2, Y2) {
                                    let abc = getFree();
                                    if (!OldPaste) {
                                        BOTS[abc].utils.bucket.canSpend(0);
                                        if (BOTS[abc].utils.bucket.allowance <= 49) await sleep(5);
                                    }
                                    let x_1 = X2;
                                    let y_1 = Y2;
                                    BOTS[abc].world.setPixel(x + x_1, y + y_1, pixColor(aboab, x_1, y_1));
                                }
                                async function repastC1() {
                                    for (let Y1 = 0; Y1 < selectedAsset.height; Y1++) {
                                    for (let X1 = 0; X1 < selectedAsset.width; X1++) {
                                        let index = pixelStack.length - 1;
                                        let tpix = pixelStack.splice(index, 1)[0];
                                        await setpix(tpix[0], tpix[1]);
                                    }
                                    }
                                }
                            async function pastePick() {
                                    for (let Y = 0; Y < selectedAsset.height; Y++) {
                                    for (let X = 0; X < selectedAsset.width; X++) {
                                        pixelStack[pixColor(aboab, X, Y)]=([X, Y]);
                                    }
                                    }
                                        console.log(pixelStack);
                                };
                                let col = [];
                                let gag = 0;
                            async function pastePick1() {
                                let b = [];
                                for (let Y = 0; Y < selectedAsset.height; Y++) {
                                    for (let X = 0; X < selectedAsset.width; X++) {
                                        col.push(pixColor(aboab, X, Y));
                                        //if(col[pixColor(aboab, X, Y)] != true){

                                             //for (let Y1 = 0; Y1 < selectedAsset.height; Y1++) {
                                             //    for (let X1 = 0; X1 < selectedAsset.width; X1++) {
                                             //        let gg = Math.random();
                                             //        let col2 = pixColor1(aboab, X, Y, 0) + gg;
                                             //        let col1 = pixColor1(aboab, X1, Y1, 0) + gg;
                                             //        if (col2 == col1) {
                                             //        }
                                             //    }
                                             //}
                                        //}
                                        //col[pixColor(aboab, X, Y)] = true;
                                    }
                                }
                                function uniq(a) {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}
                                let col_2 = col.filter((item, index) => {
                                    return col.indexOf(item) === index
                                });
                                let col_1 = [...new Set(col)];
                                console.log(col_1.lenght);
                                console.log(uniq(col).length)
                                console.log(col_2.lenght);
                                console.log(col.length);
                            }
                                await pastePick1();
                                await sleep(1000);
                                await repastC1();
                            }
                            pastePick();

                        }
                    }
                })
            }))
            let mouseee;
            document.addEventListener('mousedown', (e) => {
                if (e.which == 1) {
                    mouseee = 1;
                }
            })
            document.addEventListener('mouseup', (e) => {
                if (e.which == 1) {
                    mouseee = 0;
                }
            })
            // OWOP.tool.addToolObject(new OWOP.tool.class("1?", OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), OWOP.RANK.USER, tool => {
            //     tool.setEvent("mousedown mousemove", async e => {
            //     setInterval(() => {
            //         if(mouseee == 1){
            //             async function pastePick(){
            //         let abc = getFree();
            //         let x = OWOP.mouse.tileX,
            //     y = OWOP.mouse.tileY;
            //         let i = OWOP.player.selectedColor;
            //             if(!OldPaste) {
            //                                 BOTS[abc].utils.bucket.canSpend(0);
            //                                 if(BOTS[abc].utils.bucket.allowance <= 1) await sleep(0);
            //                             }
            //         BOTS[abc].world.setPixel(x, y, i)
            //         }
            //         pastePick()
            //         }
            //     },0)
            //     })
            // }));
            //OWOP.tool.addToolObject(new OWOP.tool.class("Bot Paste Asset сеточка?", OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), OWOP.RANK.USER, tool => {
            //    tool.setEvent("mousedown mousemove", async e => {
            //        if (e.buttons === 1) {
            //            if (!selectedAsset) OWOP.chat.local("No asset selected!");
            //            if (typeof selectedAsset === "string") {
            //                // convert
            //                let cnv = document.createElement("canvas");
            //                let ctx = cnv.getContext('2d');
            //                aboab = ctx;
            //                let img = new Image();
            //                img.onload = () => {
            //                    cnv.width = 2500;
            //                    cnv.height = 2500;
            //                    ctx.drawImage(img, 0, 0);
            //                    selectedAsset = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
            //                }
            //                img.src = selectedAsset;
            //                return OWOP.chat.local("Image is ready.");
            //            };
            //            let x_ = 0;
            //            let y_ = 0;
            //            let I = 0;
            //            let x = OWOP.mouse.tileX,
            //                y = OWOP.mouse.tileY;
            //
            //            function pastePick() {
            //                for (let Y = 0; Y < selectedAsset.height; Y += 2) {
            //                    for (let X = 0; X < selectedAsset.width; X++) {
            //
            //                        //    for(let Y = 0; Y > selectedAsset.height; Y++){
            //                        //for(let X = 0; X > selectedAsset.width; X++) {
            //                        let abc = getFree();
            //                        //cC0 = pixColor(aboab,xX,yY,0);
            //                        //cC1 = pixColor(aboab,xX,yY,1);
            //                        //cC2 = pixColor(aboab,xX,yY,2);
            //                        //if(OWOP.world.getPixel(x+xX,y+yY)[0] != cC0 && OWOP.world.getPixel(x+xX,x+yY)[1] != cC1 && OWOP.world.getPixel(x+xX,x+yY)[2] != cC2){
            //                        //    BOTS[abc].world.setPixel(x+xX, y+yY, [cC0,cC1,cC2])
            //                        //}
            //                        if (!OldPaste) {
            //                            BOTS[abc].utils.bucket.canSpend(0);
            //                            if (BOTS[abc].utils.bucket.allowance <= 1);
            //                        }
            //                        x_ = X;
            //                        //xX = x_;
            //                        y_ = Y;
            //                        //yY = y_;
            //                        BOTS[abc].world.setPixel(x + x_, y + y_, pixColor(aboab, x_, y_));
            //                    }
            //                }
            //                for (let Y = 0; Y < selectedAsset.height; Y++) {
            //                    for (let X = 0; X < selectedAsset.width; X += 2) {
            //
            //                        //    for(let Y = 0; Y > selectedAsset.height; Y++){
            //                        //for(let X = 0; X > selectedAsset.width; X++) {
            //                        let abc = getFree();
            //                        //cC0 = pixColor(aboab,xX,yY,0);
            //                        //cC1 = pixColor(aboab,xX,yY,1);
            //                        //cC2 = pixColor(aboab,xX,yY,2);
            //                        //if(OWOP.world.getPixel(x+xX,y+yY)[0] != cC0 && OWOP.world.getPixel(x+xX,x+yY)[1] != cC1 && OWOP.world.getPixel(x+xX,x+yY)[2] != cC2){
            //                        //    BOTS[abc].world.setPixel(x+xX, y+yY, [cC0,cC1,cC2])
            //                        //}
            //                        if (!OldPaste) {
            //                            BOTS[abc].utils.bucket.canSpend(0);
            //                            if (BOTS[abc].utils.bucket.allowance <= 1);
            //                        }
            //                        x_ = X;
            //                        //xX = x_;
            //                        y_ = Y;
            //                        //yY = y_;
            //                        BOTS[abc].world.setPixel(x + x_, y + y_, pixColor(aboab, x_, y_));
            //                    }
            //                }
            //                for (let Y = 0; Y < selectedAsset.height; Y++) {
            //                    for (let X = 0; X < selectedAsset.width; X++) {
            //
            //                        //    for(let Y = 0; Y > selectedAsset.height; Y++){
            //                        //for(let X = 0; X > selectedAsset.width; X++) {
            //                        let abc = getFree();
            //                        //cC0 = pixColor(aboab,xX,yY,0);
            //                        //cC1 = pixColor(aboab,xX,yY,1);
            //                        //cC2 = pixColor(aboab,xX,yY,2);
            //                        //if(OWOP.world.getPixel(x+xX,y+yY)[0] != cC0 && OWOP.world.getPixel(x+xX,x+yY)[1] != cC1 && OWOP.world.getPixel(x+xX,x+yY)[2] != cC2){
            //                        //    BOTS[abc].world.setPixel(x+xX, y+yY, [cC0,cC1,cC2])
            //                        //}
            //                        if (!OldPaste) {
            //                            BOTS[abc].utils.bucket.canSpend(0);
            //                            if (BOTS[abc].utils.bucket.allowance <= 1);
            //                        }
            //                        x_ = X;
            //                        //xX = x_;
            //                        y_ = Y;
            //                        //yY = y_;
            //                        BOTS[abc].world.setPixel(x + x_, y + y_, pixColor(aboab, x_, y_));
            //                    }
            //                }
            //            }
            //            for (let Y = 0; Y < selectedAsset.height; Y++) {
            //                for (let X = 0; X < selectedAsset.width; X++) {
            //                    if ([OWOP.world.getPixel(x + X, y + Y)[0], OWOP.world.getPixel(x + X, y + Y)[1], OWOP.world.getPixel(x + X, y + Y)[2]] != pixColor(aboab, X, Y)) {
            //                        await pastePick();
            //                        await sleep(2500);
            //                        X = 0;
            //                        Y = 0;
            //                        if (stop121) {
            //                            Y = selectedAsset.height;
            //                            X = selectedAsset.width;
            //                        }
            //                    }
            //                }
            //            }
            //        }
            //    })
            //}));
            //OWOP.tool.addToolObject(new OWOP.tool.class("Bot Paste Asset", OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), OWOP.RANK.USER, tool => {
            //    tool.setEvent("mousedown mousemove", async e => {
            //        if (e.buttons === 1) {
            //            let pixelStack = [];
            //            if (!selectedAsset) OWOP.chat.local("No asset selected!");
            //            if (typeof selectedAsset === "string") {
            //                // convert
            //                let cnv = document.createElement("canvas");
            //                let ctx = cnv.getContext('2d');
            //                aboab = ctx;
            //                let img = new Image();
            //                img.onload = () => {
            //                    cnv.width = 2500;
            //                    cnv.height = 2500;
            //                    ctx.drawImage(img, 0, 0);
            //                    selectedAsset = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
            //                }
            //                img.src = selectedAsset;
            //                return OWOP.chat.local("Image is ready.");
            //            };
            //            let I = 0;
            //            let x = !Pixelization ? OWOP.mouse.tileX : Math.floor(OWOP.mouse.tileX / 16) * 16,
            //                y = !Pixelization ? OWOP.mouse.tileY : Math.floor(OWOP.mouse.tileY / 16) * 16;
            //            for (let X = 0; X < selectedAsset.width; X++) {
            //                for (let Y = 0; Y < selectedAsset.height; Y++) {
            //                    if (stop121) {
            //                        Y = selectedAsset.height;
            //                        X = selectedAsset.width;
            //                    }
            //                    //    for(let Y = 0; Y > selectedAsset.height; Y++){
            //                    //for(let X = 0; X > selectedAsset.width; X++) {
            //                    let abc = getFree();
            //                    let x_ = (selectedAsset.width - X) - 1;
            //                    let y_ = (selectedAsset.height - Y) - 1;
            //                    if (!OldPaste) {
            //                        BOTS[abc].utils.bucket.canSpend(0);
            //                        if (BOTS[abc].utils.bucket.allowance <= 1) await sleep(0);
            //                    }
            //                    BOTS[abc].world.setPixel(x + x_, y + y_, pixColor(aboab, x_, y_));
            //                    if (!OldPaste) {
            //                        BOTS[abc].utils.bucket.canSpend(0);
            //                        if (BOTS[abc].utils.bucket.allowance <= 1) await sleep(0);
            //                    }
            //                    if (!OldPaste) {
            //                        BOTS[abc].utils.bucket.canSpend(0);
            //                        if (BOTS[abc].utils.bucket.allowance <= 1) await sleep(0);
            //                    }
            //                }
            //            }
            //            //    }
            //            //}
            //
            //        }
            //    })
            //}));
        });
    };
    MiniBOT(); //stop121
    setInterval(() => {
        if (autoreconnecten) setTimeout(() => {
            if (document.getElementById("load-options").className == "framed") document.getElementById("reconnect-btn").click()
        }, 700);
    }, 1000);
}

function uninstall() {
    OWOP.windowSys.windows[" "].close();
}

install()

function append(src, onload) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = onload;
    document.body.appendChild(s);
}
