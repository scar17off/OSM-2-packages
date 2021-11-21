// ==UserScript==
// @name         ScaledClient
// @namespace    http://tampermonkey.net/
// @version      1.0a
// @license      MIT
// @description  OWOP ScaledClient.
// @author       scar17off
// @match        *://augustberchelmann.com/owop/*
// @match        *://ourworldofpixels.com/*
// @match        *://yourworldofpixels.glitch.me/*
// @icon         https://www.google.com/s2/favicons?domain=ourworldofpixels.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function install() {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        let cont;
        let selectedAsset; // thx gorenz
        async function writeChar(matrix, x, y) {
            for (var xx = 0; xx < matrix.length; xx++)
                for (var yy = 0; yy < 8; yy += slen)
                    for (var bb = 0; bb < slen; bb++)
                        if ((matrix[xx] >> (7 - yy - bb)) & 1 && yy + bb < 8) {
                            const abc = getFree();
                            BOTS[abc].world.setPixel(x + xx, y + yy + bb, OWOP.player.selectedColor, localStorage.buxxed_botsneaky);
                        };
        };
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
                writeChar(matrix, x, y);
                x += matrix.length + 1;
            }
        }

        function isProtected(x, y) {
            let chunks = OWOP.require("main").misc.world.protectedChunks;
            x = Math.floor(x / 16);
            y = Math.floor(y / 16);
            return chunks[`${x},${y}`] ? true : false;
        };
        const refreshAssets = () => {
            let assets = localStorage.buxxed_Assets;
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
                        localStorage.buxxed_Assets = JSON.stringify(assets);
                        refreshAssets();
                    }
                    assetsDiv.append(image);
                };
                image.src = assets[i];
            }
        };
        OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(" ", {
            closeable: true
        }, function(win) {
            cont = win.container;
            cont.style.width = "315px";
            cont.style.height = "200px";
            var div = document.createElement("div");
            win.addObj(div);

            div.parentElement.insertAdjacentHTML(`afterbegin`, `
<div id="scaled-main-menu">
<label>Main</label>
</div>
<div id="scaled-palette-menu" class="hide">
<label>Palette</label>
</div>
`);

            cont.parentElement.insertAdjacentHTML(`afterbegin`, `
<div id="scaled-main-cont">
    <button id="scaled-main-item">Main</button>
    <button id="scaled-palette-item" class="hidden">Palette</button>
    <button id="scaled-assets-item">Assets</button>
    <button id="scaled-misc-item">Misc</button>
    <button id="scaled-botting-item">Botting</button>
    <button id="scaled-config-item">Config</button>
    <button id="scaled-discord-item">Discord</button>
</div>
<style>
.hide {
    display: none;
}
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
    background-color: rgb(77, 73, 73, 0.5) !important;
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
    color: rgb(140, 0, 255, 0.5);
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
}
::-webkit-scrollbar-button {
    height: 16px;
    width: 16px;
    border: 6px solid;
    border-image: url(/img/button.png) 6 repeat;
    background-image: url(/img/gui.png);
    background-color: rgb(53 53 53);
    border-width: 6px;
    background-origin: border-box;
    background-repeat: no-repeat;
}
::-webkit-scrollbar-thumb {
    border: 6px solid;
    border-image: url(/img/button.png) 6 repeat;
    background-color: #292929;
    border-width: 6px;
}
#help {
    border-width: 1px;
    border-style: groove;
    border-image: initial;
    border-color: rgba(115, 115, 115, 1);
    border: solid 1px;
    background-color: #292929;
    color: #919191;
}
</style>
`);
        }).move(350, 550));
    };
    setTimeout(() => {
        function openInNewTab(url) {
            window.open(url, '_blank').focus();
        };
        function loadscript(t, e) {
            document.getElementsByTagName("head")[0].appendChild(u("script", {
                type: "text/javascript",
                src: t,
                onload: e
            }))
        };
        function append(src, onload) {
            var s = document.createElement('script');
            s.src = src;
            s.onload = onload;
            document.body.appendChild(s);
        };

        install();
        // onclick shit
        document.getElementById("scaled-discord-item").onclick = () => {
            openInNewTab("https://discord.gg/59jvbFpCza");
        };
    }, 2600);
})();
