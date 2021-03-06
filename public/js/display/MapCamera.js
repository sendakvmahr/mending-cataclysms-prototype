define(["physics/Vector", "lib/goody", "assets/vars"],
function(Vector, goody, vars)
{    
    function MapCamera(ctx) {
        this._offset = new Vector.Vector(0, 0); 
        this._buffer = [];
        this._ctx = ctx;
        this._mapPixelWidth = 0;
        this._mapPixelHeight = 0;
        this._mapLength = 0;
        this._follow = 0;
    }

    MapCamera.prototype.loadMap = function(map) {
        // Loads the buffer images for a map
        this._buffer = [];
        this._mapPixelWidth = map.pixelWidth;
        this._mapPixelHeight = map.pixelHeight;
        this._mapLength = map.length;
        let bufferLength = map.displayedLayers;
        for (let i = 0; i < bufferLength; i+=1) {
            this.renderLayer(map.imageMap[i], map);
        }
        // Set font and color for debugging information
        this._ctx.font = "20px sans-serif";
        this._ctx.fillStyle = "#FF0000";
    }

    MapCamera.prototype.reloadMap = function(map) {
        // parallax, parallax, bg0, ef0, bg1, ef1, bg2, ef2
        // 0         1         2    3    4    5    6    7
        let bufferLength = this._buffer.length;
        for (let i = (map.parallax ? 2 : 0); i < bufferLength; i += 2) {
            let layerNumber = i + 1;
            let layer = map.effectMap[i/2 - (map.parallax ? 1 : 0)];
            // console.log(i/2 - (map.parallax ? 1 : 0), layerNumber);
            let ctx = this._buffer[layerNumber].getContext("2d");
            ctx.clearRect (0, 0, map.pixelHeight, map.pixelWidth);
           for (let n = 0; n < this._mapLength; n++) {
               this.renderTile(n, layer[n], map, ctx);
           }
        }
    }

    MapCamera.prototype.renderLayer = function(layer, map, image) {
        // makes a context for the layer given, renders all the tiles on the context,
        // and adds it to the camera buffer.  
        let i = this._buffer.length;
        this._buffer.push(document.createElement("canvas"));
        this._buffer[i].width = this._mapPixelWidth;
        this._buffer[i].height = this._mapPixelHeight;
        let ctx = this._buffer[i].getContext("2d");
        for (let n = 0; n < this._mapLength; n++) {
            this.renderTile(n, layer[n], map, ctx, image);
        }
    }

    MapCamera.prototype.assignEnity = function(entity) {
        this._follow = (entity !== undefined) ? entity : 0;
    }

    MapCamera.prototype._calcOffset = function() {
        // Calculates the displacement of the map 
        if (this._follow === 0) { return; }
        let cwidth = vars.displayWidth;
        let cheight = vars.displayHeight;
        let followPos = this._follow.rect.position;
        if (this._mapPixelWidth <= cwidth) {
            this._offset.x = (cwidth - this._mapPixelWidth)/2;
        } else {
            this._offset.x = Math.floor(goody.cap(cwidth / 2 - followPos.x, -this._mapPixelWidth + cwidth, 0));        
        }
        if (this._mapPixelHeight <= cheight) {
            this._offset.y = (cheight - this._mapPixelHeight)/2;
        } else {
            this._offset.y = Math.floor(goody.cap(cwidth / 2 - followPos.y, -this._mapPixelHeight + cheight, 0));        
        }
    };

    MapCamera.prototype.showString = function(string, y) {
        // Displays a string on the upper left corner of the canvas
        // Put an HTML debug menu later
        this._ctx.fillText(string, 10, y);
    }


    MapCamera.prototype.displayText = function(string, images, onBottom) {
        //height is static 75 for now, broder is static 5. 
        this._ctx.fillStyle = "#000000";
        this._ctx.fillRect(0, vars.displayHeight-80, vars.displayWidth, 75+5);

        this._ctx.fillStyle = "#001133";
        this._ctx.fillRect(5, vars.displayHeight-75, vars.displayWidth-10, 75 - 5);

        this._ctx.fillStyle = "#FFFFFF";
        let lines = this._cutLine(string) 
        for (l in lines){
            this._ctx.fillText(lines[l], 10, vars.displayHeight-50 + l * 25);
        }
        this._showPortrait(images, onBottom);
    }

    MapCamera.prototype._showPortrait = function(images, onBottom){
        for (imgIndex in images){
            let image = images[imgIndex];
            // 80 is current textbox height
            this._ctx.drawImage(   
                image,                                                      //image
                0,                                              //x position on image
                0,                                              //y position on image
                image.width,                                                 //imageWidth on Source
                image.height,                                                //imageHeight on Source
                vars.displayWidth - image.width*2,                                                   //xPosCanvas    
                vars.displayHeight - image.height*2 - 80,                                                   //yPosCanvas, integer offsets are for centering  
                image.width*2,                                                 //imageWidth on Canvas
                image.height*2                                                 //imageHeight on Canvas                
            )
        }

    } 

    MapCamera.prototype._cutLine = function(string, maxChar) {
        // cuts text into length appopriate strings to render
        maxChar = goody.optional(maxChar, 65);
        if (string.length >= maxChar) {  // counted and estimated
            let lines = [];
                line = [];
                words = string.split(" ").map(x => (x +""));
                charCount = 0;
            for (wi in words) {
                let w = words[wi];
                if (charCount + w.length >= maxChar) {
                    lines.push(line.join(" "));
                    line = [w.trim()];
                    charCount = 0;
                } else {
                    charCount += w.length;
                    line.push(w.trim());
                }
            }
            lines.push(line.join(" "));
            return lines;
        } return [string];
    }

    MapCamera.prototype.display = function(objects) {
        // Displays the map and Entity objects on top. 
        this._calcOffset();
        let bufferLength = this._buffer.length;
        this._ctx.fillStyle = "black";
        this._ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < bufferLength; i++) {
            this._ctx.drawImage(this._buffer[i], this._offset.x, this._offset.y);
        }
        let objectItems = Object.keys(objects);

        for (let i = 0; i < objectItems.length; i++) {
            let entities = objects[objectItems[i]];
            for (let e = 0; e < entities.length; e++) {
                entities[e].drawImage(this._ctx, this._offset);
            }
        }
    }

    MapCamera.prototype.absolutePosition = function(canvasPosition) {
        return new Vector.Vector(canvasPosition.x - this._offset.x, canvasPosition.y - this._offset.y);
    }
    
    MapCamera.prototype.renderTile = function(i, tile, map, ctx) {    
        let dim = vars.tileDimension;
        let mapVector = map.tileToPixel(i);
        let tilesetinfo = map.tilesetInfo;
        let tiles = "";
        let tileOffset = 0;
        
        // for multiple tilesets, things will get trickier
        for (let n=0; n<tilesetinfo.length; n++) {
            tiles = tilesetinfo[n][1];
            tileOffset = 0;
        }
        // tileset should be stored with each map load omfgs -_-
        let tilesPerRow = 16; // need to fetch from map dat ain the futureS
        let tileset = map.tileset[tiles];
        let xpos = ((tile - 1) % tilesPerRow) * dim; 
        let ypos = Math.floor(tile / tilesPerRow) * dim;
        ctx.drawImage(
            images[tileset.image.replace(".png", "")],                                              //image
            xpos,                                                       //x position on image
            ypos,                                                       //y position on image
            dim,                                                        //imageWidth on Source
            dim,                                                        //imageHeight on Source
            mapVector.x,                                                //xPosCanvas    
            mapVector.y,                                                //yPosCanvas    
            dim,                                                        //imageWidth on Canvas
            dim                                                         //imageHeight on Canvas                
        );
    };
    
    return {
        MapCamera:MapCamera
    };
});