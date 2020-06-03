define(["lib/goody", "physics/Vector", "assets/vars"],
function(goody, Vector, vars)
{    
    function Map(json, tilesets) {
        // dimensions of the map in tiles
        this.height = parseInt(json.height);
        this.width = parseInt(json.width);

        // dimensions of the map in pixels
        this.pixelWidth = this.width * vars.tileDimension;
        this.pixelHeight = this.height * vars.tileDimension;

        // number of layers, information for the camera
        this.displayedLayers = 0;  

        // holds the tileset information.
        this.tileset = {};
        this.tilesetInfo = [];
        var tilecount = 0;
        var keys = Object.keys(tilesets);
        for (var i = 0; i < keys.length; i++) {
            var name = keys[i];
            tilecount += parseInt(tilesets[keys[i]].tilecount);
            this.tileset[name] = tilesets[keys[i]];
            this.tilesetInfo.push([tilecount, name]);
        }
        // Layers of the map, used for display
        this.imageMap = [];

        this.objects = [];
        this.eventMap = [];
        this.collisionMap = [];

        var layers = json.layers;
        var items = Object.keys(layers);
        this.length = json.layers[items[0]].length;
        for (var i = 0; i < items.length; i++) {
            var name = items[i];

            // Tile layer that's rendered
            if (goody.stringContains(name, "Map")) {
                this.imageMap.push(layers[name]);
                this.displayedLayers += 1;
            }

            // Collision map
            else if (name === "Collision") {
                this.collisionMap = layers[name];
            }

            // Entities
            else if (goody.stringContains(name, "Entity")) {
                this.spawnEntities(layers[name], tilesets);
            }
            
            // Events for things like room trnasitions, Unused atm
            else if (name === "Events") {
                this.eventMap = layers[name];
            }
        }
    }

    Map.prototype.spawnEntities = function(entityLayer, tilesets){
        // looks through teh map data and decides which enemies to spawn where
        var properties = {};
        let keys = Object.keys(tilesets);
        for (var i = 0; i < keys.length; i++) {
            for (var p = 0; p < tilesets[keys[i]].properties.length; p++) {
                var props = tilesets[keys[i]].properties[p];
                if ("spawn" in props) {
                    properties[props.id] = props;
                }
            }
        }
        for (var i = 0; i < entityLayer.length; i++) {
            var to_check = entityLayer[i]-1;
            if (to_check in properties) { // may be messy?
                this.objects.push({});
                var index = this.objects.length-1;
                Object.assign(this.objects[index], properties[to_check.toString()])
                this.objects[index].spawntile = i;
            }
        }
    }

    Map.prototype.findRow = function(tileNumber) {
        return Math.floor(tileNumber / this.width);
    }
    Map.prototype.findColumn = function(tileNumber) {
        return tileNumber % this.width; 
    }
    
    Map.prototype.getHeight = function(tileIndex) {
        return this.heightMap[tileIndex];
    }

    Map.prototype.pixelToTile = function(point) {
        var column =  Math.floor(point.x/vars.tileDimension);
        var row = Math.floor(point.y/vars.tileDimension);
        return row * this.width + column;
    }
    
    Map.prototype.tileToPixel = function(tileNumber) { 
        return new Vector.Vector(tileNumber%this.width * vars.tileDimension, 
            Math.floor(tileNumber/this.width) * vars.tileDimension); 
    };
        
    return {
        Map: Map
    };
});