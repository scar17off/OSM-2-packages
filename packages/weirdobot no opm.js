// ==UserScript==
// @name         WeirdoBot
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  OWOP WeirdoBot
// @author       mathias777 / no opm version by scar17off & gorenz
// @match        *://augustberchelmann.com/owop/*
// @match        *://ourworldofpixels.com/*
// @match        *://yourworldofpixels.glitch.me/*
// @icon         https://www.google.com/s2/favicons?domain=ourworldofpixels.com
// @grant        none
// ==/UserScript==

let isBrowser = true;
let OWOPUnlocked = (() => {
    if (typeof OWOP === "undefined") return false;
    return typeof OWOP.require !== "undefined";
})();

var BOJS = {};

function append(src, onload) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = onload;
    document.body.appendChild(s);
};
function loadScript(src, onload) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = onload;
    document.body.appendChild(s);
};

append("https://raw.githack.com/Olical/EventEmitter/master/EventEmitter.min.js", () => {
    if (isBrowser) {
        ! function(e) {
            "use strict";

            function t() {}

            function n(e, t) {
                for (var n = e.length; n--;)
                    if (e[n].listener === t) return n;
                return -1
            }

            function r(e) {
                return function() {
                    return this[e].apply(this, arguments)
                }
            }

            function i(e) {
                return "function" == typeof e || e instanceof RegExp || !(!e || "object" != typeof e) && i(e.listener)
            }
            var s = t.prototype,
                o = e.EventEmitter;
            s.getListeners = function(e) {
                var t, n, r = this._getEvents();
                if (e instanceof RegExp) {
                    t = {};
                    for (n in r) r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n])
                } else t = r[e] || (r[e] = []);
                return t
            }, s.flattenListeners = function(e) {
                var t, n = [];
                for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
                return n
            }, s.getListenersAsObject = function(e) {
                var t, n = this.getListeners(e);
                return n instanceof Array && (t = {}, t[e] = n), t || n
            }, s.addListener = function(e, t) {
                if (!i(t)) throw new TypeError("listener must be a function");
                var r, s = this.getListenersAsObject(e),
                    o = "object" == typeof t;
                for (r in s) s.hasOwnProperty(r) && -1 === n(s[r], t) && s[r].push(o ? t : {
                    listener: t,
                    once: !1
                });
                return this
            }, s.on = r("addListener"), s.addOnceListener = function(e, t) {
                return this.addListener(e, {
                    listener: t,
                    once: !0
                })
            }, s.once = r("addOnceListener"), s.defineEvent = function(e) {
                return this.getListeners(e), this
            }, s.defineEvents = function(e) {
                for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
                return this
            }, s.removeListener = function(e, t) {
                var r, i, s = this.getListenersAsObject(e);
                for (i in s) s.hasOwnProperty(i) && -1 !== (r = n(s[i], t)) && s[i].splice(r, 1);
                return this
            }, s.off = r("removeListener"), s.addListeners = function(e, t) {
                return this.manipulateListeners(!1, e, t)
            }, s.removeListeners = function(e, t) {
                return this.manipulateListeners(!0, e, t)
            }, s.manipulateListeners = function(e, t, n) {
                var r, i, s = e ? this.removeListener : this.addListener,
                    o = e ? this.removeListeners : this.addListeners;
                if ("object" != typeof t || t instanceof RegExp)
                    for (r = n.length; r--;) s.call(this, t, n[r]);
                else
                    for (r in t) t.hasOwnProperty(r) && (i = t[r]) && ("function" == typeof i ? s.call(this, r, i) : o.call(this, r, i));
                return this
            }, s.removeEvent = function(e) {
                var t, n = typeof e,
                    r = this._getEvents();
                if ("string" === n) delete r[e];
                else if (e instanceof RegExp)
                    for (t in r) r.hasOwnProperty(t) && e.test(t) && delete r[t];
                else delete this._events;
                return this
            }, s.removeAllListeners = r("removeEvent"), s.emitEvent = function(e, t) {
                var n, r, i, s, o = this.getListenersAsObject(e);
                for (s in o)
                    if (o.hasOwnProperty(s))
                        for (n = o[s].slice(0), i = 0; i < n.length; i++) r = n[i], !0 === r.once && this.removeListener(e, r.listener), r.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, r.listener);
                return this
            }, s.trigger = r("emitEvent"), s.emit = function(e) {
                var t = Array.prototype.slice.call(arguments, 1);
                return this.emitEvent(e, t)
            }, s.setOnceReturnValue = function(e) {
                return this._onceReturnValue = e, this
            }, s._getOnceReturnValue = function() {
                return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
            }, s._getEvents = function() {
                return this._events || (this._events = {})
            }, t.noConflict = function() {
                return e.EventEmitter = o, t
            }, "function" == typeof define && define.amd ? define(function() {
                return t
            }) : "object" == typeof module && module.exports ? module.exports = t : e.EventEmitter = t
        }("undefined" != typeof window ? window : this || {});
        // upper thing is event emitter
    } else {
        WebSocket = require("ws");
        EventEmitter = require("events");
        Canvas = require("canvas");
    }

    if (!Object.values) Object.values = function(object) {
        return Object.keys(object).map(function(key) {
            return object[key];
        });
    }
    class Bucket {
        constructor(rate, time, infinite) {
            this.lastCheck = Date.now();
            this.allowance = rate;
            this.rate = rate;
            this.time = time;
            this.infinite = infinite;
        };
        update() {
            this.allowance += (Date.now() - this.lastCheck) / 1000 * (this.rate / this.time);
            this.lastCheck = Date.now();
            if (this.allowance > this.rate) {
                this.allowance = this.rate;
            }
        };
        canSpend(count) {
            if (this.infinite) {
                return true;
            }

            this.update();
            if (this.allowance < count) {
                return false;
            }
            this.allowance -= count;
            return true;
        };
    };

    class WeirdDataView {
        constructor(arrayBuffer = new ArrayBuffer()) {
            this.offset = 0;
            this.dv = new DataView(arrayBuffer);
        }
        get buffer() {
            return this.dv.buffer;
        }
        // set
        // 8
        setUint8(value, offset = this.offset, addToOffset = true) {
            let data = this.dv.setUint8(offset, value);
            this.offset = addToOffset ? offset + 1 : offset;
        }
        setInt8(value, offset = this.offset, addToOffset = true) {
            let data = this.dv.setInt8(offset, value);
            this.offset = addToOffset ? offset + 1 : offset;
        }
        // 16
        setUint16(value, offset = this.offset, littleEndian = true, addToOffset = true) {
            let data = this.dv.setUint16(offset, value, littleEndian);
            this.offset = addToOffset ? offset + 2 : offset;
        }
        setInt16(value, offset = this.offset, littleEndian = true, addToOffset = true) {
            let data = this.dv.setInt16(offset, value, littleEndian);
            this.offset = addToOffset ? offset + 2 : offset;
        }
        // 32
        setUint32(value, offset = this.offset, littleEndian = true, addToOffset = true) {
            let data = this.dv.setUint32(offset, value, littleEndian);
            this.offset = addToOffset ? offset + 4 : offset;
        }
        setInt32(value, offset = this.offset, littleEndian = true, addToOffset = true) {
            let data = this.dv.setInt32(offset, value, littleEndian);
            this.offset = addToOffset ? offset + 4 : offset;
        }

        // get
        // 8
        getUint8(offset = this.offset, addToOffset = true) {
            let data = this.dv.getUint8(offset);
            this.offset = addToOffset ? offset + 1 : offset;
            return data;
        }
        getInt8(offset = this.offset, addToOffset = true) {
            let data = this.dv.getInt8(offset);
            this.offset = addToOffset ? offset + 1 : offset;
            return data;
        }
        // 16
        getUint16(offset = this.offset, littleEndian = true, addToOffset = true) {
            let data = this.dv.getUint16(offset, littleEndian);
            this.offset = addToOffset ? offset + 2 : offset;
            return data;
        }
        getInt16(offset = this.offset, littleEndian = true, addToOffset = true) {
            let data = this.dv.getInt16(offset, littleEndian);
            this.offset = addToOffset ? offset + 2 : offset;
            return data;
        }
        // 32
        getUint32(offset = this.offset, littleEndian = true, addToOffset = true) {
            let data = this.dv.getUint32(offset, littleEndian);
            this.offset = addToOffset ? offset + 4 : offset;
            return data;
        }
        getInt32(offset = this.offset, littleEndian = true, addToOffset = true) {
            let data = this.dv.getInt32(offset, littleEndian);
            this.offset = addToOffset ? offset + 4 : offset;
            return data;
        }
    }

    class ChunkSystem {
        static getIbyXY(x, y, w) {
            return (y * w + x) * 3;
        }
        constructor() {
            this.chunks = {};
            this.chunkProtected = {};
        };

        setChunk(x, y, data) {
            if (!data || typeof x !== "number" || typeof y !== "number") throw new Error("x or y is not a number or no data!");

            return this.chunks[`${x},${y}`] = data;
        };
        getChunk(x, y) {
            return this.chunks[`${x},${y}`];
        };
        removeChunk(x, y) {
            return delete this.chunks[`${x},${y}`];
        };
        setPixel(x, y, rgb) {
            if (typeof rgb !== "object" || typeof x !== "number" || typeof y !== "number") throw new Error("x or y is not a number or rgb is not array!");
            const chunkX = Math.floor(x / Client.options.chunkSize);
            const chunkY = Math.floor(y / Client.options.chunkSize);

            const chunk = this.getChunk(chunkX, chunkY);
            if (!chunk) return;

            const i = ChunkSystem.getIbyXY(x & Client.options.chunkSize - 1, y & Client.options.chunkSize - 1, Client.options.chunkSize);

            chunk[i] = rgb[0];
            chunk[i + 1] = rgb[1];
            chunk[i + 2] = rgb[2];
            return true;
        };
        getPixel(x, y) {
            if (typeof x !== "number" || typeof y !== "number") throw new Error("x or y is not a number!");
            const chunkX = Math.floor(x / Client.options.chunkSize);
            const chunkY = Math.floor(y / Client.options.chunkSize);

            const chunk = this.getChunk(chunkX, chunkY);

            if (!chunk) return;

            const i = ChunkSystem.getIbyXY(x & Client.options.chunkSize - 1, y & Client.options.chunkSize - 1, Client.options.chunkSize);
            return [chunk[i], chunk[i + 1], chunk[i + 2]];
        };
        setChunkProtection(x, y, newState) {
            if (typeof x !== "number" || typeof y !== "number") throw new Error("x or y is not a number!");

            if (newState) this.chunkProtected[`${x},${y}`] = true;
            else delete this.chunkProtected[`${x},${y}`];
            return true;
        }
        isProtected(x, y) {
            if (typeof x !== "number" || typeof y !== "number") throw new Error("x or y is not a number!");
            return !!this.chunkProtected[`${x},${y}`];
        }
    };

    const canvasUtils = {
        getIbyXY(x, y, w) {
            return (y * w + x) * 4;
        },
        _lerp(color1, color2, factor = 0.5) {
            return Math.round(color1 + (color2 - color1) * factor);
        },
        lerp(color1, color2, factor = 0.5) {
            let result = Uint8ClampedArray(3); // i don't really want other values like NaN

            for (let i = 0; i < 3; i++) {
                result[i] = canvasUtils._lerp(color1[i], color2[i], factor);
            }
            return result;
        },
        imageDataToCtx(imageData) { // canvas = ctx.canvas
            let canvas = canvasUtils.createCanvas(imageData.width, imageData.height);
            let ctx = canvas.getContext("2d");

            ctx.putImageData(imageData, 0, 0);
            return ctx;
        },
        createCanvas(width, height) {
            let canvas;
            if (isBrowser) {
                canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
            } else {
                canvas = new Canvas.Canvas(width, height);
            }
            return canvas;
        },
        createImageData() {
            let imageData;

            if (isBrowser) {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                imageData = ctx.createImageData(...arguments);
            } else {
                imageData = Canvas.createImageData(...arguments);
            }

            return imageData;
        },
        dataToImageData(data, width, height, hasAlpha = true, alpha = 255) {
            let imageData = canvasUtils.createImageData(width, height);
            if (!hasAlpha) {
                data = canvasUtils.addAlphaToData(data, alpha);
            }

            for (let i = 0; i < data.length; i++) imageData.data[i] = data[i]; // WTF WHY IT CAN'T BE JUST image.data = data; WHYYYYYYYYYYYYYYYYYYYYYYYYYYY

            return imageData;
        },
        removeAlphaFromImageData(data) {
            if (data.length % 4 !== 0) throw new Error("Data is not image data");

            let newData = new Uint8ClampedArray(data.length - data.length / 4);
            for (let i = 0, i2 = 0; i < newData.length;) {
                newData[i++] = data[i2++];
                newData[i++] = data[i2++];
                newData[i++] = data[i2++];
                i2++;
            }
            return newData;
        },
        addAlphaToData(data, alpha = 255) {
            if (data.length % 3 !== 0) throw new Error("Data is not data ;-;");
            let newData = new Uint8ClampedArray(data.length + data.length / 3);

            for (let i = 0, i2 = 0; i < newData.length;) {
                newData[i++] = data[i2++];
                newData[i++] = data[i2++];
                newData[i++] = data[i2++];
                newData[i++] = alpha;
            }
            return newData;
        }
        /*,
            lerpImageDataWithNormalColors(imageData, imageDataWithoutAlphaChannel) { // i will delete it but i added it idk why
              let lerped = new Uint8ClampedArray(imageDataWithoutAlphaChannel.length);
              for (let i = 0, i2 = 0; i < imageData.length;) {
                let factor = imageData[i + 3];
                lerped[i2] = canvasUtils._lerp(imageDataWithoutAlphaChannel[i2], imageData[i], factor / 255);
                i++;
                i2++;
                lerped[i2] = canvasUtils._lerp(imageDataWithoutAlphaChannel[i2], imageData[i], factor / 255);
                i++;
                i2++;
                lerped[i2] = canvasUtils._lerp(imageDataWithoutAlphaChannel[i2], imageData[i], factor / 255);
                i++;
                i2++;

                i++;
              }
              return lerped;
            }*/
    };

    class Client extends EventEmitter {
        static options = {
            chunkSize: 16,
            maxChatBuffer: 256,
            maxMessageLength: {
                0: 128,
                1: 128,
                2: 512,
                3: 16384
            },
            maxWorldNameLength: 24,
            worldBorder: 0xFFFFFF, // or Math.pow(2, 24)-1
            misc: {
                chatVerification: String.fromCharCode(10),
                tokenVerification: "CaptchA",
                worldVerification: 25565
            },
            opcode: {
                setId: 0,
                worldUpdate: 1,
                chunkLoad: 2,
                teleport: 3,
                setRank: 4,
                captcha: 5,
                setPQuota: 6,
                chunkProtected: 7
            },
            chatQuota: {
                0: [4, 6],
                1: [4, 6],
                2: [10, 3],
                3: [0, 1000]
            },
            captchaState: {
                WAITING: 0,
                VERIFYING: 1,
                VERIFIED: 2,
                OK: 3,
                INVALID: 4
            },
            tools: {
                0: [1, "cursor"],
                1: [0, "move"],
                2: [0, "pippete"],
                3: [2, "eraser"],
                4: [0, "zoom"],
                5: [1, "bucket"],
                6: [2, "paste"],
                7: [0, "export"],
                8: [1, "line"],
                9: [2, "protect"],
                10: [2, "copy"]
            }
        };
        static utils = {
            shouldMove(x1, y1, x2, y2) {
                let distx = Math.trunc(x2 / Client.options.chunkSize) - Math.trunc(x1 / Client.options.chunkSize);
                distx *= distx;
                let disty = Math.trunc(y2 / Client.options.chunkSize) - Math.trunc(y1 / Client.options.chunkSize);
                disty *= disty;

                let dist = Math.sqrt(distx + disty);

                return dist >= 3;
            },
            decompress(u8arr) {
                var originalLength = u8arr[1] << 8 | u8arr[0];
                var u8decompressedarr = new Uint8ClampedArray(originalLength);
                var numOfRepeats = u8arr[3] << 8 | u8arr[2];
                var offset = numOfRepeats * 2 + 4;
                var uptr = 0;
                var cptr = offset;
                for (var i = 0; i < numOfRepeats; i++) {
                    var currentRepeatLoc = (u8arr[4 + i * 2 + 1] << 8 | u8arr[4 + i * 2]) + offset;
                    while (cptr < currentRepeatLoc) {
                        u8decompressedarr[uptr++] = u8arr[cptr++];
                    }
                    var repeatedNum = u8arr[cptr + 1] << 8 | u8arr[cptr];
                    var repeatedColorR = u8arr[cptr + 2];
                    var repeatedColorG = u8arr[cptr + 3];
                    var repeatedColorB = u8arr[cptr + 4];
                    cptr += 5;
                    while (repeatedNum--) {
                        u8decompressedarr[uptr] = repeatedColorR;
                        u8decompressedarr[uptr + 1] = repeatedColorG;
                        u8decompressedarr[uptr + 2] = repeatedColorB;
                        uptr += 3;
                    }
                }
                while (cptr < u8arr.length) {
                    u8decompressedarr[uptr++] = u8arr[cptr++];
                }
                return u8decompressedarr;
            },
            Player: class {
                constructor(id) {
                    this.id = id;
                    this.nick = "";
                    this.x = 0;
                    this.y = 0;
                    this.color = [0, 0, 0];
                    this.rank = 0;
                }
            },
            createChunkFromRGB(color) {
                let tile = new Uint8ClampedArray(Client.options.chunkSize * Client.options.chunkSize * 3);
                for (var i = 0; i < tile.length;) {
                    tile[i++] = color[0];
                    tile[i++] = color[1];
                    tile[i++] = color[2];
                }
                return tile;
            },
            isArraysSame(...arrays) {
                arrays = arrays.map(array => JSON.stringify(array));

                return !arrays.filter(array => arrays[0] !== array).length;
            }
        };
        constructor(options = {}) {
            super();
            const that = this;
            this.chunkSystem = new ChunkSystem();
            this.pendingLoad = {};
            this.destroyed = false;

            if (!options.ws) options.ws = OWOP.options.serverAddress[0].url;;
            if (!options.origin && !isBrowser) options.origin = options.ws.replace("ws", "http");
            if (typeof options.protocol === "undefined") options.protocol = 1;
            if (typeof options.autoConnectWorld === "undefined") options.autoConnectWorld = true;
            if (typeof options.log === "undefined") options.log = true;
            if (typeof options.autoMakeSocket === "undefined") options.autoMakeSocket = true;
            if (typeof options.captchaSiteKey === "undefined") options.captchaSiteKey = "6LcgvScUAAAAAARUXtwrM8MP0A0N70z4DHNJh-KI";
            if (typeof options.reconnectTime === "undefined") options.reconnectTime = 5000;
            if (typeof options.reconnectTries === "undefined") options.reconnectTries = -1; // endless
            this.reconnectTries = options.reconnectTries;

            if (options.controller && !isBrowser) {
                const stdin = process.openStdin();
                stdin.on("data", d => {
                    const msg = d.toString().trim();
                    try {
                        return console.log(String(eval(msg)).slice(0, 1000));
                    } catch (e) {
                        console.log('[ERROR]: ' + e.name + ": " + e.message + "\n" + e.stack);
                    }
                });
            }
            this.clientOptions = options;

            this.players = {};
            this.player = {
                id: null,
                color: [0, 0, 0],
                tool: 0,
                x: 0,
                y: 0,
                rank: 0,

                nick: options.nick,
                chatBucket: new Bucket(...Client.options.chatQuota[0]),
                pixelBucket: new Bucket(32, 4)
            };
            this.chat = {
                send(message, sendModifier = true) {
                    if (!that.ws ||
                        that.ws.readyState !== 1) return false;
                    if (!that.clientOptions.unsafe) {
                        if (!that.player.chatBucket.canSpend(1)) return false;
                        message = message.slice(0, Client.options.maxMessageLength[that.player.rank]);
                    }
                    if (sendModifier) message = that.chat.sendModifier(message);

                    that.ws.send(message + Client.options.misc.chatVerification);
                },
                recvModifier(message) {
                    return message;
                },
                sendModifier(message) {
                    return message;
                },
                messages: [],
                /*
                0-3 - normal owop ranks
                4 - discord
                */
                parseMessage(msg) {
                    let something = msg.split(": ");

                    if (msg.startsWith("DEV") ||
                        msg.toLowerCase().startsWith("server:") ||
                        msg[0] === "<" ||
                        something.length < 2) return [null, null, null, msg];

                    let before = something.shift();
                    let message = something.join(": ").trim();

                    let user = {
                        rank: 0,
                        id: null,
                        nick: ""
                    }
                    let tell = false;

                    if (before.startsWith("[D]")) {
                        user.rank = 4; // rank 4 is discord
                        user.nick = before.slice(4).trim(); // two ways one is spliting by space second is by just slicing 4 letters

                    } else if (before.startsWith("(M)")) {
                        user.nick = before.slice(4).trim();
                        user.rank = 2;
                    } else if (before.startsWith("(A)")) {
                        user.nick = before.slice(4).trim();
                        user.rank = 3;
                    } else if (before.startsWith("[") || /[0-9]/g.test(before[0])) {
                        if (before.startsWith("[")) {
                            user.id = +before.split("]")[0].substr(1);
                            user.nick = before.split("]");
                            user.nick.shift();
                            user.nick = user.nick.join("]").trim();
                        } else {
                            user.id = +before;
                            user.nick = before.trim(); // trim is not needed i think
                        }

                        user.rank = 0; //that.players[user.id] ? that.players[user.id].rank : 0;
                    } else if (before.startsWith("-> ") && /[0-9]/g.test(before[4])) {
                        tell = true;
                        user.id = +before.split(" ")[1];
                        user.nick = user.id.toString();

                        user.rank = 0 //that.players[user.id] ? that.players[user.id].rank : 0;
                    } else if (before.toLowerCase().startsWith("-> you tell")) {
                        user.id = that.player.id;
                        user.nick = that.player.nick;
                        tell = true;
                    }
                    return [user, message, tell, msg];
                }
            };

            this.world = {
                join(name = "main") {
                    let nameCopy = name = (name.replace(/[^a-zA-Z0-9\._]/gm, "").slice(0, 24) || "main");
                    nameCopy = nameCopy.split("").map(x => x.charCodeAt(0));

                    let dv = new DataView(new ArrayBuffer(name.length + 2));

                    for (let i = 0; i < name.length; i++) dv.setUint8(i, nameCopy[i] || 0);

                    dv.setUint16(name.length, that.clientOptions.worldVerification || Client.options.misc.worldVerification, true);

                    that.ws.send(dv.buffer);
                    that.world.name = name;
                    that.log("Joining world: " + name);
                },
                leave() {
                    this.ws.close(); // bug it will reconnect if can
                },
                move(x = that.player.x, y = that.player.y) {
                    if (that.ws.readyState !== 1) return false;

                    that.player.x = x = +x;
                    that.player.y = y = +y;

                    x *= 16;
                    y *= 16;

                    let dv = new WeirdDataView(new ArrayBuffer(12));
                    dv.setInt32(x);
                    dv.setInt32(y);
                    dv.setUint8(that.player.color[0]);
                    dv.setUint8(that.player.color[1]);
                    dv.setUint8(that.player.color[2]);
                    dv.setUint8(that.player.tool);
                    that.ws.send(dv.buffer);
                    return true;
                },
                setPixel(x = that.player.x, y = that.player.y, color = that.player.color, wolfMove, sneaky, move = (that.player.rank < 3)) {
                    if (that.ws.readyState !== 1) return false;
                    let oldX = that.player.x;
                    let oldY = that.player.y;

                    x = +x;
                    y = +y;
                    if (!that.clientOptions.unsafe && (!that.player.pixelBucket.canSpend(1) || that.player.rank === 0)) return false;
                    if (wolfMove) {
                        if (Client.utils.shouldMove(that.player.x, that.player.x, x, y)) that.world.move(x, y);
                    } else if (move) {
                        that.world.move(x, y);
                    }
                    that.player.color = color;
                    let dv = new WeirdDataView(new ArrayBuffer(11));
                    dv.setInt32(x);
                    dv.setInt32(y);
                    dv.setUint8(that.player.color[0]);
                    dv.setUint8(that.player.color[1]);
                    dv.setUint8(that.player.color[2]);
                    that.ws.send(dv.buffer);

                    if (sneaky) that.world.move(oldX, oldY);
                    return true;
                },
                pasteChunk(x, y, data) {
                    if (that.ws.readyState !== 1 || !that.clientOptions.unsafe && that.player.rank < 2) return false;

                    let dv = new DataView(new ArrayBuffer(8 + Client.options.chunkSize * Client.options.chunkSize * 3));
                    dv.setInt32(0, x, true);
                    dv.setInt32(4, y, true);
                    for (let i = 0; i < data.length; i++) dv.setUint8(8 + i, data[i]);

                    that.ws.send(dv.buffer);
                    return true;
                },
                async pasteImageData(x, y, imageData, isImage) { // tried to do fastest as possible
                    if (that.ws.readyState !== 1 || !that.clientOptions.unsafe && that.player.rank < 2) return false;

                    // math
                    let chunkXStart = Math.floor(x / Client.options.chunkSize);
                    let chunkXEnd = Math.floor((x + imageData.width) / Client.options.chunkSize) + 1;
                    let chunkYStart = Math.floor(x / Client.options.chunkSize);
                    let chunkYEnd = Math.floor((x + imageData.height) / Client.options.chunkSize) + 1;

                    let canvasWidthInChunks = chunkXEnd - chunkXStart;
                    let canvasHeightInChunks = chunkYEnd - chunkXStart;

                    let posXOnCanvas = x % Client.options.chunkSize;
                    let posYOnCanvas = y % Client.options.chunkSize;

                    // some shit
                    let canvas = canvasUtils.createCanvas(canvasWidthInChunks * Client.options.chunkSize, canvasHeightInChunks * Client.options.chunkSize);
                    let ctx = canvas.getContext("2d");
                    let image = isImage ? imageData : canvasUtils.imageDataToCtx(imageData).canvas;

                    // requesting chunks and setting them on canvas
                    await new Promise(resolve => {
                        let chunksLasted = canvasWidthInChunks * canvasHeightInChunks;

                        for (let xx = chunkXStart, canvasX = 0; xx < chunkXEnd; xx++, canvasX += Client.options.chunkSize) {
                            for (let yy = chunkYStart, canvasY = 0; yy < chunkYEnd; yy++, canvasY += Client.options.chunkSize) {

                                that.world.requestChunk(xx, yy).then(data => {
                                    let chunkImageData = canvasUtils.dataToImageData(data, Client.options.chunkSize, Client.options.chunkSize, false);

                                    ctx.putImageData(chunkImageData, canvasX, canvasY);

                                    chunksLasted--;
                                    if (!chunksLasted) resolve();
                                });
                            }
                        }
                    });

                    ctx.drawImage(image, posXOnCanvas, posYOnCanvas); // setting image

                    // pasting
                    for (let xx = chunkXStart, canvasX = 0; xx < chunkXEnd; xx++, canvasX += Client.options.chunkSize) {
                        for (let yy = chunkYStart, canvasY = 0; yy < chunkYEnd; yy++, canvasY += Client.options.chunkSize) {
                            let chunkImageData = ctx.getImageData(canvasX, canvasY, Client.options.chunkSize, Client.options.chunkSize);
                            let chunkData = canvasUtils.removeAlphaFromImageData(chunkImageData.data);

                            if (Client.utils.isArraysSame(chunkData, that.chunkSystem.getChunk(xx, yy))) continue;

                            that.world.pasteChunk(xx, yy, chunkData);
                        }
                    }

                    return true;
                },
                setTool(tool) {
                    if (that.ws.readyState !== 1) return false;
                    that.player.tool = +tool;

                    let dv = new WeirdDataView(new ArrayBuffer(12));
                    dv.setInt32(that.player.x * 16);
                    dv.setInt32(that.player.y * 16);
                    dv.setUint8(that.player.color[0]);
                    dv.setUint8(that.player.color[1]);
                    dv.setUint8(that.player.color[2]);
                    dv.setUint8(that.player.tool);
                    that.ws.send(dv.buffer);
                    return true;
                },
                setColor(color) {
                    if (that.ws.readyState !== 1) return false;
                    that.player.color = color;

                    let dv = new WeirdDataView(new ArrayBuffer(12));
                    dv.setInt32(that.player.x * 16);
                    dv.setInt32(that.player.y * 16);
                    dv.setUint8(that.player.color[0]);
                    dv.setUint8(that.player.color[1]);
                    dv.setUint8(that.player.color[2]);
                    dv.setUint8(that.player.tool);
                    that.ws.send(dv.buffer);
                    return true;
                },
                protectChunk(x, y, newState = 1) {
                    if (that.ws.readyState !== 1 || that.player.rank < 2 && that.clientOptions.unsafe) return false;
                    let dv = new WeirdDataView(new ArrayBuffer(10));
                    dv.setInt32(x);
                    dv.setInt32(y);
                    dv.setUint8(newState);
                    that.ws.send(dv.buffer);
                    return true;
                },
                clearChunk(x, y, color) {
                    if (that.ws.readyState !== 1 || that.player.rank < 2 && that.clientOptions.unsafe) return false;
                    if (that.clientOptions.protocol === 0) {
                        if (color[0] === 255 && color[1] === 255 && color[2] === 255) {
                            let dv = new WeirdDataView(new ArrayBuffer(9));
                            dv.setInt32(x);
                            dv.setInt32(y);
                            that.ws.send(dv.buffer);
                        } else {
                            that.world.pasteChunk(x, y, Client.utils.createChunkFromRGB(color));
                        }
                    } else {
                        let dv = new WeirdDataView(new ArrayBuffer(13));
                        dv.setInt32(x);
                        dv.setInt32(y);
                        dv.setUint8(color[0]);
                        dv.setUint8(color[1]);
                        dv.setUint8(color[2]);
                        that.ws.send(dv.buffer);
                    }
                    return true;
                },
                __requestChunk(x, y) {
                    let dv = new WeirdDataView(new ArrayBuffer(8));
                    dv.setInt32(x);
                    dv.setInt32(y);
                    that.ws.send(dv.buffer);
                    return true;
                },
                _requestChunk(x, y) {
                    return new Promise(async (resolve, reject) => {
                        if (that.pendingLoad[x + "," + y]) await that.pendingLoad[x + "," + y];

                        if (that.chunkSystem.getChunk(x, y)) return resolve(that.chunkSystem.getChunk(x, y));

                        let wb = Client.options.worldBorder;
                        if (!that.clientOptions.unsafe && (x > wb || y > wb || x < ~wb || y < ~wb)) return reject(false);

                        let func = ((cx, cy, data) => {
                            if (x !== cx || y !== cy) return;
                            that.off("chunk", func);
                            resolve(data);
                        });
                        that.on("chunk", func);
                        that.world.__requestChunk(x, y);
                    });
                },
                requestChunk(x, y, inaccurate) { // i think that there is simplier way but i can't invent it
                    if (inaccurate) {
                        x = Math.floor(x / Client.options.chunkSize);
                        y = Math.floor(y / Client.options.chunkSize);
                    };
                    let chunk = that.world._requestChunk(x, y);

                    that.pendingLoad[x + "," + y] = new Promise(async resolve => {
                        resolve(await chunk);
                        delete that.pendingLoad[x + "," + y];
                    });
                    return chunk;
                },
                async getPixel(x, y) {
                    if (isBrowser)
                        if (that.clientOptions.simpleChunks) return OWOP.world.getPixel(x, y);
                    await that.world.requestChunk(x, y, true);

                    return that.chunkSystem.getPixel(x, y);
                }
            };
            this.captcha = {
                usedKeys: [],
                login(key) {
                    if (!that.ws ||
                        that.ws.readyState !== 1) return false;
                    if (that.captcha.usedKeys.includes(key)) {
                        return false
                    } else if (!key.startsWith("LETMEINPLZ")) {
                        that.captcha.usedKeys.push(key);
                    }
                    that.ws.send(Client.options.misc.tokenVerification + key);
                    that.captcha.usedKeys.push(key);
                    return true;
                },
                renderCaptcha(uniqueName = true) {
                    // you can do it self only on browser
                    if (isBrowser) {
                        return new Promise(resolve => {
                            OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(`Verification Needed` + (uniqueName ? String.fromCharCode(Math.random() * 100) : ""), {
                                closeable: true,
                                moveable: true
                            }, win => {
                                grecaptcha.render(win.addObj(OWOP.util.mkHTML('div', {})), {
                                    theme: 'dark',
                                    sitekey: that.clientOptions.captchaSiteKey,
                                    callback: token => {
                                        win.close();
                                        resolve(token);
                                    }
                                });
                            }));
                        });
                    } else {
                        throw new Error("Node JS can't use renderCaptcha")
                    }
                },
                async renderAndLogin(unique = true) {
                    that.captcha.login(await that.captcha.renderCaptcha(unique));
                }
            };
            if (options.autoMakeSocket) this.makeSocket();
        }
        log(...args) {
            if (this.clientOptions.log) console.log(...args);
        }
        destroy() {
            if (this.ws.readyState === 1) this.ws.close();
            this.destroyed = true;
            this.emit("destroy");
        }
        makeSocket() {
            let ws = new WebSocket(this.clientOptions.ws, isBrowser ? undefined : this.clientOptions);

            this.players = {};
            ws.binaryType = "arraybuffer";

            ws.onopen = () => {
                this.emit("open", ...arguments);
                this.log("Connected");
            }
            ws.onclose = () => {
                this.emit("close", ...arguments);
                this.isWorldConnected = false;
                this.log("Disconnected");
                // if someone dumb will set this.reconnectTries to 0 then it will change after \/ to -1 (endless) but will not connect
                if (!this.destroyed && this.clientOptions.reconnect) setTimeout(this.makeSocket.bind(this), this.clientOptions.reconnectTime)
            }

            ws.onmessage = e => {
                let msg = e.data;
                this.emit("rawMessage", msg);

                const isBinary = typeof msg !== "string";

                if (isBinary) {
                    let dv = new WeirdDataView(msg);
                    let len = dv.byteLength;
                    switch (dv.getUint8()) {
                        case Client.options.opcode.setId: {
                            this.player.id = dv.getUint32();;
                            this.isWorldConnected = true;

                            this.player.rank = 0;

                            this.log(`Joined world '${this.world.name}' and got id '${this.player.id}'`);

                            if (this.clientOptions.adminlogin) this.chat.send("/adminlogin " + this.clientOptions.adminlogin);
                            if (this.clientOptions.modlogin) this.chat.send("/modlogin " + this.clientOptions.modlogin);
                            if (this.clientOptions.pass) this.chat.send("/pass " + this.clientOptions.pass);
                            if (this.clientOptions.nick) this.chat.send("/nick " + this.clientOptions.nick);

                            this.emit("join", this.world.name, this.player.id);
                            break;
                        }
                        case Client.options.opcode.worldUpdate: {
                            let count = dv.getUint8(); // players update size

                            let updatedPlayers = {};
                            let newPlayers = [];
                            for (let i = 0; i < count; i++) { // player updates
                                let id = dv.getUint32(); // player id
                                //let isNew = false;
                                if (!this.players[id]) {
                                    //isNew = true;
                                    this.players[id] = new Client.utils.Player(id);
                                    newPlayers.push(id);
                                }
                                let player = updatedPlayers[id] = this.players[id];

                                player.x = dv.getInt32() / 16; // x
                                player.y = dv.getInt32() / 16; // y

                                player.color[0] = dv.getUint8(); // r
                                player.color[1] = dv.getUint8(); // g
                                player.color[2] = dv.getUint8(); // b
                                player.tool = dv.getUint8(); // tool
                                player.tool = Client.options.tools[player.tool] ? player.tool : 0;
                                player.rank = Math.max(player.rank, Client.options.tools[player.tool][0]);
                            }
                            if (count) {
                                this.emit("updatedPlayers", updatedPlayers);
                                if (newPlayers.length) this.emit("newPlayers", newPlayers);
                            }

                            count = dv.getUint16(); // pixels update size
                            let updatedPixels = [];
                            for (let i = 0; i < count; i++) { // pixel updates
                                let pixel = {};
                                if (this.clientOptions.protocol === 1) pixel.id = dv.getUint32(); // player which set pixel id
                                pixel.x = dv.getInt32(); // pixel x
                                pixel.y = dv.getInt32(); // y
                                pixel.color = [dv.getUint8(), dv.getUint8(), dv.getUint8()];

                                this.chunkSystem.setPixel(pixel.x, pixel.y, pixel.color);

                                updatedPixels.push(pixel);
                                //this.emit("pixelUpdate", pixel);
                            }
                            if (count) this.emit("updatedPixels", updatedPixels);

                            count = dv.getUint8(); // disconnections of players update size
                            let disconnectedPlayers = [];
                            for (let i = 0; i < count; i++) {
                                let leftId = dv.getUint32();
                                disconnectedPlayers.push(leftId);
                                delete this.players[leftId];
                            }
                            if (count) this.emit("playersLeft", disconnectedPlayers);
                            break;
                        }
                        case Client.options.opcode.captcha: {
                            let id = dv.getUint8();
                            this.emit("captcha", id);
                            switch (id) {
                                case Client.options.captchaState.WAITING: {
                                    this.log("Captcha State: 0 (WAITING)");
                                    if (this.clientOptions.captchaPass) {
                                        this.captcha.login("LETMEINPLZ" + this.clientOptions.captchaPass);
                                        this.log("Trying to login using captcha pass");
                                    } else if (this.clientOptions.captchaToken) {
                                        this.log("Trying to login using captcha token");
                                        if (!this.captcha.login(this.clientOptions.captchaToken)) console.log("login failed token already used");
                                    }
                                    break;
                                }
                                case Client.options.captchaState.VERIFYING: {
                                    this.log("Captcha State: 1 (VERIFYING)");
                                    break;
                                }
                                case Client.options.captchaState.VERIFIED: {
                                    this.log("Captcha State: 2 (VERIFIED)");
                                    break;
                                }
                                case Client.options.captchaState.OK: {
                                    this.log("Captcha State: 3 (OK)");
                                    if (this.clientOptions.autoConnectWorld) this.world.join(this.clientOptions.world);
                                    break;
                                }
                                case Client.options.captchaState.INVALID: {
                                    this.log("Captcha State: 4 (INVALID)");
                                    break;
                                }
                            }
                            break;
                        }
                        case Client.options.opcode.chunkLoad: {
                            let chunkX = dv.getInt32();
                            let chunkY = dv.getInt32();

                            let locked = !!dv.getUint8();
                            let chunk = new Uint8ClampedArray(msg, 10);

                            chunk = Client.utils.decompress(chunk);


                            let isNew = !this.chunkSystem.getChunk(chunkX, chunkY);
                            this.chunkSystem.setChunk(chunkX, chunkY, chunk);
                            this.chunkSystem.setChunkProtection(chunkX, chunkY, locked);

                            this.emit("chunk", chunkX, chunkY, chunk, locked, isNew);
                            break;
                        }
                        case Client.options.opcode.teleport: {
                            if (!this.clientOptions.teleport) break;
                            let x = dv.getInt32();
                            let y = dv.getInt32();

                            this.world.move(x, y); // lazy to write
                            this.emit("teleport", x, y);
                            break;
                        }
                        case Client.options.opcode.setRank: {
                            let rank = dv.getUint8();
                            this.player.rank = rank;
                            this.player.chatBucket = new Bucket(...Client.options.chatQuota[rank]);

                            this.emit("rank", rank);
                            break;
                        }
                        case Client.options.opcode.setPQuota: {
                            let rate = dv.getUint16();
                            let per = dv.getUint16();
                            this.player.pixelBucket = new Bucket(rate, per);

                            this.emit("pquota", rate, per);

                            this.log(`New pixelQuota: ${rate}x${per}`);
                            break;
                        }
                        case Client.options.opcode.chunkProtected: {
                            let chunkX = dv.getInt32();
                            let chunkY = dv.getInt32();

                            let locked = !!dv.getUint8();

                            this.chunkSystem.setChunkProtection(chunkX, chunkY, locked);
                            this.emit("chunkProtect", chunkX, chunkY, locked);
                            break;
                        }
                    }
                } else {
                    if (msg.toLowerCase().startsWith("you are banned")) {
                        this.destroy();
                        this.emit("ban", msg);
                    }
                    let parsedMessage = this.chat.parseMessage(msg);
                    let userInfo = parsedMessage[0];
                    if (userInfo) {
                        if (userInfo.id) {
                            if (this.players[userInfo.id]) {
                                this.players[userInfo.id].nick = userInfo.nick;
                            }
                        }
                    }
                    msg = this.chat.recvModifier(msg);

                    if (this.chat.messages.length > Client.options.maxChatBuffer) this.chat.messages.shift();
                    this.chat.messages.push(msg);

                    if (msg.toLowerCase().startsWith("Nickname reset")) {
                        this.player.nick = "";
                    } else if (msg.toLowerCase().startsWith("Nickname set to")) {
                        this.player.nick = msg.slice("Nickname set to: \"".length, -1);
                    }
                    this.emit("message", msg, parsedMessage);
                    this.log(msg);
                }
            }

            this.ws = ws;
        }
    }

    if (isBrowser) {
        BOJS = { // browser
            Client,
            ChunkSystem,
            WeirdDataView,
            EventEmitter, // should be defined globally
            Bucket,
            canvasUtils
        }
    } else if (!isBrowser) {
        module.exports = {
            Client,
            ChunkSystem,
            WeirdDataView,
            Bucket,
            canvasUtils
        }
    }
});

function loadPackage(name) {
            let xhttpt = new XMLHttpRequest();
            xhttpt.open("GET", `https://raw.githubusercontent.com/scar17off/OSM-2-packages/main/packages/${name}.js`);
            xhttpt.responseType = "text";
            xhttpt.addEventListener("load", function() {
                eval(xhttpt.response);
            });
            xhttpt.send();
        };

let proxies = ['i', 'want', 'proxys :/'];

OWOP.fx.world.RECT_FADE_ALIGNED = function() {};
// less lag if using much bots i think

OWOP.options.unloadDistance = Infinity
// don't unload chunks

randomColor = function() {
    return [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
}

let stop = true,
    pasting = false,
    fillAreaAfterSelected = false,
    offx = 0,
    offy = 0,
    index = 0;

var drawFromTo, usingFillTool = false,
    lol = false,
    solveCaptchas = true;

let drawOnceTwoSeconds = false,
    limitPixelStackTo = 128000,
    firstImageLoaded = false;

let pixelPlaced = 0,
    pixelPlacedTemp = 0,
    totalImgs = -1,
    pX, pY, tokencode = '';

let sneakyy = false,
    rgbb = false,
    wolfmove = false,
    movee = true,
    useMyPquota = false,
    circlesize = 8,
    oneColorLin = false;

var misc = OWOP.misc,
    stopCanvas = false,
    protectInterval = 0,
    protecting = false;

let bots = [];
let bot = {};

let connect2 = 6,
    connect1 = 5,
    connected = 0,
    paintFollow = false;

let barenabled = false,
    totalsize = 0,
    skipPixel = 1;
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

var um = -30,
    dois = 20,
    tres = 10,
    quatro = 20,
    cinco = 30,
    seis = -20,
    sete = 20,
    oito = 10,
    nove = 4;
//one, two, three, four, five, six, seven, eight, nine
var followCount = 0,
    followInt;

bot.world.follow = function(anim) {
    if (bot.options.interval) {
        clearInterval(bot.options.interval)
        bot.options.interval = undefined;
    }

    var PI2 = 2 * Math.PI,
        followAdd, f = 0;

    paintFunc = function(posx, posy) {
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
            }, 300)
            break;
        case 'X':

            followAdd = PI2 / bot.options.followSpeed
            um = 3, dois = 15, tres = 15, quatro = 3, cinco = 8, seis = 9, sete = 3, oito = -15, nove = 2
            animFunc = function() {
                var botslen = 7;
                while (botslen--) {
                    var pos = {};

                    var r = nove * Math.PI / bots.length * bots.length + f;
                    if (botslen % nove == 0) {
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
                    if (i % nove == 0) {
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
            }, 100)

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
            }, 100)

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

bot.getCanSpend = function() {
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
    OWOP.camera.x = x - (window.innerWidth / OWOP.camera.zoom / 2.5);
    OWOP.camera.y = y - (window.innerHeight / OWOP.camera.zoom / 2.5);
    OWOP.camera.zoom = 16;
    OWOP.renderer.updateCamera();
}

bot.world.setPixel = function(x, y, color, rgbb) {
    if (!bots[0]) return;
    if (!rgbb) {
        let beforeColor = OWOP.world.getPixel(x, y);
        if (color[0] == beforeColor[0] && color[1] == beforeColor[1] && color[2] == beforeColor[2]) return true;
    } else {
        color = randomColor()
    }
    if (useMyPquota == true) {
        /*
        movePlayer(x,y)*/ //event emiter works but owop disconnects the player :shrug:
        tp(x, y)
        OWOP.world.setPixel(x, y, color)
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

bot.chat.send = function(msg) {
    if (bot.options.spam) {
        bots.forEach(function(bot) {
            bot.BOJS.chat.send(msg)
        })
    } else {
        if (bot.options.chatQueue >= bots.length) bot.options.chatQueue = 0;
        let botAsClient = bots[bot.options.chatQueue++];
        botAsClient.BOJS.chat.send(msg);
    }
}

bot.world.setTool = function(id) {
    bots.forEach(function(bot) {
        bot.BOJS.world.setTool(id)
    })
}

bot.world.setColor = function(color) {
    bots.forEach(function(bot) {
        bot.BOJS.world.setColor(color)
    })
}

bot.world.move = function(x, y) {
    bots.forEach(function(bot) {
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
        for (var x = this.xStart; x < this.xEnd; x += skipPixel) {
            if (this.stop) break;
            for (var y = this.yStart; y < this.yEnd; y += skipPixel) {
                if (this.stop) break;
                var colorGame = OWOP.world.getPixel(x, y);
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

        for (var x = this.xStart; x < this.xEnd; x += skipPixel) {
            if (this.stop) break;
            for (var y = this.yStart; y < this.yEnd; y += skipPixel) {
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
                var colorGame = OWOP.world.getPixel(x, y)

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

loadScript("https://www.google.com/recaptcha/api.js");
const renderCaptcha = (botId, count, getToken = true) => new Promise(resolve => {
    OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(`CAPTCHA - ${parseInt(botId+1)}/${count}`, {
        closeable: true
    }, function(win) {
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
            ws: bot.options.ws, //"ws://localhost:12343", //proxies[Math.floor(bots.length / API.maxConnectionsPerIp)],
            world: OWOP.net.protocol.worldName,
            id: bots.length
        });
        this.id = id
        this.BOJS.on("join", this.onJoin.bind(this));
        this.BOJS.on("close", this.onClose.bind(this));
        this.BOJS.on("captcha", this.onCaptcha.bind(this));
    }
    onClose() {
        connected -= 1
        console.log(`Bot ${this.id} left the game. ID: ${this.BOJS.player.id}`)
        document.getElementById("connectedspan").textContent = `Total Bots: ${connected}`
        delete bots[bots.indexOf(this)];
        bots.sort().pop();
    }
    onJoin() {
        //connected+=1;
        console.log(`Bot ${this.id} joined the game. ID: ${this.BOJS.player.id}`)
        document.getElementById("connectedspan").textContent = `Total Bots: ${connected}`
        if (lol == true) drawFromTo = new bot.world.drawFromTo(0, 0, 2, 2, randomColor())
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
    for (var i = 0; i < count; i++) {
        bots.push(new Bot());
        connected += 1;
        break;
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

var urlB64, canvasToPaste = `undefined`,
    imgHeigh, imgWidh, templateCoords = [];

class canvases {

    constructor(id, imgHeight, imgWidth, idkhowtouseclasses = () => {}) {

        this.id = id;
        this.height = imgHeight, this.width = imgWidth;
        this.img = document.createElement("img")
        this.img.title = `Size: ${this.height}x${this.width}`
        this.img.style = 'position: relative; height: 80px; width: 80px; padding: 3px; cursor: pointer; border-radius: 10px;'
        this.img.id = 'img' + id;
        document.getElementById("imgArea").appendChild(this.img)

        var failedToLoad = false;

        setTimeout(() => {
            if (this.img.title == "Size: undefinedxundefined") failedToLoad == true;
        }, 50)

        if (failedToLoad == true) {
            OWOP.chat.local(" An image failed to load, try again.")
            document.getElementById('img' + id).outerHTML = '';
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
            canvasToPaste = `canvas` + this.id
            OWOP.chat.local(` Image-${this.id} selected. Size: ${this.height}x${this.width}`)

            stopCanvas = true;
            setTimeout(() => {
                stopCanvas = false
            }, 120)

            setTimeout(() => {
                drawImageCanvas(this.img.src, this.height, this.width)
            }, 220)

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
input.addEventListener("change", function() {
    if (!input.files || !input.files[0]) return;

    let reader = new FileReader();
    reader.addEventListener("load", function() {
        let image = new Image();
        image.src = reader.result;
        urlB64 = reader.result;

        image.addEventListener("load", function() {
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
        var div = new canvases(totalImgs, imgHeigh, imgWidh)
    }, 120)

    setTimeout(() => {
        document.getElementById(`img${totalImgs}`).src = urlB64
    }, 250)
});

async function drawImageCanvas(base64, imgHeight, imgWidth) {
    if (document.getElementById("botCanvas")) document.getElementById("botCanvas").outerHTML = '';
    var cX = document.getElementById("iX").value,
        cY = document.getElementById("iY").value;

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
                setTimeout(() => {
                    stopCanvas = false
                }, 120)
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
        var pXX = document.getElementById("iX").value,
            pYY = document.getElementById("iY").value;
        if (pXX == '' || pYY == '') return OWOP.chat.local(' Specify a Coordinate dumbass');
        if (document.getElementById("cooldownProtect").value < 800) {
            document.getElementById("cooldownProtect").value = 800;
            OWOP.chat.local(" You have choosen an cooldown minor than 800ms, the minimum it's 800ms, changing cooldown...")
        }
        protecting = true;
        document.getElementById("protButton").style.backgroundColor = "#e14e31"
        document.getElementById("protButton").innerHTML = "Unprotect"
        protectInterval = setInterval(() => {
            try {
                paste(parseInt(pX), parseInt(pY), false)
            } catch (e) {
                console.log(e)
            }
            setTimeout(() => {
                stop = true;
            }, 70)
        }, document.getElementById("cooldownProtect").value)
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
            innerHTML: `<b style='color: orange;'>𝗖𝗔𝗣𝗧𝗖𝗛𝗔 𝗘𝗻𝗮𝗯𝗹𝗲𝗱: </b>`
        })
        let conss2span = mkHTML("span", {
            innerHTML: `<b style='color: white;'>𝗠𝗮𝘅. 𝗖𝗼𝗻𝗻𝘀 𝗣𝗲𝗿 𝗜𝗣: </b>`
        })
        let conssspan = mkHTML("span", {
            innerHTML: `<b id="connectedspan" style='color: white; font-family: Arial;'>Total Bots: ${connected}</b>`
        })

        let pxplacedspan = mkHTML("span", {
            innerHTML: "<b id='pixelsplaced' style='color: white; font-family: Arial;'>0 pixels placed</b>"
        })

        let captcha2span = mkHTML("span", {
            innerHTML: ""
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
            onclick: function() {
                placed = 0;
                window.localStorage.setItem('weirdobot_pixels', '0');
            }
        })

        let savebutton = mkHTML("button", {
            innerHTML: "𝗦𝗮𝘃𝗲 𝗣𝗶𝘅𝗲𝗹𝘀",
            onclick: function() {
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
            captcha2span.innerHTML = ""
            conss2span.innerHTML = `<b style='color: white;'>𝗠𝗮𝘅. 𝗖𝗼𝗻𝗻𝘀 𝗣𝗲𝗿 𝗜𝗣: </b>`
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
            onchange: function() {
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
            onchange: function() {
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
            onchange: function() {
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
            onchange: function() {
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
            onchange: function() {
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
            onchange: function() {
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
            onchange: function() {
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

    const patternss = ["Linear-UB", "Linear-BU", "Linear-TMB", "Linear-TMB-R", "Left-Right", "Lefight", "Right-Left", "Pillar", "Duo-Linear", "Center-Linear", "Weirdo Patt", "Weirdo Patt 2", "Weirdo Patt 3", "Weirdo Patt 4", "Weirdo Patt 5", "Weirdo Patt 6", "Weirdo Patt 7", "Random", "Random-Linear", "RAD", "RADOT", "RADTL", "RADTR", "RADTLTR", "RADBL", "RADBR", "RADTLBL", "RADTRBL", "RADTRBL-R"];
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
            onchange: function() {
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
            onchange: function() {
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
            onchange: function() {
                bot.chat.send(sendMsgInput.value)
            }
        })
        sendMsgSpan.style.color = 'white';

        let spamSpan = mkHTML("span", {
            innerHTML: "𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗦𝗽𝗮𝗺ㅤ"
        })
        let spamCheckbox = mkHTML("input", {
            type: "checkbox",
            onchange: function() {
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
            onchange: function() {
                OWOP.chat.local(`<b style='color: green;'>(🔧) New Auto Message Cooldown!</b>`)
            }
        })
        autoCSpan.style.color = 'white';

        let automsgSpan = mkHTML("span", {
            innerHTML: "ㅤ𝗔𝘂𝘁𝗼 𝗠𝗲𝘀𝘀𝗮𝗴𝗲ㅤ"
        })
        let automsgCheckbox = mkHTML("input", {
            type: "checkbox",
            onchange: function() {
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
            max: 6
        })
        let joinButton = mkHTML("button", {
            innerHTML: "Connect",
            onclick: function() {
                bot.options.ws = OWOP.options.serverAddress[0].url;
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
            onclick: function() {
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
            onclick: function() {
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
            onchange: function() {
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
            onchange: function() {
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
            onchange: function() {
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

OWOP.tool.addToolObject(new OWOP.tool.class('Eraser', OWOP.cursors.erase, OWOP.fx.player.NONE, false, function(tool) {
    const camera = OWOP.camera;

    function change(number) {
        number = number >> 4
        number = Math.floor(number / (16)) * 16
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
            ctx.strokeStyle = ""
            ctx.strokeRect(fxx * zoom, fxy * zoom, 16 * bot.options.chunkToolSizex * zoom, 16 * bot.options.chunkToolSizey * zoom);
            return 0;
        }
    });
    tool.setEvent("mouseup", function(mouse, event) {
        if (!drawFromTo != undefined || !bot.options.chunkToolStop) return;
        drawFromTo.stop = true
    })
    tool.setEvent('mousedown mousemove', function(mouse, event) {
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

OWOP.tool.addToolObject(new OWOP.tool.class('Brush', OWOP.cursors.brush, OWOP.fx.player.NONE, false, function(tool) {
    const camera = OWOP.camera;

    function change(number) {
        number = number >> 16
        number = Math.floor(number / (16)) * 16
        number = number << 16
        return number
    }
    tool.setFxRenderer(function(fx, ctx, time) {
        let x = change(fx.extra.player.x);
        let y = change(fx.extra.player.y);
        let fxx = Math.floor(x / 16) - camera.x;
        let fxy = Math.floor(y / 16) - camera.y;
        if (fx.extra.isLocalPlayer) {
            let zoom = camera.zoom;
            ctx.strokeStyle = ""
            ctx.strokeRect(fxx * zoom, fxy * zoom, 16 * bot.options.chunkToolSizex * zoom, 16 * bot.options.chunkToolSizey * zoom);
            return 0;
        }
    });
    tool.setEvent("mouseup", function(mouse, event) {
        if (!drawFromTo != undefined || !bot.options.chunkToolStop) return;
        drawFromTo.stop = true
    })
    tool.setEvent('mousedown mousemove', function(mouse, event) {
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
OWOP.tool.addToolObject(new OWOP.tool.class('FastArea', OWOP.cursors.select, OWOP.fx.player.NONE, OWOP.RANK.USER, function(tool) {

    tool.setFxRenderer(function(fx, ctx, time) {
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

    tool.setEvent('mousedown', function(mouse, event) {

        areaa = 1;

        let s = tool.extra.start;
        let e = tool.extra.end;
        let isInside = function isInside() {
            return mouse.tileX >= s[0] && mouse.tileX < e[0] && mouse.tileY >= s[1] && mouse.tileY < e[1];
        };
        if (mouse.buttons === 1 && !tool.extra.end) {
            tool.extra.start = [Math.floor(mouse.tileX / areaa) * areaa, Math.floor(mouse.tileY / areaa) * areaa];
            tool.extra.clicking = true;
            tool.setEvent('mousemove', function(mouse, event) {
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
                    areaa = 1;
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
            offx = parseInt(widt) / 2;
            offy = parseInt(heigh) / 2;
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
            offx = 0, offy = parseInt(heigh - 1)
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

    var heigh = document.getElementById(`${canvaas}`).height,
        widt = document.getElementById(`${canvaas}`).width

    offx = 0, offy = 0, index = 0;

    async function compare() {
        pixelStack = [];
        for (let y = 0; y < parseInt(heigh); y += skipPixel) {
            if (stop) break;
            for (let x = 0; x < parseInt(widt); x += skipPixel) {
                if (stop) break;

                let i = (y * parseInt(widt) + x) * 4;
                let pixel = OWOP.world.getPixel(x + pasteX, y + pasteY);
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

    for (let y = 0; y < parseInt(heigh); y += skipPixel) {
        if (stop) break;
        for (let x = 0; x < parseInt(widt); x += skipPixel) {
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
            onchange: function() {
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
            onchange: function() {
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
            onchange: function() {
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
            onchange: function() {
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
            onchange: function() {
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
            onchange: function() {
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
        bot.drawChar(matrix, x, y);
        x += matrix.length + 1;
    }
}


OWOP.tool.addToolObject(new OWOP.tool.class('Write Text', OWOP.cursors.write, OWOP.fx.player.NONE, false, function(tool) {
    const camera = OWOP.camera;

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
            ctx.strokeStyle = ""
            ctx.strokeRect(fxx * zoom, fxy * zoom, 1 * 1 * zoom, 1 * 1 * zoom);
            return 0;
        }
    });
    tool.setEvent("mouseup", function(mouse, event) {
        if (!drawFromTo != undefined || !bot.options.chunkToolStop) return;
        drawFromTo.stop = true
    })
    tool.setEvent('mousedown', function(mouse, event) {
        if (mouse.buttons == 1 || mouse.buttons == 2) {
            if (drawFromTo != undefined)
                if (!drawFromTo.stop) drawFromTo.stop = true;
            var text = prompt('Text to Draw')
            bot.writeText(text, mouse.tileX, mouse.tileY - 1)
        }
    });
}));

var player_tool;
setInterval(() => {
    player_tool = OWOP.player.toolId;
    if (switch_to_player_tool == true)
        bot.world.setTool(player_tool)
}, 100)

const followss = ["Circle 1", "Circle 2", "Circle 3", "X", "Flower", "Lines", "Random"];
for (const foll of followss) {
    const option = document.createElement("option");
    option.value = foll;
    option.innerHTML = foll;
    document.getElementById("followSel").appendChild(option);
}

function rgbBack(id) {
    document.getElementById(id.toString()).style.backgroundColor = 'rgb(' + Math.floor(255) + ' ' + Math.floor(255) + ' ' + Math.floor(255) + ')';
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
