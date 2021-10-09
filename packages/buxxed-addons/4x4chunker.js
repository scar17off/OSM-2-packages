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
                            BOTS[abc].world.setPixel(chunkx + x, chunky + y, color);
                        };
                    }
                    for (let i = 0; i < BOTS.length; i++) BOTS[i].options.busy = false;
                }
            }
        }
    });
}));
