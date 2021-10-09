OWOP.tool.addToolObject(new OWOP.tool.class('BuXXeD Bot Circle Chunker 16', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(16), false, function(tool) {
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
OWOP.tool.addToolObject(new OWOP.tool.class('addons/BotCircleChunker8.js', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(8), false, function(tool) {
                let pix = 8;
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
