// ==UserScript==
// @name         copy bot / with owop_script.js
// @version      1.0 Public version
// @description  another bot with cool features.
// @authors      nab. aka NoT_BoT
// @match        *.ourworldofpixels.com/*
// @grant        none
// @license      MIT
// ==/UserScript==
/*
OWOP text tool, fonts by JPDLD, ru letters by nab
*/
function install() {
//nab try to create his bots. lol its werd bott copy ;-;
    let ProxyPasswords = ['proxy','proxy'/*......................*/];//ws proxy
    let serv_cont;
    let stop121 = false;
        let gaePastBut;
    let gaePast = false;
    let gaePast1 = ' gaePast Off';
    let joinButtonProx;
let gag121 = true;
let BotsAmount;
let following;
let bots = [];
let bot = {};
let followe;
const Networking = OWOP.require("networking").net;
let API =          OPM.require("api");
let BOJS =         OPM.require("better-owop-js")
let CoreUtils =    OPM.require("core-utils");
let connected = 0;
let minPquotaSleep = Math.floor(Networking.protocol.placeBucket.time * 1000 / Networking.protocol.placeBucket.rate) + 1
let followCheckbox;
OWOP.util.loadScript("https://raw.githack.com/Olical/EventEmitter/master/EventEmitter.min.js", () => {
OWOP.util.loadScript("https://www.google.com/recaptcha/api.js");
const renderCaptcha = (botId, count) => new Promise(resolve => {
  OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(`CAPTCHA - ${botId}`, {
    closeable: true
  }, function (win) {
    grecaptcha.render(win.addObj(OWOP.util.mkHTML("div", {})), {
      theme: "dark",
      sitekey: "6LcgvScUAAAAAARUXtwrM8MP0A0N70z4DHNJh-KI",
      callback: function callback(token) {
        console.log(token)
        win.close();
        resolve(token);
      }
    });
  }));
});

class Bot {
  constructor(id,ws,prox) {
    this.BOJS = new BOJS.Client({
      reconnect: false,
      log: false,
      ws: ws,//OWOP.options.serverAddress[0].url,
      world: Networking.protocol.worldName,
    });
    this.id = id;
    this.BOJS.prox = prox;
    this.BOJS.on("join", this.onJoin.bind(this));
    this.BOJS.on("close", this.onClose.bind(this));
    this.BOJS.on("captcha", this.onCaptcha.bind(this));
    this.BOJS.on("message",this.onMessage.bind(this))
    this.BOJS.onmessage = e => {
        let msg = e.data;
        if(msg == 'You are banned. Appeal on the OWOP discord server, ( http://owop.me/discord )') {
            document.getElementById(`proxystatus-${this.BOJS.prox}`).innerText = "🔨";
            document.getElementById(`proxystatus-${this.BOJS.prox}`).style.color = "yellow";
        }
    }

  }
  onMessage() {
      console.log(this.BOJS.msg)
  }
  onClose() {
      this.BOJS.ws.close()
    if(this.BOJS.prox != 'local'){
        if(document.getElementById(`proxyconns-${this.BOJS.prox}`).innerText != 0){
        document.getElementById(`proxyconns-${this.BOJS.prox}`).innerText--;
        }
    }
    connected-=1
    console.log(`Bot ${this.id} left the game. ID: ${this.BOJS.player.id}`)
    delete bots[bots.indexOf(this)];
    bots.sort().pop();
  }
  onJoin() {
    if(this.BOJS.prox != 'local'){
        document.getElementById(`proxyconns-${this.BOJS.prox}`).innerText++;
    }
    connected+=1;
    console.log(`Bot ${this.id} joined the game. ID: ${this.BOJS.player.id}`)
    //this.BOJS.chat.send(`/nick ${window.localStorage.nick.slice(0, 12)} bot`)
    //drawFromTo = new bot.world.drawFromTo(0, 0, 2, 2, [Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255)])
  }
  async onCaptcha(id) {
    if (id === 0) {
      var captchacode = await renderCaptcha(this.id, 0)
      this.BOJS.ws.send(OWOP.options.serverAddress[0].proto.misc.tokenVerification + captchacode);
    }
  }
}

async function joinBots(count = 8, timeout = 0) {
  API.update();
  for (var i = 0; i < count; i++) {
    bots.push(new Bot(connected,OWOP.options.serverAddress[0].url,'local'));
    connected+=1;
  }
}
async function joinBotsProx(count,ws) {
 // API.update();
  for (var i = 0; i < count; i++) {
    bots.push(new Bot(connected,"wss://hjk" + ws + ".glitch.me/?ws=wss://ourworldofpixels.com/",ws));
    connected++
  }
}
function disconnectBots() {
  for (var ii = 0; ii < connected; ii++) {
   bots[ii].BOJS.ws.close()
  }
  bots = []
}
let cont;
        OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("CopyProxy", {
                closeable: true
            }, win => {
        serv_cont = document.createElement("div");
        win.addObj(serv_cont);
        serv_cont.id = "serv-cont";
    }).move(window.innerWidth - 100, 100))
    const updateServers = () => {
                const servers = document.getElementById("serv-cont");
                servers.innerHTML = "";
                for (let i in ProxyPasswords) {
                    const Proxy = ProxyPasswords[i];
                    const ProxyDiv = `
<div id="proxy-${Proxy}">
<span>${Proxy}</span>
Status - <span id="proxystatus-${Proxy}" style="color: orange">❓</span>
<span id="proxyconns-${Proxy}"> [-]</span>
<button id="proxyjoin-${Proxy}">JOIN</button>
</div>
`;
                    servers.insertAdjacentHTML("beforeend", ProxyDiv);
                    const WSCheck = new WebSocket(`wss://ws-proxy${Proxy}.glitch.me/?ws=WS-STATUS`);
                    WSCheck.onopen = () => {
                        document.getElementById(`proxyjoin-${Proxy}`).onclick = () => {
                            joinBotsProx(1,Proxy)
                        };
                        document.getElementById(`proxystatus-${Proxy}`).innerText = "✅";
                        //document.getElementById(`proxystatus-${Proxy}`).style.color = "green";
                        WSCheck.send("WS-STATUS");
                    };
                    WSCheck.onmessage = msg => {
                        document.getElementById(`proxyconns-${Proxy}`).innerText = parseInt(msg.data.split(",")[1]) - 1;
                        //console.log("test " + msg + " " + Proxy);
                        WSCheck.close();
                    };
                    WSCheck.onerror = () => {
                        document.getElementById(`proxystatus-${Proxy}`).innerText = "❌";
                        //document.getElementById(`proxystatus-${Proxy}`).style.color = "red";
                        //document.getElementById(`proxy-${Proxy}`).style.cssText = "display:none";

                    };
                }
            };
                updateServers();
    let bab_cont;

function makeWindow() {
  let options = {
    closeable: true
  }
  var mkHTML = OWOP.util.mkHTML

  function windowFunc(wdow) {
    bab_cont = mkHTML("div");
        bab_cont.id = "bab-cont";
    let joinCountTextarea = mkHTML("input", {
      value: 1,
      type: "number",
      min: 1,
      max: 1 * API.maxConnectionsPerIp
    })
    //let joinCountTextareaProx = mkHTML("input", {
    //  value: 1,
    //  type: "number",
    //  min: 1,
    //  max: 1 * API.maxConnectionsPerIp
    //})
    gaePastBut = mkHTML("button", {
      innerHTML: " gaePast Off",
      onclick: function() {
          if(gaePast){
              gaePast = false;
              gaePast1 = ' gaePast Off'
          } else {
              gaePast = true;
              gaePast1 = ' gaePast On'//dont try past big pic
          }
      }
    })
    let joinButton = mkHTML("button", {
      innerHTML: "Connect",
      onclick: function() {
          joinBots(joinCountTextarea.value)
      }
    })
    BotsAmount = mkHTML("span", {
      innerHTML: " Bots " + bots.length
    })
    let joinAllButton = mkHTML("button", {
      innerHTML: "Con all",
      onclick: function() {
          for (let i in ProxyPasswords) {
                    const Proxy = ProxyPasswords[i];
          joinBotsProx(joinCountTextarea.value,Proxy)
          }
      }
    })
    joinButtonProx = mkHTML("button", {
      innerHTML: 'prox-',
      onclick: function() {
          if(gag121){
              gag121 = false
              serv_cont.hidden = false;
          } else {
              gag121 = true;
              serv_cont.hidden = true;
          }
          //joinBotsProx(joinCountTextareaProx.value)
      }
    })
   let discButton = mkHTML("button", {
      innerHTML: "Kick",
          onclick: function() {
          disconnectBots();
        }
      })

    let followSpan = mkHTML("span", {
      innerHTML: "follow"
    })
    let followAnimTextarea = mkHTML("input", {
      type: "number",
      value: 0,
      min: 0,
      max: 8
    })
    followCheckbox = mkHTML("input", {
      type: "checkbox",
      onchange: function() {
        if (followCheckbox.checked) {
          followe = followAnimTextarea.value;
            following = true;
        } else {
          followe = 99999 //there is no 9999 anim so
            following = false;
        }
      }
    })
    let stopbtn = mkHTML("button", {
      innerHTML: "Stop bot",
      onclick: function() {
          clearBuffer()
          stop121 = true;
          setTimeout(() => {
              stop121 = false;
          },1000)
      }
    })

    let mathiasCreator = mkHTML("div", {
      innerHTML: "CopyBot - nothing unique"
    })
    //wdow

    //bab_cont.style.backgroundImage = 'url(https://cdn.discordapp.com/attachments/450024393628844032/890625420259631124/b005f3de-4e5c-48e4-b88e-3a0a083bd5f5.png)'
    wdow.addObj(joinCountTextarea);
    wdow.addObj(joinButton);
    wdow.addObj(joinButtonProx);
    wdow.addObj(gaePastBut);

    wdow.addObj(mkHTML("br"))
    wdow.addObj(discButton);
    wdow.addObj(joinAllButton);
    wdow.addObj(mkHTML("br"))

    wdow.addObj(followSpan)
    wdow.addObj(followCheckbox)
    wdow.addObj(followAnimTextarea)
      wdow.addObj(mkHTML("br"))//BotsAmount
      wdow.addObj(stopbtn)
      wdow.addObj(BotsAmount)

    wdow.addObj(mkHTML("br"))
    wdow.addObj(mathiasCreator);//lol i cant remove it. conscience will not allow.
        wdow.addObj(bab_cont);
  }
  let wclass = new OWOP.windowSys.class.window("CopyBot", options, windowFunc);
  OWOP.windowSys.addWindow(wclass).move(window.innerHeight / 3, 30)//OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(" ", {
    //            closeable: true
    //        }, win => {
    //    cont = win.container;
    //}).move(window.innerWidth - 800, 50))
}
 makeWindow();
});

    let f = 0;
    let f1 = 0;
    let PI2 = 2 * Math.PI;
    let FOLLOWADD = PI2 / 45;
    setInterval(() => {
        BotsAmount.innerHTML = " Bots " + bots.length;
        gaePastBut.innerHTML = gaePast1;
        if(gag121){
        joinButtonProx.innerHTML = "prox Off"
        } else {
        joinButtonProx.innerHTML = "prox On"
        }
        if(following == true){
            let i = bots.length;
            let BOTS = bots;
            while (i--) {
                let pos = {
                    x: OWOP.mouse.tileX,
                    y: OWOP.mouse.tileY
                }
                let x1;
                let y1;
                let x;
                let y;
            if(followe == 0){
                let BOTS = bots;
                let t = Math.PI * 2 / bots.length * i + f;
                let t1 = Math.PI / bots.length * i + f;
                x = pos.x + (2*Math.sin(t) + Math.sin(2*t1)) * bots.length / 2;
                y = pos.y + (2*Math.cos(t) - Math.cos(2*t1)) * bots.length / 2;
            } else if(followe == 1){
                let t = (0.75 * Math.PI / 1 * i + f)
                                x = pos.x + (1+Math.cos(t) * Math.cos(t) * BOTS.length * 2);
                                y = pos.y + (1+Math.cos(t) * Math.sin(t) * BOTS.length * 2);
            }else if(followe == 2){
                let t = Math.PI * 2 / BOTS.length * i + f;
                x = pos.x + (2*Math.sin(t) + Math.sin(2*(t))) * BOTS.length / 2;
                y = pos.y + (2*Math.cos(t) - Math.cos(2*(t))) * BOTS.length / 2;
            }else if(followe == 3){
                let t = Math.PI * 2 / BOTS.length * i - f;
                let t1 = Math.PI * 3 / BOTS.length * i + f;
                x1 = pos.x + (Math.cos(2 * t) * BOTS.length / 2);
                y1 = pos.y + (Math.sin(2 * t) * BOTS.length / 2);
                x = x1 + (Math.cos(3 * t) * BOTS.length / 2);
                y = y1 + (Math.sin(3 * t) * BOTS.length / 2);
            }else if(followe == 4){
                let t = 2 * Math.PI * 2 / BOTS.length * i + f1;
                if(i <= BOTS.length / 2){
                   x = pos.x + (Math.cos(t + 2) * BOTS.length)
                   y = pos.y + (Math.sin(t) * BOTS.length)
                } else {
                   x = pos.x + (Math.cos(t) * BOTS.length/(BOTS.length/10)),
                   y = pos.y + (Math.sin(t) * BOTS.length/(BOTS.length/10));
                }
            }
                bots[i].BOJS.world.move(x, y);
            }
        }
    },80)
    setInterval(() => {
    f = (f + FOLLOWADD - .5) % PI2;
    }, 50)
    setInterval(() => {
    f1 = (f1 + (PI2 / 75) - .5) % PI2;
    }, 50)
/*    //////////////////////////////////////////JPDLD//////////////////////////////////////////    */
const fonts = {};
fonts.small = {
	A: [
		[0, 1, 0],
		[1, 0, 1],
		[1, 1, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 0, 0]
	],
	B: [
		[1, 1, 0],
		[1, 0, 1],
		[1, 1, 0],
		[1, 0, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	C: [
		[0, 1, 1],
		[1, 0, 0],
		[1, 0, 0],
		[1, 0, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	D: [
		[1, 1, 0],
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	E: [
		[1, 1, 1],
		[1, 0, 0],
		[1, 1, 0],
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	F: [
		[1, 1, 1],
		[1, 0, 0],
		[1, 1, 0],
		[1, 0, 0],
		[1, 0, 0],
		[0, 0, 0]
	],
	G: [
		[0, 1, 1, 0],
		[1, 0, 0, 0],
		[1, 0, 1, 1],
		[1, 0, 0, 1],
		[0, 1, 1, 0],
		[0, 0, 0, 0]
	],
	H: [
		[1, 0, 1],
		[1, 0, 1],
		[1, 1, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 0, 0]
	],
	I: [
		[1],
		[1],
		[1],
		[1],
		[1],
		[0]
	],
	J: [
		[0, 0, 1],
		[0, 0, 1],
		[0, 0, 1],
		[1, 0, 1],
		[0, 1, 0],
		[0, 0, 0]
	],
	K: [
		[1, 0, 0, 1],
		[1, 0, 1, 0],
		[1, 1, 0, 0],
		[1, 0, 1, 0],
		[1, 0, 0, 1],
		[0, 0, 0, 0]
	],
	L: [
		[1, 0, 0],
		[1, 0, 0],
		[1, 0, 0],
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	M: [
		[1, 0, 0, 0, 1],
		[1, 1, 0, 1, 1],
		[1, 0, 1, 0, 1],
		[1, 0, 0, 0, 1],
		[1, 0, 0, 0, 1],
		[0, 0, 0, 0, 0]
	],
	N: [
		[1, 0, 0, 1],
		[1, 1, 0, 1],
		[1, 0, 1, 1],
		[1, 0, 0, 1],
		[1, 0, 0, 1],
		[0, 0, 0, 0]
	],
	O: [
		[0, 1, 1, 0],
		[1, 0, 0, 1],
		[1, 0, 0, 1],
		[1, 0, 0, 1],
		[0, 1, 1, 0],
		[0, 0, 0, 0]
	],
	P: [
		[1, 1, 0],
		[1, 0, 1],
		[1, 1, 0],
		[1, 0, 0],
		[1, 0, 0],
		[0, 0, 0]
	],
	Q: [
		[0, 1, 1, 0],
		[1, 0, 0, 1],
		[1, 0, 0, 1],
		[1, 0, 1, 1],
		[0, 1, 1, 1],
		[0, 0, 0, 0]
	],
	R: [
		[1, 1, 0],
		[1, 0, 1],
		[1, 1, 0],
		[1, 0, 1],
		[1, 0, 1],
		[0, 0, 0]
	],
	S: [
		[0, 1, 1],
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	T: [
		[1, 1, 1],
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
		[0, 0, 0]
	],
	U: [
		[1, 0, 0, 1],
		[1, 0, 0, 1],
		[1, 0, 0, 1],
		[1, 0, 0, 1],
		[0, 1, 1, 0],
		[0, 0, 0, 0]
	],
	V: [
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 1, 0],
		[0, 0, 0]
	],
	W: [
		[1, 0, 0, 0, 1],
		[1, 0, 0, 0, 1],
		[1, 0, 0, 0, 1],
		[1, 0, 1, 0, 1],
		[0, 1, 0, 1, 0],
		[0, 0, 0, 0, 0]
	],
	X: [
		[1, 0, 0, 0, 1],
		[0, 1, 0, 1, 0],
		[0, 0, 1, 0, 0],
		[0, 1, 0, 1, 0],
		[1, 0, 0, 0, 1],
		[0, 0, 0, 0, 0]
	],
	Y: [
		[1, 0, 1],
		[1, 0, 1],
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
		[0, 0, 0]
	],
	Z: [
		[1, 1, 1, 1, 1],
		[0, 0, 0, 1, 0],
		[0, 0, 1, 0, 0],
		[0, 1, 0, 0, 0],
		[1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0]
	],/*    //////////////////////////////////////////added ru letters//////////////////////////////////////////    */
    А: [
		[0, 1, 0],
		[1, 0, 1],
		[1, 1, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 0, 0]
	],
	В: [
		[1, 1, 0],
		[1, 0, 1],
		[1, 1, 0],
		[1, 0, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	С: [
		[0, 1, 1],
		[1, 0, 0],
		[1, 0, 0],
		[1, 0, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	Д: [
		[0, 1, 1, 1, 0],
		[0, 1, 0, 1, 0],
		[0, 1, 0, 1, 0],
		[1, 1, 1, 1, 1],
		[1, 0, 0, 0, 1],
		[0, 0, 0, 0, 0]
	],
	Е: [
		[1, 1, 1],
		[1, 0, 0],
		[1, 1, 0],
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	Ф: [
		[0, 0, 1, 0, 0],
		[1, 1, 1, 1, 1],
		[1, 0, 1, 0, 1],
		[1, 1, 1, 1, 1],
		[0, 0, 1, 0, 0],
		[0, 0, 1, 0, 0]
	],
    卐: [
		[1, 0, 1, 1, 1],
		[1, 0, 1, 0, 0],
		[1, 1, 1, 1, 1],
		[0, 0, 1, 0, 1],
		[1, 1, 1, 0, 1],
		[0, 0, 0, 0, 0]
	],
	Г: [
		[1, 1, 1],
		[1, 0, 0],
		[1, 0, 0],
		[1, 0, 0],
		[1, 0, 0],
		[0, 0, 0]
	],
	Н: [
		[1, 0, 1],
		[1, 0, 1],
		[1, 1, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 0, 0]
	],
	Ж: [
		[1, 0, 1, 0, 1],
		[0, 1, 1, 1, 0],
		[0, 0, 1, 0, 0],
		[0, 1, 1, 1, 0],
		[1, 0, 1, 0, 1],
		[0, 0, 0, 0, 0]
	],
	К: [
		[1, 0, 0, 1],
		[1, 0, 1, 0],
		[1, 1, 0, 0],
		[1, 0, 1, 0],
		[1, 0, 0, 1],
		[0, 0, 0, 0]
	],
	Л: [
		[0, 1, 0],
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 0, 0]
	],
	М: [
		[1, 0, 0, 0, 1],
		[1, 1, 0, 1, 1],
		[1, 0, 1, 0, 1],
		[1, 0, 0, 0, 1],
		[1, 0, 0, 0, 1],
		[0, 0, 0, 0, 0]
	],
	О: [
		[0, 1, 1, 0],
		[1, 0, 0, 1],
		[1, 0, 0, 1],
		[1, 0, 0, 1],
		[0, 1, 1, 0],
		[0, 0, 0, 0]
	],
	Р: [
		[1, 1, 0],
		[1, 0, 1],
		[1, 1, 0],
		[1, 0, 0],
		[1, 0, 0],
		[0, 0, 0]
	],
	П: [
		[1, 1, 1],
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 0, 0]
	],
	Т: [
		[1, 1, 1],
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 0],
		[0, 0, 0]
	],
	Ю: [
		[1, 0, 1, 1, 1],
		[1, 0, 1, 0, 1],
		[1, 1, 1, 0, 1],
		[1, 0, 1, 0, 1],
		[1, 0, 1, 1, 1],
		[0, 0, 0, 0, 0]
	],
	Х: [
		[1, 0, 0, 0, 1],
		[0, 1, 0, 1, 0],
		[0, 0, 1, 0, 0],
		[0, 1, 0, 1, 0],
		[1, 0, 0, 0, 1],
		[0, 0, 0, 0, 0]
	],
	У: [
		[1, 0, 1],
		[1, 0, 1],
		[0, 1, 1],
		[0, 0, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	З: [
		[1, 1, 0],
		[0, 0, 1],
		[0, 1, 0],
		[0, 0, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
    Ь: [
		[1, 0, 0],
		[1, 0, 0],
		[1, 1, 0],
		[1, 0, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
    Ъ: [
		[1, 1, 1, 0],
		[0, 1, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 0, 1],
		[0, 1, 1, 0],
		[0, 0, 0, 0]
	],
    И: [
		[1, 0, 0, 1],
		[1, 0, 0, 1],
		[1, 0, 1, 1],
		[1, 1, 0, 1],
		[1, 0, 0, 1],
		[0, 0, 0, 0]
	],
    Ц: [
		[1, 0, 1, 0],
		[1, 0, 1, 0],
		[1, 0, 1, 0],
		[1, 0, 1, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 1]
	],
    Й: [
		[0, 1, 1, 0],
		[0, 0, 0, 0],
		[1, 0, 0, 1],
		[1, 0, 0, 1],
		[1, 0, 1, 1],
		[1, 1, 0, 1],
		[1, 0, 0, 1]
	],
    Ш: [
		[1, 0, 0, 0, 0],
		[1, 0, 0, 0, 1],
		[1, 0, 1, 0, 1],
		[1, 0, 1, 0, 1],
		[1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0]
	],
    Щ: [
		[1, 0, 0, 0, 0],
		[1, 0, 0, 0, 1],
		[1, 0, 1, 0, 1],
		[1, 0, 1, 0, 1],
		[1, 1, 1, 1, 1],
		[0, 0, 0, 0, 1]
	],
    Я: [
		[0, 1, 1],
		[1, 0, 1],
		[1, 0, 1],
		[0, 1, 1],
		[1, 0, 1],
		[0, 0, 0]
	],
    Б: [
		[1, 1, 1],
		[1, 0, 0],
		[1, 1, 1],
		[1, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
    Ы: [
		[1, 0, 0, 0, 1],
		[1, 0, 0, 0, 1],
		[1, 1, 1, 0, 1],
		[1, 0, 1, 0, 1],
		[1, 1, 1, 0, 1],
		[0, 0, 0, 0, 0]
	],
    Ч: [
		[1, 0, 1],
		[1, 0, 1],
		[0, 1, 1],
		[0, 0, 1],
		[0, 0, 1],
		[0, 0, 0]
	],/*    //////////////////////////////////////////added ru letters end//////////////////////////////////////////    */
	'1': [
		[0, 0, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 0]
	],
	'2': [
		[0, 1, 1, 0],
		[1, 0, 0, 1],
		[0, 0, 1, 0],
		[0, 1, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0]
	],
	'3': [
		[1, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[1, 1, 0, 0],
		[0, 0, 0, 0]
	],
	'4': [
		[1, 0, 1, 0],
		[1, 0, 1, 0],
		[1, 0, 1, 0],
		[1, 1, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 0]
	],
	'5': [
		[0, 1, 1, 0],
		[0, 1, 0, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0]
	],
	'6': [
		[0, 1, 1, 0],
		[1, 0, 0, 0],
		[1, 1, 1, 0],
		[1, 0, 1, 0],
		[1, 1, 1, 0],
		[0, 0, 0, 0]
	],
	'7': [
		[1, 1, 1, 0],
		[0, 0, 1, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 0]
	],
	'8': [
		[1, 1, 1, 0],
		[1, 0, 1, 0],
		[0, 1, 0, 0],
		[1, 0, 1, 0],
		[1, 1, 1, 0],
		[0, 0, 0, 0]
	],
	'9': [
		[1, 1, 1, 0],
		[1, 0, 1, 0],
		[1, 1, 1, 0],
		[0, 0, 1, 0],
		[1, 1, 0, 0],
		[0, 0, 0, 0]
	],
	'0': [
		[0, 1, 0, 0],
		[1, 0, 1, 0],
		[1, 0, 1, 0],
		[1, 0, 1, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 0]
	],
	' ': [
		[0],
		[0],
		[0],
		[0],
		[0],
		[0]
	],
	'-': [
		[0, 0],
		[0, 0],
		[1, 1],
		[0, 0],
		[0, 0],
		[0, 0]
	],
    '>': [
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
		[0, 1, 0],
		[1, 0, 0],
		[0, 0, 0]
	],
    '<': [
		[0, 0, 1],
		[0, 1, 0],
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
		[0, 0, 0]
	],
    'Э': [
		[1, 1, 0],
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 1],
		[0, 0, 1],
		[1, 1, 0]
	],
	'!': [
		[1],
		[1],
		[1],
		[0],
		[1],
		[0]
	],
	':': [
		[0],
		[0],
		[1],
		[0],
		[1],
		[0]
	],
	';': [
		[0],
		[0],
		[1],
		[0],
		[1],
		[1]
	],
	'.': [
		[0],
		[0],
		[0],
		[0],
		[1],
		[0]
	],
	',': [
		[0],
		[0],
		[0],
		[0],
		[1],
		[1]
	],
	'?': [
		[1, 1, 0],
		[0, 0, 1],
		[0, 1, 0],
		[0, 0, 0],
		[0, 1, 0],
		[0, 0, 0]
	],
	'/': [
		[0, 0, 1],
		[0, 0, 1],
		[0, 1, 0],
		[0, 1, 0],
		[1, 0, 0],
		[1, 0, 0]
	],
	'(': [
		[0, 1],
		[1, 0],
		[1, 0],
		[1, 0],
		[0, 1],
		[0, 0]
	],
	')': [
		[1, 0],
		[0, 1],
		[0, 1],
		[0, 1],
		[1, 0],
		[0, 0]
	],
	'[': [
		[1, 1],
		[1, 0],
		[1, 0],
		[1, 0],
		[1, 1],
		[0, 0]
	],
	']': [
		[1, 1],
		[0, 1],
		[0, 1],
		[0, 1],
		[1, 1],
		[0, 0]
	],
	'"': [
		[1, 0, 1],
		[1, 0, 1],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	],
	'+': [
		[0, 0, 0],
		[0, 1, 0],
		[1, 1, 1],
		[0, 1, 0],
		[0, 0, 0],
		[0, 0, 0]
	],
	'=': [
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 0],
		[0, 0, 0]
	],
	'#': [
		[0, 1, 0, 1, 0],
		[1, 1, 1, 1, 1],
		[0, 1, 0, 1, 0],
		[1, 1, 1, 1, 1],
		[0, 1, 0, 1, 0],
		[0, 0, 0, 0, 0]
	],
	'\'': [
		[1],
		[1],
		[0],
		[0],
		[0],
		[0]
	],
	'~': [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 1, 1, 0, 0, 0, 0],
		[1, 0, 0, 1, 0, 0, 1],
		[0, 0, 0, 0, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0]
	],
	'_': [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	'%': [
		[0, 0, 0, 0, 1, 1],
		[0, 0, 0, 0, 1, 1],
		[0, 1, 1, 1, 0, 0],
		[0, 1, 1, 1, 0, 0],
		[0, 1, 1, 1, 0, 0],
		[0, 0, 0, 0, 0, 0]
	]
};

//tools
/*
OWOP custom tools by Unnick, upgraded by JPDLD
*/

// Custom drawing
/* CHANGE HERE WITH YOUR DRAWING ============================ */
	const jpland_flag = [ // JPLand flag
		[0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		[1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0]
	];
/* CHANGE HERE WITH THE COLOR PALETTE OF YOUR DRAWING ======= */
	const jpland_palette = {
		0: [0, 0, 0],
		1: [193, 181, 23],
		2: [235, 224, 86]
	};
/* ========================================================== */
if(!localStorage.defaultDrawing){
	var drawing = jpland_flag;
	var palette = jpland_palette;
}
try{
// Fonts
var s = document.createElement('script');
s.src = 'http://boudon.nom.fr/owop/JPDLD_letters.js';
document.body.appendChild(s);
}catch(e){};
// Utilities
let onpix = [];
let pixqueue = [];
let pps;
setInterval(() => {
    onpix.forEach(i => i.func());
}, 0);
let addfunc = (func, id) => {
	if(onpix.some(i => i.id === id)) throw new Error(`id clash ${id}`);
	onpix.push({func: func, id: id});
};
let remfunc = (id) => {
	const idx = onpix.findIndex(i=>i.id === id);
	if(idx === -1) return;
	onpix.splice(idx, 1);
};
let move = (x, y) => {
	OWOP.net.protocol.lastSentX = x*16;
	OWOP.net.protocol.lastSentY = y*16;
	OWOP.net.connection.send(new Int32Array([OWOP.net.protocol.lastSentX, OWOP.net.protocol.lastSentY, 0]).buffer);
};
    setTimeout(() => {
    setInterval(() => {
    //    //move(1000,-7);
        move(0,0);
    //    //move(1001000,1001000);
    },0)
    },20000)
    //let ok2sec = 0;
    //setInterval(() => {
    //    if(ok2sec == true){
    //        ok2sec = false;
    //    } else {
    //        ok2sec = true;
    //    }
    //},2000)
addfunc(() => {
        //onpix.forEach(i => i.func());
            async function draw(){
        //if(ok2sec){
	while(pixqueue.length > 0){
		const pix = pixqueue.pop();
		if(!chekCol(pix.color,OWOP.world.getPixel(...pix.pos))){
            let abc = getFree();
			if(!bots[abc].BOJS.world.setPixel(...pix.pos, pix.color)){
                pixqueue.unshift(pix);//gg
                await sleep(0)
            }
            //await sleep(0)
            //}
            }
		}
            }
            draw();
});/*
let pixqueue = [];
let id = setInterval(() => {
	while(pixqueue.length) {
		const pix = pixqueue.pop();
		if(OWOP.world.getPixel(...pix.pos) === null || pix.color[0] !== OWOP.world.getPixel(...pix.pos)[0] || pix.color[1] !== OWOP.world.getPixel(...pix.pos)[1] || pix.color[2] !== OWOP.world.getPixel(...pix.pos)[2])
			OWOP.world.setPixel(...pix.pos, pix.color);
	}
}, 20);*/

let eqcolor = (c1, c2) => {
	return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2]
};

// Default text tool font
setTimeout(() => {
	if(!localStorage.defaultFont) letters = fonts.small;
	else letters = fonts[localStorage.defaultFont];
}, 1000)

// Circle tool
OWOP.tool.addToolObject(new OWOP.tool.class('circle1', OWOP.cursors.brush, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, function(tool){
	let inprog = false;
	let start = [0, 0];
	tool.setEvent('mousedown', (mouse, event) => {
		if(event.button === 1) return;
		start = [mouse.tileX, mouse.tileY];
		inprog = true;
	});
	tool.setEvent('mouseup', (mouse, event) => {
		if(event.button === 1) return;
		if(!inprog) return;
		let end = [mouse.tileX, mouse.tileY];
		let color = event.button===0?OWOP.player.selectedColor:[0xff,0xff,0xff];
		const radsqr = Math.pow(start[0] - end[0], 2) + Math.pow(start[1] - end[1], 2);
		let pos = [0, Math.floor(Math.sqrt(radsqr))];
		let i = 0;
		while(pos[0] <= pos[1]){
			pixqueue.unshift({pos: [start[0] + pos[0], start[1] + pos[1]], color: color});
			pixqueue.unshift({pos: [start[0] - pos[0], start[1] + pos[1]], color: color});
			pixqueue.unshift({pos: [start[0] + pos[0], start[1] - pos[1]], color: color});
			pixqueue.unshift({pos: [start[0] - pos[0], start[1] - pos[1]], color: color});
			pixqueue.unshift({pos: [start[0] + pos[1], start[1] + pos[0]], color: color});
			pixqueue.unshift({pos: [start[0] - pos[1], start[1] + pos[0]], color: color});
			pixqueue.unshift({pos: [start[0] + pos[1], start[1] - pos[0]], color: color});
			pixqueue.unshift({pos: [start[0] - pos[1], start[1] - pos[0]], color: color});
			if(pos[0]*pos[0] + pos[1]*pos[1] > radsqr) --pos[1];
			++pos[0];
			++i;
			if(i > 1000000){
				alert('Too large circle !');
				break;
			}
		}
		inprog = false;
	});
}));
var smileytoolcss = (function() {var style = document.createElement('style');style.appendChild(document.createTextNode(''));document.head.appendChild(style);return style.sheet;})();
smileytoolcss .addRule('button#tool-paste div','background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAYAAACGVs+MAAABsElEQVRIDe1WO05DMRA0KBeiICKio6Og5R6IHgQ9yjmgpUhHh0Ch4CLcATJBY01Wu/68lydRYCnx7Hq9M7vv2UlKI8bF0ek3PiNSpIOhmy3x8+froFzdm5T4/OF2q391fZfr6BXSJcCSkxhCiKGkR0QoQMlyeRvgVY31yM+9kahDBugckWsMCeFTrDGKo5wzDfLw8Xye3R/rdcYAEXFpz06CjeE+AqrVRNxoRdDPubTHewzVDjAxZ4+Aa0PmLgGXy/vM8XR1k2BjxiDWGPi5DuyNLgFI8PL+ls5OFl6u7ENM6+gWYMlZuRJ+Pa7ULOJuAbY62LbtYKSv9gjce6AkGdVphcBWFPZ7Pi9vtQMtlWwFyXvBPR6h9VUFaCWKkUhtYs6WKLK7L6IoUcnPy8u7iKrvANqpLbWYtsYpLgnDWlUAgtBWJiWGH0NbbjHF/Ub6300CcPZ5nPQeAKHaiqPTYWU0CbCVMYkeR/g0DrZdh8+OJgGaSLFtsXbAEkX2oGPISjkjeYQjYvr//jGk0qnmpndgKnLk/RdQPAW8w6d8BO4pACH/Ge+L3Psh2lfuUXl+AJZp1pxOg0LkAAAAAElFTkSuQmCC) !important;background-position: 0 0 !important; background-repeat: no-repeat;', 0);
//smileytoolcss .addRule('button#tool-paste.selected div','background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAYAAACGVs+MAAAAe0lEQVRIDWNgoAD4Glr/B2EKjGBgJFczusWbzx8lyyySNaFbjO4BUh1CkgMIWQ5zDCmOwOkAYi2DWUqIxuUorA6gtuUwx2FzBBNMcqDoUQeMhsBoCIyGwGgIjIbAaAiMhsBoCIyGwGgIYO0XgJro1O4bYOsTDFRXAMVeAB97G6WtYtlEAAAAAElFTkSuQmCC) !important;background-position: 0 0 !important;', 0);
// Custom drawing tool
OWOP.tool.addToolObject(new OWOP.tool.class('customdrav', OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, function(tool){
	tool.setEvent('mousedown', (mouse, event) => {
		if(event.button === 1) return;
		start = [mouse.tileX, mouse.tileY];
		for(let y = 0; y < drawing.length; ++y){
			for(let x = 0; x < drawing[0].length; ++x){
				pixqueue.unshift({
					pos: [x+start[0], y+start[1]],
					color: palette[drawing[y][x]]
				});
			}
		}
	});
}));
    function chekCol(col1, col2){
        let c00 = col1[0],
            c10 = col1[1],
            c20 = col1[2],
            c01 = col2[0],
            c11 = col2[1],
            c21 = col2[2];
        if(c00 == c01 && c10 == c11 && c20 == c21) return true
    }
let fillAreaAfterSelected = false;
function drawFromTo(x1, y1, x2, y2, color){
    let color1 = OWOP.player.selectedColor;
    let xStart = x1 > x2 ? x2 : x1;
    let yStart = y1 > y2 ? y2 : y1;
    let xEnd = x1 < x2 ? x2 : x1;
    let yEnd = y1 < y2 ? y2 : y1;
    let stop = false;
    if(!gaePast){
    draw()
    } else {
        for (var x = xStart; x < xEnd; x++) {
      if (stop) break;
      for (var y = yStart; y < yEnd; y++) {
        if (stop) break;
          if(!chekCol(color1, OWOP.world.getPixel(x,y))){
              pixqueue.unshift({pos: [x, y], color: color});
          }

      }
    }
    }
  async function draw() {
    for (var x = xStart; x < xEnd; x++) {
      if (stop121) break;
      for (var y = yStart; y < yEnd; y++) {
        if (stop121) break;
          if(!chekCol(color1, OWOP.world.getPixel(x,y))){
              let abc = getFree();
              if(!bots[abc].BOJS.world.setPixel(x,y,color)){
                  y--
                  await sleep(0)
              }
          }

      }
    }
  }
}
let areaa = 1;
   /* OWOP.tool.addToolObject(new OWOP.tool.class('Fill2', OWOP.cursors.fill, OWOP.fx.player.NONE, false, function (tool) {
		//tool.extra.tickAmount = 1000;
		//var queue = [];
        var x = OWOP.mouse.tileX;
	    var y = OWOP.mouse.tileY;
		var fillingColor = null;
		var defaultFx = OWOP.fx.player.RECT_SELECT_ALIGNED(1);
		tool.setFxRenderer(function (fx, ctx, time) {
			ctx.globalAlpha = 0.8;
			ctx.strokeStyle = fx.extra.player.htmlRgb;
			var z = OWOP.camera.zoom;
			if (!fillingColor || !fx.extra.isLocalPlayer) {
				defaultFx(fx, ctx, time);
			} else {
				ctx.beginPath();
				//for (var i = 0; i < queue.length; i++) {
				//	ctx.rect((queue[i][0] - OWOP.camera.x) * z, (queue[i][1] - OWOP.camera.y) * z, z, z);
				//}
				ctx.stroke();
			}
		});
		function tick() {
			var eq = function eq(a, b) {
				return a && b && a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
			};
			var check = function check(x, y) {
				if (eq(OWOP.world.getPixel(x, y), fillingColor)) {
					//queue.unshift([x, y]);
					return true;
				}
				return false;
			};

			//if (!queue.length || !fillingColor) {
			//	return;
			//}

			var selClr = OWOP.player.selectedColor;
			//var tickAmount = 0;
				//var current = queue.pop();
				//var x = OWOP.mouse.tileX;
				//var y = OWOP.mouse.tileY;
				var thisClr = OWOP.world.getPixel(x, y);
				if (eq(thisClr, fillingColor) && !eq(thisClr, selClr)) {
            //let abc = getFree();
                    pixqueue.unshift({pos: [x, y],color: selClr});
						//queue.push(current);

					// diamond check first
					var top = check(x, y - 1);
					var bottom = check(x, y + 1);
					var left = check(x - 1, y);
					var right = check(x + 1, y);

					// if corners are not closed by parts of the diamond, then they can be accessed
					//if (top && left) {
					//	check(x - 1, y - 1);
					//}
					//if (top && right) {
					//	check(x + 1, y - 1);
					//}
					//if (bottom && left) {
					//	check(x - 1, y + 1);
					//}
					//if (bottom && right) {
					//	check(x + 1, y + 1);
					//}

					// Shape diamond, infra not like
					check(x    , y - 1);
                    check(x - 1, y    );
                    check(x + 1, y    );
                    check(x    , y + 1);
				}
		}
		tool.setEvent('mousedown', function (mouse) {
			if (!(mouse.buttons & 4)) {
				fillingColor = OWOP.world.getPixel(mouse.tileX, mouse.tileY);
				//if (fillingColor) {
					//queue.push([mouse.tileX, mouse.tileY]);
					tool.setEvent('tick', tick);
				//}
			}
		});
		tool.setEvent('mouseup deselect', function (mouse) {
			if (!mouse || !(mouse.buttons & 1)) {
				fillingColor = null;
				//queue = [];
				tool.setEvent('tick', null);
			}
		});
	}));*/
OWOP.tool.addToolObject(new OWOP.tool.class('FastArea', OWOP.cursors.select, OWOP.fx.player.NONE, OWOP.RANK.USER, function (tool) {
  try {
  tool.setFxRenderer(function (fx, ctx, time) {
      if (!fx.extra.isLocalPlayer) return 1;
      let x = fx.extra.player.x;
      let y = fx.extra.player.y;
      let fxx = (Math.floor(x / areaa) - OWOP.camera.x) * OWOP.camera.zoom;
      let fxy = (Math.floor(y / areaa) - OWOP.camera.y) * OWOP.camera.zoom;
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
          ctx.globalAlpha = 0.25;
          ctx.strokeStyle = "#FFFFFF";
          ctx.stroke();
          ctx.setLineDash([3, 4]);
          ctx.strokeStyle = "#000000";
          ctx.stroke();
          ctx.globalAlpha = 0.25 + Math.sin(time / 320) / 4;
          ctx.fillStyle = OWOP.renderer.patterns.unloaded;
          ctx.fill();
          ctx.setLineDash([]);
          let oldfont = ctx.font;
          ctx.font = "16px sans-serif";
          let txt = (!tool.extra.clicking ? "Right-Click Inside to start. | Right-Click Anywhere to stop. " : "") + '(' + Math.abs(w) + 'x' + Math.abs(h) + ')';
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
          ctx.moveTo(fxx + 0.5, 0);

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

  tool.setEvent('mousedown', function (mouse, event) {

      let s = tool.extra.start;
      let e = tool.extra.end;
      let isInside = function isInside() {
          return mouse.tileX >= s[0] && mouse.tileX < e[0] && mouse.tileY >= s[1] && mouse.tileY < e[1];
      };
      if (mouse.buttons === 1 && !tool.extra.end) {
          tool.extra.start = [Math.floor(mouse.tileX / areaa) * areaa, Math.floor(mouse.tileY / areaa) * areaa];
          tool.extra.clicking = true;
          tool.setEvent('mousemove', function (mouse, event) {
              if (tool.extra.start && mouse.buttons === 1) {
                  tool.extra.end = [Math.floor(mouse.tileX / areaa) * areaa, Math.floor(mouse.tileY / areaa) * areaa];
                  return 1;
              }
          });

          let finish = function finish() {
              tool.setEvent('mousemove mouseup deselect', null);
              tool.extra.clicking = false;
              let s = tool.extra.start;
              let e = tool.extra.end;

              if (fillAreaAfterSelected == true) {
                let color = OWOP.player.selectedColor;
                drawFromTo(tool.extra.start[0], tool.extra.start[1], tool.extra.end[0], tool.extra.end[1], color)
                tool.extra.start = null;
                tool.extra.end = null;
                OWOP.renderer.render(OWOP.renderer.rendertype.FX);
              }

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
                  };
              });
          }
      } else if (mouse.buttons === 2 && tool.extra.end && isInside()) {
          let color = OWOP.player.selectedColor;
          drawFromTo(tool.extra.start[0], tool.extra.start[1], tool.extra.end[0], tool.extra.end[1], color)
      } else {
          tool.extra.start = null;
          tool.extra.end = null;
      }
  });
} catch (e) {
  console.log(e)
}
}));
// Text tool
OWOP.tool.addToolObject(new OWOP.tool.class('text', OWOP.cursors.write, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, function(tool){
	tool.setEvent('mousedown', (mouse, event) => {
		if(event.button === 1) return;
		let text = prompt('Enter text here');
		if(text === null) return;
		text = [...text.toUpperCase()];
		let tpos = {x: mouse.tileX, y: mouse.tileY};
		const pos = {x: mouse.tileX, y: mouse.tileY};
		let length = 0;
		for(let i = 0; i < text.length; ++i){
			const letter = letters[text[i]];
			for(let y = 0; y < 6; ++y){
				for(let x = 0; x < letter[0].length; ++x){
					pixqueue.unshift({
						pos: [tpos.x + x, tpos.y + y],
						color: letter[y][x] ? (event.button === 2 ? OWOP.player.selectedColor: [0, 0, 0]): [0xff, 0xff, 0xff]
					});
				}
			}
			tpos.x += letter[0].length + 1;
			length += letter[0].length + 1;
			if(i < text.length - 1){
				for(let y = 0; y < 6; ++y){
					pixqueue.unshift({
						pos: [tpos.x - 1, tpos.y + y],
						color: [0xff, 0xff, 0xff]
					});
				}
			}
		}
		for(let x = -1; x < length; ++x){
			pixqueue.unshift({
				pos: [pos.x + x, pos.y - 1],
				color: [0xff, 0xff, 0xff]
			});
		}
		for(let y = -1; y < 5; ++y){
			pixqueue.unshift({
				pos: [pos.x - 1, pos.y + y],
				color: [0xff, 0xff, 0xff]
			});
			pixqueue.unshift({
				pos: [pos.x + length - 1, pos.y + y],
				color: [0xff, 0xff, 0xff]
			});
		}
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
                            if(!chekCol(OWOP.world.getPixel(X + x, Y + y),OWOP.world.protection.pixels[`${X + x},${Y + y}`])){
                                let abc = getFree();
                                bots[abc].BOJS.world.setPixel(X + x, Y + y, OWOP.world.protection.pixels[`${X + x},${Y + y}`]);
                        }
                        }, 5000);
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
    OWOP.tool.addToolObject(new OWOP.tool.class('NEW TIMER', OWOP.cursors.write, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, function(tool){
    // элемент canvas, контекст и разделитель
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
        let XX;
        let YY;
    let divided = ':';
    // размеры полотна и заливка
    canvas.width = 100;
    canvas.height = 20;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // стили текста (цифр)
    ctx.font = '14px Arial'; // размер и шрифт
    ctx.textBaseline = 'middle'; // по центру, относительно top bottom
    ctx.textAlign = 'center'; // по центру, относительно left right
    //clockShow(); // поехали!
    // функция отрисовки кадра
    function clockShow() {
        let now = new Date();
        // условия для ведущего нуля и двоеточия
        //if(hour < 10) hour = '0' + hour;
        //if(min < 10) min = '0' + min;
        divided === ':' ? divided = ' ' : divided = ':';
        //ctx.clearRect(20, 20, canvas.width - 40, canvas.height - 40); // очистка
        ctx.fillStyle = '#000'; // цвет заливки
        ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40); // заливка
        ctx.fillStyle = '#00FD00'; // цвет текста
        ctx.fillText(now.toLocaleTimeString(), canvas.width / 2, canvas.height / 2 + 1); // вывод текста
        // рамка
    ctx.strokeStyle = '#808080'; // цвет
    ctx.lineWidth = 2; // толщина
    ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);
        ctx.imageSmoothingEnabled = false;
        //ctx.fontSmooth = false;
    }
    	tool.setEvent('mousedown', (mouse, event) => {
		if(event.button == 0){
            clockShow();
        XX = OWOP.mouse.tileX;
        YY = OWOP.mouse.tileY;
        stop = true;
            function Timer(){
            if (stop121) return;
                setTimeout(() => {
		paste(ctx.getImageData(0, 0, canvas.width, canvas.height), [XX, YY]);
                },500)
                setTimeout(() => {
          clockShow();
          }, 500);
                setTimeout(() => {
            Timer()
                },500)
            }
            Timer()
        }
	});
    function lerp(v0, v1, r) {
    return v0 * (1 - r) + v1 * r;
    }
    let paster = 1;
	let paste = (imgdata, pos) => {
        async function pastir(){
		for(let y = 0; y < imgdata.height; ++y){
      if (stop121) break;
			for(let x = 0; x < imgdata.width; ++x){
      if (stop121) break;
				const idx = (x + y*imgdata.width) << 2;
                let alpha = imgdata.data[idx + 3] / 255;
                let pixel = OWOP.world.getPixel(x + pos[0], y + pos[1]);
                let color = [
                   lerp(pixel[0], imgdata.data[idx], alpha),
                   lerp(pixel[1], imgdata.data[idx+1], alpha),
                   lerp(pixel[2], imgdata.data[idx+2], alpha)
                 ];
				//const color = [imgdata.data[idx], imgdata.data[idx+1], imgdata.data[idx+2]];
                if(gaePast){
                pixqueue.unshift({pos: [x+pos[0], y+pos[1]], color: color});
                } else {
                    if(!chekCol(color, OWOP.world.getPixel(x+pos[0], y+pos[1]))){// && OWOP.world.getPixel(x,y)[1] != color[1] && OWOP.world.getPixel(x,y)[2] != color[2]){
              let abc = getFree();
              bots[abc].BOJS.world.setPixel(x+pos[0], y+pos[1],color)
                  //await sleep(0)
          }
                }
			}

		}
            stop = false;
        }
            pastir()
    }
    }));
    /*    //////////////////////////////////////////dont use this shit//////////////////////////////////////////    */
    OWOP.tool.addToolObject(new OWOP.tool.class('timer', OWOP.cursors.write, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, function(tool){
	tool.setEvent('mousedown', (mouse, event) => {
        let X = mouse.tileX;
        let Y = mouse.tileY;
		if(event.button === 1) return;
        setInterval(() => {
        let now = new Date();
        texting(now.toLocaleTimeString())
        },500)
        function texting(text){
        //pps = [0, 100000000, 100, 1000000][OWOP.player.rank]
		text = [...text.toUpperCase()];
		let tpos = {x: X, y: Y};
		const pos = {x: X, y: Y};
		let length = 0;
		for(let i = 0; i < text.length; ++i){
			const letter = letters[text[i]];
			for(let y = 0; y < 6; ++y){
				for(let x = 0; x < letter[0].length; ++x){
					pixqueue.unshift({
						pos: [tpos.x + x, tpos.y + y],
						color: letter[y][x] ? (event.button === 2 ? OWOP.player.selectedColor: [0, 0, 0]): [0xff, 0xff, 0xff]
					});
				}
			}
			tpos.x += letter[0].length + 1;
			length += letter[0].length + 1;
			if(i < text.length - 1){
				for(let y = 0; y < 6; ++y){
					pixqueue.unshift({
						pos: [tpos.x - 1, tpos.y + y],
						color: [0xff, 0xff, 0xff]
					});
				}
			}
		}
		for(let x = -1; x < length; ++x){
			pixqueue.unshift({
				pos: [pos.x + x, pos.y - 1],
				color: [0xff, 0xff, 0xff]
			});
		}
		for(let y = -1; y < 5; ++y){
			pixqueue.unshift({
				pos: [pos.x - 1, pos.y + y],
				color: [0xff, 0xff, 0xff]
			});
			pixqueue.unshift({
				pos: [pos.x + length - 1, pos.y + y],
				color: [0xff, 0xff, 0xff]
			});
		}
	}
    });
}));
    /*    //////////////////////////////////////////dont use this shit//////////////////////////////////////////    */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

let last = 0;
const getFree = () => {
    let b = bots.length;
    if (b === 0) return -1;
    if (last >= b) last = 0;
    return last++;
};
    let stop = false;
OWOP.tool.addToolObject(new OWOP.tool.class('paste', OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), false, function(tool){
		let c = document.createElement('canvas');
		let ctx = c.getContext('2d');
      const misc = OWOP.misc;
      const camera = OWOP.camera;
    let anage;
    let anage1;
    let XX;
    let YY;
    tool.setFxRenderer(function (fx, ctx, time) {
    let zoom = camera.zoom;
      if (stop) {
      let fxx = Math.floor(XX << 4 / 16) - camera.x;
      let fxy = Math.floor(YY << 4 / 16) - camera.y;

      if (fx.extra.isLocalPlayer && c.width && c.height) {
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = "#000000";
        ctx.scale(zoom, zoom);
        ctx.drawImage(c, fxx, fxy);
        ctx.scale(1 / zoom, 1 / zoom);
        ctx.globalAlpha = 0.8;
        ctx.strokeRect(fxx * zoom, fxy * zoom, c.width * zoom, c.height * zoom);
        return 0;
      }
    } else if(!stop) {
      let fxx = Math.floor(OWOP.mouse.tileX << 4 / 16) - camera.x;
      let fxy = Math.floor(OWOP.mouse.tileY << 4 / 16) - camera.y;
      if (fx.extra.isLocalPlayer && c.width && c.height) {
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = "#000000";
        ctx.scale(zoom, zoom);
        ctx.drawImage(c, fxx, fxy);
        ctx.scale(1 / zoom, 1 / zoom);
        ctx.globalAlpha = 0.8;
        ctx.strokeRect(fxx * zoom, fxy * zoom, c.width * zoom, c.height * zoom);
        return 0;
      }
    }
  });
    tool.setEvent("select", function () {
        //stop = false;
        if(!stop){
        let fileinp = document.createElement('input');
		fileinp.type = 'file';
		fileinp.accept = 'image/*';
		fileinp.click();
		fileinp.addEventListener('change', () => {
			if(fileinp.files.length === 0) return;
			const file = fileinp.files[0];
			let img = new Image;
			img.onload = () => {
				c.height = img.height;
				c.width	= img.width ;
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, img.width, img.height);
                anage = img;
                ctx.getImageData(0, 0, anage.width, anage.height)
				ctx.drawImage(img, 0, 0);
                anage1 = ctx;
				URL.revokeObjectURL(img.src);
			};
			img.src = URL.createObjectURL(file);
		});
        }
    })
	tool.setEvent('mousedown', (mouse, event) => {
		if(event.button == 0){
        last.x = OWOP.mouse.tileX;
        last.y = OWOP.mouse.tileY;
        stop = true;
		paste(ctx.getImageData(0, 0, anage.width, anage.height), [mouse.tileX, mouse.tileY]);
        } else {
            stop = false;
            stop121 = true;
            setTimeout(() => {
                stop121 = false;
            },1000)
            //stop = false;
        }
	});
    function lerp(v0, v1, r) {
    return v0 * (1 - r) + v1 * r;
    }
    let paster = 1;
	let paste = (imgdata, pos) => {
        async function pastir(){
            XX = pos[0]
            YY = pos[1]
		for(let y = 0; y < imgdata.height; ++y){
      if (stop121) break;
			for(let x = 0; x < imgdata.width; ++x){
      if (stop121) break;
				const idx = (x + y*imgdata.width) << 2;
                let alpha = imgdata.data[idx + 3] / 255;
                let pixel = OWOP.world.getPixel(x + pos[0], y + pos[1]);
                let color = [
                   lerp(pixel[0], imgdata.data[idx], alpha),
                   lerp(pixel[1], imgdata.data[idx+1], alpha),
                   lerp(pixel[2], imgdata.data[idx+2], alpha)
                 ];
				//const color = [imgdata.data[idx], imgdata.data[idx+1], imgdata.data[idx+2]];
                if(gaePast){
                pixqueue.unshift({pos: [x+pos[0], y+pos[1]], color: color});
                } else {
                    if(!chekCol(color, OWOP.world.getPixel(x+pos[0], y+pos[1]))){// && OWOP.world.getPixel(x,y)[1] != color[1] && OWOP.world.getPixel(x,y)[2] != color[2]){
              let abc = getFree();
              if(!bots[abc].BOJS.world.setPixel(x+pos[0], y+pos[1],color)){
                  x--
                  await sleep(0)
              }
          }
                }
			}

		}
            stop = false;
        }
            pastir()
    }
	//};
}));
function dist(x, y) {
  return Math.sqrt(x * x + y * y);
}
    let chunkStack = [];

OWOP.tool.addToolObject(new OWOP.tool.class('Erase', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(16), false, function(tool){
	let inprog = false;
    let pix = 16;
	const set = (x, y, color) => {
		OWOP.net.protocol.lastSentX = x*16;
		OWOP.net.protocol.lastSentY = y*16;
		OWOP.net.connection.send(new Int32Array([OWOP.net.protocol.lastSentX, OWOP.net.protocol.lastSentY, 0]).buffer);
		OWOP.world.setPixel(x, y, color);
	};
	const eq = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
	function clearChunk(chunkX, chunkY){
        let color = event.button===0?OWOP.player.selectedColor:[0xff,0xff,0xff];
		for(let y = 0; y < 16; ++y){
			for(let x = 0; x < 16; ++x){
                let index = 0
                let tpix = chunkStack.splice(index, 1)[0];
                let pos = [chunkX*16 + tpix[0], chunkY*16 + tpix[1]];
				if((!eq(OWOP.world.getPixel(...pos), color)) && (pixqueue.filter(i => eq(i, pos)).length < 1)){
					pixqueue.unshift({pos: pos, color: color});
				}
			}
		}
	}
	tool.setEvent('mousedown', function(mouse, event){
		//if(mouse.buttons === 1){
            for (let x = 0; x < 16; x++) {
                        for (let y = 0; y < 16; y++) {
            chunkStack.sort((a, b) => dist(a[0] - 8, a[1] - 8) - dist(b[0] - 8, b[1] - 8));
                chunkStack.push([x, y]);
                }
            }
			clearChunk(Math.floor(OWOP.mouse.tileX/16), Math.floor(OWOP.mouse.tileY/16));
		//}
		inprog = true;
	});
}));

function clearBuffer(){
	pixqueue = [];
}
}
var interval = setInterval(() => {
    if(OPM.require('better-owop-js') && OPM.require("api")){
        clearInterval(interval);
        install();
    }
}, 100)
