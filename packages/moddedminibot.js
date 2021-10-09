// ==UserScript==
// @name        Modded MiniBots
// @version     2.8.4.4
// @author      scar17off
// @description Best bots in OWOP.
// @include     https://ourworldofpixels.com/*
// @run-at      document-end
// @match       https://ourworldofpixels.com/*
// @grant       none
// ==/UserScript==

if(!OWOP){
    console.log("what magic power are u used")
};
if(!OWOP.tool){
    OWOP.tool = OWOP.tools;
};
if(!OWOP.tools){
    OWOP.tools = OWOP.tool;
};
if(location.href == "http://augustberchelmann.com/owop/#main"){
    OWOP.cursors.paste = OWOP.cursors.stamp;
};

var versionBoxxx = document.createElement("span");
versionBoxxx.textContent = "Modded MiniBot v2.8.4.4";
versionBoxxx.className = "framed whitetext";
versionBoxxx.style.position = "absolute";
versionBoxxx.style.top = "25px";
versionBoxxx.style.right = "200px";

if(!localStorage.moddedMB_botsneaky) {
    localStorage.moddedMB_botsneaky = false;
};
if(!localStorage.moddedMB_followint) {
    localStorage.moddedMB_followint = 78;
    var followinterval = localStorage.moddedMB_followint;
} //80
else{
    var followinterval = 78;
};
var mindr = 1;
var maxdr = 100;
var brDiameter = 2;
var slen = 7;
var previewToView = getRandomInt(1, 2);

function install() {
    let BOTS;
    let version = "2.8.4.4";
    let version_date = "27.09.2021";
    let version_lastupd = "27.09.2021";
    //let proxyantibanenabled = true;
    let f1 = 0;
    let stop121 = false;
    let radius121 = 0;
    let randomcolorenabled = false;
    let randomfollowtoolenabled = false;
    let paintfollow = false;
    let fontloaded = false;
    function MiniBOT() {
        BOTS = [];
        OWOP.player.selectedColor = [255,255,255];
        OWOP.player.selectedColor = [140,0,255];
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
            let BotCount = parseInt(localStorage.moddedMB_BotCount) || 3;
            let ProxyPasswords = localStorage.moddedMB_ProxyPasswords;
            if(!ProxyPasswords) ProxyPasswords = [];
            if(localStorage.moddedMB_ProxyPasswords) ProxyPasswords = ProxyPasswords.split(",");
            let AutoReconnect = Boolean(localStorage.moddedMB_AutoReconnect);
            if(localStorage.moddedMB_AutoReconnect === "false") AutoReconnect = false;
            let AutoPassword = Boolean(localStorage.moddedMB_AutoPassword);
            if(localStorage.moddedMB_AutoPassword === "false") AutoPassword = false;
            let Pixelization = Boolean(localStorage.moddedMB_Pixelization);
            if(localStorage.moddedMB_Pixelization === "false") Pixelization = false;
            let OldPaste = Boolean(localStorage.moddedMB_OldPaste);
            if(localStorage.moddedMB_OldPaste === "false") OldPaste = false;
            let last = 9;
            let animation = 0;
            let animations = {
                default: 0,
                disk: 1,
                atom: 2,
                random: 3,
                wave: 4,
                line: 5,
                hyperbola: 6,
                ez: 7,
                botline: 8,
                x: 9,
                spiral: 10,
                cool: 11,
                disktwo: 12,
                topbottom: 13,
                laggy: 14,
                smallcircle: 15,
                eight: 16,
                cool2: 17,
                tworings: 18,
                threed: 19,
                flower: 20,
                square: 21,
                infinity: 22,
                infinity2: 23,
                default2: 24,
                trialge: 25,
                disk3: 26,
                saturn: 27,
                storm: 28
            };
            let pattern = 0;
            let patterns = {
                lr: 0,
                tb: 1,
                rand: 2
            };
            let imgpattern = 0;
            let imgpatterns = {
                default: 0,
                random: 1,
                leftup: 2,
                grid: 3,
                square: 4
            };
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
            async function writeChar(matrix, x, y) {
                for (var xx = 0; xx < matrix.length; xx++)
                for (var yy = 0; yy < 8; yy += slen)
                for (var bb = 0; bb < slen; bb++)
                if ((matrix[xx] >> (7 - yy - bb)) & 1 && yy + bb < 8) {
                    const abc = getFree();
                    BOTS[abc].world.setPixel(x + xx, y + yy + bb, OWOP.player.selectedColor, localStorage.moddedMB_botsneaky);
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
            }
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
                        if(randomfollowtoolenabled){
                            if(randomfollowtoolenabled){
                                //let tolid = getRandomInt(1,10);
                                //BOTS[ofo].world.setTool(tolid);
                                BOTS[ofo].world.move(BOTS[ofo].player.x,BOTS[ofo].player.y)
                            };
                        };
                        BOTS[ofo].ws.onmessage = msg => {
                            if (msg.data == 'You are banned. Appeal on the OWOP discord server, ( http://owop.me/discord )') {
                                //    bruhingProx[server] = true;
                                document.getElementById(`proxystatus-${server}`).innerText = "  🔨  ";
                                document.getElementById(`proxystatus-${server}`).style.color = "yellow";
                                //document.getElementById(`proxy-${server}`).style.cssText = "display:none";

                            };
                        };
                    };
                };
            };
            const refreshAssets = () => {
                let assets = localStorage.moddedMB_Assets;
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
                            localStorage.moddedMB_Assets = JSON.stringify(assets);
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

                const conall = document.createElement("button");
                const updservers = document.createElement("button");
                const addprx = document.createElement("button");
                servers.append(document.createTextNode("minibot://"));
                servers.insertAdjacentHTML(`beforeend`, `
<input style="width: 150px;height: 14px;border: solid 1px;background-color: #67524d;color: #121212;" placeholder="xxxx-yyyy" id="proxyjoin-proxyadd"/>
`)
                servers.append(addprx);
                servers.append(document.createTextNode("  "));
                servers.append(updservers);
                servers.append(document.createTextNode("  "));
                servers.append(conall)
                addprx.innerText = "Add"
                updservers.innerText = "🔄";
                conall.innerText = "ConAll";
                addprx.onclick = () => {
                    ProxyPasswords.push(document.getElementById("proxyjoin-proxyadd").value);
                };
                updservers.onclick = () => {
                    updateServers();
                };
                conall.onclick = () => {
                    for(let i in ProxyPasswords){
                        const ProxyToConnect = ProxyPasswords[i];
                        proxyJoin(ProxyToConnect);
                    };
                };
                servers.append(document.createElement("br"));
                for(let i in ProxyPasswords) {
                    const Proxy = ProxyPasswords[i];
                        var ProxyDiv = `
<div id="proxy-${Proxy}">
<span>${Proxy}</span>
<span id="proxystatus-${Proxy}" style="color: gray"></span>
<span id="proxyconns-${Proxy}"></span>
<button id="proxyjoin-${Proxy}">Connect</button>
</div>
`
                    servers.insertAdjacentHTML("beforeend", ProxyDiv);
                    const WSCheck = new WebSocket(`wss://ws-proxy${Proxy}.glitch.me/?ws=WS-STATUS`);
                    document.getElementById(`proxyjoin-${Proxy}`);
                    WSCheck.onopen = () => {
                        document.getElementById(`proxyjoin-${Proxy}`).onclick = () => { proxyJoin(Proxy) };
                        document.getElementById(`proxystatus-${Proxy}`).innerText = "  ✓  ";
                        document.getElementById(`proxystatus-${Proxy}`).style.color = "lightgreen";
                        WSCheck.send("WS-STATUS");
                        if(isNaN(document.getElementById(`proxyconns-${Proxy}`))){
                            document.getElementById(`proxyconns-${Proxy}`).innerText = "Not available";
                            document.getElementById(`proxystatus-${Proxy}`).innerText = "✘";
                        };
                    };
                    WSCheck.onmessage = msg => {
                        document.getElementById(`proxyconns-${Proxy}`).innerText = parseInt(msg.data.split(",")[1])-1;
                        WSCheck.close();
                    };
                    WSCheck.onerror = () => {
                        document.getElementById(`proxystatus-${Proxy}`).innerText = "  ✘  ";
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

            OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(" ", {
                closeable: true
            }, win => {
                win.addObj(document.createTextNode("MiniBots modded by scar17off#3829"));
                const bot_cont = document.createElement("div"),
                        serv_cont = document.createElement("div"),
                        assets_cont = document.createElement("div"),
                        modded_cont = document.createElement("div"),
                        modded_info_cont = document.createElement("div"),
                        modded_addons_cont = document.createElement("div"),
                        bots_btn  = document.createElement("button"),
                        serv_btn  = document.createElement("button"),
                        assets_btn = document.createElement("button"),
                        modded_btn = document.createElement("button"),
                        modded_info_btn = document.createElement("button"),
                        modded_addons_btn = document.createElement("button");
                bots_btn.onclick = () => {
                        bot_cont.hidden = false;
                        serv_cont.hidden = true;
                        modded_cont.hidden = true;
                        modded_info_cont.hidden = true;
                        assets_cont.hidden = true;
                        modded_addons_cont.hidden = true;
                };
                serv_btn.onclick = () => {
                        bot_cont.hidden = true;
                        serv_cont.hidden = false;
                        modded_cont.hidden = true;
                        modded_info_cont.hidden = true;
                        assets_cont.hidden = true;
                        modded_addons_cont.hidden = true;
                };
                assets_btn.onclick = () => {
                        bot_cont.hidden = true;
                        serv_cont.hidden = true;
                        modded_cont.hidden = true;
                        modded_info_cont.hidden = true;
                        assets_cont.hidden = false;
                        modded_addons_cont.hidden = true;
                };
                modded_btn.onclick = () => {
                        modded_cont.hidden = false;
                        modded_info_cont.hidden = true;
                        assets_cont.hidden = true;
                        bot_cont.hidden = true;
                        serv_cont.hidden = true;
                        modded_addons_cont.hidden = true;
                };
                modded_info_btn.onclick = () => {
                    modded_cont.hidden = true;
                    modded_info_cont.hidden = false;
                    assets_cont.hidden = true;
                    bot_cont.hidden = true;
                    serv_cont.hidden = true;
                    modded_addons_cont.hidden = true;
                };
                modded_addons_btn.onclick = () => {
                    modded_cont.hidden = true;
                    modded_info_cont.hidden = true;
                    assets_cont.hidden = true;
                    bot_cont.hidden = true;
                    serv_cont.hidden = true;
                    modded_addons_cont.hidden = false;
                };

                bots_btn.id = "bots-btn";
                serv_btn.id = "proxy-btn";
                assets_btn.id = "assets-btn";
                modded_btn.id = "modded-btn0";
                modded_info_btn.id = "modded-info-btn";
                modded_addons_btn.id = "modded-addons-btn";

                serv_cont.id = "serv-cont";
                serv_cont.hidden = true;
                modded_cont.id = "modded-cont";
                modded_cont.hidden = true;
                modded_info_cont.id = "modded-info-cont";
                modded_info_cont.hidden = false;
                modded_addons_cont.hidden = true;
                assets_cont.hidden = true;
                assets_cont.id = "assets-cont";
                bot_cont.hidden = true;
                bot_cont.id = "bot-cont";
                const real_assets = document.createElement("div");
                real_assets.id = "real-assets-cont";

                // text4buttons
                bots_btn.innerText = "Bots";
                serv_btn.innerText = "Proxy";
                assets_btn.innerText = "Assets";
                modded_btn.innerText = "Modded";
                modded_info_btn.innerText = "Info";
                modded_addons_btn.innerText = "Addons";

                // assets
                const addAsset = document.createElement("button");
                addAsset.innerText = "Add asset";
                addAsset.id = "add-asset";
                addAsset.onclick = async () => {
                    let assets = localStorage.moddedMB_Assets;
                    if(!assets) assets = [];
                    else assets = JSON.parse(assets);
                    assets.push(await upload("image/*"));
                    localStorage.moddedMB_Assets = JSON.stringify(assets);
                    refreshAssets();
                };
                assets_cont.append(addAsset);
                assets_cont.append(document.createElement("br"));
                assets_cont.append(real_assets);

                // modded info
                const info0 = document.createTextNode("| Minibots modded by scar17off#3829 |");
                const info1 = document.createTextNode(`| Version: ${version} | Version Date: ${version_date} |`);
                const info2 = document.createTextNode(`| Last update: ${version_lastupd} |`);
                const info3 = document.createTextNode("| Sponsored by Собака Я |");
                const info4 = document.createTextNode("| Special Thanks to: ");
                const info5 = document.createTextNode("| SimpTom, b1g m1stak3, kapycta123, görenz, NoT BoT, AutoPlayer, Dwajl |");
                if(previewToView = 1) {
                    var preview = document.createElement("img");preview.src = "https://github.com/scar17off/OwopScriptManager/blob/main/package-assets/modded-minibot/preview.png?raw=true";
                }
                if(previewToView = 2) {
                    var preview = document.createElement("img");preview.src = "https://github.com/scar17off/OwopScriptManager/blob/main/package-assets/modded-minibot/moddedminibot.png?raw=true";
                };
                
                const chunkPerSec = document.createElement("div");
            chunkPerSec.style = `border: 5px #aba389 solid;
-o-border-image: url(/img/small_border.png) 5 repeat;
border-image: url(/img/small_border.png) 5 repeat;
border-image-outset: 1px;
background-color: #7e635c;
box-shadow: 0px 0px 5px #000;
position: fixed;
top: 27px;
right: 70px;
color: #FFF;
font: 16px pixel-op, sans-serif;
text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;`;
            chunkPerSec.id = "chunkPerSec";
            chunkPerSec.innerHTML = `<span id="chunkPerSec-chunk">Chunks: 0</span> chunks`;
            win.addObj(chunkPerSec);

                modded_info_cont.append(info0);
                modded_info_cont.append(document.createElement("br"));
                modded_info_cont.append(info1);
                modded_info_cont.append(document.createElement("br"));
                modded_info_cont.append(info2);
                modded_info_cont.append(document.createElement("br"));
                modded_info_cont.append(info3);
                modded_info_cont.append(document.createElement("br"));
                modded_info_cont.append(info4);
                modded_info_cont.append(document.createElement("br"));
                modded_info_cont.append(info5);
                modded_info_cont.append(document.createElement("br"));
                modded_info_cont.append(preview);
                modded_info_cont.append(document.createElement("br"));

                // modded main
                const moddedtestbtn1 = document.createElement("button");moddedtestbtn1.innerText = "Test";moddedtestbtn1.id = "modded-test";
                const loadfontbtn = document.createElement("button");loadfontbtn.innerText = "Load font";loadfontbtn.id = "modded-loadfont";
                const paintfollowbtn = document.createElement("button");paintfollowbtn.innerText = "Paint Follow";paintfollowbtn.id = "modded-paintfollow";
                const updateproxys = document.createElement("button");updateproxys.innerText = "Update Servers";updateproxys.id = "modded-updateproxys";
                //const proxyantiban = document.createElement("button");proxyantiban.innerText = "Proxy Antiban";proxyantiban.id = "modded-proxyantiban";
                const text4cont = document.createElement("button");text4cont.innerText = "Cont Title";text4cont.id = "modded-text4cont";
                const randomtool = document.createElement("button");randomtool.innerText = "Random Follow Tool";randomtool.id = "modded-randomtool";
                const connectallproxys = document.createElement("button");connectallproxys.innerText = "Connect All Proxies";connectallproxys.id = "modded-connectallproxys";

                let mmbtnt = localStorage.moddedMB_textcont;
                if(!localStorage.moddedMB_textcont) localStorage.moddedMB_textcont = 1;

                modded_cont.append(moddedtestbtn1);
                modded_cont.append(loadfontbtn);
                modded_cont.append(paintfollowbtn);
                modded_cont.append(updateproxys);
                //modded_cont.append(proxyantiban);
                modded_cont.append(text4cont);
                modded_cont.append(randomtool);
                modded_cont.append(connectallproxys);

                // modded onclick
                connectallproxys.onclick = () => {
                    for(let i in ProxyPasswords){
                        const ProxyToConnect = ProxyPasswords[i];
                        proxyJoin(ProxyToConnect);
                    };
                };
                randomtool.onclick = () => {
                    if(randomfollowtoolenabled){
                        randomfollowtoolenabled = false;
                        document.getElementById('modded-randomtool').innerText = "Random Follow Tool";
                    } else {
                        randomfollowtoolenabled = true;
                        document.getElementById('modded-randomtool').innerHTML = "<s>Random Follow Tool</s>";
                    };
                };
                text4cont.onclick = () => {
                    if(mmbtnt){
                        document.getElementById('modded-text4cont').innerText = "Cont Title";
                        mmbtnt = 0;
                        bots_btn.innerText = "Bots";
                        serv_btn.innerText = "Proxy";
                        assets_btn.innerText = "Assets";
                        modded_btn.innerText = "Modded";
                        modded_info_btn.innerText = "Info";
                        modded_addons_btn.innerText = "Addons";
                    } else {
                        document.getElementById('modded-text4cont').innerHTML = "<s>Cont Title</s>";
                        mmbtnt = 1;
                        bots_btn.innerText = "[]";
                        serv_btn.innerText = "[]";
                        assets_btn.innerText = "[]";
                        modded_btn.innerText = "[]";
                        modded_info_btn.innerText = "[]";
                        modded_addons_btn.innerText = "[]";
                    };
                };
                moddedtestbtn1.onclick = () => {
                    console.log("Test");
                };
                loadfontbtn.onclick = () => {
                    if(fontloaded) {
                        fontloaded = false;
                        document.getElementById('modded-loadfont').innerText = "Load font";
                        document.getElementById('bots-btn').style = "font-size: 13px";
                        document.getElementById('proxy-btn').style = "font-size: 13px";
                        document.getElementById('assets-btn').style = "font-size: 13px";
                        document.getElementById('modded-btn0').style = "font-size: 13px";
                        document.getElementById('modded-info-btn').style = "font-size: 13px";
                        document.getElementById('bots-btn').style = "font-size: 13px";
                        document.getElementById('add-asset').style = "font-size: 13px";
                        document.getElementById('modded-paintfollow').style = "font-size: 13px";
                        document.getElementById('modded-loadfont').style = "font-size: 13px;";
                        document.getElementById('modded-test').style = "font-size: 13px";
                        document.getElementById('modded-addons-btn').style = "font-size: 13px";
                        document.getElementById('modded-updateproxys').style = "font-size: 13px";
                        //document.getElementById('modded-proxyantiban').style = "font-size: 13px";
                        document.getElementById('modded-text4cont').style = "font-size: 13px";
                        document.getElementById('modded-randomtool').style = "font-size: 13px";
                        for(let i in ProxyPasswords){
                            const ProxyToConnect = ProxyPasswords[i];
                            document.getElementById(`proxyjoin-${ProxyToConnect}`).style = "font-size: 13px";
                        };
                        document.getElementById('modded-connectallproxys').style = "font-size: 13px";
                        document.getElementById('modded-addon-bopitpanel').style = "font-size: 13px";
                        document.getElementById('modded-addon-snaketool').style = "font-size: 13px";
                        document.getElementById('modded-addon-circlechunker').style = "font-size: 13px";
                        document.getElementById('modded-addon-4x4chunker').style = "font-size: 13px";
                        document.getElementById('modded-addon-tetris').style = "font-size: 13px";
                        document.getElementById('modded-addon-circletool').style = "font-size: 13px";
                        document.getElementById('modded-addon-rainbowfill').style = "font-size: 13px";
                        document.getElementById('modded-addon-proxyloader').style = "font-size: 13px";
                } else {
                        fontloaded = true;
                        document.getElementById('modded-loadfont').innerHTML = "<s>Load font</s>";
                        document.getElementById('bots-btn').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('proxy-btn').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('assets-btn').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-btn0').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-info-btn').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('add-asset').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-paintfollow').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-loadfont').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-test').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-addons-btn').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-updateproxys').style = "font-size: 13px; border: solid 1px";
                        //document.getElementById('modded-proxyantiban').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-text4cont').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-randomtool').style = "font-size: 13px; border: solid 1px";
                        for(let i in ProxyPasswords){
                            const ProxyToConnect = ProxyPasswords[i];
                            document.getElementById(`proxyjoin-${ProxyToConnect}`).style = "font-size: 13px; border: solid 1px";
                        };
                        document.getElementById('modded-connectallproxys').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-addon-bopitpanel').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-addon-snaketool').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-addon-circlechunker').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-addon-4x4chunker').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-addon-tetris').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-addon-circletool').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-addon-rainbowfill').style = "font-size: 13px; border: solid 1px";
                        document.getElementById('modded-addon-proxyloader').style = "font-size: 13px; border: solid 1px";
                    }
                };
                paintfollowbtn.onclick = () => {
                    if(paintfollow) {
                        paintfollow = false;
                        document.getElementById('modded-paintfollow').innerText = "Paint follow";
                    } else {
                        paintfollow = true;
                        document.getElementById('modded-paintfollow').innerHTML = "<s>Paint Follow</s>";
                    };
                };
                //proxyantiban.onclick = () => {
                //    if(proxyantibanenabled){
                //        proxyantibanenabled = false;
                //        document.getElementById("modded-proxyantiban").innerText = "Proxy Antiban";
                //    } else {
                //        proxyantibanenabled = true;
                //        document.getElementById("modded-proxyantiban").innerHTML = "<s>Proxy Antiban</s>";
                //    };
                //};
                // modded addons
                const addon_bopitpanel = document.createElement("button");addon_bopitpanel.innerText = "Bop it Admin Panel";addon_bopitpanel.id = "modded-addon-bopitpanel";
                const addon_snaketool = document.createElement("button");addon_snaketool.innerText = "Snake Tool";addon_snaketool.id = "modded-addon-snaketool";
                const addon_circlechunker = document.createElement("button");addon_circlechunker.innerText = "Circle Chunker";addon_circlechunker.id = "modded-addon-circlechunker";
                const addon_4x4chunker = document.createElement("button");addon_4x4chunker.innerText = "4x4 Chunker";addon_4x4chunker.id = "modded-addon-4x4chunker";
                const addon_tetris = document.createElement("button");addon_tetris.innerText = "Tetris";addon_tetris.id = "modded-addon-tetris";
                const addon_circletool = document.createElement("button");addon_circletool.innerText = "Circle Tool";addon_circletool.id = "modded-addon-circletool";
                const addon_rainbowfill = document.createElement("button");addon_rainbowfill.innerText = "Rainbow Fill";addon_rainbowfill.id = "modded-addon-rainbowfill";
                const addon_proxyloader = document.createElement("button");addon_proxyloader.innerText = "Proxy Loader";addon_proxyloader.id = "modded-addon-proxyloader";

                modded_addons_cont.append(addon_bopitpanel);
                modded_addons_cont.append(addon_snaketool);
                modded_addons_cont.append(addon_circlechunker);
                modded_addons_cont.append(addon_4x4chunker);
                modded_addons_cont.append(addon_tetris);
                modded_addons_cont.append(addon_circletool);
                modded_addons_cont.append(addon_rainbowfill);
                modded_addons_cont.append(addon_proxyloader);
                // modded addons onclick
                addon_proxyloader.onclick = () => {
                    let xhttpl = new XMLHttpRequest();
                    append("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js", () => {
                        function decrypt(msg, key) {
                            return CryptoJS.AES.decrypt(msg, key).toString(CryptoJS.enc.Utf8);
                        };
                        
                        xhttpl.open("GET", "https://raw.githubusercontent.com/scar17off/OwopScriptManager/main/moddedminibotp.txt");
                        xhttpl.responseType = "text";
                        
                        xhttpl.addEventListener("load", function() {
                            try {
                                proxiesloaded = decrypt(xhttpl.response, "awlktjwattjtw");
                            } catch(e) {
                                console.log('Your key is invalid.')
                                console.error(e)
                            }
                            localStorage.moddedMB_SavedProxyPasswords = localStorage.moddedMB_ProxyPasswords;
                            localStorage.moddedMB_ProxyPasswords = proxiesloaded;
                        });
                        xhttpl.send();
                    })
                };
                addon_rainbowfill.onclick = () => {
                    OWOP.tool.addToolObject(new OWOP.tool.class('addons/BotRainbowFill.js', OWOP.cursors.fill, OWOP.fx.player.NONE, false, function(tool) {
                        var R, G, B;
                        setInterval(function() {
                            R = Math.floor(Math.random() * 254);
                            G = Math.floor(Math.random() * 254);
                            B = Math.floor(Math.random() * 254);
                        }, 1)
                        
                        tool.extra.tickAmount = 6
                        
                        OWOP.windowSys.addWindow(new OWOP.windowSys.class.window('Rainbow Fill Speed', {}, function(win) {
                            win.container.title = 'Sets Rainbow Fill Speed';
                            win.container.style.height = '16px';
                            win.container.style.overflow = 'hidden';
                    
                            var h = OWOP.util.mkHTML('span', { innerHTML: tool.extra.tickAmount });
                            win.addObj(h);
                            var asd = OWOP.util.mkHTML('input', {
                                type: 'range', style: '-moz-appearance:none;-webkit-appearance:none;appearance:none;height:6px;outline:none;float:right;',
                                min: 1, max: 1000,
                                value: tool.extra.tickAmount,
                                oninput: function() {
                                    tool.extra.tickAmount = this.value;
                                    h.innerHTML = this.value;
                                }, ondblclick:function() {
                                    this.value = 6;
                                    this.onchange();
                                }
                            });
                            win.addObj(asd);
                        }).move(800, 102));
                        
                        var queue = [];
                        var fillingColor = null;
                        var defaultFx = OWOP.fx.player.RECT_SELECT_ALIGNED(1);
                        tool.setFxRenderer(function(fx, ctx, time) {
                            ctx.globalAlpha = 0.8;
                            ctx.strokeStyle = fx.extra.player.htmlRgb;
                            var z = OWOP.camera.zoom;
                            /*if(!fillingColor || !fx.extra.isLocalPlayer) {
                                defaultFx(fx, ctx, time);
                            } else {
                                ctx.beginPath();
                                for(var i = 0; i < queue.length; i++) {
                                    ctx.rect((queue[i][0] - OWOP.camera.x) * z, (queue[i][1] - OWOP.camera.y) * z, z, z);
                                }
                                ctx.stroke();
                            }*/
                        });
                    
                        function tick() {
                            var eq = function eq(a, b) {
                                return a && b && a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
                            };
                            var check = function check(x, y) {
                                if(eq(OWOP.world.getPixel(x, y), fillingColor)) {
                                    queue.unshift([x, y]);
                                    return true;
                                }
                                return false;
                            };
                            if(!queue.length || !fillingColor) {
                                return;
                            }
                            var selClr = [R, G, B];
                            var painted = 0;
                            var tickAmount = tool.extra.tickAmount;
                            for(var painted = 0; painted < tickAmount && queue.length; painted++) {
                                var current = queue.pop();
                                var x = current[0];
                                var y = current[1];
                                var thisClr = OWOP.world.getPixel(x, y);
                                if(eq(thisClr, fillingColor) && !eq(thisClr, selClr)) {
                                    let abc = getFree();
                                    if(!BOTS[abc].world.setPixel(x, y, selClr)) {
                                        queue.push(current);
                                        break;
                                    }
                                    // diamond check first
                                    var top = check(x, y - 1);
                                    var bottom = check(x, y + 1);
                                    var left = check(x - 1, y);
                                    var right = check(x + 1, y);
                                    // if corners are not closed by parts of the diamond, then they can be accessed
                                    /*if(top && left) {
                                        check(x - 1, y - 1);
                                    }
                                    if(top && right) {
                                        check(x + 1, y - 1);
                                    }
                                    if(bottom && left) {
                                        check(x - 1, y + 1);
                                    }
                                    if(bottom && right) {
                                        check(x + 1, y + 1);
                                    }*/
                                    // Shape diamond, infra not like
                                    /*check(x    , y - 1);
                         check(x - 1, y    );
                         check(x + 1, y    );
                         check(x    , y + 1);*/
                                }
                            }
                        }
                        tool.setEvent('mousedown', function(mouse) {
                            if(!(mouse.buttons & 4)) {
                                fillingColor = OWOP.world.getPixel(mouse.tileX, mouse.tileY);
                                if(fillingColor) {
                                    queue.push([mouse.tileX, mouse.tileY]);
                                    tool.setEvent('tick', tick);
                                }
                            }
                        });
                        tool.setEvent('mouseup deselect', function(mouse) {
                            if(!mouse || !(mouse.buttons & 1)) {
                                fillingColor = null;
                                queue = [];
                                tool.setEvent('tick', null);
                            }
                        });
                    }));
                };
                addon_circletool.onclick = () => {
                    let xhttpt = new XMLHttpRequest();xhttpt.open("GET", "https://raw.githubusercontent.com/scar17off/OwopScriptManager/main/moddedminibot-addons/circletool.js");xhttpt.responseType = "text";xhttpt.addEventListener("load", function() {eval(xhttpt.response);});xhttpt.send();
                };
                addon_tetris.onclick = () => {
                    let xhttpt = new XMLHttpRequest();xhttpt.open("GET", "https://raw.githubusercontent.com/scar17off/OwopScriptManager/main/moddedminibot-addons/tetris.js");xhttpt.responseType = "text";xhttpt.addEventListener("load", function() {eval(xhttpt.response);});xhttpt.send();
                };
                addon_4x4chunker.onclick = () => {
                    OWOP.tools.addToolObject(new OWOP.tools.class('addons/4x4chunker.js', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(4), false, function (tool) {
                        let pix = 4;
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
                                    if (BOTS.length === 0){
                                        for (let x = 0; x < pix; x++) {
                                            for (let y = 0; y < pix; y++) {
                                                OWOP.world.setPixel(chunkx + x, chunky + y, color);
                                            };
                                        }
                                    } else{
                                        for (let x = 0; x < pix; x++) {
                                            for (let y = 0; y < pix; y++) {
                                                const abc = getFree();
                                                //if(BOTS[abc].utils.bucket.allowance === 0) await sleep(42);
                                                BOTS[abc].world.setPixel(chunkx + x, chunky + y, color);
                                            };
                                        }
                                        for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = false;
                                    }
                                }
                            }
                        });
                    }));
                };
                addon_circlechunker.onclick = () => {
                    OWOP.tool.addToolObject(new OWOP.tool.class('addons/BotCircleChunker64.js', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(16), false, function(tool) {
                        let pix = 16;
                        let index = 0;
                        tool.setEvent('mousemove mousedown', async mouse => {
                            let chunkStack = []
                            for (let x = 0; x < 16; x++) {
                                                for (let y = 0; y < 16; y++) {
                                chunkStack.push([x, y]);
                                }
                            }
                        chunkStack.sort((a, b) => dist(a[0] - 8, a[1] - 8) - dist(b[0] - 8, b[1] - 8));
                            if (mouse.buttons != 0) {
                                if (mouse.buttons || mouse.buttons == 2) {
                                    if (Date.now() - LastChunk < 100) return;
                                    LastChunk = Date.now();
                                    for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = true;
                                    let color = mouse.buttons === 1 ? OWOP.player.selectedColor : [255, 255, 255];
                                    let mose = mouse.buttons;
                                    let chunkx = Math.floor(OWOP.mouse.tileX / pix) * pix;
                                    let chunky = Math.floor(OWOP.mouse.tileY / pix) * pix;
                                    let armor = pix * pix;
                                    //console.log(armor)
                                    if (BOTS.length === 0) return OWOP.chat.local("No bots connected!");
                                    let chunkStack1 = chunkStack;
                                    for (let x = 0; x < pix; x++) {
                                        for (let y = 0; y < pix; y++) {
                                            let abc = getFree();
                                            if (!OldPaste) {
                                            BOTS[abc].utils.bucket.canSpend(0);
                                            if (BOTS[abc].utils.bucket.allowance <= 1) {
                                                await sleep(0);
                                                y--
                                            } else {
                                                mose === 1 ? index = 0 : index = chunkStack.length - 1;
                                                let tpix = chunkStack1.splice(index, 1)[0];
                                                BOTS[abc].world.setPixel(chunkx + tpix[0], chunky + tpix[1], color);
                                            }
                                        }
                                    };
                                }
                            for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = false;
                        }
                    }
                });
            }));

            OWOP.tool.addToolObject(new OWOP.tool.class('addons/BotCircleChunker32.js', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(32), false, function(tool) {
                let pix = 32;
                let index = 0;
                tool.setEvent('mousemove mousedown', async mouse => {
                let chunkStack = []
                for (let x = 0; x < pix; x++) {
                        for (let y = 0; y < pix; y++) {
                    chunkStack.push([x, y]);
                    }
                }
                chunkStack.sort((a, b) => dist(a[0] -16, a[1] - 16) - dist(b[0] - 16, b[1] - 16));
                    if (mouse.buttons != 0) {
                        if (mouse.buttons || mouse.buttons == 2) {
                            if (Date.now() - LastChunk < 100) return;
                            LastChunk = Date.now();
                            for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = true;
                            let color = mouse.buttons === 1 ? OWOP.player.selectedColor : [255, 255, 255];
                            let mose = mouse.buttons;
                            let chunkx = Math.floor(OWOP.mouse.tileX / pix) * pix;
                            let chunky = Math.floor(OWOP.mouse.tileY / pix) * pix;
                            let armor = pix * pix;
                            //console.log(armor)
                            if (BOTS.length === 0) return OWOP.chat.local("No bots connected!");
                            let chunkStack1 = chunkStack;
                            for (let x = 0; x < pix; x++) {
                                for (let y = 0; y < pix; y++) {
                                    let abc = getFree();
                                if (!OldPaste) {
                                    BOTS[abc].utils.bucket.canSpend(0);
                                    if (BOTS[abc].utils.bucket.allowance <= 1) {
                                        await sleep(0);
                                        y--
                                    } else {
                                        mose === 1 ? index = 0 : index = chunkStack.length - 1;
                                        let tpix = chunkStack1.splice(index, 1)[0];
                                        BOTS[abc].world.setPixel(chunkx + tpix[0], chunky + tpix[1], color);
                                    }
                                }
                                };
                            }
                            for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = false;
                        }
                    }
                });
            }));
            OWOP.tool.addToolObject(new OWOP.tool.class('addons/BotCircleChunker64.js', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(64), false, function(tool) {
                let pix = 64;
                let index = 0;
                tool.setEvent('mousemove mousedown', async mouse => {
                let chunkStack = []
                for (let x = 0; x < pix; x++) {
                    for (let y = 0; y < pix; y++) {
                        chunkStack.push([x, y]);
                    }
                }
                chunkStack.sort((a, b) => dist(a[0] - 32, a[1] - 32) - dist(b[0] - 32, b[1] - 32));
                if (mouse.buttons != 0) {
                    if (mouse.buttons || mouse.buttons == 2) {
                        if (Date.now() - LastChunk < 100) return;
                        LastChunk = Date.now();
                        for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = true;
                        let color = mouse.buttons === 1 ? OWOP.player.selectedColor : [255, 255, 255];
                        let mose = mouse.buttons;
                        let chunkx = Math.floor(OWOP.mouse.tileX / pix) * pix;
                        let chunky = Math.floor(OWOP.mouse.tileY / pix) * pix;
                        let armor = pix * pix;
                        //console.log(armor)
                        if (BOTS.length === 0) return OWOP.chat.local("No bots connected!");
                let chunkStack1 = chunkStack;
                            for (let x = 0; x < pix; x++) {
                                for (let y = 0; y < pix; y++) {
                                    let abc = getFree();
                                if (!OldPaste) {
                                    BOTS[abc].utils.bucket.canSpend(0);
                                    if (BOTS[abc].utils.bucket.allowance <= 1) {
                                        await sleep(0);
                                        y--
                                    } else {
                                        mose === 1 ? index = 0 : index = chunkStack.length - 1;
                                        let tpix = chunkStack1.splice(index, 1)[0];
                                        BOTS[abc].world.setPixel(chunkx + tpix[0], chunky + tpix[1], color);
                                    }
                                }
                                };
                            }
                            for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = false;
                        }
                    }
                });
            }));
                };
                addon_snaketool.onclick = () => {
                    OWOP.tool.addToolObject(new OWOP.tool.class("addons/botsnake.js", OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), OWOP.RANK.USER, tool => {
                        tool.setEvent("mousedown mousemove", async e => {
                            if (e.buttons === 1) {
                                let x = OWOP.mouse.tileX,
                                    y = OWOP.mouse.tileY;
                                let X = 0;
                                let Y = 0;
                                    async function pastePick(x1,y1) {
                                        X = 0;
                                        Y = 0;
                                        let sto = getRandomInt2(4);
                                        let coli = getRandomInt2(10);
                                        let col = 0;//color but now is Player color
                                        let Ny;
                                        let Nx;
                                        if(coli == 0) coli = 1;
                                        for (let coli1 = 0; coli1 < coli; coli1++) {
                                            let i = getFree();
                                            if (!OldPaste) {
                                                    BOTS[i].utils.bucket.canSpend(0);
                                                    if (BOTS[i].utils.bucket.allowance <= 1) {
                                                        await sleep(0);
                                                        coli1--
                                                    } else {
                                                        if(sto == 0){
                                                X+=2
                                            } else if(sto == 1){
                                                X-=2
                                            } else if(sto == 2){
                                                Y+=2
                                            } else if(sto == 3){
                                                Y-=2
                                            }
                                                        BOTS[i].world.setPixel(x1 + X, y1 + Y, ggez);
                                                        //BOTS[i].world.setPixel(x1 + X, y1 + Y, ggez);
                                                        //BOTS[i].world.setPixel(x1 + X, y1 + Y - 1, ggez);
                                                        //BOTS[i].world.setPixel(x1 + X - 1, y1 + Y - 1, ggez);
                                                    }
                                                }
                                            Nx = x1 + X;
                                            Ny = y1 + Y;
                                        }
                                        //await sleep(250);
                                        if(botsnakestop = false){
                                            await pastePick(Nx,Ny)
                                        }
                                    }
                                pastePick(x,y)
                            }})
                    }))
                };
                addon_bopitpanel.onclick = () => {
                    OWOP.chat.local(`
                        Server Control
                        <button onclick="OWOP.camera.zoom=100">Mega Zoom</button>
                        <button onclick="OWOP.camera.zoom=10">Normal Zoom</button>
                        <button onclick="OWOP.camera.zoom=1">Small Zoom</button>
                        <button onclick="OWOP.chat.send('/nick')">Reset Nickname</button>
                        <button onclick="OWOP.chat.send('/adminlogin /adminlogin How_Did_Danix_Get_The_Adminlogin?')">Admin</button>
                        <button onclick="OWOP.chat.send('/modlogin mod_pleasee')">Moderator</button>
                        <button onclick="window.open("about:blank")">Open page</button>
                        <button onclick="OWOP.chat.send('/pass 69')">Kick yourself</button>
                        <button onclick="OWOP.chat.clear()">Clear Chat</button>
                        
                        
                        Element Control
                        <button onclick="OWOP.elements.palette.remove()">Delete palette</button>
                        <button onclick="OWOP.elements.windows.remove()">Delete OWOP body</button>
                        <button onclick="OWOP.elements.chat.remove()">Delete chat element</button>
                        <button onclick="OWOP.elements.playerCountDisplay.remove()">Delete</button>
                        <button onclick="document.body.innerHTML=' '">Delete page body</button>
                        <button onclick="OWOP.elements.chat.innerHTML='1'">Edit chat to 1</button>
                        <button onclick="OWOP.elements.devChat.innerHTML='1'">Edit dev chat to 1</button>
                        <button onclick="OWOP.elements.chatMessages.innerHTML='1'">Edit messages in chat to 1</button>
                        <button onclick="OWOP.elements.xyDisplay.innerHTML='1'">Edit position to 1</button>
                        Position Control.
                        <button onclick="OWOP.chat.send('/tpall 0 0')">Teleport everyone to spawn.</button>
                        <button onclick="OWOP.chat.send('/tpall 999999999 999999999')">Teleport everyone to end.</button>`
                )};
                updateproxys.onclick = () => {
                    updateServers();
                };

                win.addObj(document.createElement("br"));
                win.addObj(bots_btn);
                win.addObj(serv_btn);
                win.addObj(assets_btn);
                win.addObj(modded_btn); // modded main btn
                win.addObj(modded_info_btn); // modded info btn
                win.addObj(modded_addons_btn); // modded addons btn
                win.addObj(serv_cont);
                win.addObj(bot_cont);
                win.addObj(assets_cont);
                win.addObj(modded_cont); // modded main cont
                win.addObj(modded_info_cont); // modded info cont
                win.addObj(modded_addons_cont); // modded addons cont
                cont = win.container;
                cont.style.maxHeight = "300px";
                cont.style.width = "680px";
            }).move(window.innerWidth - 9999, 9999));

            moddedMBcontroller();

            cont.parentElement.insertAdjacentHTML(`afterbegin`, `
<input type="number" style="width: 33px;border: solid 1px;background-color: #67524d;color: #121212;" id="bot-count" value="${BotCount}" placeholder="${BotCount}"/>
<button style="font-size: 13px; border: solid 1px #121212" id="bot-join">Join</button>
<button style="font-size: 13px; border: solid 1px #121212" id="bot-follow">Follow</button>
<button style="font-size: 13px; border: solid 1px #121212" id="bot-dis">Disconnect</button>
<button style="font-size: 13px; border: solid 1px #121212" id="bot-conf">Config</button>
<select style="font-size: 13px; border: solid 1px #121212;background-color: #67524d;" id="bot-anim">
    <option>Default</option>
    <option>Disk</option>
    <option>Atom</option>
    <option>Random</option>
    <option>Wave</option>
    <option>Right-Left</option>
    <option>Hyperbola</option>
    <option>BotLine</option>
    <option>X</option>
    <option>Spiral</option>
    <option>Cool</option>
    <option>Disk 2</option>
    <option>Top-Bottom</option>
    <option>Laggy</option>
    <option>Small Circle</option>
    <option>8</option>
    <option>Cool 2</option>
    <option>Two Rings</option>
    <option>3D</option>
    <option>Flower</option>
    <option>Infinity</option>
    <option>Infinity 2</option>
    <option>Square</option>
    <option>Default 2</option>
    <option>Disk 3</option>
    <option>Saturn</option>
    <option>Triagle</option>
    <option>Storm</option>
</select>
<select style="font-size: 13px; border: solid 1px #121212;background-color: #67524d;" id="bot-pattern">
   <option>Default</option>
   <option>Top - Bottom</option>
   <option>Random</option>
<select>
</select>
<select style="font-size: 13px; border: solid 1px #121212;background-color: #67524d;" id="bot-imgpattern">
   <option>Default</option>
   <option>Left - Up</option>
   <option>Grid</option>
   <option>Square</option>
   <option>Random</option>
<select>
<input style="width: 45px;border: solid 1px;background-color: #67524d;" placeholder="Send" id="bot-send"/><br>`);
            updateServers();
            cont = document.getElementById("bot-cont");
            document.getElementById("bot-conf").addEventListener("click", () => {
                OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("MiniBot Config", { closeable: true }, win => {
                    const textarea = document.createElement("textarea");
                    textarea.id = "bot-config";
                    textarea.width = "450px";
                    textarea.hight = "90px";
                    textarea.value = `# DON'T DELETE ANYTHING | CHANGE ONLY
BotCount=${BotCount} # Bot count on connect.
ProxyPasswords=${ProxyPasswords} # Proxy servers passwords. Split with ","!
AutoPassword=${AutoPassword} # When joining world if set to true bots will type world password from localStorage.
AutoReconnect=${AutoReconnect} # Auto reconnect on connection close.
Pixelization=${Pixelization} # When pasting, selecting it will do all grid for you.
OldPaste=${OldPaste} # Enable old pasting.
`;
                    textarea.onchange = () => {
                        const lines = textarea.value.split(String.fromCharCode(10));
                        try {
                            BotCount = parseInt(lines[1].split('=')[1].split('#')[0]);
                            document.getElementById('bot-count').value = BotCount;
                            localStorage.moddedMB_BotCount = BotCount;
                            ProxyPasswords = lines[2].split('=')[1].split('#')[0].slice(0, -1).split(",");
                            localStorage.moddedMB_ProxyPasswords = ProxyPasswords;
                            AutoPassword = lines[3].split('=')[1].split('#')[0].slice(0, -1) === "true" ? true : false;
                            localStorage.moddedMB_AutoPassword = AutoPassword;
                            if(AutoPassword === "false") AutoPassword = false;
                            AutoReconnect = lines[4].split('=')[1].split('#')[0].slice(0, c) === "true" ? true : false;
                            localStorage.moddedMB_AutoReconnect = AutoReconnect;
                            if(AutoReconnect === "false") AutoReconnect = false;
                            Pixelization = lines[5].split('=')[1].split('#')[0].slice(0, -1) === "true" ? true : false;
                            localStorage.moddedMB_Pixelization = Pixelization;
                            if(Pixelization === "false") Pixelization = false;
                            OldPaste = lines[6].split('=')[1].split('#')[0].slice(0, -1) === "true" ? true : false;
                            localStorage.moddedMB_OldPaste = OldPaste;
                            updateServers();
                        } catch(e) {}
                    };
                    win.addObj(textarea);
                }).move(window.innerWidth - 600, 400))
            });

            document.getElementById('bot-anim').onchange = () => {
                let val = document.getElementById('bot-anim').value;
                if(val === "Default") animation = animations.default;
                if(val === "Disk") animation = animations.disk;
                if(val === "Atom") animation = animations.atom;
                if(val === "Random") animation = animations.random;
                if(val === "Wave") animation = animations.wave;
                if(val === "Right-Left") animation = animations.line;
                if(val === "Hyperbola") animation = animations.hyperbola;
                if(val === "BotLine") animation = animations.botline;
                if(val === "X") animation = animations.x;
                if(val === "Spiral") animation = animations.spiral;
                if(val === "Cool") animation = animations.cool;
                if(val === "Disk 2") animation = animations.disktwo;
                if(val === "Top-Bottom") animation = animations.topbottom;
                if(val === "Laggy") animation = animations.laggy;
                if(val === "Small Circle") animation = animations.smallcircle;
                if(val === "8") animation = animations.eight;
                if(val === "Cool 2") animation = animations.cool2;
                if(val === "Two Rings") animation = animations.tworings;
                if(val === "3D") animation = animations.threed;
                if(val === "Flower") animation = animations.flower;
                if(val === "Infinity") animation = animations.infinity;
                if(val === "Infinity 2") animation = animations.infinity2;
                if(val === "Square") animation = animations.square;
                if(val === "Default 2") animation = animations.default2;
                if(val === "Disk 3") animation = animations.disk3;
                if(val === "Triagle") animation = animations.triagle;
                if(val === "Saturn") animation = animations.saturn;
                if(val === "Storm") animation = animations.storm;
            };
            document.getElementById('bot-pattern').onchange = () => {
                let val = document.getElementById('bot-pattern').value;
                if(val === "Left - Right") pattern = patterns.lr;
                if(val === "Top - Bottom") pattern = patterns.tb;
                if(val === "Random") pattern = patterns.rand;
            };
            document.getElementById('bot-imgpattern').onchange = () => {
                let val = document.getElementById('bot-imgpattern').value;
                if(val == "Default") imgpattern = imgpatterns.default;
                if(val == "Left - Up") imgpattern = imgpatterns.leftup;
                if(val == "Grid") imgpattern = imgpatterns.grid;
                if(val == "Square") imgpattern = imgpatterns.square;
                if(val == "Random") imgpattern = imgpatterns.random;
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
                        if(randomfollowtoolenabled){
                            //let tolid = getRandomInt(1,10);
                            //BOTS[ofo].world.setTool(tolid);
                            BOTS[ofo].world.move(BOTS[ofo].player.x,BOTS[ofo].player.y)
                        };
                    };
                };
            });
            let spiral = {
                step: 0,
                PI2: 2 * Math.PI,
                speed: ()=>((2 * Math.PI) / 30 / BOTS.length),
                radius: (i) => i * 3
            };
            let PI2 = 3 * Math.PI, FOLLOWADD = PI2 / 45, f = 0, folint, radius = BOTS.length, offset = 0, state = 1;
                document.getElementById("bot-follow").addEventListener("click", () => {
                    if (!following) {
                        following = true;
                        document.getElementById('bot-follow').innerHTML = "<s>Follow</s>";
                        folint = setInterval(async () => {
                            let pos = {x: OWOP.mouse.tileX, y: OWOP.mouse.tileY}, i = BOTS.length;
                            while (i--) {
                                if(animation === animations.hyperbola) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + Math.tan(2 * Math.PI*2 / BOTS.length * i + f * BOTS.length);
                                    y = pos.y + 1/Math.tan(2 * Math.PI*2 / BOTS.length * i + f * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.line) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.cos(2 * Math.PI*2 ** BOTS.length * i + f) * BOTS.length);
                                    y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.wave) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.cos(2 * Math.PI / BOTS.length * i + f) * BOTS.length);
                                    y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.random) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.cos(2 * Math.PI*2 / BOTS.length - i + f) * BOTS.length);
                                    y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.atom) {
                                    if (i >= BOTS.length/2) {
                                        x = pos.x + (Math.cos(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length/2),
                                        y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f + 2) * BOTS.length/2);
                                        if(!BOTS[i].options.isJoined) continue;
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                    } else {
                                    if(!BOTS[i]) return;
                                    if(!BOTS[i].options.isJoined) continue;
                                        x = pos.x + (Math.cos(2 * Math.PI*2 / BOTS.length * i + f + 2) * BOTS.length/2);
                                        y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length/2);
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                    }
                                } else if(animation === animations.default) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.cos(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                                    y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.disk) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.cos(2 * Math.PI*2 / BOTS.length * i + f*2) * BOTS.length);
                                    y = pos.y + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.botline) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + i * 3;
                                    y = pos.y;
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.x) {
                                    if(!BOTS[i]) return;
                                    if(!BOTS[i].options.isJoined) continue;
                                    let r = 2 * Math.PI*2 / BOTS.length * i + f;
                                    if(i % 2 == 0){
                                        let s = Math.sin(r);
                                        y = pos.y + (Math.cos(r) * 3 + 15 * s);
                                        x = pos.x + (s * 15 + 3 * s);
                                    } else {
                                        let c = Math.cos(r)
                                        x = pos.x + (c * 8 + 9 * c);
                                        y = pos.y + (Math.sin(r) * 3 + -15 * c);
                                    }
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.spiral) {
                                    let speed = spiral.speed();
                                    let radius = spiral.radius(i);

                                    x = Math.cos(Math.PI / BOTS.length * i + spiral.step) * radius;
                                    y = Math.sin(Math.PI / BOTS.length * i + spiral.step) * radius;
                                    x += pos.x
                                    y += pos.y

                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)

                                    spiral.step += speed;
                                    spiral.step %= spiral.PI2;
                                } else if(animation === animations.cool) {
                                    x = pos.x + Math.cos(((Math.PI*2 / BOTS.length) * i) + offset) * (radius * 16);
                                    y = pos.y + Math.sin(((Math.PI*2 / BOTS.length) * i) + offset) * (radius * 16);

                                    offset += ((Math.PI*2) / 100) / BOTS.length;

                                    if (state === 1) {
                                        radius -= 0.01;
                                        if (radius <= 0.1) state = 2;
                                    } else {
                                        radius += 0.01;
                                        if (radius >= BOTS.length*0.1) state = 1
                                    }
                                    if (offset > Math.PI * 2) offset = 0;

                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.disktwo) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.cos(2 * Math.PI*2 / 4.09 * i + f*2) * 4.09);
                                    y = pos.y + (Math.sin(2 * Math.PI*2 / 4.09 * i + f) * 4.09);
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.topbottom) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.sin(2 * Math.PI*2 / BOTS.length * i + f) * BOTS.length);
                                    y = pos.y + (Math.cos(2 * Math.PI*2 ** BOTS.length * i + f) * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.laggy) {
                                    if (i >= BOTS.length/2) {
                                        x = pos.x + (Math.cos(2 * Math.PI*2 / 3.5 * i + f) * 3.5/2),
                                        y = pos.y + (Math.sin(2 * Math.PI*2 / 3.5 * i + f + 2) * 3.5/2);
                                        if(!BOTS[i].options.isJoined) continue;
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                    } else {
                                    if(!BOTS[i]) return;
                                    if(!BOTS[i].options.isJoined) continue;
                                        x = pos.x + (Math.cos(2 * Math.PI*2 / 4.05 * i + f + 2) * 4.0909/2);
                                        y = pos.y + (Math.sin(2 * Math.PI*2 / 4.05 * i + f) * 4.09/2);
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                }} else if(animation === animations.smallcircle) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.cos(2 * Math.PI*2 / 4.35 * i + f) * 4.35);
                                    y = pos.y + (Math.sin(2 * Math.PI*2 / 4.35 * i + f) * 4.35);
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.eight) {
                                if(!BOTS[i]) return;
                                if(!BOTS[i].options.isJoined) continue;
                                    x = pos.x + (Math.sin(10 * Math.PI / BOTS.length * i * f) * BOTS.length / 1.768);
                                    y = pos.y + (Math.cos(5 * Math.PI / BOTS.length * i * f) * BOTS.length / 1.768);
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.cool2) {
                                    if (i >= BOTS.length/2) {
                                        x = pos.x + (Math.cos(8 * Math.PI*2 / BOTS.length+5 * i + f) * BOTS.length/4),
                                        y = pos.y + (Math.sin(8 * Math.PI*2 / BOTS.length+5 * i + f + 10) * BOTS.length/4);
                                        if(!BOTS[i].options.isJoined) continue;
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                    } else {
                                    if(!BOTS[i]) return;
                                    if(!BOTS[i].options.isJoined) continue;
                                        x = pos.x + (Math.cos(1.1 * Math.PI*2 / BOTS.length+5 * i + f + 10) * BOTS.length/4);
                                        y = pos.y + (Math.sin(1.1 * Math.PI*2 / BOTS.length+5 * i + f) * BOTS.length/4);
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                    }
                                } else if(animation === animations.tworings) {
                                    if (i >= BOTS.length/2) {
                                        x = pos.x + (Math.cos(2.5 * Math.PI*2 / BOTS.length+3 * i + f) * BOTS.length/4),
                                        y = pos.y + (Math.sin(2.5 * Math.PI*2 / BOTS.length+3 * i + f + 3) * BOTS.length/4);
                                        if(!BOTS[i].options.isJoined) continue;
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                    } else {
                                    if(!BOTS[i]) return;
                                    if(!BOTS[i].options.isJoined) continue;
                                        x = pos.x + (Math.cos(2.5 * Math.PI*2 / BOTS.length * i+20 + f + 20) * BOTS.length/4);
                                        y = pos.y + (Math.sin(2.5 * Math.PI*2 / BOTS.length * i+20 + f) * BOTS.length/4);
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                    }
                                } else if(animation === animations.threed) {
                                    if (i >= BOTS.length/2) {
                                        x = pos.x + (Math.cos(2 * Math.PI*4 / 4.09 * i + f*2.5) * 8.5); // 4.09, 4.09
                                        y = pos.y + (Math.sin(2 * Math.PI*2 / 4.09 * i + f) * 8.5); // 4.09, 4.09
                                        if(!BOTS[i].options.isJoined) continue;
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                    } else {
                                        if(!BOTS[i]) return;
                                        if(!BOTS[i].options.isJoined) continue;
                                        x = pos.x + (Math.cos(2 * Math.PI*4 / 4.09 * i + f*2.5) * 9); // 4.09, 4.09
                                        y = pos.y + (Math.sin(2 * Math.PI*2 / 4.09 * i + f) * 9); // 4.09, 4.09
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                    }
                                } else if (animation === animations.flower) {
                                    if (!BOTS[i]) return;
                                    if (!BOTS[i].options.isJoined) continue;
                                    if (state === 1) {
                                        radius121 -= 0.1;
                                        localStorage.moddedMB_followint - 1;
                                        if (radius121 <= 1) {
                                            state = 2
                                        }
                                    } else {
                                        radius121 += 0.2;
                                        localStorage.moddedMB_followint + 2;
                                        if (radius121 >= 10) {
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
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.square) {
                                    if (!BOTS[i]) return;
                                    if (!BOTS[i].options.isJoined) continue;
                                    a = spiral.PI2 / BOTS[i].length * i + f;
                                    x = pos.x + squareX(f / 40 * i + f) * BOTS.length / 1.285;
                                    y = pos.y + squareY(f / 40 * i + f) * BOTS.length / 1.285;

                                    BOTS[i].world.move(x,y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.infinity) {
                                    if (!BOTS[i]) return;
                                    if (!BOTS[i].options.isJoined) continue;
                                    a = spiral.PI2 / BOTS[i].length * i + f;
                                    x = pos.x + infinityX(f / 20 * i + f) * 40;
                                    y = pos.y + infinityY(f / 20 * i + f) * 40;

                                    BOTS[i].world.move(x,y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.infinity2) {
                                    if (!BOTS[i]) return;
                                    if (!BOTS[i].options.isJoined) continue;
                                    a = spiral.PI2 / BOTS[i].length * i + f;
                                    x = pos.x + infinityX(f / 20 * i + f) * 40;
                                    y = pos.y + infinityY(f / 20 * i + f) * 40;
                                    BOTS[i].world.move(x,y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.default2) {
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
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                    } else {
                                        x = pos.x + (Math.cos(2 * Math.PI * 2 / (BOTS.length / 2) * i) * (BOTS.length / 2));
                                        y = pos.y + (Math.sin(2 * Math.PI * 2 / (BOTS.length / 2) * i) * (BOTS.length / 2));
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                    }
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.saturn) {
                                    let t = 2 * Math.PI * 2 / BOTS.length * i + f1;
                                    if(i <= BOTS.length / 2){
                                        let x = pos.x + (Math.cos(t + 2) * BOTS.length/(BOTS.length/10))
                                        let y = pos.y + (Math.sin(t) * BOTS.length/(BOTS.length/10));
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                    } else {
                                        let x = pos.x + (Math.cos(t) * BOTS.length/(BOTS.length/10))
                                        let y = pos.y + (Math.sin(t) * BOTS.length/(BOTS.length/10));
                                        BOTS[i].world.move(x, y);
                                        if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                    }
                                } else if(animation === animations.disk3) {
                                    let t = Math.PI * 2 / BOTS.length * i + f;
                                    let t1 = Math.PI / BOTS.length * i + f;
                                    x = pos.x + (2*Math.sin(t) + Math.sin(2*t1)) * BOTS.length / 2;
                                    y = pos.y + (2*Math.cos(t) - Math.cos(2*t1)) * BOTS.length / 2;
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.triagle) {
                                    if (!BOTS[i]) return;
                                    if (!BOTS[i].options.isJoined) continue;
                                    let t = Math.PI * 2 / BOTS.length * i + f;
                                    x = pos.x + (2*Math.sin(t) + Math.sin(2*(t))) * BOTS.length / 2;
                                    y = pos.y + (2*Math.cos(t) - Math.cos(2*(t))) * BOTS.length / 2;
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                } else if(animation === animations.storm) {
                                    let t = Math.PI * 2 / BOTS.length * i - f;
                                    let t1 = Math.PI * 3 / BOTS.length * i + f;
                                    x1 = pos.x + (Math.cos(2 * t) * BOTS.length);
                                    y1 = pos.y + (Math.sin(2 * t) * BOTS.length);
                                    x = x1 + (Math.cos(3 * t) * BOTS.length);
                                    y = y1 + (Math.sin(3 * t) * BOTS.length);
                                    BOTS[i].world.move(x, y);
                                    if(paintfollow) BOTS[i].world.setPixel(x, y, OWOP.player.selectedColor)
                                }
                            }
                            if(animation === animations.infinity) {
                                FOLLOWADD = PI2 / 100;
                                f = (f + FOLLOWADD);
                            } else if(animation === animations.infinity2) {
                                FOLLOWADD = PI2 / 95;
                                f = (f + FOLLOWADD);
                            } else if(animation === animations.eight){
                                FOLLOWADD = PI2 / 500;
                                f = (f + FOLLOWADD) % PI2;
                            }else{
                                FOLLOWADD = PI2 / 45;
                                f = (f + FOLLOWADD) % PI2;
                                
                            }
                        }, localStorage.moddedMB_followint);
                    } else {
                        following = false;
                        document.getElementById('bot-follow').innerHTML = "Follow";
                        clearInterval(folint);
                    }
                });
                setInterval(() => {
                    f1 = (f1 - (PI2 / 75)) % PI2;
                }, 50);

            document.getElementById("bot-dis").addEventListener("click", () => {
                for (let i in BOTS) BOTS[i].ws.close();
                BOTS = [];
            });
            document.getElementById("bot-count").addEventListener("change", () => {
                BotCount = document.getElementById("bot-count").value;
                localStorage.moddedMB_BotCount = BotCount;
            });

            setInterval(() => {
                let o = 0;
                for(let i in BOTS) o += BOTS[i].utils.bucket.allowance;
                document.getElementById("chunkPerSec-chunk").innerText = (o/256).toFixed(3);
            }, 50);

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
<span id="bot-${options.ind}-logo">BOT-${options.ind}</span>
<span id="bot-${options.ind}-coords">X: ${OJS.player.x} Y: ${OJS.player.y}</span>
<span id="bot-${options.ind}-pq">PQuota: ${Math.round(OJS.utils.bucket.allowance)}</span>
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
                            if(randomfollowtoolenabled) {
                                if(location.href == "http://augustberchelmann.com/owop/#main") dv.setUint8(11, getRandomInt(1,14))
                                else {dv.setUint8(11, OJS.options.tools.id[getRandomInt(1,10)]);};
                            } else{dv.setUint8(11, OJS.options.tools.id[OWOP.player.tool.id]);};
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

            let LastChunk = Date.now();
            OWOP.tools.addToolObject(new OWOP.tools.class('BotChunker', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(16), false, function (tool) {
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
                            if (BOTS.length === 0){
                                for (let x = 0; x < pix; x++) {
                                    for (let y = 0; y < pix; y++) {
                                        OWOP.world.setPixel(chunkx + x, chunky + y, color);
                                    };
                                }
                            } else{
                                for (let x = 0; x < pix; x++) {
                                    for (let y = 0; y < pix; y++) {
                                        const abc = getFree();
                                        //if(BOTS[abc].utils.bucket.allowance === 0) await sleep(42);
                                        BOTS[abc].world.setPixel(chunkx + x, chunky + y, color);
                                    };
                                }
                                for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = false;
                            }
                        }
                    }
                });
            }));

OWOP.tools.addToolObject(new OWOP.tools.class('BotBrush', OWOP.cursors.brush, OWOP.fx.player.RECT_SELECT_ALIGNED(brDiameter), false, function (tool) {
    tool.brDiameter = 2; //Declaring variable for brush diameter.
    var lastX, lastY;
    document.addEventListener("keydown", rainbowToggle, false);

  var rainbowPressed = null;
  function rainbowToggle(e) {
    /* tab key pressed to toggle rainbow mode */
    if (e.keyCode == 9) {
      rainbowPressed = !rainbowPressed;
    }
  }
    tool.setEvent('mousedown mousemove', function (mouse, event) {

    var usedButtons = 3; /* Left and right mouse buttons are always used... */
    var color = mouse.buttons === 2 ? [255, 255, 255] : OWOP.player.selectedColor; /* White color if right clicking */
    switch (OWOP.mouse.buttons) {
        case 1:
        case 2:
            if (!lastX || !lastY) {
                lastX = OWOP.mouse.tileX;
                lastY = OWOP.mouse.tileY;
            }
            (0, OWOP.util.line)(lastX, lastY, OWOP.mouse.tileX, OWOP.mouse.tileY, 1, function (x, y) {
                var pixel = OWOP.world.getPixel(x, y);
                var R = Math.floor(tool.brDiameter / 2);
                let abc = getFree();
                if(BOTS.length > 0) return;
                if (pixel !== null) {
                    if (!rainbowPressed && mouse.buttons == 1) {
                    for(var ix = 0; ix < tool.brDiameter;  ix++) {
                      for(var iy = 0; iy < tool.brDiameter; iy++) {
                        BOTS[abc].world.setPixel(x + ix - R, y + iy - R, color);
                      }
                    }
                    } else if (rainbowPressed && mouse.buttons == 1) {
                      for(var ix = 0; ix < tool.brDiameter;  ix++) {
                        for(var iy = 0; iy < tool.brDiameter; iy++) {
                          BOTS[abc].world.setPixel(x + ix - R, y + iy - R, [(Math.random()*255)|0, (Math.random()*255)|0, (Math.random()*255)|0]);
                        }
                      }
                    } else if (mouse.buttons == 2) {
                      for(var ix = 0; ix < tool.brDiameter;  ix++) {
                        for(var iy = 0; iy < tool.brDiameter; iy++) {
                          BOTS[abc].world.setPixel(x + ix - R, y + iy - R, [255,255,255]);
                        }
                      }
                    }
            }});
            lastX = OWOP.mouse.tileX;
            lastY = OWOP.mouse.tileY;
            break;
        case 4:
            if (event.ctrlKey) {
                usedButtons |= 4;
                var color = OWOP.world.getPixel(mouse.tileX, mouse.tileY);
                if (color) {
                    OWOP.player.selectedColor = color;
                }
            }
            break;
            }
            return usedButtons;
        });
    tool.setEvent('mouseup', function (mouse) {
    lastX = null;
    lastY = null;
    });
    tool.setFxRenderer(function (fx, ctx, time) { //BAN THONCC
        var x = fx.extra.player.x;
        var y = fx.extra.player.y;
        var diameter = tool.brDiameter
        var fxx = (Math.floor(x / 16) - Math.floor(diameter / 2) - OWOP.camera.x) * OWOP.camera.zoom;
        var fxy = (Math.floor(y / 16) - Math.floor(diameter / 2) - OWOP.camera.y) * OWOP.camera.zoom;
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = fx.extra.player.htmlRgb;
        ctx.strokeRect(fxx, fxy, OWOP.camera.zoom * diameter, OWOP.camera.zoom * diameter);
        return 1; /* Rendering finished (won't change on next frame) */
    });
}));

var brDiamWinn = OWOP.windowSys.addWindow(new OWOP.windowSys.class.window('Bot Brush diameter', {}, function(win) {
      win.container.title = 'Bot Brush Diameter';
      win.container.style.height = '16px';
      win.container.style.overflow = 'hidden';

      var brDiamElmm = OWOP.util.mkHTML('span', { innerHTML: OWOP.tools.allTools.botbrush.brDiameter });
      win.addObj(brDiamElmm);
      var Rbarr = OWOP.util.mkHTML('input', {
          type: 'range', style: '-moz-appearance:none;-webkit-appearance:none;appearance:none;height:6px;outline:none;float:right;',
          min: mindr, max: maxdr,
          value: OWOP.tools.allTools.botbrush.brDiameter,
          oninput: function() {
              OWOP.tools.allTools.botbrush.brDiameter = this.value;
              brDiamElmm.innerHTML = this.value;
          }, ondblclick:function() {
              this.value = 1;
              this.onchange();
          }
      });
      win.addObj(Rbarr);
    }).move(800, 32));

            OWOP.tools.addToolObject(new OWOP.tools.class('BotArea', OWOP.cursors.select, OWOP.fx.player.NONE, false, function (tool) {
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

            OWOP.tools.addToolObject(new OWOP.tools.class('BotText', OWOP.cursors.write, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, function (tool) {
                tool.setEvent('mousedown', function (mouse, event) {
                    if (mouse.buttons == 1 || mouse.buttons == 2) {
                        var text = prompt('Text to draw:');
                    writeText(text, mouse.tileX, mouse.tileY);
                  }
                });
            }));
            

            OWOP.tools.addToolObject(new OWOP.tools.class('BotPaster', OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, function (tool) {
                tool.setEvent('mousedown', function (mouse, event) {
                    let sX = !Pixelization ? OWOP.mouse.tileX : Math.floor(OWOP.mouse.tileX/16)*16,
                        sY = !Pixelization ? OWOP.mouse.tileY : Math.floor(OWOP.mouse.tileY/16)*16;
                    if (mouse.buttons != 0) {
                        let input = document.createElement('input');
                        input.type = "file";
                        input.accept = 'image/*';

                        input.click();
                        input.onchange = () => {
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

            OWOP.tools.addToolObject(new OWOP.tools.class("BotProtection", OWOP.cursors.shield, OWOP.fx.player.RECT_SELECT_ALIGNED(16), OWOP.RANK.USER, tool => {
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
                                    }, 650);
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
            OWOP.tools.addToolObject(new OWOP.tools.class("BotPasteAsset", OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, tool => {
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
            OWOP.tools.addToolObject(new OWOP.tools.class("BotFill", OWOP.cursors.fill, OWOP.fx.player.NONE, OWOP.RANK.USER, e => {
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
        });
    };
    MiniBOT();
    setTimeout(() => {
        rgbBack();
    },2001);
};

function destroyminibot() {
    OWOP.windowSys.windows[" "].close();
};

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

function rgbBack() {
    document.getElementById("tool-bottext").style.backgroundColor = 'rgb('+Math.floor(140)+' '+Math.floor(0)+' '+Math.floor(255)+')';
    document.getElementById("tool-botpaster").style.backgroundColor = 'rgb('+Math.floor(140)+' '+Math.floor(0)+' '+Math.floor(255)+')';
    document.getElementById("tool-botbrush").style.backgroundColor = 'rgb('+Math.floor(140)+' '+Math.floor(0)+' '+Math.floor(255)+')';
    document.getElementById("tool-botarea").style.backgroundColor = 'rgb('+Math.floor(140)+' '+Math.floor(0)+' '+Math.floor(255)+')';
    document.getElementById("tool-botprotection").style.backgroundColor = 'rgb('+Math.floor(140)+' '+Math.floor(0)+' '+Math.floor(255)+')';
    document.getElementById("tool-botpasteasset").style.backgroundColor = 'rgb('+Math.floor(140)+' '+Math.floor(0)+' '+Math.floor(255)+')';
    document.getElementById("tool-botchunker").style.backgroundColor = 'rgb('+Math.floor(140)+' '+Math.floor(0)+' '+Math.floor(255)+')';
    document.getElementById("tool-botfill").style.backgroundColor = 'rgb('+Math.floor(140)+' '+Math.floor(0)+' '+Math.floor(255)+')';
};

function moddedMBcontroller(){
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("MMB", {
        closeable: false
    }, win => {
        let enabledmmb = false;
        const enablemmb = document.createElement("button");
        enablemmb.onclick = () => {
            if(enabledmmb){
                enabledmmb = false;
                enablemmb.innerText = "+";
                hideMMB()
            } else {
                enabledmmb = true;
                enablemmb.innerText = "-";
                showMMB()
            };
        };
        win.addObj(enablemmb);
        enablemmb.innerText = "+";
    }));
    hideMMB()
    OWOP.windowSys.windows["MMB"].move(40,350);
};

function showMMB(){
    OWOP.windowSys.windows[" "].move(350,50);
};

function hideMMB(){
    OWOP.windowSys.windows[" "].move(9999,9999);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function copy(text) {
    var input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
};

function openInNewTab(url) {
    window.open(url, '_blank').focus();
};

function loadscript(t,e) {
    document.getElementsByTagName("head")[0].appendChild(u("script",{type:"text/javascript",src:t,onload:e}))
};

function append(src, onload) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = onload;
    document.body.appendChild(s);
};

function infinityX(t) {
    let x = (Math.cos(t*2)-1)/2;
    if (Math.abs(t*2) % (4*Math.PI) > 2*Math.PI) return -x;
    else return x;
};

function infinityY(t) {
    return Math.sin(t*2) / 2;
};

function squareX(angle) {
    let x = Math.sin(angle), y = Math.cos(angle);
    return x / Math.max(Math.abs(x), Math.abs(y));
};

function squareY(angle) {
    let x = Math.sin(angle), y = Math.cos(angle);
    return y / Math.max(Math.abs(x), Math.abs(y));
};

function pixColor(img, X, Y, RGB) {
    var abab = img.getImageData(X, Y, 1, 1).data
    return [abab[0], abab[1], abab[2]]
};

function getRandomInt2(max) {
    return Math.floor(Math.random() * max);
};

function dist(x, y) {
    return Math.sqrt(x * x + y * y);
};

setTimeout(install, 2001);
