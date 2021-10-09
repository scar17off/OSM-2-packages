OWOP.tool.addToolObject(new OWOP.tool.class('checkerthing', OWOP.cursors.wand, OWOP.fx.player.NONE, OWOP.RANK.USER, function(tool) {
                    tool.extra.tickAmount = 32;
                    var queue = [];
                    var fillingColor = null;
                    var defaultFx = OWOP.fx.player.RECT_SELECT_ALIGNED(1);
                    tool.setFxRenderer(function(fx, ctx, time) {
                        ctx.globalAlpha = 0.8;
                        ctx.strokeStyle = fx.extra.player.htmlRgb;
                        var z = OWOP.camera.zoom;
                        if (!fillingColor || !fx.extra.isLocalPlayer)
                            defaultFx(fx, ctx, time);
                        else {
                            ctx.beginPath();
                            for (var i = 0; i < queue.length; i++)
                                ctx.rect((queue[i][0] - OWOP.camera.x) * z, (queue[i][1] - OWOP.camera.y) * z, z, z);
                            ctx.stroke();
                        }
                    });
                    function tick() {
                        var eq = function eq(a, b) {
                            return a && b && a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
                        };
                        var slientCheck = function slientCheck(x, y) {
                            return eq(OWOP.world.getPixel(x, y), fillingColor);
                        };
                        var check = function check(x, y) {
                            if (slientCheck(x, y)) {
                                queue.unshift([x, y]);
                                return true;
                            }
                            return false;
                        };
 
                        if (!queue.length || !fillingColor) {
                            return;
                        }
 
                        var selClr = OWOP.player.selectedColor;
                        var painted = 0;
                        var tickAmount = tool.extra.tickAmount;
                        for (var painted = 0; painted < tickAmount && queue.length; painted++) {
                            var current = queue.pop();
                            var x = current[0];
                            var y = current[1];
                            var thisClr = OWOP.world.getPixel(x, y);
                          let abc = getFree();
                            if (eq(thisClr, fillingColor) && !eq(thisClr, selClr)) {
 
                                if (!BOTS[abc].world.setPixel(x, y, selClr)) {
                                    queue.push(current);
                                   break;
                                }
 
                                var top = slientCheck(x, y - 1);
                                var bottom = slientCheck(x, y + 1);
                                var left = slientCheck(x - 1, y);
                                var right = slientCheck(x + 1, y);
 
                                if (top && left) {
                                    check(x - 1, y - 1);
                                }
                                if (top && right) {
                                    check(x + 1, y - 1);
                                }
                                if (bottom && left) {
                                    check(x - 1, y + 1);
                                }
                                if (bottom && right) {
                                    check(x + 1, y + 1);
                                }
 
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
