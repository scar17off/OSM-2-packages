if (!window.OWOP || !window.OPM) {
  alert("Install OPM 2 or go to OWOP for the bot starts working.");
  throw new Error("Install OPM 2 or go to OWOP for the bot starts working.")
}

let BOJS = OPM.require("better-owop-js")
let API = OPM.require("api");
let CoreUtils = OPM.require("core-utils");

if (typeof BOJS == "undefined" || typeof API == "undefined" || typeof CoreUtils == "undefined") {
  OPM.packages.forEach(function (package) {
    if (package.name == "api" || package.name == "better-owop-js" || package.name == "core-utils") {
      if (!package.installed) {
        package.installBtn.click()
      }
    }
  })

  alert("Reload the page and start the bot again!\nYou don't installed BOJS, API, CoreUtils but we did it for you, reload the page please.")
  throw new Error("Reload the page and start the bot again!\nYou don't installed BOJS, API, CoreUtils but we did it for you, reload the page please.")
}

const Networking = OWOP.require("networking").net;

let proxies = ['i', 'want', 'proxys :/'];

OWOP.fx.world.RECT_FADE_ALIGNED = function() {};
 // less lag if using much bots i think

OWOP.options.unloadDistance = Infinity
 // don't unload chunks

randomColor = function() {
  return [Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255)];
}

let stop = true, pasting = false, fillAreaAfterSelected = false, offx = 0, offy = 0, index = 0;

var drawFromTo, usingFillTool = false, lol = false, solveCaptchas = true;

let drawOnceTwoSeconds = false, limitPixelStackTo = 128000, firstImageLoaded = false;

let pixelPlaced = 0, pixelPlacedTemp = 0, totalImgs = -1, pX, pY, tokencode = '';

let sneakyy = false, rgbb = false, wolfmove = false, movee = true, useMyPquota = false, circlesize = 8, oneColorLin = false;

var misc = OWOP.misc, stopCanvas = false, protectInterval = 0, protecting = false;

let bots = [];
let bot = {};

let connect2 = API.maxConnectionsPerIp, connect1 = API.maxConnectionsPerIp - 1, connected = 0, paintFollow = false;

let barenabled = false, totalsize = 0, skipPixel = 1;
switch_to_player_tool = false, restando = 0;

bot.world = {};
bot.options = {};
bot.chat = {};

bot.options.pixelQueue = 0;

bot.options.chatQueue = 0;
bot.options.spam = false;
bot.options.typingBybots = false;

bot.options.followSpeed = 50;

bot.options.ws = 'ws://ourworldofpixels.com'

bot.options.chunkToolSizex = 1;
bot.options.chunkToolSizey = 1;
bot.options.chunkToolStop = false;

var um = -30, dois = 20, tres = 10, quatro = 20, cinco = 30, seis = -20, sete = 20, oito = 10, nove = 4;
//one, two, three, four, five, six, seven, eight, nine
var followCount = 0, followInt;

  bot.world.follow = function(anim) {
    if (bot.options.interval) {
      clearInterval(bot.options.interval)
      bot.options.interval = undefined;
    }
  
    var PI2 = 2 * Math.PI, followAdd, f = 0;
  
    paintFunc = function(posx,posy) {
      var color = OWOP.player.selectedColor
      if (paintFollow == true) {
        bot.world.setPixel(posx, posy, color, rgbb)
      }
    }
  
    var animFunc = function() {};
  
    switch (anim) {
      case 'Random':
    
        followAdd = PI2 / bot.options.followSpeed
        animFunc = function() {
          var i = bots.length;
            while (i--) {
              var pos = {};
              pos.x = OWOP.mouse.tileX - (16 + i) + Math.floor(Math.random() * (16 + i))
              pos.y = OWOP.mouse.tileY - (16 + i) + Math.floor(Math.random() * (16 + i))
              paintFunc(pos.x, pos.y)
              bots[i].BOJS.world.move(pos.x, pos.y)
            }
            f = (f + followAdd) % PI2;
          }
       break;
     case 'Line 1':
      
      followAdd = PI2 / bot.options.followSpeed
      animFunc = function() {
        var i = bots.length;

          while (i--) {
            var pos = {};
            pos.x = OWOP.mouse.tileX = OWOP.mouse.tileX + 2 * i;
            pos.y = OWOP.mouse.tileY = OWOP.mouse.tileY;
            paintFunc(pos.x, pos.y)
            bots[i].BOJS.world.move(pos.x, pos.y)
          }
          f = (f + followAdd) % PI2;
        }
      break;
      case 'Line 2':
        
        followAdd = PI2 / bot.options.followSpeed
        animFunc = function() {
          var i = bots.length;
  
            while (i--) {
              var pos = {};
              pos.x = OWOP.mouse.tileX = OWOP.mouse.tileX + 2 * i;
              pos.y = OWOP.mouse.tileY = OWOP.mouse.tileY + 2 * i;
              paintFunc(pos.x, pos.y)
              bots[i].BOJS.world.move(pos.x, pos.y)
            }
            f = (f + followAdd) % PI2;
          }
        break;
     case 'Line 3':
      
      followAdd = PI2 / bot.options.followSpeed
      animFunc = function() {
        var i = bots.length;

          while (i--) {
            var pos = {};
            pos.x = OWOP.mouse.tileX = OWOP.mouse.tileX;
            pos.y = OWOP.mouse.tileY = OWOP.mouse.tileY + 2 * i;
            paintFunc(pos.x, pos.y)
            bots[i].BOJS.world.move(pos.x, pos.y)
          }
          f = (f + followAdd) % PI2;
        }
      break;
      case 'Line 4':
        
        followAdd = PI2 / bot.options.followSpeed
        animFunc = function() {
          var i = bots.length;
  
            while (i--) {
              var pos = {};
              pos.x = OWOP.mouse.tileX = OWOP.mouse.tileX - 2 * i;
              pos.y = OWOP.mouse.tileY = OWOP.mouse.tileY + 2 * i;
              paintFunc(pos.x, pos.y)
              bots[i].BOJS.world.move(pos.x, pos.y)
            }
            f = (f + followAdd) % PI2;
          }
      break;
      case 'Line 5':
        
        followAdd = PI2 / bot.options.followSpeed
        animFunc = function() {
          var i = bots.length;
  
            while (i--) {
              var pos = {};
              pos.x = OWOP.mouse.tileX = OWOP.mouse.tileX - 2 * i;
              pos.y = OWOP.mouse.tileY = OWOP.mouse.tileY;
              paintFunc(pos.x, pos.y)
              bots[i].BOJS.world.move(pos.x, pos.y)
            }
            f = (f + followAdd) % PI2;
          }
      break;
      case 'Line 6':
        
        followAdd = PI2 / bot.options.followSpeed
        animFunc = function() {
          var i = bots.length;
  
            while (i--) {
              var pos = {};
              pos.x = OWOP.mouse.tileX = OWOP.mouse.tileX - 2 * i;
              pos.y = OWOP.mouse.tileY = OWOP.mouse.tileY - 2 * i;
              paintFunc(pos.x, pos.y)
              bots[i].BOJS.world.move(pos.x, pos.y)
            }
            f = (f + followAdd) % PI2;
          }
      break;
      case 'Line 7':
        
        followAdd = PI2 / bot.options.followSpeed
        animFunc = function() {
          var i = bots.length;
  
            while (i--) {
              var pos = {};
              pos.x = OWOP.mouse.tileX = OWOP.mouse.tileX;
              pos.y = OWOP.mouse.tileY = OWOP.mouse.tileY - 2 * i;
              paintFunc(pos.x, pos.y)
              bots[i].BOJS.world.move(pos.x, pos.y)
            }
            f = (f + followAdd) % PI2;
          }
      break;
      case 'Line 8':
        
        followAdd = PI2 / bot.options.followSpeed
        animFunc = function() {
          var i = bots.length;
  
            while (i--) {
              var pos = {};
              pos.x = OWOP.mouse.tileX = OWOP.mouse.tileX + 2 * i;
              pos.y = OWOP.mouse.tileY = OWOP.mouse.tileY - 2 * i;
              paintFunc(pos.x, pos.y)
              bots[i].BOJS.world.move(pos.x, pos.y)
            }
            f = (f + followAdd) % PI2;
          }
      break;
      case 'Lines':
        followInt = setInterval(() => {
          if (followCount == 8) followCount = 0;
                  followCount++;
                  bot.world.follow(`Line ${followCount}`, 1)
          },300)
      break;
      case 'X':
        
        followAdd = PI2 / bot.options.followSpeed
        um = 3, dois = 15, tres = 15, quatro = 3, cinco = 8, seis = 9, sete = 3, oito = -15, nove = 2
        animFunc = function() {
          var botslen = 7;
            while (botslen--) {
              var pos = {};
  
              var r = nove * Math.PI / bots.length * bots.length + f;
              if(botslen%nove == 0){
                  var s = Math.sin(r);
                  pos.y = OWOP.mouse.tileY + (Math.cos(r) * 3 + dois * s);
                  pos.x = OWOP.mouse.tileX + (s * tres + quatro * s);
              } else {
                  var c = Math.cos(r)
                  pos.x = OWOP.mouse.tileX + (c * cinco + seis * c);
                  pos.y = OWOP.mouse.tileY + (Math.sin(r) * sete + oito * c);
            }
              paintFunc(pos.x, pos.y)
              bots[i].BOJS.world.move(pos.x, pos.y)
            }
            f = (f + followAdd) % PI2;
          }
      break;
      case 'Flower':
        
        followAdd = PI2 / bot.options.followSpeed
        um = -30, dois = 0, tres = 0, quatro = -10, cinco = 15, seis = 20, sete = 8, oito = 0, nove = 3

        animFunc = function() {
          var i = bots.length;
            while (i--) {
              var pos = {};
  
              var r = nove * Math.PI / bots.length * i + f;
              if(i%nove == 0){
                  var s = Math.sin(r);
                  pos.y = OWOP.mouse.tileY + (Math.cos(r) * um + dois * s);
                  pos.x = OWOP.mouse.tileX + (s * tres + quatro * s);
              } else {
                  var c = Math.cos(r)
                  pos.x = OWOP.mouse.tileX + (c * cinco + seis * c);
                  pos.y = OWOP.mouse.tileY + (Math.sin(r) * sete + oito * c);
            }
              paintFunc(pos.x, pos.y)
              bots[i].BOJS.world.move(pos.x, pos.y)
            }
            f = (f + followAdd) % PI2;
          }
      break;
      case 'Circle 3':
        
        followAdd = PI2 / bot.options.followSpeed
        circlesize = 32;

        followInt = setInterval(() => {
          circlesize--;
          if (circlesize == 16) circlesize = 32;
        },100)

        animFunc = function() {
          var i = bots.length;
            while (i--) {
              var pos = {};
  
              pos.x = OWOP.mouse.tileX + (Math.cos(1 * Math.PI / bots.length * i + f) * circlesize);
              pos.y = OWOP.mouse.tileY + (Math.sin(1 * Math.PI / bots.length * i + f) * circlesize);
              paintFunc(pos.x, pos.y)
              bots[i].BOJS.world.move(pos.x, pos.y)
            }
            f = (f + followAdd) % PI2;
          }
      break;
      case 'Circle 2':
        
        followAdd = PI2 / bot.options.followSpeed
        circlesize = 16;

        followInt = setInterval(() => {
          circlesize++;
          if (circlesize == 32) circlesize = 16;
        },100)

        animFunc = function() {
          var i = bots.length;
            while (i--) {
              var pos = {};
  
              pos.x = OWOP.mouse.tileX + (Math.cos(1 * Math.PI / bots.length * i + f) * circlesize);
              pos.y = OWOP.mouse.tileY + (Math.sin(1 * Math.PI / bots.length * i + f) * circlesize);
              paintFunc(pos.x, pos.y)
              bots[i].BOJS.world.move(pos.x, pos.y)
            }
            f = (f + followAdd) % PI2;
          }
      break;
      case 'Circle 1':
        
        followAdd = PI2 / bot.options.followSpeed
        animFunc = function() {
          var i = bots.length;
            while (i--) {
              var pos = {};
              pos.x = OWOP.mouse.tileX + (Math.sin(12 / Math.PI / bots.length * i + f) * 12);
              pos.y = OWOP.mouse.tileY + (Math.cos(12 / Math.PI / bots.length * i + f) * 12);
              paintFunc(pos.x, pos.y)
              bots[i].BOJS.world.move(pos.x, pos.y)
            }
            f = (f + followAdd) % PI2;
          }
        break;
    }
    bot.options.interval = setInterval(animFunc, 100)
  }

bot.getCanSpend = function () {
  let client;
  for (let i = 0; i < bots.length; i++) {
    if (bots[i].BOJS.player.pixelBucket.canSpend(1)) {
      bots[i].BOJS.player.pixelBucket.allowance++
      client = bots[i];
      break;
    }
  }
  return client;
}

function tp(x, y) {
  OWOP.camera.x = x - (window.innerWidth  / OWOP.camera.zoom / 2.5);
  OWOP.camera.y = y - (window.innerHeight / OWOP.camera.zoom / 2.5);
  OWOP.camera.zoom = 16;
  OWOP.renderer.updateCamera();
}

bot.world.setPixel = function (x, y, color, rgbb) {
  if (!bots[0]) return;
  if (!rgbb) {
  let beforeColor = misc.world.getPixel(x, y);
  if (color[0] == beforeColor[0] && color[1] == beforeColor[1] && color[2] == beforeColor[2]) return true;
  } else {
    color = randomColor()
  }
  if (useMyPquota == true) {
    /*
    movePlayer(x,y)*/ //event emiter works but owop disconnects the player :shrug:
    tp(x,y)
    OWOP.world.setPixel(x,y,color)
  }
  var botAsClient = bot.getCanSpend() 
  document.getElementById("connectedspan").textContent = `Total Bots: ${connected}`
  document.getElementById("pixelsplaced").textContent = `${pixelPlaced} pixels placed`
  if (!botAsClient) return false;
  for (i = 0; i < bots.length; i++) {
    bots[i].BOJS.player.pixelBucket.update()
  }
  pixelPlaced++;
  return botAsClient.BOJS.world.setPixel(x, y, color, wolfmove, sneakyy, movee);
}

bot.chat.send = function (msg) {
  if (bot.options.spam) {
    bots.forEach(function (bot) {
      bot.BOJS.chat.send(msg)
    })
  } else {
    if (bot.options.chatQueue >= bots.length) bot.options.chatQueue = 0;
    let botAsClient = bots[bot.options.chatQueue++];
    botAsClient.BOJS.chat.send(msg);
  }
}

bot.world.setTool = function (id) {
  bots.forEach(function (bot) {
    bot.BOJS.world.setTool(id)
  })
}

bot.world.setColor = function (color) {
  bots.forEach(function (bot) {
    bot.BOJS.world.setColor(color)
  })
}

bot.world.move = function (x, y) {
  bots.forEach(function (bot) {
    bot.BOJS.world.move(x, y)
  })
}

var fillPixelStack = [];
async function statsfill() {
  pixelPlacedTemp++;
  totalsize = fillPixelStack.length
  document.getElementById("progressSpan").textContent = `Progress: (` + pixelPlacedTemp + `/` + fillPixelStack.length + `)`
}
bot.world.drawFromTo = class {
  constructor(x1, y1, x2, y2, color = [255, 255, 255]) {
    this.xStart = x1 > x2 ? x2 : x1
    this.yStart = y1 > y2 ? y2 : y1
    this.xEnd = x1 < x2 ? x2 : x1
    this.yEnd = y1 < y2 ? y2 : y1
    this.color = color
    this.index = 0, this.offx = 0, this.offy = 0;
    this.stop = false;
    this.draw()
  }
  async compare() {
    pixelPlacedTemp = 0;
    stop = true; // stop pasting image if pasting image lol
    fillPixelStack = [];
    for (var x = this.xStart; x < this.xEnd; x+=skipPixel) {
      if (this.stop) break;
      for (var y = this.yStart; y < this.yEnd; y+=skipPixel) {
        if (this.stop) break;
        var colorGame = misc.world.getPixel(x, y);
        if (colorGame == this.color) continue; // skip adding pixel to pixelstack if color in game is the same as the selected color

        if (fillPixelStack.length == limitPixelStackTo) continue; // trying to prevent lag
        while (!fillPixelStack.push([x, y, this.color])) {
          await sleep(0)
        }
      }
    }
  }
  async draw() {
    await this.compare()

    var patter = document.getElementById("patterfill").value

    for (var x = this.xStart; x < this.xEnd; x+=skipPixel) {
      if (this.stop) break;
      for (var y = this.yStart; y < this.yEnd; y+=skipPixel) {
        if (this.stop) break;

        switch (patter) {
          case 'Linear-LR':
            this.index = 0;
            break;
          case 'Linear-RL':
            this.index = fillPixelStack.length - 1;
            break;

          case "Duo-Linear":
            this.index = fillPixelStack.indexOf(fillPixelStack.reverse()[0]);
            break;

          case "Random-Linear":
            this.index = 0 + Math.floor(Math.random() * (16 - 0) + 0);;
            break;

          case "Center-Linear":
            this.index = Math.floor(fillPixelStack.length / 2);
            break

          case 'Random':
            this.index = Math.floor(Math.random() * fillPixelStack.length)
            break;
        }

        let tpix = fillPixelStack.splice(this.index, 1)[0];
        var colorGame = misc.world.getPixel(x, y)

        if (colorGame === tpix[2]) continue;
        statsfill()

        while (!bot.world.setPixel(tpix[0], tpix[1], tpix[2], rgbb)) {
          if (drawOnceTwoSeconds == true) await sleep(2000)
          else await sleep(0);
          
        }
      }
    }
    drawFromTo.stop = true;
    document.getElementById("progressSpan").textContent = `Progress: (` + 0 + `/` + 0 + `)`
  }
}

OWOP.util.loadScript("https://www.google.com/recaptcha/api.js");
const renderCaptcha = (botId, count, getToken = true) => new Promise(resolve => {
  OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(`CAPTCHA - ${parseInt(botId+1)}/${count}`, {
    closeable: true
  }, function (win) {
    grecaptcha.render(win.addObj(OWOP.util.mkHTML("div", {})), {
      theme: "dark",
      sitekey: "6LcgvScUAAAAAARUXtwrM8MP0A0N70z4DHNJh-KI",
      callback: function callback(token) {
        if (getToken) {
        tokencode = token;
        console.log("Obtained Token Code. ;-)")
        win.close();
        } else if (!getToken) {
        resolve(token);
        win.close();
        }
      }
    });
  }));
});

function invertNumber(number) {
  return 0 - number
}

class Bot {
  constructor(id) {
    this.BOJS = new BOJS.Client({
      reconnect: false,
      log: false,
      ws: bot.options.ws,//"ws://localhost:12343", //proxies[Math.floor(bots.length / API.maxConnectionsPerIp)],
      world: Networking.protocol.worldName,
      id: bots.length
    });
    this.id = id
    this.BOJS.on("join", this.onJoin.bind(this));
    this.BOJS.on("close", this.onClose.bind(this));
    this.BOJS.on("captcha", this.onCaptcha.bind(this));

  }
  onClose() {
    connected-=1
    console.log(`Bot ${this.id} left the game. ID: ${this.BOJS.player.id}`)
    document.getElementById("connectedspan").textContent = `Total Bots: ${connected}`
    delete bots[bots.indexOf(this)];
    bots.sort().pop();
  }
  onJoin() {
    //connected+=1;
    console.log(`Bot ${this.id} joined the game. ID: ${this.BOJS.player.id}`)
    document.getElementById("connectedspan").textContent = `Total Bots: ${connected}`
    if (lol == true) drawFromTo = new bot.world.drawFromTo(0,0,2,2,randomColor())
  }
  async onCaptcha(id) {
    if (id === 0) {
      if (solveCaptchas == true) {
        var captchacode = await renderCaptcha(this.id, parseInt(document.getElementById("joinCount").value), false)
        this.BOJS.ws.send(OWOP.options.serverAddress[0].proto.misc.tokenVerification + captchacode);
        return;
      }
      if (tokencode == "") return OWOP.chat.local(" You don't generated a Token Code!")
      this.BOJS.ws.send(OWOP.options.serverAddress[0].proto.misc.tokenVerification + tokencode);
    }
  }
}

async function gettokencode() {
  await renderCaptcha(0, 0, true)
}

async function joinbots(count = 8, timeout = 0) {
  API.update();
  for (var i = 0; i < count; i++) {
    bots.push(new Bot(bots.length));
    connected+=1;
    if (i < proxies.length * API.maxConnectionsPerIp && i < count) {
      await sleep(timeout)
    } else {
      break;
    }
  }
}

function disconnectbots() {
  for (var ii = 0; ii < bots.length; ii++) {
   bots[ii].BOJS.ws.close()
  }
  bots = []
}

function format(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

makeWindow();
makeWindow2();
makeWindow3();
makeWindow4();
makeWindow5();
makeWindow6();
makeWindow7();
makeWindow8();


const camera = OWOP.camera;

var last = {
  x: 0,
  y: 0
}

var urlB64, canvasToPaste = `undefined`, imgHeigh, imgWidh, templateCoords = [];

class canvases {

  constructor(id, imgHeight, imgWidth, idkhowtouseclasses = () => {}) {

    this.id = id;
    this.height = imgHeight, this.width = imgWidth;
    this.img = document.createElement("img")
    this.img.title = `Size: ${this.height}x${this.width}`
    this.img.style = 'position: relative; height: 80px; width: 80px; padding: 3px; cursor: pointer; border-radius: 10px;'
    this.img.id = 'img'+id;
    document.getElementById("imgArea").appendChild(this.img)

    var failedToLoad = false;

    setTimeout(() => {
      if (this.img.title == "Size: undefinedxundefined") failedToLoad == true;
    },50)

    if (failedToLoad == true) {
      OWOP.chat.local(" An image failed to load, try again.")
      document.getElementById('img'+id).outerHTML = '';
      return;
    }

    this.img.onmouseover = () => { 
    var imgE = document.getElementById(`img${this.id}`)
    imgE.style.opacity = '0.65';
  }
    this.img.onmouseout = () => { 
    var imgE = document.getElementById(`img${this.id}`)
    imgE.style.opacity = '1';
  }

    this.img.onclick = () => {
      canvasToPaste = `canvas`+this.id
      OWOP.chat.local(` Image-${this.id} selected. Size: ${this.height}x${this.width}`)

      stopCanvas = true;
      setTimeout(() => { stopCanvas = false}, 120)

      setTimeout(() => { drawImageCanvas(this.img.src, this.height, this.width)}, 220)

    }
  }
}

let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", function() {
      if (!input.files || !input.files[0]) return;
      totalImgs++;
    })
    input.addEventListener("change", function () {
      if (!input.files || !input.files[0]) return;

      let reader = new FileReader();
      reader.addEventListener("load", function () {
        let image = new Image();
        image.src = reader.result;
        urlB64 = reader.result;

        image.addEventListener("load", function () {
        var div = document.createElement("canvas")

        //totalImgs++;

        div.id = `canvas${totalImgs}`;
        canvasToPaste = `canvas${totalImgs}`
        div.style = "position: absolute; z-index: -24;"
        div.width = image.width;
        div.height = image.height;
        imgHeigh = image.height;
        imgWidh = image.width;

        document.body.appendChild(div)

          var ctx = document.getElementById(`canvas${totalImgs}`).getContext("2d")

          ctx.drawImage(image, 0, 0);
        });
      });
      reader.readAsDataURL(input.files[0]);

      setTimeout(() => {
      var div = new canvases(totalImgs, imgHeigh, imgWidh) },120)

      setTimeout(() => { 
        document.getElementById(`img${totalImgs}`).src = urlB64
     },250)
    }); 

async function drawImageCanvas(base64, imgHeight, imgWidth) {
  if (document.getElementById("botCanvas")) document.getElementById("botCanvas").outerHTML = '';
  var cX = document.getElementById("iX").value, cY = document.getElementById("iY").value;

  var imagee = new Image();
  imagee.src = base64

  imagee.onload = function() {
  var botCanvas = document.createElement("canvas")
  botCanvas.crossorigin = "Anonymous"
  botCanvas.id = "botCanvas"
  document.body.appendChild(botCanvas)

  botCanvas.height = imgHeight, botCanvas.width = imgWidth;
  var botCanvasContext = botCanvas.getContext("2d")
  botCanvasContext.globalAlpha = "0.72"
  botCanvasContext.drawImage(imagee, 0, 0, imagee.width, imagee.height)

  var b64Canvas = botCanvas.toDataURL()
  
  if (cX == "" && cY == "") return;

  drawImage(cX, cY, botCanvas.height, botCanvas.width, b64Canvas)
  
  }
}

var canvasGame = document.getElementById("animations")
var contextGame = canvasGame.getContext("2d")

drawImage = function(xx, yy, heightt, widthh, base64) {
var imagee = new Image()
imagee.src = base64
imagee.onload = function() {
var zoom = OWOP.camera.zoom
var ex = (xx - OWOP.camera.x) * zoom
var ey = (yy - OWOP.camera.y) * zoom
contextGame.drawImage(imagee, ex, ey, widthh * zoom, heightt * zoom);
if (stopCanvas == true) return;
window.requestAnimationFrame(imagee.onload);
}
}

function makeWindow8() {
  let options = {
    closeable: false
  }
  var mkHTML = OWOP.util.mkHTML

  function windowFunc(wdow8) {

    let inputImg = mkHTML("button", {
    innerHTML: "Open Image",
    style: "width: 50%;",
    onclick: function() {
      input.click()
     }
    })

    let pasteOrStop = mkHTML("button", {
    innerHTML: "Paste",
    style: "width: 50%; user-select: none;",
    id: "pasteOrStop",
    onclick: function() {
      if (pasting == false) {
       pX = document.getElementById("iX").value, pY = document.getElementById("iY").value;
       if (pX == '' || pY == '') return OWOP.chat.local(' Specify a Coordinate dumbass');
       pX = parseInt(pX), pY = parseInt(pY)
       if (canvasToPaste == 'undefined') return OWOP.chat.local(' No images found.')
       if (!bots[0]) return OWOP.chat.local(' No bots online.')
       pasting = true;
       pasteOrStop.innerHTML = "Stop"
       paste(pX, pY, true)
     } else {
       console.log("stopping")
       pasting = false;
       pasteOrStop.innerHTML = "Paste"
       stop = true;
     }
    }
    })

    let inputX = mkHTML("input", {
    type: "number",
    style: "width: 50%;",
    value: 0,
    id: "iX",
    placeholder: "0"
    })

    let inputY = mkHTML("input", {
    type: "number",
    style: "width: 50%;",
    value: 0,
    id: "iY",
    placeholder: "0"
    })

    let inputCooldownProtect = mkHTML("input", {
    type: "number",
    style: "height: 10%; width: 50%;",
    value: 800,
    id: "cooldownProtect",
    placeholder: "580"
    })

    let protectButton = mkHTML("button", {
      innerHTML: "Protect",
      style: "position: relative; top: 0px; height: 9.5%; width: 50%; background-color: #8bc34a; color: white; border: 0px; border-radius: 6px; user-select: none;",
      id: "protButton"
      })

    let clearCanvas = mkHTML("button", {
      innerHTML: "Clear Canvas",
      style: "position: relative; top: 5px; width: 100%; background-color: #e14e31; color: white; border: 0px; border-radius: 6px; user-select: none;",
      id: "clear-canvas",
      onclick: function() {
        stopCanvas = true;
        setTimeout(() => { stopCanvas = false}, 120)
        }
      })

    let skipPixelText = document.createElement("p")
    skipPixelText.innerHTML = "1"
    skipPixelText.id = "skipPixelTextt"
    skipPixelText.style = "position: absolute; top: 100px; right: 6px; font-family: Arial; color: white;"

    let skipPixelText2 = document.createElement("p")
    skipPixelText2.innerHTML = "Skip Pixel"
    skipPixelText2.id = "skipPixelTextt2"
    skipPixelText2.style = "position: absolute; top: 100px; left: 3px; font-family: Arial; color: white;"

    let skipPixelSlider = mkHTML("input", {
      min: 1,
      max: 32,
      value: 1,
      type: "range",
      style: "position: relative; top: 4.2px; left: 78px; width: 62%;",
      id: "skipPixelSlide"
  })
    

    let imageArea = document.createElement("div")
    imageArea.style = "position: absolute; bottom: 0px; left: 1px; height: 135px; width: 275px; background: #7e635c; overflow-y: scroll;"
    imageArea.id = "imgArea"
    wdow8.addObj(imageArea)

    wdow8.addObj(pasteOrStop)
    wdow8.addObj(inputImg)
    wdow8.addObj(mkHTML("br"))
    wdow8.addObj(inputX)
    wdow8.addObj(inputY)
    wdow8.addObj(mkHTML("br"))
    wdow8.addObj(inputCooldownProtect)
    wdow8.addObj(protectButton)
    wdow8.addObj(skipPixelText2)
    wdow8.addObj(skipPixelSlider)
    wdow8.addObj(skipPixelText)
    wdow8.addObj(clearCanvas)
  }
  let wclass = new OWOP.windowSys.class.window("Paste Settings", options, windowFunc);
  OWOP.windowSys.addWindow(wclass).move(window.innerHeight / 3, 30)
}

document.getElementById("skipPixelSlide").oninput = function() {
  document.getElementById("skipPixelTextt").textContent = parseInt(document.getElementById("skipPixelSlide").value)
  skipPixel = parseInt(document.getElementById("skipPixelSlide").value)
}

document.getElementById("protButton").onclick = () => {
  if (protecting == false) {
  if (pasting) return OWOP.chat.local(" You can't protect the image because you're pasting an image!")
  if (!bots[0]) return OWOP.chat.local(" You don't have any bots online!")
  var pXX = document.getElementById("iX").value, pYY = document.getElementById("iY").value;
  if (pXX == '' || pYY == '') return OWOP.chat.local(' Specify a Coordinate dumbass');
  if (document.getElementById("cooldownProtect").value < 800) {
    document.getElementById("cooldownProtect").value = 800;
    OWOP.chat.local(" You have choosen an cooldown minor than 800ms, the minimum it's 800ms, changing cooldown...")
  }
  protecting = true;
  document.getElementById("protButton").style.backgroundColor = "#e14e31"
  document.getElementById("protButton").innerHTML = "Unprotect"
   protectInterval = setInterval(() => {
     try { paste(parseInt(pX), parseInt(pY), false) } catch (e) { console.log(e)}
     setTimeout(() => {
       stop = true;
     },70)
   },document.getElementById("cooldownProtect").value)
  } else {
    protecting = false;
    document.getElementById("protButton").style.backgroundColor = "#8bc34a"
    document.getElementById("protButton").innerHTML = "Protect"
    clearInterval(protectInterval)
  }
}

function makeWindow7() {
  let options = {
    closeable: false
  }
  var mkHTML = OWOP.util.mkHTML

  function windowFunc(wdow7) {

    let captchaspan = mkHTML("span", {
      innerHTML: `<b style='color: orange;'>𝗖𝗔𝗣𝗧𝗖𝗛𝗔 𝗘𝗻𝗮𝗯𝗹𝗲𝗱: </b>` + API.captchaEnabled
    })
    let conss2span = mkHTML("span", {
      innerHTML: `<b style='color: white;'>𝗠𝗮𝘅. 𝗖𝗼𝗻𝗻𝘀 𝗣𝗲𝗿 𝗜𝗣: </b>` + API.maxConnectionsPerIp
    })
    let conssspan = mkHTML("span", {
      innerHTML: `<b id="connectedspan" style='color: white; font-family: Arial;'>Total Bots: ${connected}</b>`
    })

    let pxplacedspan = mkHTML("span", {
      innerHTML: "<b id='pixelsplaced' style='color: white; font-family: Arial;'>0 pixels placed</b>"
    })

    let captcha2span = mkHTML("span", {
      innerHTML: API.captchaEnabled
    })

    let baspan = mkHTML("span", {
      innerHTML: "ㅤ"
    })

    captcha2span.style.color = 'white';

    let percentspan2 = document.createElement("div")
    percentspan2.innerHTML = `Progress: (` + '0' + `/` + '0' + `)`
    percentspan2.id = 'progressSpan'
    percentspan2.style = "position: absolute; top: 54px; left: 0px; color: white; font-family: Arial; font-size: 13px;'"

    let bar = mkHTML("progress", {
      value: 0,
      max: 100,
    })

    setInterval(() => {
      if (barenabled == true)
        bar.value = percent4;
      if (barenabled == false)
        bar.value = 0;
    }, 150)

    let resetplacedbutton = mkHTML("button", {
      innerHTML: "𝗥𝗲𝘀𝗲𝘁 𝗣𝗶𝘅𝗲𝗹𝘀",
      onclick: function () {
        placed = 0;
        window.localStorage.setItem('weirdobot_pixels', '0');
      }
    })

    let savebutton = mkHTML("button", {
      innerHTML: "𝗦𝗮𝘃𝗲 𝗣𝗶𝘅𝗲𝗹𝘀",
      onclick: function () {
        window.localStorage.setItem('weirdobot_pixels', placed);
        OWOP.chat.local("(BOT) Your Pixels has been saved! ")
      }
    })
    window.localStorage.getItem('weirdobot_pixels');
    placed = JSON.parse(window.localStorage.getItem('weirdobot_pixels')); {
      if (placed == null)
        placed = 0;
    }

    captcha2span.style.color = 'white';
    setInterval(() => {
      captchaspan.innerHTML = `<b style='color: red;'>𝗖𝗔𝗣𝗧𝗖𝗛𝗔 𝗘𝗻𝗮𝗯𝗹𝗲𝗱: </b>`
      captcha2span.innerHTML = API.captchaEnabled
      conss2span.innerHTML = `<b style='color: white;'>𝗠𝗮𝘅. 𝗖𝗼𝗻𝗻𝘀 𝗣𝗲𝗿 𝗜𝗣: </b>` + API.maxConnectionsPerIp
    }, 1000)

    wdow7.addObj(captchaspan);
    wdow7.addObj(captcha2span)
    wdow7.addObj(mkHTML("br"))
    wdow7.addObj(conss2span);
    wdow7.addObj(mkHTML("br"))
    wdow7.addObj(mkHTML("br"))
    wdow7.addObj(conssspan);
    wdow7.addObj(mkHTML("br"))
    wdow7.addObj(mkHTML("br"))
    wdow7.addObj(pxplacedspan);
    wdow7.addObj(mkHTML("br"))
    wdow7.addObj(mkHTML("br"))
    wdow7.addObj(resetplacedbutton);
    wdow7.addObj(savebutton);
    wdow7.addObj(mkHTML("br"))
    wdow7.addObj(mkHTML("br"))
    wdow7.addObj(percentspan2);
    wdow7.addObj(mkHTML("br"))
    wdow7.addObj(mkHTML("br"))
    wdow7.addObj(baspan);
    wdow7.addObj(bar);
  }
  let wclass = new OWOP.windowSys.class.window("Status Settings", options, windowFunc);
  OWOP.windowSys.addWindow(wclass).move(window.innerHeight / 3, 30)
}

function makeWindow6() {
  let options = {
    closeable: false
  }
  var mkHTML = OWOP.util.mkHTML

  function windowFunc(wdow6) {
    let followhspan = mkHTML("span", {
      innerHTML: `Follow Window `
    })
    let followhbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (!followhbox.checked) {
          OWOP.windowSys.windows["Follow Settings"].frame.style.visibility = 'hidden';
        } else {
          OWOP.windowSys.windows["Follow Settings"].frame.style.visibility = 'visible';
        }
      }
    })
    followhspan.style.color = 'white';
    followhspan.style.fontFamily = 'Arial';
    
    let statushspan = mkHTML("span", {
      innerHTML: `Status Window `
    })
    let statushbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (!statushbox.checked) {
          OWOP.windowSys.windows["Status Settings"].frame.style.visibility = 'hidden';
        } else {
          OWOP.windowSys.windows["Status Settings"].frame.style.visibility = 'visible';
        }
      }
    })
    statushspan.style.color = 'white';
    statushspan.style.fontFamily = 'Arial';

    let toolhspan = mkHTML("span", {
      innerHTML: `Tool Window `
    })

    let toolhbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (!toolhbox.checked) {
          OWOP.windowSys.windows["Tool Settings"].frame.style.visibility = 'hidden';
        } else {
          OWOP.windowSys.windows["Tool Settings"].frame.style.visibility = 'visible';
        }
      }
    })
    toolhspan.style.color = 'white';
    toolhspan.style.fontFamily = 'Arial';

    let joinhspan = mkHTML("span", {
      innerHTML: `Connect Window `
    })
    let joinhbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (!joinhbox.checked) {
          OWOP.windowSys.windows["Connect Settings"].frame.style.visibility = 'hidden';
        } else {
          OWOP.windowSys.windows["Connect Settings"].frame.style.visibility = 'visible';
        }
      }
    })
    joinhspan.style.color = 'white';
    joinhspan.style.fontFamily = 'Arial';

    let chunkhspan = mkHTML("span", {
      innerHTML: `Fill Window `
    })
    let chunkhbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (!chunkhbox.checked) {
          OWOP.windowSys.windows["Fill Settings"].frame.style.visibility = 'hidden';
        } else {
          OWOP.windowSys.windows["Fill Settings"].frame.style.visibility = 'visible';
        }
      }
    })
    chunkhspan.style.color = 'white';
    chunkhspan.style.fontFamily = 'Arial';

    let pastehspan = mkHTML("span", {
      innerHTML: `Paste Window `
    })
    let pastehbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (!pastehbox.checked) {
          OWOP.windowSys.windows["Paste Settings"].frame.style.visibility = 'hidden';
        } else {
          OWOP.windowSys.windows["Paste Settings"].frame.style.visibility = 'visible';
        }
      }
    })
    pastehspan.style.color = 'white';
    pastehspan.style.fontFamily = 'Arial';

    let msghspan = mkHTML("span", {
      innerHTML: `Message Window `
    })
    let msghbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (!msghbox.checked) {
          OWOP.windowSys.windows["Message Settings"].frame.style.visibility = 'hidden';
        } else {
          OWOP.windowSys.windows["Message Settings"].frame.style.visibility = 'visible';
        }
      }
    })
    msghspan.style.color = 'white';
    msghspan.style.fontFamily = 'Arial';

    var patternpaste = document.createElement("select")
    patternpaste.id = "patterpaste"
    patternpaste.style = "position: relative; width: 100%;"

    var patternfill = document.createElement("select")
    patternfill.id = "patterfill"
    patternfill.style = "position: relative; width: 100%;"

    wdow6.addObj(followhspan)
    wdow6.addObj(followhbox);
    wdow6.addObj(mkHTML("br"))
    wdow6.addObj(toolhspan)
    wdow6.addObj(toolhbox);
    wdow6.addObj(mkHTML("br"))
    wdow6.addObj(joinhspan)
    wdow6.addObj(joinhbox);
    wdow6.addObj(mkHTML("br"))
    wdow6.addObj(chunkhspan)
    wdow6.addObj(chunkhbox);
    wdow6.addObj(mkHTML("br"))
    wdow6.addObj(pastehspan)
    wdow6.addObj(pastehbox);
    wdow6.addObj(mkHTML("br"))
    wdow6.addObj(msghspan)
    wdow6.addObj(msghbox);
    wdow6.addObj(mkHTML("br"))
    wdow6.addObj(statushspan)
    wdow6.addObj(statushbox);
    wdow6.addObj(mkHTML("br"))
    wdow6.addObj(patternpaste)
    wdow6.addObj(mkHTML("br"))
    wdow6.addObj(patternfill)
  }
  let wclass = new OWOP.windowSys.class.window("Window Manager", options, windowFunc);
  OWOP.windowSys.addWindow(wclass).move(window.innerHeight / 70, 70)

  const patternss = ["Linear-UB", "Linear-BU", "Linear-TMB", "Linear-TMB-R", "Left-Right", "Lefight", "Right-Left", "Pillar", "Duo-Linear", "Center-Linear", "Weirdo Patt", "Weirdo Patt 2", "Weirdo Patt 3", "Weirdo Patt 4", "Weirdo Patt 5", "Weirdo Patt 6", "Weirdo Patt 7", "Random", "Random-Linear", "RAD", "RADOT", "RADTL", "RADTR", "RADTLTR", "RADBL", "RADBR", "RADTLBL","RADTRBL","RADTRBL-R"];
  for (const pattern of patternss) {
    const option = document.createElement("option");
    option.value = pattern
    option.innerHTML = pattern;
    document.getElementById("patterpaste").appendChild(option);
  }

  const patternss2 = ["Linear-LR", "Linear-RL", "Duo-Linear", "Center-Linear", "Random", "Random-Linear"];
  for (const pattern2 of patternss2) {
    const option2 = document.createElement("option");
    option2.value = pattern2
    option2.innerHTML = pattern2;
    document.getElementById("patterfill").appendChild(option2);
  }
}


function makeWindow5() {
  let options = {
    closeable: false
  }
  var mkHTML = OWOP.util.mkHTML
  OWOP.util.mkHTML.hidden = true;

  function windowFunc(wdow5) {

    let followSpan = mkHTML("span", {
      innerHTML: `𝗙𝗼𝗹𝗹𝗼𝘄 `
    })
    let followSelect = document.createElement("select")
    followSelect.style = 'position: absolute; top: 41px; left: 80px;'
    followSelect.id = 'followSel'

    let followCheckbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (followCheckbox.checked) {
          bot.world.follow(document.getElementById("followSel").value, 100)
          OWOP.chat.local(`<b style='color: green;'>(🔧) Follow set!</b>`)
        } else {
          bot.world.follow(99999)
          clearInterval(followInt)
        }
      }
    })
    followSpan.style.color = 'white';

    let pfSpan = mkHTML("span", {
      innerHTML: "𝗣𝗮𝗶𝗻𝘁 𝗙𝗼𝗹𝗹𝗼𝘄ㅤ"
    })

    let pfcheckbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (pfcheckbox.checked) {
          paintFollow = true
          OWOP.chat.local(`<b style='color: green;'>(🔧) Bot will now paint while following!</b>`)
        } else {
          OWOP.chat.local(`<b style='color: red;'>(🔧) Bot will not paint while following!</b>`)
          paintFollow = false
        }
      }
    })
    pfSpan.style.color = 'white';

    wdow5.addObj(pfSpan)
    wdow5.addObj(pfcheckbox)
    wdow5.addObj(mkHTML("br"))
    wdow5.addObj(followSpan);
    wdow5.addObj(followSelect);
    wdow5.addObj(followCheckbox);
  }
  let wclass = new OWOP.windowSys.class.window("Follow Settings", options, windowFunc);
  OWOP.windowSys.addWindow(wclass).move(window.innerHeight / 30, 30)
}


function makeWindow3() {
  let options = {
    closeable: false
  }
  var mkHTML = OWOP.util.mkHTML

  function windowFunc(wdow3) {

    let sendMsgSpan = mkHTML("span", {
      innerHTML: "𝗦𝗲𝗻𝗱 𝗠𝗲𝘀𝘀𝗮𝗴𝗲ㅤ"
    })
    let sendMsgInput = mkHTML("input", {
      type: "text",
      value: "sexo",
      onchange: function () {
        bot.chat.send(sendMsgInput.value)
      }
    })
    sendMsgSpan.style.color = 'white';

    let spamSpan = mkHTML("span", {
      innerHTML: "𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗦𝗽𝗮𝗺ㅤ"
    })
    let spamCheckbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (spamCheckbox.checked) {
          bot.options.spam = true;
          OWOP.chat.local(`<b style='color: green;'>(🔧) Bot Spam Enabled!</b>`)
        } else {
          OWOP.chat.local(`<b style='color: red;'>(🔧) Bot Spam Disabled!</b>`)
          bot.options.spam = false;
        }
      }
    })
    spamSpan.style.color = 'white';

    let autoCSpan = mkHTML("span", {
      innerHTML: "𝗔𝘂𝘁𝗼 𝗠𝗦𝗚 𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻ㅤ"
    })
    let autoCInput = mkHTML("input", {
      width: 35,
      type: "number",
      value: 3500,
      min: 1000,
      onchange: function () {
        OWOP.chat.local(`<b style='color: green;'>(🔧) New Auto Message Cooldown!</b>`)
      }
    })
    autoCSpan.style.color = 'white';

    let automsgSpan = mkHTML("span", {
      innerHTML: "ㅤ𝗔𝘂𝘁𝗼 𝗠𝗲𝘀𝘀𝗮𝗴𝗲ㅤ"
    })
    let automsgCheckbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (automsgCheckbox.checked) {
          OWOP.chat.local(`<b style='color: green;'>(🔧) Auto Send Message Enabled!</b>`)
          var autoMSG = setInterval(() => {
            if (automsgCheckbox.checked) bot.chat.send(sendMsgInput.value)
          }, autoCInput.value)
        } else {
          OWOP.chat.local(`<b style='color: red;'>(🔧) Auto Send Message Disabled!</b>`)
          clearInterval(autoMSG)
        }
      }
    })
    automsgSpan.style.color = 'white';
    wdow3.addObj(spamSpan)
    wdow3.addObj(spamCheckbox)
    wdow3.addObj(automsgSpan)
    wdow3.addObj(automsgCheckbox)
    wdow3.addObj(mkHTML("br"))
    wdow3.addObj(autoCSpan)
    wdow3.addObj(autoCInput)
    wdow3.addObj(mkHTML("br"))
    wdow3.addObj(sendMsgSpan);
    wdow3.addObj(sendMsgInput);
  }
  let wclass = new OWOP.windowSys.class.window("Message Settings", options, windowFunc);
  OWOP.windowSys.addWindow(wclass).move(window.innerHeight / 3, 30)
}

function makeWindow2() {
  let options = {
    closeable: false
  }
  var mkHTML = OWOP.util.mkHTML

  function windowFunc(wdow2) {

    let joinCountTextarea = mkHTML("input", {
      value: connect1,
      type: "number",
      id: "joinCount",
      min: 1,
      max: API.maxConnectionsPerIp
    })
    let joinButton = mkHTML("button", {
      innerHTML: "Connect",
      onclick: function () {
        bot.options.ws = 'wss://ourworldofpixels.com'
          joinbots(joinCountTextarea.value)
          if (lol == false) lol = true;
      }
    })

    var firstTime = true;

    let solveCaptchaText = document.createElement("p")
    solveCaptchaText.innerHTML = "Solve CAPTCHAs"
    solveCaptchaText.style = "position: relative; top: -31px; right: -24px; color: white; font-family: Arial; font-size: 14px;"

    let checkSolveCaptcha = document.createElement("input")
    checkSolveCaptcha.type = "checkbox"
    checkSolveCaptcha.style = "position: relative;"
    checkSolveCaptcha.oninput = () => {
      if (checkSolveCaptcha.checked == true) {
        solveCaptchas = true;
        document.getElementById("genTok").style.visibility = "hidden"
      } else {
        solveCaptchas = false;
        document.getElementById("genTok").style.visibility = "visible"
      }
    }

    checkSolveCaptcha.checked = true;

    let genButton = mkHTML("button", {
      innerHTML: "CAPTCHA v2 Token",
      id: "genTok",
      style: "position: relative; top: -32px; width: 100%;",
      onclick: function () {
        if (firstTime == true) {
          firstTime = false;
          alert("( Don't works with CAPTCHA STRICT ) You're generating a reCAPTCHA V2 Token, the token lasts 2 minutes until it expires, so you have to generate another reCAPTCHA V2 Token\n\nWhen you generate a reCAPTCHA V2 Token, The CAPTCHAs from bots will be solved automatically. ( sometimes you need to click to connect bots multiples times in a single ip because google gives you a timeout. )")
        }
        gettokencode()
      }
    })

    let dcButton = mkHTML("button", {
      innerHTML: "Disconnect Bots",
      style: "width: 100%;",
      onclick: function () {
        disconnectbots()
      }
    })

    wdow2.addObj(joinCountTextarea);
    wdow2.addObj(joinButton);
    wdow2.addObj(mkHTML("br"))
    wdow2.addObj(dcButton);
    wdow2.addObj(mkHTML("br"))
    wdow2.addObj(mkHTML("br"))
    wdow2.addObj(checkSolveCaptcha)
    wdow2.addObj(solveCaptchaText)
    wdow2.addObj(genButton);
  }
  let wclass = new OWOP.windowSys.class.window("Connect Settings", options, windowFunc);
  OWOP.windowSys.addWindow(wclass).move(window.innerHeight / 3, 30)
}

document.getElementById("genTok").style.visibility = "hidden"
OWOP.windowSys.windows["Connect Settings"].container.style.overflow = "hidden";

function makeWindow() {
  let options = {
    closeable: false
  }
  var mkHTML = OWOP.util.mkHTML
  function windowFunc(wdow) {
    let toolIdSpan = mkHTML("span", {
      innerHTML: "𝗦𝗲𝘁 𝗧𝗼𝗼𝗹 𝗜𝗗ㅤ"
    })
    let toolIdInput = mkHTML("input", {
      type: "number",
      value: 0,
      min: 0,
      onchange: function () {
        OWOP.chat.local(`<b style='color: green;'>(🔧) Tool ID Set!</b>`)
        bot.world.setTool(toolIdInput.value)
      }
    })
    toolIdSpan.style.color = 'white';

    let switchtSpan = mkHTML("span", {
      innerHTML: "𝗦𝘄𝗶𝘁𝗰𝗵 𝘁𝗼 𝗣𝗹𝗮𝘆𝗲𝗿 𝗧𝗼𝗼𝗹ㅤ"
    })
    let switchtCheckbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (switchtCheckbox.checked) {
          OWOP.chat.local(`<b style='color: green;'>(🔧) Switch to Player Tool Enabled!</b>`)
          switch_to_player_tool = true;
        } else {
          OWOP.chat.local(`<b style='color: red;'>(🔧) Switch to Player Tool Disabled!</b>`)
          switch_to_player_tool = false;
        }
      }
    })
    switchtSpan.style.color = "white";

    let randomcSpan = mkHTML("span", {
      innerHTML: "𝗥𝗮𝗻𝗱𝗼𝗺 𝗧𝗼𝗼𝗹ㅤ"
    })
    let randomcCheckbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (randomcCheckbox.checked) {
          OWOP.chat.local(`<b style='color: green;'>(🔧) Random Bot Tool Enabled!</b>`)
          var randomTcooldown = setInterval(() => {
            if (randomcCheckbox.checked) bot.world.setTool(Math.floor(Math.random() * 10))
          }, 350)
        } else {
          OWOP.chat.local(`<b style='color: red;'>(🔧) Random Bot Tool Disabled!</b>`)
          clearInterval(randomTcooldown)
        }
      }
    })
    randomcSpan.style.color = 'white';
    wdow.addObj(switchtSpan)
    wdow.addObj(switchtCheckbox)
    wdow.addObj(mkHTML("br"))
    wdow.addObj(randomcSpan);
    wdow.addObj(randomcCheckbox);
    wdow.addObj(mkHTML("br"))
    wdow.addObj(toolIdSpan);
    wdow.addObj(toolIdInput);
  }
  let wclass = new OWOP.windowSys.class.window("Tool Settings", options, windowFunc);
  OWOP.windowSys.addWindow(wclass).move(window.innerHeight / 3, 30)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

OWOP.tool.addToolObject(new OWOP.tool.class('Eraser', OWOP.cursors.erase, OWOP.fx.player.NONE, false, function (tool) {
  const camera = OWOP.camera;
  const colorUtils = OWOP.require("util/color").colorUtils;

  function change(number) {
    number = number >> 4
    number = Math.floor(number / (16)) * 16
    number = number << 4
    return number
  }
  tool.setFxRenderer(function (fx, ctx, time) {
    let x = change(fx.extra.player.x);
    let y = change(fx.extra.player.y);
    let fxx = Math.floor(x / 16) - camera.x;
    let fxy = Math.floor(y / 16) - camera.y;
    if (fx.extra.isLocalPlayer) {
      let zoom = camera.zoom;
      ctx.strokeStyle = colorUtils.toHTML(OWOP.player.selectedColor);
      ctx.strokeRect(fxx * zoom, fxy * zoom, 16 * bot.options.chunkToolSizex * zoom, 16 * bot.options.chunkToolSizey * zoom);
      return 0;
    }
  });
  tool.setEvent("mouseup", function (mouse, event) {
    if (!drawFromTo != undefined || !bot.options.chunkToolStop) return;
    drawFromTo.stop = true
  })
  tool.setEvent('mousedown mousemove', function (mouse, event) {
    if (mouse.buttons == 1) {
      var color = OWOP.player.selectedColor;
      var x1 = Math.floor(mouse.tileX / 16) * 16;
      var x2 = Math.floor(mouse.tileX / 16) * 16 + 16 * bot.options.chunkToolSizex;
      var y1 = Math.floor(mouse.tileY / 16) * 16;
      var y2 = Math.floor(mouse.tileY / 16) * 16 + 16 * bot.options.chunkToolSizey;

      drawFromTo = new bot.world.drawFromTo(x1, y1, x2, y2, color)
    } else if (mouse.buttons == 2) {
      drawFromTo.stop = true;
    }
  });
}));

let pixelStack = [];

function dist(x, y) {
  return Math.sqrt(x * x + y * y);
}

function dista(x, y) {
  return Math.sqrt(y & x + x * x);
}

function diste(x, y) {
  return Math.sqrt(x & y + y * y);
}

function disto(x, y) {
  var PI2 = 2 * Math.PI
  return (Math.cos(x * y / y * y) * PI2);
}

function disti(x, y) {
  var PI2 = 2 * Math.PI
  return (Math.sin(x * y / y * y) * PI2);
}

function disty(x, y) {
  var PI2 = 2 * Math.PI / bots.length * bots.length;
  return (Math.cos(PI2 * x + x * y));
}

function dis(x, y) {
  var PI2 = Math.PI * 2;
  var i = bots.length;
  var followAdd = PI2 / 50
  var f = (f + followAdd) % PI2;
  return (Math.sin(x + y / Math.PI / bots.length * i + f) * 12);
}

OWOP.tool.addToolObject(new OWOP.tool.class('Brush', OWOP.cursors.brush, OWOP.fx.player.NONE, false, function (tool) {
  const camera = OWOP.camera;
  const colorUtils = OWOP.require("util/color").colorUtils;

  function change(number) {
    number = number >> 16
    number = Math.floor(number / (16)) * 16
    number = number << 16
    return number
  }
  tool.setFxRenderer(function (fx, ctx, time) {
    let x = change(fx.extra.player.x);
    let y = change(fx.extra.player.y);
    let fxx = Math.floor(x / 16) - camera.x;
    let fxy = Math.floor(y / 16) - camera.y;
    if (fx.extra.isLocalPlayer) {
      let zoom = camera.zoom;
      ctx.strokeStyle = colorUtils.toHTML(OWOP.player.selectedColor);
      ctx.strokeRect(fxx * zoom, fxy * zoom, 16 * bot.options.chunkToolSizex * zoom, 16 * bot.options.chunkToolSizey * zoom);
      return 0;
    }
  });
  tool.setEvent("mouseup", function (mouse, event) {
    if (!drawFromTo != undefined || !bot.options.chunkToolStop) return;
    drawFromTo.stop = true
  })
  tool.setEvent('mousedown mousemove', function (mouse, event) {
    if (mouse.buttons == 1) {
      var color = OWOP.player.selectedColor;
      var x1 = Math.floor(mouse.tileX / 2) * 2;
      var x2 = Math.floor(mouse.tileX / 2) * 2 + 2 * 2;
      var y1 = Math.floor(mouse.tileY / 2) * 2;
      var y2 = Math.floor(mouse.tileY / 2) * 2 + 2 * 2;

      drawFromTo = new bot.world.drawFromTo(x1, y1, x2, y2, color)
    } else if (mouse.buttons == 2) {
      drawFromTo.stop = true;
    }
  });
}));

// thjanks dimden lol
let areaa = 16;
OWOP.tool.addToolObject(new OWOP.tool.class('FastArea', OWOP.cursors.select, OWOP.fx.player.NONE, OWOP.RANK.USER, function (tool) {

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
          ctx.lineTo(window.innerWidth, fxy + 0.5);
          ctx.moveTo(fxx + 0.5, 0);
          ctx.lineTo(fxx + 0.5, window.innerHeight);

          ctx.lineWidth = 1;
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

      areaa = 1;

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
                  areaa = 1;
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
                drawFromTo.stop = true;
                let color = OWOP.player.selectedColor;
                try {
                drawFromTo = new bot.world.drawFromTo(tool.extra.start[0], tool.extra.start[1], tool.extra.end[0], tool.extra.end[1], color)
                } catch (e) {
                  console.log(e)
                }
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
                  areaa = 1;
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

          drawFromTo.stop = true;
          let color = OWOP.player.selectedColor;
          try {
          drawFromTo = new bot.world.drawFromTo(tool.extra.start[0], tool.extra.start[1], tool.extra.end[0], tool.extra.end[1], color)
          } catch (e) {
            console.log(e)
          }
      } else {
          tool.extra.start = null;
          tool.extra.end = null;
          areaa = 16;
          drawFromTo.stop = true;
      }
  });
}));

function statimage() {
  pixelPlacedTemp++;
  totalsize = pixelStack.length
  document.getElementById("progressSpan").textContent = `Progress: (` + pixelPlacedTemp + `/` + pixelStack.length + `)`
}

function lerp(v0, v1, r) {
  return v0 * (1 - r) + v1 * r;
}

async function patterns0(widt, heigh, imgWidh, imgHeigh) {
  
  let patter = document.getElementById("patterpaste").value

  switch (patter) {
    case 'Linear-UB':
      index = 0;
      break;

    case "Duo-Linear":
      index = pixelStack.indexOf(pixelStack.reverse()[0]);
      break;

    case 'RAD':
      index = 0;
      offx = parseInt(widt) / 2; offy = parseInt(heigh) / 2;
      pixelStack.sort((a, b) => dist(a[0] - offx, a[1] - offy) - dist(b[0] - offx, b[1] - offy));
      break;

    case "RADTL":
      index = 0;
      offx = 0, offy = 0;
      pixelStack.sort((a, b) => dist(a[0] - offx, a[1] - offy) - dist(b[0] - offx, b[1] - offy));
      break;

    case "RADTR":
      index = 0;
      offx = parseInt(widt), offy = 0;
      pixelStack.sort((a, b) => dist(a[0] - offx, a[1] - offy) - dist(b[0] - offx, b[1] - offy));
      break;

    case "RADBL":
      index = 0;
      offx = 0, offy = parseInt(heigh);
      pixelStack.sort((a, b) => dist(a[0] - offx, a[1] - offy) - dist(b[0] - offx, b[1] - offy));
      break;

    case "RADBR":
      index = 0;
      offx = parseInt(widt), offy = parseInt(heigh);
      pixelStack.sort((a, b) => dist(a[0] - offx, a[1] - offy) - dist(b[0] - offx, b[1] - offy));
      break;

    case "RADOT":
      offx = parseInt(widt) / 2, offy = parseInt(heigh) / 2;
      pixelStack.sort((a, b) => dist(a[0] - offx, a[1] - offy) - dist(b[0] - offx, b[1] - offy));
      break;

    case "RADTLTR":
      offx = parseInt(widt) / 2, offy = parseInt(heigh);
      pixelStack.sort((a, b) => dist(a[0] - offx, a[1] - offy) - dist(b[0] - offx, b[1] - offy));
      break;

    case "RADTLBL":
      offx = parseInt(widt), offy = parseInt(heigh) / 2;
      pixelStack.sort((a, b) => dist(a[0] - offx, a[1] - offy) - dist(b[0] - offx, b[1] - offy));
      break;

    case "RADTRBL":
      offx = parseInt(widt), offy = 0;
      pixelStack.sort((a, b) => dist(a[0] - offx, a[1] - offy) - dist(b[0] - offx, b[1] - offy));
      break;

    case "RADTRBL-R":
      offx = 0, offy = parseInt(heigh);
      pixelStack.sort((a, b) => dist(a[0] - offx, a[1] - offy) - dist(b[0] - offx, b[1] - offy));
      break;

    case "Weirdo Patt":
      offx = parseInt(widt) / 2, offy = parseInt(heigh) / 2;
      pixelStack.sort((a, b) => dista(a[0] - offx, a[1] - offy) - dista(b[0] - offx, b[1] - offy));
      break;

    case "Weirdo Patt 2":
      offx = parseInt(widt) / 2, offy = parseInt(heigh) / 2;
      pixelStack.sort((a, b) => diste(a[0] - offx, a[1] - offy) - diste(b[0] - offx, b[1] - offy));
      break;

    case "Weirdo Patt 3":
      offx = imgHeigh, offy = 0;
      pixelStack.sort((a, b) => disto(a[0] - offx, a[1] - offy) - disto(b[0] - offx, b[1] - offy));
      break;

    case "Weirdo Patt 4":
      offx = imgWidh / 2, offy = imgHeigh / 2;
      pixelStack.sort((a, b) => disti(a[0] - offx, a[1] - offy) - disti(b[0] - offx, b[1] - offy));
      break;

    case "Weirdo Patt 5":
      offx = imgWidh, offy = imgHeigh;
      pixelStack.sort((a, b) => disty(a[0] - offx, a[1] - offy) - disty(b[0] - offx, b[1] - offy));
      break;

    case "Weirdo Patt 6":
      offx = 0, offy = 0;
      pixelStack.sort((a, b) => disty(b[0] - offx, a[1] - offy));
      break;

    case "Weirdo Patt 7":
      offx = 0, offy = 0;
      pixelStack.sort((a, b) => disty(b[1] - offx, a[1] - offy));
      break;

    case "Linear-TMB":
      offx = 0, offy = parseInt(heigh-1)
      pixelStack.sort((a, b) => dist(a[1] - offx, a[1] - offy) - dist(b[1] - offx, b[1] - offy));
      break;

    case "Linear-TMB-R":
      offx = parseInt(imgWidh / 2), offy = parseInt(imgHeigh / 2 - 1) // yeahhhhh mothafucker
      pixelStack.sort((a, b) => dist(a[0] - offx, a[0] - offy) - dist(b[0] - offx, b[0] - offy));
      break;

    case "Pillar":
      offx = parseInt(imgWidh), offy = parseInt(imgHeigh / 2);
      pixelStack.sort((a, b) => dist(b[0] - offx, a[0] - offy) - dist(b[0] - offx, b[0] - offy));
      break;

    case "Lefight":
      offx = parseInt(widt), offy = parseInt(heigh);
      pixelStack.sort((a, b) => dist(b[0] - offx, a[0] - offy) - dist(b[0] - offx, b[0] - offy));
      break;

    case "Left-Right":
      offx = 0, offy = 0
      pixelStack.sort((a, b) => dist(b[0] - offx, a[0] - offy) - dist(b[0] - offx, b[0] - offy));
      break;

    case "Right-Left":
      offx = 0, offy = 0
      pixelStack.sort((a, b) => dist(b[0] - offx, a[0] - offy) - dist(b[0] - offx, b[0] - offy));
      pixelStack.reverse()
      break;
  }
}

async function patterns1() {

  let patter = document.getElementById("patterpaste").value

  switch (patter) {

    case 'Linear-BU':
      index = pixelStack.length - 1;
      break;

    case "Duo-Linear":
      index = pixelStack.indexOf(pixelStack.reverse()[0]);
      break;

    case "Random-Linear":
      var randnum = Math.floor(Math.random() * (parseInt(widt) - 0) + 0);
      index = 0 + randnum;
      break;

    case "Center-Linear":
      index = Math.floor(pixelStack.length / 2);
      break

    case 'Random':
      index = Math.floor(Math.random() * pixelStack.length)
      break;

    case "RADOT":
      index = pixelStack.length - 1;
      break;

    case "RADTLTR":
      index = pixelStack.length - 1;
      break;

    case "RADTLBL":
      index = pixelStack.length - 1;
      break;
    
    case "RADTRBL":
    case "RADTRBL-R":
    case "Linear-TMB":
    case "Linear-TMB-R":
    case "Lefight":
      index = pixelStack.indexOf(pixelStack.reverse()[0]);
      break;
  }
}

async function paste(pasteX, pasteY, sendFinishMessage = true) {
  last.x = pasteX, last.y = pasteY;
  var canvaas = canvasToPaste;
  var gtx = document.getElementById(`${canvaas}`).getContext("2d")
  stop = false;

  let data = gtx.getImageData(0, 0, document.getElementById(`${canvaas}`).width, document.getElementById(`${canvaas}`).height).data;

  var heigh = document.getElementById(`${canvaas}`).height, widt = document.getElementById(`${canvaas}`).width

  offx = 0, offy = 0, index = 0;
  
    async function compare() {
      pixelStack = [];
      for (let y = 0; y < parseInt(heigh); y+=skipPixel) {
        if (stop) break;
        for (let x = 0; x < parseInt(widt); x+=skipPixel) {
          if (stop) break;

          let i = (y * parseInt(widt) + x) * 4;
          let pixel = misc.world.getPixel(x + pasteX, y + pasteY);
          let alpha = data[i + 3] / 255;
          let color = [
          lerp(pixel[0], data[i + 0], alpha),
          lerp(pixel[1], data[i + 1], alpha),
          lerp(pixel[2], data[i + 2], alpha)
          ];

          if (color[0] === pixel[0] && color[1] === pixel[1] && color[2] === pixel[2]) continue;

          if (pixelStack.length == limitPixelStackTo) continue; //´prevent lag
          
          let colorRGB = [color[0], color[1], color[2]]

          pixelStack.push([x, y, colorRGB])
        }
      }
  }

  await compare()
  document.getElementById("progressSpan").textContent = `Progress: (` + 0 + `/` + 0 + `)`
  //OWOP.chat.local(' [!] Template Compared')

  patterns0(parseInt(widt), parseInt(heigh), parseInt(imgWidh), parseInt(imgHeigh))

  for (let y = 0; y < parseInt(heigh); y+=skipPixel) {
    if (stop) break;
    for (let x = 0; x < parseInt(widt); x+=skipPixel) {
      if (stop) break;

      pasting = true;

      patterns1()

      let i = (y * parseInt(widt) + x) * 4;

      let pix = OWOP.world.getPixel(x + pasteX, y + pasteY);
      let alpha = data[i + 3] / 255;
      let color = [
        lerp(pix[0], data[i + 0], alpha),
        lerp(pix[1], data[i + 1], alpha),
        lerp(pix[2], data[i + 2], alpha)
      ];

      if (color[0] === pix[0] && color[1] === pix[1] && color[2] === pix[2]) continue;
      statimage()

      let tpix = pixelStack.splice(index, 1)[0];

      while (!bot.world.setPixel(tpix[0] + pasteX, tpix[1] + pasteY, tpix[2], rgbb)) {
        if (drawOnceTwoSeconds == true) await sleep(2000)
        else await sleep(0)
      }
    }
  }
  if (pixelStack.length > 0) {
    if (stop == true) {
      document.getElementById("progressSpan").textContent = `Progress: (` + 0 + `/` + 0 + `)`
      stop = true;
      pasting = false;
      barenabled = false;
      pixelPlacedTemp = 0;
      restando = 0;
      document.getElementById("pasteOrStop").innerHTML = "Paste"
      return;
    }
    stop = true;
    document.getElementById("pasteOrStop").innerHTML = "Paste"
    //document.getElementById("progressSpan").textContent = `Progress: (` + 0 + `/` + 0 + `)`
    //barenabled = false;
    //pixelPlacedTemp = 0;
    //restando = 0;
    paste(last.x, last.y, true)
  } else if (pixelStack.length == 0) {
  stop = true;
  document.getElementById("progressSpan").textContent = `Progress: (` + 0 + `/` + 0 + `)`
  pasting = false;
  barenabled = false;
  pixelPlacedTemp = 0;
  restando = 0;
  document.getElementById("pasteOrStop").innerHTML = "Paste"
  if (sendFinishMessage == true) OWOP.chat.local(` Finished Pasting!`)
  }
}

function makeWindow4() {
  let options = {
    closeable: false
  }
  var mkHTML = OWOP.util.mkHTML

  function windowFunc(wdow4) {

    let upSpan = mkHTML("span", {
      innerHTML: "Use My PQuota"
    })
    let upcheckbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (upcheckbox.checked) {
          useMyPquota = true
        } else {
          useMyPquota = false
        }
      }
    })
    upSpan.style.color = 'white';
    upSpan.style.fontFamily = 'Arial';

    let wmSpan = mkHTML("span", {
      innerHTML: "Wolf-Move",
      title: "Check if bots need to move to set a pixel."
    })
    let wmcheckbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (wmcheckbox.checked) {
          wolfmove = true;
        } else {
          wolfmove = false
        }
      }
    })
    wmSpan.style.color = 'white';
    wmSpan.style.fontFamily = 'Arial';

    let mvSpan = mkHTML("span", {
      innerHTML: "Move",
      title: "Bots will/will not move."
    })
    let mvcheckbox = document.createElement("input")
    mvcheckbox.type = "checkbox"
    mvcheckbox.style = "position: absolute; top: 37px; left: 39px";
    mvcheckbox.checked = true;

    mvSpan.style.color = 'white';
    mvSpan.style.fontFamily = 'Arial';

    let snSpan = mkHTML("span", {
      innerHTML: "Sneaky",
      title: "After painted pixels, bot will try to teleport to their last location."
    })
    let sncheckbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (sncheckbox.checked) {
          sneakyy = true;
        } else {
          sneakyy = false
        }
      }
    })
    snSpan.style.color = 'white';
    snSpan.style.fontFamily = 'Arial';

    let skSpan = mkHTML("span", {
      innerHTML: "Skittles",
      title: "Bot will paint rainbow pixels."
    })
    let skcheckbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (skcheckbox.checked) {
          rgbb = true;
        } else {
          rgbb = false;
        }
      }
    })
    skSpan.style.color = 'white';
    skSpan.style.fontFamily = 'Arial';

    let dOSpan = mkHTML("span", {
      innerHTML: "Draw Once 2 Seconds",
      title: "The bot will wait 2 seconds to place a bunch of pixels."
    })
    let dOcheckbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (dOcheckbox.checked) {
          drawOnceTwoSeconds = true;
        } else {
          drawOnceTwoSeconds = false;
        }
      }
    })
    dOSpan.style.color = 'white';
    dOSpan.style.fontFamily = 'Arial';

    let fasSpan = mkHTML("span", {
      innerHTML: "Fill Area After Selected",
      title: "When you finishes selecting area to fill with FastArea, the bot will automatically fill it."
    })
    let fascheckbox = mkHTML("input", {
      type: "checkbox",
      onchange: function () {
        if (fascheckbox.checked) {
          fillAreaAfterSelected = true;
        } else {
          fillAreaAfterSelected = false;
        }
      }
    })
    fasSpan.style.color = 'white';
    fasSpan.style.fontFamily = 'Arial';

    wdow4.addObj(upSpan)
    wdow4.addObj(upcheckbox)
    wdow4.addObj(mkHTML("br"))
    wdow4.addObj(mvSpan)
    wdow4.addObj(mvcheckbox)
    wdow4.addObj(mkHTML("br"))
    wdow4.addObj(wmSpan)
    wdow4.addObj(wmcheckbox)
    wdow4.addObj(mkHTML("br"))
    wdow4.addObj(snSpan)
    wdow4.addObj(sncheckbox)
    wdow4.addObj(mkHTML("br"))
    wdow4.addObj(skSpan)
    wdow4.addObj(skcheckbox)
    wdow4.addObj(mkHTML("br"))
    wdow4.addObj(dOSpan)
    wdow4.addObj(dOcheckbox)
    wdow4.addObj(mkHTML("br"))
    wdow4.addObj(fasSpan)
    wdow4.addObj(fascheckbox)
  }
  let wclass = new OWOP.windowSys.class.window("Fill Settings", options, windowFunc);
  OWOP.windowSys.addWindow(wclass).move(window.innerHeight / 3, 30)
}

OWOP.windowSys.windows["Message Settings"].frame.style.visibility = 'hidden';
OWOP.windowSys.windows["Fill Settings"].frame.style.visibility = 'hidden';
OWOP.windowSys.windows["Connect Settings"].frame.style.visibility = 'hidden';
OWOP.windowSys.windows["Tool Settings"].frame.style.visibility = 'hidden';
OWOP.windowSys.windows["Follow Settings"].frame.style.visibility = 'hidden';
OWOP.windowSys.windows["Paste Settings"].frame.style.visibility = 'hidden';
OWOP.windowSys.windows["Status Settings"].frame.style.visibility = 'hidden';

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

bot.drawChar = async function(matrix, x, y) {
  for (var xx = 0; xx < matrix.length; xx++)
      for (var yy = 0; yy < 8; yy += bots.length)
          for (var bb = 0; bb < bots.length; bb++)
              if ((matrix[xx] >> (7 - yy - bb)) & 1 && yy + bb < 8) {
                  while (!bot.world.setPixel(x + xx, y + yy + bb, OWOP.player.selectedColor, rgbb)) {
                  if (drawOnceTwoSeconds == true) await sleep(2000)
                  else await sleep(0)
              }
      }
};

bot.writeText = async function(str, x, y) {
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
    bot.drawChar(matrix, x, y);
    x += matrix.length + 1;
  }
}


OWOP.tool.addToolObject(new OWOP.tool.class('Write Text', OWOP.cursors.write, OWOP.fx.player.NONE, false, function (tool) {
  const camera = OWOP.camera;
  const colorUtils = OWOP.require("util/color").colorUtils;

  function change(number) {
    number = number >> 4
    number = Math.floor(number / (1)) * 1
    number = number << 4
    return number
  }
  
  tool.setFxRenderer(function (fx, ctx, time) {
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
  tool.setEvent("mouseup", function (mouse, event) {
    if (!drawFromTo != undefined || !bot.options.chunkToolStop) return;
    drawFromTo.stop = true
  })
  tool.setEvent('mousedown', function (mouse, event) {
    if (mouse.buttons == 1 || mouse.buttons == 2) {
      if (drawFromTo != undefined)
        if (!drawFromTo.stop) drawFromTo.stop = true;
      var text = prompt('Text to Draw')
      bot.writeText(text, mouse.tileX, mouse.tileY-1)
    }
  });
}));

var player_tool;
setInterval(() => {
  player_tool = OWOP.player.toolId;
  if (switch_to_player_tool == true)
    bot.world.setTool(player_tool)
}, 100)

const followss = ["Circle 1","Circle 2","Circle 3","X","Flower","Lines","Random"];
for (const foll of followss) {
  const option = document.createElement("option");
  option.value = foll;
  option.innerHTML = foll;
  document.getElementById("followSel").appendChild(option);
}

function rgbBack(id) {
  document.getElementById(id.toString()).style.backgroundColor = 'rgb('+Math.floor(255)+' '+Math.floor(255)+' '+Math.floor(255)+')';
}
  
document.getElementsByTagName("moveCheckbox").checked = true;  

OWOP.windowSys.windows['Follow Settings'].container.style.width = '150px'
OWOP.windowSys.windows["Paste Settings"].container.style.width = '279px'
OWOP.windowSys.windows["Paste Settings"].container.style.height = "285px"
OWOP.windowSys.windows["Connect Settings"].container.style.height = "135px";

rgbBack("tool-fastarea")
rgbBack("tool-eraser")
rgbBack("tool-brush")
rgbBack("tool-write text")

document.body.onkeydown = function(event) {
  if (event.keyCode == 90) { // Z
    document.getElementById('iX').value = OWOP.mouse.tileX
    document.getElementById('iY').value = OWOP.mouse.tileY
  }
}
