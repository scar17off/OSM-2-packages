(O => {
  if(typeof O.require === "undefined") {

    throw new Error("OWOP is not unlocked");
  } else if(typeof OPM === "undefined") {
    throw new Error("Draconius bot doesn't work on non opm clones. :c");
  }
  // GUI
  class Animation {
    constructor() {
      this.following = false;
      this.animationId = 0;
      this.followingId = O.player.id;
      this.interval = setInterval(function() {
        if (this.following) this.animation();
      }.bind(this), 100)
      this.global = {
        slitheriov2: [],
        randomMoves: {
          radius: 15
        }
      };
    }
    getFollowing() {
      return players[this.followingId] || players[O.player.id];
    }
    getFollowingXY() {
      let following = this.getFollowing();
      return [following.x, following.y];
    }
    snake() {
      for (let i = 0; i < bots.length; i++) {
        let diff;
        let bot = bots[i];
        let newPosition = [bot.realX, bot.realY];
        let destination = this.getFollowingXY();

        if (bot.player.x !== destination[0]) {
          diff = destination[0] - bot.player.x;
          newPosition[0] = Math.abs(diff) < 1 ? diff : diff / (i + 2);
          newPosition[0] += bot.player.x;
        }
        if (bot.player.y !== destination[1]) {
          diff = destination[1] - bot.player.y;
          newPosition[1] = Math.abs(diff) < 1 ? diff : diff / (i + 2);
          newPosition[1] += bot.player.y;
        }
        bot.move(...newPosition, false);
      }
    }
    slitherio() {
      for (let i = 0; i < bots.length; i++) {
        let diff;
        let bot = bots[i];
        let newPosition = [bot.realX, bot.realY];
        if (bot.realX !== this.destination[0]) {
          diff = this.destination[0] - bot.realX;
          newPosition[0] = Math.abs(diff) < 1 ? diff : diff / bots.length * (i + 2);
          newPosition[0] += bot.realX;
        }
        if (bot.realY !== this.destination[1]) {
          diff = this.destination[1] - bot.realY;
          newPosition[1] = Math.abs(diff) < 1 ? diff : diff / bots.length * (i + 2);
          newPosition[1] += bot.realY;
        }
        bot.world.move(...newPosition, false);
      }
    }
    slitheriov2() {
      let moves = this.global.slitheriov2;
      //if(moves[moves.length-1]) if(moves[moves.length-1][0] === this.destination[0] && moves[moves.length-1][1] === this.destination[1]) return;
      moves.push(this.destination);
      if (moves.length > bots.length) moves.shift();
      for (let i = 0; i < bots.length; i++) {
        let bot = bots[i];
        let move = moves[i] || moves[moves.length - 1] || [0, 0];
        bot.move.move(...move, false);
      }
    }
    randomMoves() {
      for (let i = 0; i < bots.length; i++) {
        let x = server.utils.random(-this.global.randomMoves.radius, +this.global.randomMoves.radius);
        let y = server.utils.random(-this.global.randomMoves.radius, +this.global.randomMoves.radius);

        x += this.destination[0];
        y += this.destination[1];

        bots[i].world.move(x, y, false);
      }
    }
    animation() {
      switch (this.animationId) {
        case 0: {
          this.snake();
          break;
        }
        case 1: {
          this.slitherio();
          break;
        }
        case 2: {
          this.slitheriov2();
          break;
        }
        case 3: {
          this.randomMoves();
          break;
        }
        default: {
          this.snake();
          break
        }
      }
    }
  }
  const tabs = window.data = {},
    data = window.data = {};
  data.connect = {
    World: O.world.name || location.pathname == '/' ? 'main' : location.pathname.slice(1),
    Pass: '',
    Modlogin: '',
    Adminlogin: '',
    Amount: 2,
    Delay: 1000,
    Join() {
      join(data.connect.Amount, data.connect.World, data.connect.Delay, data.connect.Pass, data.connect.Modlogin, data.connect.Adminlogin);
    },
    Leave: leave
  };
  data.animation = new Animation();
  data.fill = {
    Pattern: 0,
    'Start X': 0,
    'Start Y': 0,
    'End X': 10,
    'End Y': 10,
    Color: [0, 0, 0],
    Fill() {
      stop = false;
      fill(data.fill['Start X'], data.fill['Start Y'], data.fill['End X'], data.fill['End Y'], data.fill.Color, patterns[data.fill.Pattern]);
    },
    Stop() {
      stop = true;
    }
  };
  data.paste = {
    Pattern: 0,
    Image() {
      image.click();
    },
    'Paste X': 0,
    'Paste Y': 0,
    Paste() {
      stop = false;
      paste(data.paste['Paste X'], data.paste['Paste Y'], patterns[data.paste.Pattern]);
    },
    Stop() {
      stop = true;
    }
  };
  data.follow = {
    Animation: 0,
    'Player ID': O.player.id,
    Follow() {
      alert('Follow');
    }
  };
  data.options = {
    Sneaky: false,
    Rainbow: false,
    Skittle: false,
    'Use Player': true,
    Sleep: true,
    'Avoid Protected': true,
    Move: true,
    'Wolf Move': false
  };

  const patterns = [
    horizontal,
    vertical,
    horizontalReverse,
    verticalReverse,
    horizontalMirror,
    verticalMirror,
    horizontalReverseMirror,
    verticalReverseMirror,
    random,
    checker,
    ttPoints,
    ttLines,
    surround,
    splices,
    sandwich,
    compact,
    bloom,
    bloomReverse,
    diagonal,
    spiral,
    chunkMode,
    construction,
    horizontalRandom
  ];
  const constants = {
    Horizontal: 0,
    vertical: 1,
    'Horizontal Reverse': 2,
    'vertical Reverse': 3,
    'Horizontal Mirror': 4,
    'Vertical Mirror': 5,
    'Horizontal Reverse Mirror': 6,
    'Vertical Reverse Mirror': 7,
    Random: 8,
    Checker: 9,
    '32 Points': 10,
    '32 Lines': 11,
    Surround: 12,
    Splices: 13,
    Sandwich: 14,
    Compact: 15,
    Bloom: 16,
    'Bloom Reverse': 17,
    Diagonal: 18,
    Spiral: 19,
    'Chunk Mode': 20,
    Construction: 21,
    "horizontal random": 22
  };
  const animations = {
    Custom: 0
  };
  const request = new XMLHttpRequest();
  const script = document.body.appendChild(document.createElement('script'));
  const image = document.body.appendChild(document.createElement('input'));
  image.type = 'file';
  image.accept = "image/*";
  image.hidden = true;
  request.onload = e => {
    script.innerHTML = request.responseText;
    gui = new dat.GUI({
      name: 'Draconius Client Bots'
    });
    gui.domElement.style.position = 'relative';
    gui.domElement.style.right = '300px';
    gui.add({
      'Draconius Client Bots': ''
    }, 'Draconius Client Bots');
    gui.__controllers[0].domElement.hidden = true;
    gui.__controllers[0].domElement.previousSibling.style.width = '100%';
    gui.__controllers[0].domElement.previousSibling.style.textAlign = 'center';
    tabs.Connect = gui.addFolder('Connect');
    tabs.Connect.add(data.connect, 'World');
    tabs.Connect.add(data.connect, 'Pass');
    tabs.Connect.add(data.connect, 'Modlogin');
    tabs.Connect.add(data.connect, 'Adminlogin');
    tabs.Connect.add(data.connect, 'Amount').min(1).step(1);
    tabs.Connect.add(data.connect, 'Delay').min(0).step(500);
    tabs.Connect.add(data.connect, 'Join');
    tabs.Connect.add(data.connect, 'Leave');
    tabs.Fill = gui.addFolder('Fill');
    tabs.Fill.add(data.fill, 'Pattern', constants);
    tabs.Fill.add(data.fill, 'Start X');
    tabs.Fill.add(data.fill, 'Start Y');
    tabs.Fill.add(data.fill, 'End X');
    tabs.Fill.add(data.fill, 'End Y');
    tabs.Fill.addColor(data.fill, 'Color');
    tabs.Fill.add(data.fill, 'Fill');
    tabs.Fill.add(data.fill, 'Stop');
    tabs.Paste = gui.addFolder('Paste');
    tabs.Paste.add(data.paste, 'Pattern', constants);
    tabs.Paste.add(data.paste, 'Image');
    tabs.Paste.add(data.paste, 'Paste X');
    tabs.Paste.add(data.paste, 'Paste Y');
    tabs.Paste.add(data.paste, 'Paste');
    tabs.Paste.add(data.paste, 'Stop');
    tabs.Follow = gui.addFolder('Follow');
    tabs.Follow.add(data.follow, 'Animation', animations);
    tabs.Follow.add(data.follow, 'Player ID', Object.keys(players));
    tabs.Follow.add(data.follow, 'Follow');
    tabs.Options = gui.addFolder('Options');
    tabs.Options.add(data.options, 'Sneaky');
    tabs.Options.add(data.options, 'Rainbow');
    tabs.Options.add(data.options, 'Skittle');
    tabs.Options.add(data.options, 'Use Player');
    tabs.Options.add(data.options, 'Sleep');
    tabs.Options.add(data.options, 'Avoid Protected');
    tabs.Options.add(data.options, 'Move');
    tabs.Options.add(data.options, 'Wolf Move');
    API.update().then(json => {
      data.connect.Amount = json.maxConnectionsPerIp - json.yourConns;
      tabs.Connect.updateDisplay();
    });
  };
  request.open('get', 'https://raw.githubusercontent.com/dataarts/dat.gui/master/build/dat.gui.min.js');
  request.send();
  //better player List
  window.players = {};

  var tools = {};
  var toolNames = O.require("protocol/old").OldProtocol.tools
  for (var i in toolNames) {
    var tool = toolNames[i]
    tools[tool] = parseInt(i);
  }


  window.onmousemove = window.onmousedown = window.onmouseup = function() {
    if (O.net.protocol.ws.readyState === 1) {
      players[O.net.protocol.id] = {
        id: O.net.protocol.id,
        x: O.mouse.tileX,
        y: O.mouse.tileY,
        rgb: O.player.selectedColor,
        tool: toolNames[O.player.toolId || 0],
        toolId: O.player.toolId || 0,
        nick: localStorage.nick ? localStorage.nick : ""
      };
    }
  }

  O.on(O.events.net.world.playersMoved, function(updates) {
    for (var id in updates) {
      var update = updates[id];
      var player = players[id] || {
        id: parseInt(id),
        nick: ""
      }
      player.tool = update.tool || toolNames[0];
      player.rgb = update.rgb;
      player.toolId = tools[update.tool] || 0;
      player.x = update.x / 16;
      player.y = update.y / 16;
      players[id] = player;
    }
  })
  O.on(O.events.net.world.playersLeft, function(updates) {
    for (var id in updates) {
      var left = updates[id];
      if (players[left]) {
        delete players[left];
      }
    }
  })
  O.on(O.events.net.world.leave, function() {
    players = {};
  })
  O.chat.recvModifier = (() => {
    var cached = O.chat.recvModifier;
    return function() {
      var msg = arguments[0];
      var before = msg.split(":")[0].trim()
      if (before.startsWith("[") || /[0-9]/g.test(before[0])) {
        var id;
        var nick;
        if (before.startsWith("[")) {
          nick = before.split("]")[1].trim()
          id = before.split("]")[0].substr(1)
        } else {
          id = before.split(" ")[1];
          nick = id;
        }
        var player = players[id]
        if (player) {
          player.nick = nick
        }
      }
      var result = cached.apply(this, arguments);
      return result;
    }
  })()


  // PREP
  const BOJS = OPM.require('better-owop-js'),
    API = OPM.require('api'),
    bots = [],
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    reader = new FileReader(),
    N = str => Number(str);
    window.bots = bots;
  let stop = false,
    jobs = 0,
    current = 0,
    width = 0,
    height = 0,
    id = -1,
    regex = /[а-яё]/i;
  /*setInterval(() => {
    ids = Object.keys(players);
  }, 100);*/
  O.util.loadScript('https://www.google.com/recaptcha/api.js');
  O.player.move = (x, y) => {
    if (O.net.protocol.ws.readyState !== 1) return;
    O.net.protocol.lastSentX = x * 16;
    O.net.protocol.lastSentY = y * 16;
    O.net.connection.send(new Int32Array([O.net.protocol.lastSentX, O.net.protocol.lastSentY, 0]).buffer);
  }
  O.player.setPixel = (x, y, color, wolfMove = true) => {
    if (wolfMove) if(shouldMove(O.mouse.tileX, O.mouse.tileY, x, y)) O.player.move(x, y);

    return O.world.setPixel(x, y, color);
  };
  // UTILS
  Math.Random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
  };

  function next() {
    if (current >= bots.length - 1) current = -1;
    return bots[++current];
  }

  function delay() {
    return Math.ceil(O.net.protocol.placeBucket.time * 1000 / O.net.protocol.placeBucket.rate) * jobs;
  }

  function same(arr1, arr2) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1] && arr1[2] === arr2[2];
  }

  function shouldSleep(bot) {
    bot.player.pixelBucket.update();
    return Math.floor(bot.player.pixelBucket.allowance) === 0;
  }

  function shouldMove(x1, y1, x2, y2) {
    let distx = Math.trunc(x2/16) - Math.trunc(x1/16);
    distx *= distx;
    let disty = Math.trunc(y2/16) - Math.trunc(y1/16);
    disty *= disty;

    let dist = Math.sqrt(distx + disty);

    return dist >= 3;
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function randomColor() {
    return [Math.Random(0, 255), Math.Random(0, 255), Math.Random(0, 255)];
  }

  function isChunkLoaded(x, y) {
    return !!bots[0].chunkSystem.getChunk(Math.floor(x / 16), Math.floor(y / 16));
  }

  function requestChunk(x, y) {
    bots[0].world.requestChunk(x, y, true);
  }

  function isAreaLoaded(x1, y1, x2, y2) {
    let x1c = x1;
    let y1c = y1;
    let x2c = x2;
    let y2c = y2;

    x1 = x1c < x2c ? x1c : x2c;
    y1 = y1c < y2c ? y1c : y2c;

    x2 = x1c > x2c ? x1c : x2c;
    y2 = y1c > y2c ? y1c : y2c;

    for (let x = Math.floor(x1 / 16); x < Math.floor(x2 / 16) + 1; x++)
      for (let y = Math.floor(y1 / 16); y < Math.floor(y2 / 16) + 1; y++)
        if (!isChunkLoaded(x * 16, y * 16)) return false;
    return true;
  }

  function requestArea(x1, y1, x2, y2, innacurate) {
    if (innacurate) {
      x1 = Math.floor(x1 / 16);
      y1 = Math.floor(y1 / 16);
      x2 = Math.floor(x2 / 16);
      y2 = Math.floor(y2 / 16);
    }
    x1 = x1 < x2 ? x1 : x2;
    y1 = y1 < y2 ? y1 : y2;
    x2 = x1 > x2 ? x1 : x2;
    y2 = y1 > y2 ? y1 : y2;

    let chunksLasted = (x2 - x1 + 1) * (y2 - y1 + 1);

    return new Promise(resolve => {
      for (let x = x1; x < x2 + 1; x++) {
        for (let y = y1; y < y2 + 1; y++) {
          bots[0].world.requestChunk(x, y).then(() => {
            chunksLasted--;
            if (chunksLasted === 0) resolve();
          });
        }
      }
    });
  }

  function isChunkProtected(x, y) {
    return bots[0].chunkSystem.isProtected(Math.floor(x / 16), Math.floor(y / 16));
  }

  function renderCaptcha(bot) {
    return new Promise(resolve => {
      O.windowSys.addWindow(new O.windowSys.class.window(`Bot ${bot} Verification Needed`, {
        closeable: true
      }, win => {
        grecaptcha.render(win.addObj(document.createElement('div')), {
          theme: 'dark',
          sitekey: '6LcgvScUAAAAAARUXtwrM8MP0A0N70z4DHNJh-KI',
          callback: token => {
            win.close();
            resolve(token);
          }
        });
      }));
    });
  }

  function handleCaptcha(bot) {
    return new Promise(resolve => {
      bots[bot - 1].on('captcha', id => {
        if (id === 0) {
          renderCaptcha(bot).then(token => {
            bots[bot - 1].captcha.login(token);
            resolve(true);
          });
        } else resolve(true);
      });
    });
  }
  async function join(amount, world, delay = 0, pass, modlogin, adminlogin) {
    for (let i = 0; i < amount; i++) {
      let pos = bots.push(new BOJS.Client({
        ws: OWOP.options.serverAddress[0].url,
        world: world,
        reconnect: true,
        reconnectTime: 1000,
        pass: pass,
        modlogin: modlogin,
        adminlogin: adminlogin,
        log: false // should be option
      }));
      let bot = bots[pos - 1];
      bot.id = (++id);
      bot.on('destroy', e => bots.splice(bots.findIndex(b => b.id === bot.id), 1));
      await handleCaptcha(pos);
      await sleep(delay);
    }
  }

  function leave() {
    bots.forEach(bot => bot.world.destroy());
  }

  function nick(nick) {
    bots.forEach(bot => bot.chat.send(`/nick ${nick}`))
  }

  function chat(msg) {
    bots.forEach(bot => bot.chat.send(msg))
  }

  function tool(id) {
    bots.forEach(bot => bot.world.setTool(id))
  }

  function move(x, y, cX = 0, cY = 0, delay = 0, invert = false) {
    let loops = invert ? 0 : -1;
    bots.forEach(bot => {
      loops++;
      setTimeout(() => {
        bot.world.move(x, y);
        x += cX;
        y += cY;
      }, delay * loops);
    });
  }
  // MAIN
  function* zip(...generators) {
    while (true) {
      for (let i = 0; i < generators.length; i++) {
        let {
          value,
          done
        } = generators[i].next();
        if (done) return;
        yield value;
      }
    }
  }

  function* horizontalRandom(x1, y1, x2, y2) {
    for (let y = y1; y <= y2; y++) {
      let pixels = [];
      for (let x = x1; x <= x2; x++) pixels.push(x);
      pixels.shuffle();
      for (let x = 0; x < pixels.length; x++) yield [pixels[x], y];
    }
  }

  function* horizontal(x1, y1, x2, y2) {
    for (let y = y1; y <= y2; y++)
      for (let x = x1; x <= x2; x++) yield [x, y];
  }

  function* vertical(x1, y1, x2, y2) {
    for (let x = x1; x <= x2; x++)
      for (let y = y1; y <= y2; y++) yield [x, y];
  }

  function* horizontalReverse(x1, y1, x2, y2) {
    for (let y = y2; y >= y1; y--)
      for (let x = x2; x >= x1; x--) yield [x, y];
  }

  function* verticalReverse(x1, y1, x2, y2) {
    for (let x = x2; x >= x1; x--)
      for (let y = y2; y >= y1; y--) yield [x, y];
  }

  function* horizontalMirror(x1, y1, x2, y2) {
    for (let y = y1; y <= y2; y++)
      for (let x = x2; x >= x1; x--) yield [x, y];
  }

  function* verticalMirror(x1, y1, x2, y2) {
    for (let x = x1; x <= x2; x++)
      for (let y = y2; y >= y1; y--) yield [x, y];
  }

  function* horizontalReverseMirror(x1, y1, x2, y2) {
    for (let y = y2; y >= y1; y--)
      for (let x = x1; x <= x2; x++) yield [x, y];
  }

  function* verticalReverseMirror(x1, y1, x2, y2) {
    for (let x = x2; x >= x1; x--)
      for (let y = y1; y <= y2; y++) yield [x, y];
  }

  function* random(x1, y1, x2, y2) {
    let pixels = [];
    for (let x = x1; x <= x2; x++)
      for (let y = y1; y <= y2; y++) pixels.push([x, y]);
    pixels.shuffle();
    for (let i = 0; i < pixels.length; i++) yield pixels[i];
  }

  function* checker(x1, y1, x2, y2) {
    for (let y = y1; y <= y2; y++)
      for (let x = x1; x <= x2; x++)
        if ((x + y) % 2) yield [x, y];
  }

  function* ttPoints(x1, y1, x2, y2) {
    for (let y = y1; y <= y2; y += 4)
      for (let x = x1; x <= x2; x += 4) yield [x, y];
    for (let y = y1; y <= y2; y += 2)
      for (let x = x1; x <= x2; x += 2) yield [x, y];
  }

  function* ttLines(x1, y1, x2, y2) {
    for (let y = y1; y <= y2; y++)
      for (let x = x1; x <= x2; x += 4) yield [x, y];
    for (let y = y1; y <= y2; y++)
      for (let x = x1; x <= x2; x += 2) yield [x, y];
  }

  function* surround(x1, y1, x2, y2) {
    yield* zip(horizontal(x1, y1, x2, y2), vertical(x1, y1, x2, y2), horizontalReverse(x1, y1, x2, y2), verticalReverse(x1, y1, x2, y2))
  }

  function* splices(x1, y1, x2, y2) {
    yield* zip(horizontal(x1, y1, x2, y2), vertical(x1, y1, x2, y2), horizontalReverse(x1, y1, x2, y2), verticalReverse(x1, y1, x2, y2), horizontalMirror(x1, y1, x2, y2), verticalMirror(x1, y1, x2, y2), horizontalReverseMirror(x1, y1, x2, y2), verticalReverseMirror(x1, y1, x2, y2))
  }

  function* sandwich(x1, y1, x2, y2) {
    yield* zip(horizontal(x1, y1, x2, y2), horizontalReverse(x1, y1, x2, y2), horizontalMirror(x1, y1, x2, y2), horizontalReverseMirror(x1, y1, x2, y2))
  }

  function* compact(x1, y1, x2, y2) {
    yield* zip(vertical(x1, y1, x2, y2), verticalReverse(x1, y1, x2, y2), verticalMirror(x1, y1, x2, y2), verticalReverseMirror(x1, y1, x2, y2))
  }

  function* bloom(x1, y1, x2, y2) {
    let x = Math.floor((x1 + x2) / 2);
    let y = Math.floor((y1 + y2) / 2);
    let radius = 0;
    let max = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    while (radius <= max) {
      radius++;
      for (let Y = y1; Y <= y2; Y++) {
        for (let X = x1; X <= x2; X++) {
          if ((X - x) * (X - x) + (Y - y) * (Y - y) < radius * radius) {
            yield [X, Y];
          } else continue;
        }
      }
    }
  }

  function* bloomReverse(x1, y1, x2, y2) {
    let x = Math.floor((x1 + x2) / 2);
    let y = Math.floor((y1 + y2) / 2);
    let radius = Math.ceil(Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2));
    while (radius >= 0) {
      for (let Y = y1; Y <= y2; Y++) {
        for (let X = x1; X <= x2; X++) {
          if ((X - x) * (X - x) + (Y - y) * (Y - y) >= radius * radius) {
            yield [X, Y];
          } else continue;
        }
      }
      radius--;
    }
  }

  function* diagonal(x1, y1, x2, y2) {
    let width = x2 - x1 + 1;
    let height = y2 - y1 + 1;
    for (let x = 0; x < width + height - 1; x++) {
      for (let y = Math.max(0, x - width + 1); y < Math.min(height, x + 1); y++) {
        yield [x1 + x - y, y1 + y];
      }
    }
  }

  function* spiral(x1, y1, x2, y2) {
    let w = x2 - x1 + 1;
    let h = y2 - y1 + 1;
    let x = y = 0;
    let dx = 0;
    let dy = -1;
    for (let i = 0; i < Math.max(w, h) ** 2; i++) {
      let ox = Math.floor((x1 + x2) / 2) + x;
      let oy = Math.floor((y1 + y2) / 2) + y;
      if (ox >= x1 && ox <= x2 && oy >= y1 && oy <= y2) {
        yield [ox, oy];
      }
      if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y)) {
        [dx, dy] = [-dy, dx];
      }
      [x, y] = [x + dx, y + dy];
    }
  }

  function* chunkMode(x1, y1, x2, y2) {
    for (let cX = 0; cX < Math.ceil((x2 - x1) / 16); cX++) {
      for (let y = y1; y <= y2; y++) {
        for (let x = 0; x < 16; x++) {
          let ox = x1 + x + cX * 16;
          if (ox > x2) continue;
          yield [ox, y];
        }
      }
    }
  }

  function* construction(x1, y1, x2, y2) {
    let rows = [];
    let columns = [];
    for (let y = y1; y <= y2; y++) rows.push([]);
    for (let x = x1; x <= x2; x++) columns.push([]);
    let i = 0;
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        rows[i].push([x, y]);
      }
      i++;
    }
    i = 0;
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        columns[i].push([x, y]);
      }
      i++;
    }
    rows.shuffle();
    columns.shuffle();
    let max = rows.length + columns.length;
    i = 0;
    while (i <= max) {
      if (!rows.length || !columns.length) break;
      switch (Math.Random(0, 1)) {
        case (0): {
          for (let j = 0; j < rows[0].length; j++) {
            yield rows[0][j];
          }
          rows.shift();
          break;
        }
        case (1): {
          for (let j = 0; j < columns[0].length; j++) {
            yield columns[0][j];
          }
          columns.shift();
          break;
        }
      }
      i++;
    }
  }
  async function fill(x1, y1, x2, y2, color, pattern) {
    let x1c = x1;
    let y1c = y1;
    let x2c = x2;
    let y2c = y2;

    x1 = x1c < x2c ? x1c : x2c;
    y1 = y1c < y2c ? y1c : y2c;

    x2 = x1c > x2c ? x1c : x2c;
    y2 = y1c > y2c ? y1c : y2c;

    await requestArea(x1, y1, x2 + 1, y2 + 1, true);
    jobs++;

    color = data.options.Rainbow ? randomColor() : color;
    for (let pixel of pattern(x1, y1, x2, y2)) {
      let x = pixel[0];
      let y = pixel[1];
      if (stop) break;
      let bot = next();
      if (same(await bot.world.getPixel(x, y), color)) continue;
      if (data.options['Avoid Protected'] && isChunkProtected(x, y)) continue;
      if (data.options.Sleep && shouldSleep(bot)) await sleep(delay());
      color = data.options.Skittle ? randomColor() : color;

      if (data.options['Use Player']) {
        if (O.player.setPixel(x, y, color)) continue;
      }

      bot.world.setPixel(x, y, color, data.options['Wolf Move'], data.options.Sneaky);
    }
    jobs--;
  }


  /*function parse(image) {
    reader.addEventListener('load', function(e) {
      let img = new Image();
      img.addEventListener('load', e => {
        canvas.width = width = img.width;
        canvas.height = height = img.height;
        ctx.drawImage(img, 0, 0);
        parsed = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        //parsed = [];
        //for (let i = 0; i < data.length; i += 4) parsed.push([data[i], data[i + 1], data[i + 2], data[i + 3]]);
      });
      img.src = reader.result;
    }, {
      once: true
    });
    reader.readAsDataURL(image);
  }*/
  /*function parse(image) {
    reader.addEventListener("load", function() {
      let img = new Image();
      img.src = reader.result;
      img.addEventListener("load", function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      });
    });
    reader.readAsDataURL(image);
  }*/
  function lerp(color1, color2, factor) {
    if (arguments.length < 3) {
      factor = 0.5;
    }
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
  };

  const getIbyXY = (x, y, w) => (y * w + x) * 4;

  async function paste(X, Y, pattern) {
    await requestArea(X, Y, X + width, Y + height, true);

    reader.addEventListener('load', function(e) {
      let img = new Image();
      img.addEventListener('load', async e => {
        canvas.width = width = img.width;
        canvas.height = height = img.height;
        ctx.drawImage(img, 0, 0);
        let dataOfImage = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        jobs++;
        for (let pixel of pattern(X, Y, width + X - 1, height + Y - 1)) {
          let x = pixel[0];
          let y = pixel[1];

          if (stop) break;
          let i = getIbyXY(x - X, y - Y, width);

          let bot = next();
          let onCanvas = await bot.world.getPixel(x, y);
          let color = lerp(onCanvas, dataOfImage.slice(i, i + 3), dataOfImage[i + 3] / 255);

          if (same(onCanvas, color)) continue;
          if (data.options['Avoid Protected'])
            if (isChunkProtected(x, y)) continue;
          if (data.options.Sleep && shouldSleep(bot)) await sleep(delay());
          if (data.options['Use Player']) {
            if (O.player.setPixel(x, y, color)) continue;
          }

          bot.world.setPixel(x, y, color, data.options['Wolf Move'], data.options.Sneaky);
        }
        jobs--;

      });
      img.src = reader.result;
    }, {
      once: true
    });
    reader.readAsDataURL(image.files[0]);

  }
  // TOOLS
  O.tool.addToolObject(new O.tool.class('Bot Area', O.cursors.cursor, O.fx.player.RECT_SELECT_ALIGNED(1), false, tool => {
    tool.setEvent('mousedown', mouse => {
      if (mouse.buttons === 1) {
        data.fill['Start X'] = O.mouse.tileX;
        data.fill['Start Y'] = O.mouse.tileY;
      }
      if (mouse.buttons === 2) {
        data.fill['End X'] = O.mouse.tileX;
        data.fill['End Y'] = O.mouse.tileY;
        data.fill.Color = O.player.selectedColor;
        stop = false;
        fill(data.fill['Start X'], data.fill['Start Y'], data.fill['End X'], data.fill['End Y'], data.fill.Color, patterns[data.fill.Pattern]);
      }

      tabs.Fill.updateDisplay();
    });
  }));

  O.tool.addToolObject(new O.tool.class('Bot Paster', O.cursors.paste, O.fx.player.RECT_SELECT_ALIGNED(1), false, tool => {
    tool.setEvent("select", data.paste.Image);

    tool.setEvent('mousedown', mouse => {
      if (mouse.buttons === 1 || mouse.buttons === 2) {
        data.paste['Paste X'] = O.mouse.tileX;
        data.paste['Paste Y'] = O.mouse.tileY;
        tabs.Paste.updateDisplay();

        paste(data.paste['Paste X'], data.paste['Paste Y'], patterns[data.paste.Pattern]);
      }
    });
  }));

  O.tool.addToolObject(new O.tool.class('Bot Chunker', O.cursors.erase, O.fx.player.RECT_SELECT_ALIGNED(16), false, tool => {
    tool.setEvent('mousedown', mouse => {
      if (mouse.buttons === 1 || mouse.buttons === 2) {
        stop = false;

        data.fill['Start X'] = Math.floor(O.mouse.tileX / 16) * 16;
        data.fill['Start Y'] = Math.floor(O.mouse.tileY / 16) * 16;
        data.fill['End X'] = data.fill['Start X'] + 15;
        data.fill['End Y'] = data.fill['Start Y'] + 15;
        data.fill.Color = mouse.buttons === 1 ? O.player.selectedColor : [255, 255, 255];

        fill(data.fill['Start X'], data.fill['Start Y'], data.fill['End X'], data.fill['End Y'], data.fill.Color, patterns[data.fill.Pattern]);
        tabs.Fill.updateDisplay();
      }
    });
  }));
})(OWOP);
