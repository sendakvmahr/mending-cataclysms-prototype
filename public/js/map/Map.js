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
        let tilecount = 0;
        let keys = Object.keys(tilesets);
        for (let i = 0; i < keys.length; i++) {
            let name = keys[i];
            tilecount += parseInt(tilesets[keys[i]].tilecount);
            this.tileset[name] = tilesets[keys[i]];
            this.tilesetInfo.push([tilecount, name]);
        }
        // Layers of the map, used for display
        this.imageMap = [];

        this.objects = [];
        this.events = {
            'sceneTransition' :[],
            'defaultSpawn' :[],
            'startCutscene': []
        };
        for (let i=0; i < json.events.length; i++) {
            this.events[json.events[i].name].push(json.events[i]);
        }
        this.collisionMap = [];

        let layers = json.layers;
        let items = Object.keys(layers);
        this.length = json.layers[items[0]].length;
        for (let i = 0; i < items.length; i++) {
            let name = items[i];

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
        }
        if (this.collisionMap.length === 0) {
            let size = this.height * this.width;
            for (let i=0; i<size; i++) {
                this.collisionMap.push(0);
            }
        }
    }
    Map.prototype.spawnEntities = function(entityLayer, tilesets){
        // looks through teh map data and decides which enemies to spawn where
        let properties = {};
        let keys = Object.keys(tilesets);
        for (let i = 0; i < keys.length; i++) {
            for (let p = 0; p < tilesets[keys[i]].properties.length; p++) {
                let props = tilesets[keys[i]].properties[p];
                if ("spawn" in props) {
                    properties[props.id] = props;
                }
            }
        }
        for (let i = 0; i < entityLayer.length; i++) {
            let to_check = entityLayer[i]-1;
            if (to_check in properties) { // may be messy?
                this.objects.push({});
                let index = this.objects.length-1;
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