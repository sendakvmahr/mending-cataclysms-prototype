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
        // THIS WAS FFTP SPECIFIC, as each height element had both an effect layer and a base layer. 
        //but buffer length should be set anyways
        let bufferLength = map.displayedLayers;
        for (let i = 0; i < bufferLength; i+=1) {
            this.renderLayer(map.imageMap[i], map);
            //this.renderLayer(map.imageMap[Math.floor(i/2)], map, images.Tileset);
            //this.renderLayer(map.effectMap[Math.floor(i/2)], map, images.Tileset);
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

    MapCamera.prototype.display = function(cursor, objects) {
        // Displays the map and Entity objects on top. 
        this._calcOffset();
        let bufferLength = this._buffer.length;
        this._ctx.fillStyle = "black";
        this._ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < bufferLength; i++) {
            this._ctx.drawImage(this._buffer[i], this._offset.x, this._offset.y);
        }
        for (let i = 0; i < objects.length; i++) {
            objects[i].drawImage(this._ctx, this._offset);
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

//debugger;

        
        // for multiple tilesets, things will get trickier
        for (let n=0; n<tilesetinfo.length; n++) {
            tiles = tilesetinfo[n][1];
            tileOffset = 0;
        }
        // tileset should be stored with each map load omfgs -_-
        let tilesPerRow = 16; // need to fetch from map dat ain the futureS
        let tileset = map.tileset[tiles];
        // offset for the number and processing tiles
        //tile = tile - 13; 
        //for every tile:
        //    find the image it corresponds to
        let xpos = ((tile - 1) % tilesPerRow) * dim; 
        let ypos = Math.floor(tile / tilesPerRow) * dim;

//        xpos = Math.floor((tile-1) % (tileset.width / dim)) * dim;
//        ypos = Math.floor((tile-1) / (tileset.width / dim)) * dim;
//        let xpos = ((tile+1) % (image.width / dim)) * dim;    
  //      let ypos = Math.floor((tile-1) / (image.width / dim)) * dim; 
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