// ==UserScript==
// @name         Crimson Client
// @version      1.0
// @description  Crimson Client
// @author       dimden
// @match        https://ourworldofpixels.com/*
// @icon         https://www.google.com/s2/favicons?domain=ourworldofpixels.com
// @grant        none
// ==/UserScript==

var crimsonclient = (() => {
    class Crimson {
        constructor() {
            const Crimson = this;

            this.Chat = OPM.require("core-utils").chat;
            this.Players = OPM.require("core-utils").players;

            this.functions = {};
            this.utils = {
              tp: OWOP.require("canvas_renderer").centerCameraTo,
              log: msg => OWOP.chat.local(`<font color="red">[CRIMSON]:</font> ${msg}`),
              copyToClipboard: textToCopy => {
                const input = document.createElement('input');
                document.body.appendChild(input);
                input.value = textToCopy;

                input.focus();
                input.select();

                const isSuccessful = document.execCommand('copy');

                if (!isSuccessful) {
                  console.error('Failed to copy text.');
                }
              },
              size: obj => {
                let l = 0;
                for(let i in obj) l++;
                return l;
              }
            }

            const Fn = this.functions;
            const Chat = document.getElementById("chat-messages");

            this.version = "2.1.0";
            this.toggled = false;
            this.windows = {
                list: {}
            };
            this.style = `
            .smolText {
              font-size: 11px;
              color: gray;
              padding-left: 6px;
            }
            .context-menu { z-index: 1000 }
            .crimson-pin-disabled {
                width: 16px;
                height: 16px;
                position: absolute;
                right: -10px;
                top: -10px;
            }
            #crimsonMain {
                font-size: 16px;
            }
            #crimsonMainButton {
                position: absolute;
                top: 25px;
                background-color: rgba(247, 56, 63, .5);
            }
            #crimsonMainContainer {
                margin-top: 10px;
            }
            .rainbowText {
                -webkit-animation: rainbowText 3s infinite;
                -ms-animation: rainbowText 3s infinite;
                animation: rainbowText 3s infinite;
            }
            .crimsonBox {
                border: 11px solid rgba(236, 29, 36, .5);
                background-color: rgba(236, 29, 36, .5);
                z-index: 999;
                border-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAADiSURBVDhPYwCC/zhw8v//IIohGUkMBTOCiJe9EzcBaTBgnjD5nMjjOw1QLhy8kVVp+FuQawTlMogX5/uxQNlgTVAmGCAbCFIIomFqYIbANSODDB7+TciGAflQFioAOxvkJAiXgaHm/WujFkFRFFeAALo4yGtgzRAuxEZsGmEAZMCMLx/BXgABkGZQaM5Btp0QgAZoChMwOuZChEgDIH1MjIyMIJtJBiB9FPuZ7NBmAjFAEmARIAApQOaDALpGmDzWRILsNBAA8bG5Bq4ZZhpMEboBIIDuIhBAySlImECuYvgPAKS1kPrZXp9SAAAAAElFTkSuQmCC') 7 repeat;
                border-image-outset: 7px;
                border-width: 7px;
                display: block;
                text-shadow: 0 1px 1px rgba(0, 0, 0, .6);
                color: #fff;
                position: absolute;
            }
            .crimsonContainer {
                display: block;
                color: #fff;
                text-shadow: 0 1px 1px rgba(0, 0, 0, .6);
                background-color: rgba(140, 26, 30, .4);
                border: 0;
                padding: 5px;
                box-shadow: inset 0 0 2px #000, 0 1px 1px rgba(0, 0, 0, .3);
                margin: 0 -5px;
                margin-top: 10px;
            }
            .crimsonInput {
                display: block;
                color: #fff;
                text-shadow: 0 1px 1px rgba(0, 0, 0, .6);
                background-color: rgba(140, 26, 30, .8);
                border: 0;
                box-shadow: inset 0 0 2px #000, 0 1px 1px rgba(0, 0, 0, .3);
                margin: 0 -5px;
                width: inherit;
                margin-left: 0
            }
            .crimsonButton {
                display: block;
                color: #fff;
                text-shadow: 0 1px 1px rgba(0, 0, 0, .6);
                padding: 5px;
                border: 1px solid rgba(0, 0, 0, .5);
                box-shadow: 0 1px rgba(0, 0, 0, .1), inset 0 -1px rgba(0, 0, 0, .2);
                outline: 1px solid rgba(255, 255, 255, 0);
                outline-offset: -2px;
                background-color: rgba(247, 56, 63, .3);
                transition: box-shadow .15s ease-in-out, background-color .15s ease-in-out, outline .15s ease-in-out;
                font: 16px pixel-op, sans-serif;
                float: left;
            }
            .crimsonButton, .crimsonButton:hover, .crimsonButton:active {
                border-image: none;
                transition: box-shadow .15s ease-in-out, background-color .15s ease-in-out, outline .15s ease-in-out;
            }
            .crimsonButton:hover:active {
                box-shadow: 0 0 1px rgba(0, 0, 0, .5), inset 0 1px rgba(0, 0, 0, .2);
                background-color: rgba(236, 29, 36, .5);
            }
            .crimsonBox[hidden] {
                display: none;
            }
            #crimsonMain a {
                color: #9dd6e7;
            }
            .crimsonButton:focus {
                outline: 1px solid rgba(255, 255, 255, .1);
            }
            @keyframes rainbowText {
              0%{color: orange;}
              10%{color: purple;}
              20%{color: red;}
              40%{color: yellow;}
              60%{color: green;}
              100%{color: orange;}
            }
            @keyframes modOrAdmin {
              0%{color: #86ff41;}
              50%{color: #ff4f4f;}
              100%{color: #86ff41;}
            }
            .mod-or-admin {
                -webkit-animation: modOrAdmin 3s infinite;
                -ms-animation: modOrAdmin 3s infinite;
                animation: modOrAdmin 3s infinite;
            }
            .crimsonTable {
              overflow-y: scroll;
              max-height: 300px;
              position: absolute;
            }
            .crimsonTable > tr:first-child {
              text-align: left;
              background-color: rgba(0, 0, 0, 0.5) !important;
            }
            .crimsonTable > tr:nth-child(odd) {
              text-align: left;
              background-color: rgba(0, 0, 0, 0.1);
            }
            .crimsonTable > tr:nth-child(even) {
              text-align: left;
              background-color: rgba(0, 0, 0, 0.3);
            }
            .crimsonTable > tr > td {
              padding-right: 5px;
              padding-left: 5px;
            }
            `;
            this.styleElement = document.createElement("style");
            this.styleElement.innerText = this.style;
            let el = null;
            document.onmousemove = e => el = document.elementFromPoint(e.clientX, e.clientY);
            this.windows.isBox = () => {
              let a = false;
              if(el.children[1]) a = el.children[1].className === "wincontainer";
              return el.className === "crimsonBox" || el.id === "animations" || el.className === "wincontainer" || a;
            };
            document.head.appendChild(this.styleElement);

            this.windows.class = class CrimsonWindow {
                constructor(name, x = 0, y = 0, options, func = () => {}) {
                    options.moveable = options.moveable === undefined ? true : options.moveable;
                    this.options = options;
                    this.name = name;
                    this.x = x;
                    this.y = y;
                    this.func = func;
                    this.pinned = false;
                    this.clicked = false;

                    this.element = document.createElement("div");
                    this.container = document.createElement("div");
                    this.container.className = "crimsonContainer";
                    if(!options.disablePin) {
                      this.pin = document.createElement("img");
                      this.pin.src = "https://dimden.dev/crimson/pin-icon.png";
                      this.pin.className = "crimson-pin-disabled";
                      this.pin.onclick = () => { this.setPin(!this.pinned) };
                      this.element.appendChild(this.pin);
                    }
                    this.element.className = "crimsonBox";
                    this.element.insertAdjacentHTML("beforeend", name);
                    this.element.appendChild(document.createElement("br"));
                    this.element.appendChild(this.container);
                    this.element.style.transform = `translate(${x}px, ${y}px)`;
                    document.body.appendChild(this.element);

                    if(options.moveable) {
                      this.element.addEventListener("mousedown", () => this.clicked = true);
                      document.addEventListener("mouseup", () => this.clicked = false);
                      document.addEventListener("mousemove", e => {
                        if(this.clicked && CrimsonClient.windows.isBox()) {
                          this.x = e.x;
                          this.y = e.y;
                          this.element.style.transform = `translate(${e.x}px, ${e.y}px)`;
                        };
                      });
                    }

                    Crimson.windows.list[name] = this;

                    func(this);
                }
                setPin(bool) {
                  if(typeof bool !== "boolean") return false;
                  if(bool) {
                    this.pinned = true;
                    this.pin.src = "https://dimden.dev/crimson/pin-icon-green.png";
                  } else {
                    this.pinned = false;
                    this.pin.src = "https://dimden.dev/crimson/pin-icon.png";
                  }
                }
                addObj(element) { this.container.appendChild(element) }
                hide()          { this.element.hidden = true          }
                show() {
                  if(this.options.if) { if(this.options.if()) this.element.hidden = false }
                  else this.element.hidden = false;
                }
                close() { this.element.remove(); delete Crimson.windows.list[this.name] }
            }

            new this.windows.class("CRIMSON CLIENT", 200, 0, { disablePin: true, moveable: false }, win => {
              win.element.className = "crimsonButton";
              win.element.id = "crimsonMainButton";
              win.container.className = "";
              win.element.onclick = () => { this.toggle(!this.toggled) };
              win.pinned = true;
            });
            new this.windows.class(`😳 <a href="https://dimden.dev/crimson">CrimsonClient</a> ${this.version} by <a href="https://discord.gg/k4u7ddk">dimden</a> & style by Anonygold`, 400, 1, { disablePin: true, moveable: false}, win => {
                win.element.id = "crimsonMain";
                win.container.id = "crimsonMainContainer";
                win.element.style.width = "50%";
                win.container.style.height = "150px";
                win.element.hidden = true;
            });
            this.main = document.getElementById("crimsonMain");
            this.mainContainer = document.getElementById("crimsonMainContainer");

            this.init();

            OWOP.require("context").createContextMenu2 = OWOP.require("context").createContextMenu;
            OWOP.require("context").createContextMenu = () => {};

            let emojis = Object.fromEntries(`<:yes:581595783174946839>
<:yes:581595783174946839>
<:yay:568684494056587284>
<:wat:419611587410919424>
<:Waaaaaaaaaaaaaaaaaah:466915174113083392>
<:void:438630729941778432>
<:Troomp:524570164432338946>
<:tonq:492794496816381952>
<:thixel:611075759624290314>
<:thinq:438630553332350978>
<:tehe:568684494081622026>
<:teef:571690907129085972>
<:smug:440388417809809419>
<:lol:568684340687405056>
<:banhammer:420666130802147330>
<:owocry:557918878429216778>
<:Angerybob:430496603237777412>
<:bruh:568684240921690113>
<:__:405148209313480725>
<:AAA:569147376724606981>
<:lmaoof:557918398387060748>
<:sad:568684494048198657>
<:OHHELLNO:568684340373094413>
<:PixelThinkaaa:398521326337261568>
<:huh:568684340675084288>`.split("\n").map(i => [/\:([A-z]*)\:/g.exec(i)[0], i]));

            Fn.BetterChat.extra.following = false;
            Fn.BetterChat.extra.lastCoords = { x: 0, y: 0 };
            Fn.BetterChat.extra.folInt = undefined;
            Fn.BetterChat.extra.lastMessage = ["", ""];
            Date.prototype.timeNow = function() {
              return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes();
            }
            // Chat
            this.Chat.on("message", msg => {
              // CloseDM
              if(Fn.CloseDM.enabled && msg.type === "dm") Chat.lastChild.remove();
              // Ignore
              if(Fn.Ignore.enabled && (msg.type === "user" || msg.type === "dm")) {
                if(Fn.Ignore.extra.filter.indexOf(+msg.id) !== -1) Chat.lastChild.remove();
                if(msg.from) if(Fn.Ignore.extra.filter.indexOf(+msg.from) !== -1) Chat.lastChild.remove();
                if(msg.nick) if(Fn.Ignore.extra.filter.indexOf(msg.nick) !== -1) Chat.lastChild.remove();
              };
              // Players
              if(msg.type === "moderator" || msg.type === "admin") {
                let id = +msg.nick;
                if(!isNaN(id) && this.Players.list[id]) {
                  this.Players.list[id].rank = msg.type === "moderator" ? 2 : 3;
                }
              };
              // BetterChat
              if(Fn.BetterChat.enabled && msg.type === "user" && +msg.id !== OWOP.player.id && Fn.BetterChat.extra.lastMessage[0] !== msg.message &&  Fn.BetterChat.extra.lastMessage[1] !== msg.id) {
                const fn = Fn.BetterChat;
                const el = document.getElementById('chat-messages').lastChild;
                const player = this.Players.list[+msg.id];
                fn.extra.lastMessage = msg.message;

                document.addEventListener("keydown", e => {
                  if(e.key.toLowerCase() === "l") {
                    if(!fn.extra.following) return;
                    fn.extra.following = false;
                    clearInterval(fn.extra.folInt);
                    this.utils.tp(fn.extra.lastCoords.x, fn.extra.lastCoords.y);
                  }
                });
                let Menu = [
                  ["Teleport", () => { this.utils.tp((player.x >> 4) | 0, (player.y >> 4) | 0) }],
                  ["Tell", () => { document.getElementById('chat-input').value = `/tell ${player.id} `; document.getElementById('chat-input').focus(); }],
                  ["Follow", () => {
                    if(fn.extra.following) return;
                    this.toggle(false);
                    fn.extra.following = true;
                    this.utils.log("Enabled follow-mode. Press L to stop following.");
                    fn.extra.lastCoords = { x: OWOP.mouse.tileX, y: OWOP.mouse.tileY };
                    fn.extra.folInt = setInterval(() => { this.utils.tp((player.x >> 4) | 0, (player.y >> 4) | 0) });
                  }],
                  ["Copy ID", () => { this.utils.copyToClipboard(player.id) }],
                  ["Mute", () => { this.functions["Ignore"].extra.filter.push(+player.id);  this.functions["Ignore"].extra.input.value = this.functions["Ignore"].extra.filter.join(','); }]
                ];
                if(OWOP.player.rank >= 2) {
                  Menu.push(["(MOD)Whois", () => { OWOP.chat.send(`/whois ${player.id}`) }]);
                  Menu.push(["(MOD)Mute", () => { OWOP.chat.send(`/mute ${player.id} 1`) }]);
                  Menu.push(["(MOD)Unmute", () => { OWOP.chat.send(`/mute ${player.id} 0`) }]);
                  Menu.push(["(MOD)Setrank 0", () => { OWOP.chat.send(`/setrank ${player.id} 0`) }]);
                  Menu.push(["1", () => { OWOP.chat.send(`/setrank ${player.id} 1`) }]);
                };
                if(OWOP.player.rank === 3) {
                  Menu.push(["2", () => { OWOP.chat.send(`/setrank ${player.id} 2`) }]);
                  Menu.push(["3", () => { OWOP.chat.send(`/setrank ${player.id} 3`) }]);
                };
                el.onclick = e => { OWOP.require("context").createContextMenu2(e.clientX, e.clientY, Menu) };
              };
              if(Fn.BetterChat.enabled) {
                const el = document.getElementById('chat-messages').lastChild;
                const time = document.createElement("span");
                time.className = "smolText";
                time.innerText = new Date(Date.now()).timeNow();
                el.appendChild(time);
              };
              // Filter
              if(Fn.Filter.enabled) {
                if(typeof Fn.Filter.extra.filter === "string" && Fn.Filter.extra.filter !== "") if(msg.message.includes(Fn.Filter.extra.filter)) Chat.lastChild.remove();
                if(typeof Fn.Filter.extra.filter === "object" && Fn.Filter.extra.filter.source !== "(?:)") if(Fn.Filter.extra.filter.test(msg.message)) Chat.lastChild.remove();
              }
            });
            const oldSendModifier = OWOP.chat.sendModifier;
            OWOP.chat.sendModifier = msg => {
              if(Fn.EmojiFix.enabled)
                for(let i in emojis) msg = msg.replace(new RegExp(`${i}`, "g"), emojis[i]);
              return oldSendModifier(msg);
            }

            // CTRL + Q
            document.addEventListener("keydown", e => {
              if (e.ctrlKey && e.keyCode == 81) this.toggle(!this.toggled);
            });
            this.utils.log('Crimson was loaded. <a href="https://discord.gg/k4u7ddk">Discord Server</a>.')
        }
        addFunction(name, description, onToggle, init) {
          const button = document.createElement("button");
          button.className = "crimsonButton";
          button.innerText = name;
          button.title = description;
          button.style.width = "168px";

          this.functions[name] = {
            name: name,
            enabled: 0,
            onToggle: onToggle,
            button: button,
            extra: {},
          };

          const Toggle = () => {
            const enable = !this.functions[name].enabled;
            this.functions[name].enabled = enable;
            if(enable) {
              button.style.backgroundColor = "rgba(231,24,24,.9)";
              if(name !== "ClearChat" || name !== "Reconnect") {
                const shit = {};
                for(let i in this.functions) shit[i] = this.functions[i].enabled;
                localStorage.crimsonfuncs = JSON.stringify(shit);
              }
            }
            else {
              button.style.backgroundColor = "";
              if(name !== "ClearChat" || name !== "Reconnect") {
                const shit = {};
                for(let i in this.functions) shit[i] = this.functions[i].enabled;
                localStorage.crimsonfuncs = JSON.stringify(shit);
              }
            }
            if(onToggle) onToggle(this.functions[name], enable);
          }

          this.functions[name].toggle = Toggle;
          button.onclick = () => { Toggle() };
          this.mainContainer.appendChild(button);
          if(init) init(this.functions[name]);
        }
        addFunctions(object) {
          for(let i in object) this.addFunction(i, object[i].description, object[i].toggle, object[i].init);
        }
        toggle(bool) {
            if(typeof bool !== "boolean") return false;
            this.toggled = bool;
            if(bool) {
              this.main.hidden = false;
              for(let i in this.windows.list) this.windows.list[i].show();
            } else {
              this.main.hidden = true;
              for(let i in this.windows.list) if(!this.windows.list[i].pinned) this.windows.list[i].hide();
            }
        }
        init() {
          this.addFunctions({
            RainbowColours: {
              description: "Rainbow!",
              toggle: (fn, bool) => {
                if(bool) {
                  fn.extra.int = setInterval(() => {
                    OWOP.player.selectedColor = fn.extra.colors[fn.extra.i++];
                    if(fn.extra.i >= fn.extra.colors.length) fn.extra.i = 0;
                  }, 150);
                } else {
                  clearInterval(fn.extra.int);
                  fn.extra.int = null;
                  fn.extra.i = 0;
                }
              },
              init: fn => {
                fn.extra.int = null;
                fn.extra.colors = [
                  [255, 0, 0]  , [255, 128, 0]  ,
                  [255, 255, 0], [128, 255, 0]  ,
                  [0, 255, 0]  , [0, 255, 128]  ,
                  [255,255,255], [0, 255, 255]  ,
                  [0, 128, 255], [0, 0, 255]    ,
                  [127, 0, 255], [255, 0, 255]  ,
                  [255, 0, 127], [128, 128, 128],
                  [255, 255, 255]
                ];
                fn.extra.i = 0;
                fn.button.className = "rainbowText crimsonButton";
              }
            },
            CloseDM: { description: "Ignore all /tell messages." },
            Ignore: {
              description: "Filter chat by nick/id. Split by ','!",
              toggle: (fn, bool) => {
                if(bool) fn.extra.win.show();
                else fn.extra.win.hide();
              },
              init: fn => {
                fn.extra.filter = [];
                fn.extra.win = new this.windows.class("Ignore", 1125, 32, { if: () => fn.enabled }, win => {
                  const input = document.createElement("input");
                  fn.extra.input = input;
                  input.className = "crimsonInput";
                  input.onchange = () => fn.extra.filter = input.value.split(",").map(i => !isNaN(+i) ? +i : i);
                  input.placeholder = "Filter"

                  win.addObj(input);
                  win.container.style.width = "150px";
                  win.hide();
                })
              }
            },
            CameraSpeed: {
              description: "Change camera speed",
              toggle: (fn, bool) => {
                if(bool) fn.extra.win.show();
                else {
                  OWOP.options.movementSpeed = 1;
                  fn.extra.win.hide();
                }
              },
              init: fn => {
                fn.extra.win = new this.windows.class("CameraSpeed", 1125, 130, { if: () => fn.enabled }, win => {
                  let input = document.createElement("input");
                  input.className = "crimsonInput";
                  input.onchange = () => OWOP.options.movementSpeed = +input.value;
                  input.min = 1;
                  input.max = 100;
                  input.type = "range";

                  win.addObj(input);
                  win.container.style.width = "150px";
                  win.hide();
                })
              }
            },
            Teleporter: {
              description: "Teleport to X, Y or by player ID.",
              toggle: (fn, bool) => {
                if(bool) fn.extra.win.show();
                else fn.extra.win.hide();
              },
              init: fn => {
                fn.extra.win = new this.windows.class("Teleport", 1125, 222, { if: () => fn.enabled }, win => {
                  let input = document.createElement("input");
                  input.className = "crimsonInput";
                  input.placeholder = "Coordinates (X Y / ID)";
                  input.onkeydown = e => {
                    if(e.key === "Enter") {
                      const [ x, y ] = [ parseInt(input.value.split(" ")[0]), parseInt(input.value.split(" ")[1]) ];
                      if(input.value.split(" ").length === 0) return this.utils.log("Error: input should have 1 or 2 arguments.");
                      if(isNaN(x)) return this.utils.log("Error: bad arguments.");
                      if(input.value.split(" ").length >= 2) this.utils.tp(x, y);
                      else {
                        let player = this.Players.list[+input.value.split(" ")[0]];
                        if(!player) return this.utils.log("Error: player is not found.");
                        this.utils.tp((player.x >> 4) | 0, (player.y >> 4) | 0);
                      }
                    }
                  }

                  win.addObj(input);
                  win.container.style.width = "150px";
                  win.hide();
                })
              }
            },
            Tools: {
              description: "Add cool tools: Brush, Checker, Text, Protection",
              toggle: (fn, bool) => {
                if(bool) {
                  fn.extra.protection = {
                      intervals: {},
                      pixels: {}
                  };

                  OWOP.tool.addToolObject(new OWOP.tool.class("CrimsonText", OWOP.cursors.write, OWOP.fx.player.NONE, OWOP.RANK.USER, tool => {
                    let xPos = null;
                    let yPos = null;
                    let fonts = {};
                    let font = null;



                    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
                    chars += "¡¢£€¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
                    chars += "ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž";

                    tool.setFxRenderer((fx, ctx, time) => {
                      let x = fx.extra.player.x;
                      let y = fx.extra.player.y;
                      if (xPos !== null && yPos !== null) {
                        x = xPos * 16;
                        y = yPos * 16;
                      }
                      let fxx = (Math.floor(x / 16) - OWOP.camera.x) * OWOP.camera.zoom;
                      let fxy = (Math.floor(y / 16) - OWOP.camera.y) * OWOP.camera.zoom;
                      ctx.globalAlpha = 0.8;
                      ctx.strokeStyle = fx.extra.player.htmlRgb;
                      ctx.strokeRect(fxx, fxy, OWOP.camera.zoom, OWOP.camera.zoom * 12);
                      return 0;
                    });

                    tool.setEvent("select", () => {
                      let id = parseInt("955");
                      if (id in fonts) {
                        font = id;
                        return;
                      }

                      let xhttp = new XMLHttpRequest();
                      xhttp.addEventListener("load", () => {
                        let source = xhttp.responseXML.body.children[2].innerHTML;
                        let data = JSON.parse(source.match(/loadData\('(.+)'\)/)[1]);
                        let meta = source.match(/drawSample\('',([0-9]+),(-?[0-9]+)\)/);

                        data.letterspace = parseInt(64);
                        data.monospacewidth = parseInt(-1);

                        fonts[id] = data;
                        font = id;
                      });
                      xhttp.open("GET", "https://cors-anywhere.herokuapp.com/http://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=" + id);
                      xhttp.responseType = "document";
                      xhttp.send();
                    });
                    tool.setEvent("deselect", () => {
                      font = null;
                    });

                    tool.setEvent("mousedown mousemove", (mouse, event) => {
                      if (mouse.buttons === 1) {
                        xPos = mouse.tileX;
                        yPos = mouse.tileY;
                      }
                    });
                    tool.setEvent("keydown", () => { return true; });
                    tool.setEvent("keyup", () => { return true; });

                    window.addEventListener("keypress", event => {
                      if (font === null || xPos === null || yPos === null || ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

                      let f = fonts[font];
                      let letterSpacing = (f.letterspace / 64 | 0) - 1;
                      let isMono = f.monospacewidth !== -1;

                      if (event.which == 32) {
                        xPos += isMono ? f.monospacewidth : 4 + letterSpacing;
                        return;
                      }

                      let char = f[event.which];
                      if (!char) return;

                      let width = 0;
                      for (let y = 0; y < 16; y++)
                        for (let x = 0; x < 16; x++)
                          if (char[y] & (1 << x) && x > width) width = x;

                      let color = OWOP.player.selectedColor;
                      for (let y = 0; y < 16; y++)
                        for (let x = 0; x < 16; x++) {
                          if (!(char[y] & (1 << x))) continue;
                          OWOP.world.setPixel(xPos + x - 2, yPos + y, color);
                        }

                      xPos += isMono ? f.monospacewidth : width + letterSpacing;
                    });
                  }));
                  OWOP.tool.addToolObject(new OWOP.tool.class('CrimsonChecker', OWOP.cursors.wand, OWOP.fx.player.NONE, OWOP.RANK.USER, function(tool) {
                    tool.extra.tickAmount = 32;
                    let queue = [];
                    let fillingColor = null;
                    let defaultFx = OWOP.fx.player.RECT_SELECT_ALIGNED(1);
                    tool.setFxRenderer((fx, ctx, time) => {
                      ctx.globalAlpha = 0.8;
                      ctx.strokeStyle = fx.extra.player.htmlRgb;
                      let z = OWOP.camera.zoom;
                      if (!fillingColor || !fx.extra.isLocalPlayer)
                        defaultFx(fx, ctx, time);
                      else {
                        ctx.beginPath();
                        for (let i = 0; i < queue.length; i++)
                          ctx.rect((queue[i][0] - OWOP.camera.x) * z, (queue[i][1] - OWOP.camera.y) * z, z, z);
                        ctx.stroke();
                      }
                    });
                    function tick() {
                      let eq = function eq(a, b) {
                        return a && b && a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
                      };
                      let slientCheck = function slientCheck(x, y) {
                        return eq(OWOP.world.getPixel(x, y), fillingColor);
                      };
                      let check = function check(x, y) {
                        if (slientCheck(x, y)) {
                          queue.unshift([x, y]);
                          return true;
                        }
                        return false;
                      };

                      if (!queue.length || !fillingColor) return;

                      let selClr = OWOP.player.selectedColor;
                      let painted = 0;
                      let tickAmount = tool.extra.tickAmount;
                      for (let painted = 0; painted < tickAmount && queue.length; painted++) {
                        let current = queue.pop();
                        let x = current[0];
                        let y = current[1];
                        let thisClr = OWOP.world.getPixel(x, y);
                        if (eq(thisClr, fillingColor) && !eq(thisClr, selClr)) {

                          if (!OWOP.world.setPixel(x, y, selClr)) {
                            queue.push(current);
                            break;
                          }

                          let top = slientCheck(x, y - 1);
                          let bottom = slientCheck(x, y + 1);
                          let left = slientCheck(x - 1, y);
                          let right = slientCheck(x + 1, y);

                          if (top && left) check(x - 1, y - 1);
                          if (top && right) check(x + 1, y - 1);
                          if (bottom && left) check(x - 1, y + 1);
                          if (bottom && right) check(x + 1, y + 1);
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
                  OWOP.tool.addToolObject(new OWOP.tool.class("CrimsonBrush", OWOP.cursors.brush, OWOP.fx.player.RECT_SELECT_ALIGNED(1), OWOP.RANK.USER, tool => {
                    tool.setEvent("mousemove mousedown", e => {
                      if(e.buttons !== 0) for(let i = -1; i < 2; i++)
                          for(let j = -1; j < 2; j++) OWOP.world.setPixel(OWOP.mouse.tileX+i, OWOP.mouse.tileY+j, e.buttons === 1 ? OWOP.player.selectedColor : [255,255,255])
                    });
                  }));
                  OWOP.tool.addToolObject(new OWOP.tool.class("CrimsonProtection 16x16", OWOP.cursors.shield, OWOP.fx.player.RECT_SELECT_ALIGNED(16), OWOP.RANK.USER, tool => {
                      tool.setFxRenderer((fx, ctx) => {
                          const X = fx.extra.player.x,
                                Y = fx.extra.player.y,
                               cX = (16 * Math.floor(X / 256) - OWOP.camera.x) * OWOP.camera.zoom,
                               cY = (16 * Math.floor(Y / 256) - OWOP.camera.y) * OWOP.camera.zoom,
                               tX = fx.extra.player.tileX,
                               tY = fx.extra.player.tileY,
                            chunk = fn.extra.protection.pixels[`${tX},${tY}`];
                          ctx.globalAlpha = .5;
                          ctx.fillStyle = chunk ? "#00FF00" : "#FF0000";
                          ctx.fillRect(cX, cY, 16 * OWOP.camera.zoom, 16 * OWOP.camera.zoom);
                          return true;
                      });

                      tool.setEvent("mousedown mousemove", fx => {
                          const X = Math.floor(OWOP.mouse.tileX / OWOP.options.serverAddress[0].proto.chunkSize)*16,
                                Y = Math.floor(OWOP.mouse.tileY / OWOP.options.serverAddress[0].proto.chunkSize)*16,
                            chunk = fn.extra.protection.pixels[`${X},${Y}`];
                            switch(fx.buttons) {
                                case 1:
                                  if(chunk) return false;
                                  for(let y = 0; y < 16; y++)
                                      for(let x = 0; x < 16; x++) {
                                          fn.extra.protection.pixels[`${X+x},${Y+y}`] = OWOP.world.getPixel(X+x, Y+y);
                                          fn.extra.protection.intervals[`${X+x},${Y+y}`] = setInterval(() => {OWOP.world.setPixel(X+x, Y+y, fn.extra.protection.pixels[`${X+x},${Y+y}`])}, 2500);
                                      }
                                  return true;
                                  break;
                                case 2:
                                  if(!chunk) return false;
                                  for(let y = 0; y < 16; y++)
                                      for(let x = 0; x < 16; x++) {
                                          clearInterval(fn.extra.protection.intervals[`${X+x},${Y+y}`]);
                                          delete fn.extra.protection.intervals[`${X+x},${Y+y}`];
                                          delete fn.extra.protection.pixels[`${X+x},${Y+y}`];
                                      }
                                  break;
                            }
                      })
                  }));
                  OWOP.tool.addToolObject(new OWOP.tool.class("CrimsonProtection 8x8", OWOP.cursors.shield, OWOP.fx.player.RECT_SELECT_ALIGNED(8), OWOP.RANK.USER, tool => {
                      tool.setFxRenderer((fx, ctx) => {
                          const X = fx.extra.player.x,
                                Y = fx.extra.player.y,
                               cX = (8 * Math.floor(X / 256*2) - OWOP.camera.x) * OWOP.camera.zoom,
                               cY = (8 * Math.floor(Y / 256*2) - OWOP.camera.y) * OWOP.camera.zoom,
                               tX = fx.extra.player.tileX,
                               tY = fx.extra.player.tileY,
                            chunk = fn.extra.protection.pixels[`${tX},${tY}`];
                          ctx.globalAlpha = .5;
                          ctx.fillStyle = chunk ? "#00FF00" : "#FF0000";
                          ctx.fillRect(cX, cY, 8 * OWOP.camera.zoom, 8 * OWOP.camera.zoom);
                          return true;
                      });

                      tool.setEvent("mousedown mousemove", fx => {
                          const X = Math.floor(OWOP.mouse.tileX / 8)*8,
                                Y = Math.floor(OWOP.mouse.tileY / 8)*8,
                            chunk = fn.extra.protection.pixels[`${X},${Y}`];
                            switch(fx.buttons) {
                                case 1:
                                  if(chunk) return false;
                                  for(let y = 0; y < 8; y++)
                                      for(let x = 0; x < 8; x++) {
                                          fn.extra.protection.pixels[`${X+x},${Y+y}`] = OWOP.world.getPixel(X+x, Y+y);
                                          fn.extra.protection.intervals[`${X+x},${Y+y}`] = setInterval(() => {OWOP.world.setPixel(X+x, Y+y, fn.extra.protection.pixels[`${X+x},${Y+y}`])}, 2500);
                                      }
                                  return true;
                                  break;
                                case 2:
                                  if(!chunk) return false;
                                  for(let y = 0; y < 8; y++)
                                      for(let x = 0; x < 8; x++) {
                                          clearInterval(fn.extra.protection.intervals[`${X+x},${Y+y}`]);
                                          delete fn.extra.protection.intervals[`${X+x},${Y+y}`];
                                          delete fn.extra.protection.pixels[`${X+x},${Y+y}`];
                                      }
                                  break;
                            }
                      })
                  }));
                  OWOP.tool.addToolObject(new OWOP.tool.class("CrimsonProtection 4x4", OWOP.cursors.shield, OWOP.fx.player.RECT_SELECT_ALIGNED(4), OWOP.RANK.USER, tool => {
                      tool.setFxRenderer((fx, ctx) => {
                          const X = fx.extra.player.x,
                                Y = fx.extra.player.y,
                               cX = (4 * Math.floor(X / 256*4) - OWOP.camera.x) * OWOP.camera.zoom,
                               cY = (4 * Math.floor(Y / 256*4) - OWOP.camera.y) * OWOP.camera.zoom,
                               tX = fx.extra.player.tileX,
                               tY = fx.extra.player.tileY,
                            chunk = fn.extra.protection.pixels[`${tX},${tY}`];
                          ctx.globalAlpha = .5;
                          ctx.fillStyle = chunk ? "#00FF00" : "#FF0000";
                          ctx.fillRect(cX, cY, 4 * OWOP.camera.zoom, 4 * OWOP.camera.zoom);
                          return true;
                      });

                      tool.setEvent("mousedown mousemove", fx => {
                          const X = Math.floor(OWOP.mouse.tileX / 4)*4,
                                Y = Math.floor(OWOP.mouse.tileY / 4)*4,
                            chunk = fn.extra.protection.pixels[`${X},${Y}`];
                            switch(fx.buttons) {
                                case 1:
                                  if(chunk) return false;
                                  for(let y = 0; y < 4; y++)
                                      for(let x = 0; x < 4; x++) {
                                          fn.extra.protection.pixels[`${X+x},${Y+y}`] = OWOP.world.getPixel(X+x, Y+y);
                                          fn.extra.protection.intervals[`${X+x},${Y+y}`] = setInterval(() => {OWOP.world.setPixel(X+x, Y+y, fn.extra.protection.pixels[`${X+x},${Y+y}`])}, 2500);
                                      }
                                  return true;
                                  break;
                                case 2:
                                  if(!chunk) return false;
                                  for(let y = 0; y < 4; y++)
                                      for(let x = 0; x < 4; x++) {
                                          clearInterval(fn.extra.protection.intervals[`${X+x},${Y+y}`]);
                                          delete fn.extra.protection.intervals[`${X+x},${Y+y}`];
                                          delete fn.extra.protection.pixels[`${X+x},${Y+y}`];
                                      }
                                  break;
                            }
                      })
                  }));

                } else {
                  document.getElementById("tool-crimsontext").remove();
                  delete OWOP.tool.allTools.crimsontext;
                  document.getElementById("tool-crimsonchecker").remove();
                  delete OWOP.tool.allTools.crimsonchecker;
                  document.getElementById("tool-crimsonbrush").remove();
                  delete OWOP.tool.allTools.crimsonbrush;
                  document.getElementById("tool-crimsonunpixel").remove();
                  delete OWOP.tool.allTools.crimsonunpixel;
                  document.getElementById("tool-crimsonprotection 16x16").remove();
                  delete OWOP.tool.allTools["crimsonprotection 16x16"];
                  document.getElementById("tool-crimsonprotection 8x8").remove();
                  delete OWOP.tool.allTools["crimsonprotection 8x8"];
                  document.getElementById("tool-crimsonprotection 4x4").remove();
                  delete OWOP.tool.allTools["crimsonprotection 4x4"];

                  for(let i in fn.extra.intervals) clearInterval(fn.extra.intervals[i]);
                }
              }
            },
            Reconnect: {
              description: "Reconnect. May be useful if you need to change id.",
              toggle: fn => {
                fn.button.style.backgroundColor = "";
                const id = OWOP.player.id;
                OWOP.net.connection.close();
                this.toggle(false);
                OWOP.once(OWOP.events.net.disconnected, () => {
                  document.getElementById("reconnect-btn").click();
                });
                OWOP.once(OWOP.events.net.world.setId, newId => { setTimeout(() => { this.utils.log(`Changed id from ${id} to ${newId}.`) }, 700)});
              }
            },
            ClearChat: {
              description: "Clears chat.",
              toggle: fn => {
                fn.button.style.backgroundColor = "";
                OWOP.chat.clear();
              }
            },
            Players: {
              description: "Player list.",
              toggle: (fn, bool) => {
                if(bool) fn.extra.win.show();
                else fn.extra.win.hide();
              },
              init: fn => {
                fn.extra.win = new this.windows.class("Players", 77, 64, { if: () => fn.enabled }, win => {
                  let table = document.createElement("table");
                  table.style.border = "solid 1px rgba(0,0,0,0.5)";
                  table.id = "crimsonRealPlayerTable";
                  fn.extra.table = document.createElement("tbody");
                  fn.extra.table.className = "crimsonTable";
                  fn.extra.table.insertAdjacentHTML("beforeend", '<tr><th>ID</th><th>X</th><th>Y</th><th>Tool</th><th>RGB</th><th></th></tr>');
                  table.appendChild(fn.extra.table);
                  win.addObj(table);
                  win.hide();
                });
                fn.extra.i = 0;
                OWOP.on(OWOP.events.net.world.playersLeft, up => {
                  for(let i of up) if(document.getElementById(`crimsonPlayer-${i}`)) document.getElementById(`crimsonPlayer-${i}`).remove();
                });
                fn.extra.following = false;
                fn.extra.lastCoords = { x: 0, y: 0 };
                fn.extra.folInt = undefined;

                document.addEventListener("keydown", e => {
                  if(e.key.toLowerCase() === "l") {
                    if(!fn.extra.following) return;
                    fn.extra.following = false;
                    clearInterval(fn.extra.folInt);
                    this.utils.tp(fn.extra.lastCoords.x, fn.extra.lastCoords.y);
                  }
                });

                setInterval(() => {
                  fn.extra.win.container.style.width = (fn.extra.table.clientWidth + 10) + "px";
                  fn.extra.win.container.style.height = (fn.extra.table.clientHeight + 10) + "px";
                  const ids = Object.keys(this.Players.list);
                  const player = this.Players.list[ids[fn.extra.i++]];
                  if(!player) return;
                  if(fn.extra.i >= ids.length) fn.extra.i = 0;

                  if(!document.getElementById(`crimsonPlayer-${player.id}`)) {
                    fn.extra.table.insertAdjacentHTML("beforeend", `<tr id="crimsonPlayer-${player.id}"><td>${player.id}</td><td>${(player.x >> 4) | 0}</td><td>${(player.y >> 4) | 0}</td><td>${player.tool}</td><td style="color: rgb(${player.rgb})">&nbsp;◼</td></tr>`)
                    fn.extra.table.lastChild.onclick = e => {
                      OWOP.require("context").createContextMenu2(e.clientX, e.clientY, [
                        ["Teleport", () => { this.utils.tp((player.x >> 4) | 0, (player.y >> 4) | 0) }],
                        ["Tell", () => { document.getElementById('chat-input').value = `/tell ${player.id} `; document.getElementById('chat-input').focus(); }],
                        ["Follow", () => {
                          if(fn.extra.following) return;
                          this.toggle(false);
                          fn.extra.following = true;
                          this.utils.log("Enabled follow-mode. Press L to stop following.");
                          fn.extra.lastCoords = { x: OWOP.mouse.tileX, y: OWOP.mouse.tileY };
                          fn.extra.folInt = setInterval(() => { this.utils.tp((player.x >> 4) | 0, (player.y >> 4) | 0) });
                        }],
                        ["Copy ID", () => { this.utils.copyToClipboard(player.id) }],
                        ["Mute", () => { this.functions["Ignore"].extra.filter.push(+player.id);  this.functions["Ignore"].extra.input.value =  this.functions["Ignore"].extra.filter.join(','); }]
                      ])
                    };
                  }
                  else {
                    const elements = document.getElementById(`crimsonPlayer-${player.id}`).children;
                    elements[1].innerText = (player.x >> 4) | 0;
                    elements[2].innerText = (player.y >> 4) | 0;
                    elements[3].innerText = player.tool;
                    elements[4].style.color = `rgb(${player.rgb})`;
                    if(player.rank !== undefined && player.set !== 1) {
                      player.set = 1;
                      elements[0].className = "";
                      elements[0].style.color = player.rank === 0 ? "rgb(100,100,100)" : player.rank === 2 ? "#86ff41" : "#ff4f4f";
                    };
                    if(player.set !== 1 && (player.tool === "protect" || player.tool === "copy" || player.tool === "paste" || player.tool === "eraser")) {
                      elements[0].className = "mod-or-admin";
                    }
                  }
                })
              }
            },
            Information: {
              description: "Information about yourself.",
              toggle: (fn, bool) => {
                if(bool) fn.extra.win.show();
                else fn.extra.win.hide();
              },
              init: fn => {
                fn.extra.win = new this.windows.class("Information", 1125, 310, { if: () => fn.enabled }, win => {
                  win.addObj(document.createTextNode("ID: "));
                  fn.extra.id = document.createElement("span");
                  fn.extra.id.innerText = OWOP.player.id;
                  OWOP.on(OWOP.events.net.world.setId, id => fn.extra.id.innerText = id);
                  win.addObj(fn.extra.id);
                  win.addObj(document.createElement("br"));
                  win.addObj(document.createTextNode("Nick: "));
                  fn.extra.nick = document.createElement("span");
                  fn.extra.nick.innerText = localStorage.nick;
                  setInterval(() => fn.extra.nick.innerText = localStorage.nick, 10000);
                  win.addObj(fn.extra.nick);
                  win.addObj(document.createElement("br"));
                  win.addObj(document.createTextNode("Tool: "));
                  fn.extra.tool = document.createElement("span");
                  fn.extra.tool.innerText = OWOP.player.tool.name;
                  setInterval(() => fn.extra.tool.innerText = OWOP.player.tool.name, 500);
                  win.addObj(fn.extra.tool);
                  win.addObj(document.createElement("br"));
                  win.addObj(document.createTextNode("Rank: "));
                  fn.extra.rank = document.createElement("span");
                  fn.extra.rank.innerText = OWOP.player.rank;
                  OWOP.on(OWOP.events.net.sec.rank, rank => fn.extra.rank.innerText = rank);
                  win.addObj(fn.extra.rank);
                  win.addObj(document.createElement("br"));
                  win.addObj(document.createTextNode("PQuota: "));
                  fn.extra.pquota = document.createElement("span");
                  fn.extra.pquota.innerText = `${OWOP.net.protocol.placeBucket.rate}x${OWOP.net.protocol.placeBucket.time} (${OWOP.net.protocol.placeBucket.allowance})`;
                  setInterval(() => { OWOP.net.protocol.placeBucket.canSpend(0); fn.extra.pquota.innerText = `${OWOP.net.protocol.placeBucket.rate}x${OWOP.net.protocol.placeBucket.time} (${Math.round(OWOP.net.protocol.placeBucket.allowance)})` });
                  win.addObj(fn.extra.pquota);
                  win.addObj(document.createElement("br"));
                  win.addObj(document.createTextNode("Color: "));
                  fn.extra.color = document.createElement("span");
                  fn.extra.color.innerText = "◼";
                  setInterval(() => fn.extra.color.style.color = `rgb(${OWOP.player.selectedColor})`, 500);
                  win.addObj(fn.extra.color);
                  win.container.style.width = "auto";
                  win.hide();
                })
              }
            },
            Spammer: {
              description: "/tell spam annoying kids.",
              toggle: (fn, bool) => {
                if(bool) fn.extra.win.show();
                else fn.extra.win.hide();
              },
              init: fn => {
                fn.extra.spamInt = null;
                fn.extra.win = new this.windows.class("Spammer", 607, 225, { if: () => fn.enabled }, win => {
                  win.container.style.width = "200px";
                  let ms = 1000;
                  let spamming = false;
                  let second = false;

                  const id = document.createElement("input");
                  id.className = "crimsonInput";
                  id.placeholder = "ID";
                  const msg = document.createElement("input");
                  msg.placeholder = "Message";
                  msg.className = "crimsonInput";
                  const msg2 = document.createElement("input");
                  msg2.placeholder = "Message2";
                  msg2.className = "crimsonInput";
                  const speed = document.createElement("input");
                  speed.className = "crimsonInput";
                  speed.type = "range";
                  speed.min = 500;
                  speed.max = 20000;
                  let speedometer = document.createElement("span");
                  speedometer.innerText = "1000ms";

                  speed.onchange = () => {
                    ms = speed.value;
                    speedometer.innerText = ms + "ms";
                  }
                  const button = document.createElement("span");
                  button.className = "crimsonButton";
                  button.innerText = "Start";
                  button.onclick = () => {
                    if(!spamming) {
                      spamming = true;
                      button.innerText = "Stop";
                      fn.extra.spamInt = setInterval(() => {
                        if(!second) OWOP.chat.send(`/tell ${+id.value} ${msg.value}`);
                        else if(msg2.value) OWOP.chat.send(`/tell ${+id.value} ${msg2.value}`);
                        second = !second;
                      }, ms);
                    } else {
                      clearInterval(fn.extra.spamInt);
                      spamming = false;
                      button.innerText = "Start";
                      second = false;
                    }
                  }
                  win.addObj(id);
                  win.addObj(document.createElement("br"));
                  win.addObj(msg);
                  win.addObj(document.createElement("br"));
                  win.addObj(msg2);
                  win.addObj(document.createElement("br"));
                  win.addObj(speed);
                  win.addObj(speedometer);
                  win.addObj(document.createElement("br"));
                  win.addObj(button);
                  win.hide();
                })
              }
            },
            Homes: {
              description: "Homes like in Minecraft.",
              toggle: (fn, bool) => {
                if(bool) fn.extra.win.show();
                else fn.extra.win.hide();
              },
              init: fn => {
                fn.extra.homes = localStorage.crimsonhomes ? JSON.parse(localStorage.crimsonhomes) : {};
                fn.extra.win = new this.windows.class("Homes", 400, 225, { if: () => fn.enabled }, win => {
                  win.container.width = "200px";
                  win.container.style.paddingBottom = "35px";
                  const table = document.createElement("table");
                  table.style.position = "relative";
                  fn.extra.table = document.createElement("tbody");
                  table.appendChild(fn.extra.table);
                  const noHomes = document.createElement("span");
                  noHomes.innerText = "Oops, nothing here!";
                  noHomes.hidden = true;
                  fn.extra.table.insertAdjacentHTML("beforeend", `<tr><th>Name</th><th>X</th><th>Y</th><th></th><th></th></tr>`);
                  if(this.utils.size(fn.extra.homes) > 0)
                    for(let i in fn.extra.homes) fn.extra.table.insertAdjacentHTML("beforeend", `<tr><td>${i}</td><td>${fn.extra.homes[i].x}</td><td>${fn.extra.homes[i].y}</td><td><button onclick="CrimsonClient.utils.tp(${fn.extra.homes[i].x}, ${fn.extra.homes[i].y})" class="crimsonButton">TP</button></td><td><button class="crimsonButton" onclick="this.parentElement.parentElement.remove();delete CrimsonClient.functions.Homes.extra.homes['${i}']; localStorage.crimsonhomes = JSON.stringify(CrimsonClient.functions.Homes.extra.homes)">DEL</button></td></tr>`);
                  else noHomes.hidden = false;
                  const name = document.createElement("input");
                  name.placeholder = "Name";
                  name.className = "crimsonInput";
                  const btn = document.createElement("button");
                  btn.className = "crimsonButton";
                  btn.innerText = "Add home";
                  btn.onclick = () => {
                    noHomes.hidden = true;
                    if(!name.value) return this.utils.log("Error: no name.");
                    fn.extra.homes[name.value] = { x: OWOP.mouse.tileX, y: OWOP.mouse.tileY };
                    localStorage.crimsonhomes = JSON.stringify(fn.extra.homes);
                    fn.extra.table.insertAdjacentHTML("beforeend", `<tr><td>${name.value}</td><td>${OWOP.mouse.tileX}</td><td>${OWOP.mouse.tileY}</td><td><button onclick="CrimsonClient.utils.tp(${OWOP.mouse.tileX}, ${OWOP.mouse.tileY})" class="crimsonButton">TP</button></td><td><button class="crimsonButton" onclick="this.parentElement.parentElement.remove();delete CrimsonClient.functions.Homes.extra.homes['${name.value}']; localStorage.crimsonhomes = JSON.stringify(CrimsonClient.functions.Homes.extra.homes)">DEL</button></td></tr>`);
                  };
                  win.addObj(table);
                  win.addObj(document.createElement("br"));
                  win.addObj(noHomes);
                  win.addObj(document.createElement("br"));
                  win.addObj(name);
                  win.addObj(document.createElement("br"));
                  win.addObj(btn);
                  win.hide();
                });
              }
            },
            EmojiFix: { description: "Replace discord emoji names with real ones. OWOP Official Discord emojis. Example: :teef:." },
            BetterChat: { description: "Click on message (not id/nick) to open menu with Teleport, Tell, Follow, Copy ID, Mute and also if you're mod+ there will be Set rank, Whois and (Un)Mute. Also adds time to messages." },
            Autoreconnect: {
              description: "You'll automatically reconnect on disconnect.",
              init: fn => {
                OWOP.on(OWOP.events.net.disconnected, () => {
                  if(fn.enabled) setTimeout(() => { document.getElementById("reconnect-btn").click() }, 700);
                });
              }
            },
            Filter: {
              description: "Filter chat by string/regex",
              toggle: (fn, bool) => {
                if(bool) fn.extra.win.show();
                else fn.extra.win.hide();
              },
              init: fn => {
                fn.extra.filter = "";
                fn.extra.isRegExp = false;
                fn.extra.win = new this.windows.class("Filter", 1125, 470, { if: () => fn.enabled }, win => {
                  const input = document.createElement("input");
                  fn.extra.input = input;
                  input.className = "crimsonInput";
                  input.onchange = () => fn.extra.filter = fn.extra.isRegExp ? new RegExp(input.value, "gm") : input.value;
                  input.placeholder = "String or RegExp";
                  const toggler = document.createElement("input");
                  toggler.type = "checkbox";
                  toggler.onchange = () => { fn.extra.isRegExp = toggler.checked; fn.extra.filter = fn.extra.isRegExp ? new RegExp(input.value, "gm") : input.value; }

                  win.addObj(input);
                  win.addObj(document.createElement("br"));
                  win.addObj(toggler);
                  win.addObj(document.createTextNode(" RegExp"))
                  win.container.style.width = "150px";
                  win.hide();
                })
              }
            },
          });
          const shit = localStorage.crimsonfuncs ? JSON.parse(localStorage.crimsonfuncs) : {};
          for(let i in shit) if(shit[i]) this.functions[i].toggle(true);
          for(let i in this.windows.list) this.windows.list[i].hide();
        }
    }
    return {
      install: () => {
        CrimsonClient = new Crimson();
      },
      uninstall: () => {
        alert("CrimsonClient was deleted from your installs. Refresh page to delete CrimsonClient script.");
      }
    }
})();
crimsonclient.install();
