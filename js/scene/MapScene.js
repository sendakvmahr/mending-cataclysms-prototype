define(["entities/EntityMaker", "scene/Script", "physics/Vector", "lib/goody", "scene/Scene", "map/Map" , "physics/CollisionHandler", "display/MapCamera", "assets/vars"],
function(EntityMaker, Script, Vector, goody, Scene, Map, CollisionHandler, MapCamera, vars) 
{    
    MapScene.prototype = new Scene.Scene();
    MapScene.prototype.constructor = MapScene;

    function MapScene(ctx, json, tileset, continuationInfo) {
        if (continuationInfo) {
            this.inputAffected = continuationInfo.inputAffected; // index of user input affected entity. Only one at a time.
            this.cameraFollow = continuationInfo.cameraFollow;  // index of camera tracked entity. Only one at a time.
            this.party = continuationInfo.party;
            this.spawnTile = continuationInfo.spanwTile;
        } else {
            this.inputAffected = 0; // index of user input affected entity. Only one at a time.
            this.cameraFollow = 0;  // index of camera tracked entity. Only one at a time.
            this.party = [];
        }
        // Logic holder and controller of maps and cameras.
        this.map = new Map.Map(json, tileset);
        this.collisionHandler = new CollisionHandler.CollisionHandler();
        this.camera = new MapCamera.MapCamera(ctx);
        this.camera.loadMap(this.map);
        this.loadEntities();
        this.camera.assignEnity(this.party[this.cameraFollow]);
        this._changing = false;
    }

    MapScene.prototype.loadEntities = function() {
        // takes the entity spawn info from from the map object and makes the objects
        this._entities = [];
        for (let i=0; i< this.map.objects.length; i++) {
            let entity = this.map.objects[i];
            let position = this.map.tileToPixel(entity.spawntile);
            this._entities.push(EntityMaker(entity.spawn, position));
        }
        if (this.spawnTile === undefined) { // use the default spawnpoint if it's not from a previous room
            let position = new Vector.Vector(parseInt(this.map.events.defaultSpawn.x), parseInt(this.map.events.defaultSpawn.y))
            for (let i=0; i<vars.partyList.length; i++) {
                let entity = EntityMaker(vars.partyList[i], position);
                this.party.push(entity);
                this._entities.push(entity);
            } 
        } else {
            let position = this.map.tileToPixel(this.spawnTile);
            for (let i=0; i<this.party.length; i++) {
                this.part.setPosition(position);
            } 
        }
    }

    MapScene.prototype.update = function(input, delta) {
        // Updates input affected entity with a set of inputs
        if (input.change) {
            if (!this._changing) {
                this._changing = true;
                this.cameraFollow += 1;
                this.inputAffected += 1;
                if (this.cameraFollow == this.party.length){
                    this.cameraFollow = 0;
                    this.inputAffected = 0;
                }
                this.camera.assignEnity(this.party[this.cameraFollow]);
            }
        } else {
            this._changing = false;
        }
        this.party[this.inputAffected].update(input, this.map, this.collisionHandler, delta)
    }

    MapScene.prototype.click = function(mousePosition) {
        //for click handling
    }

    MapScene.prototype.rightClick = function(mousePosition) {
        //for click handling
    }

    MapScene.prototype.display = function() {
        // draws the scene
        this.camera.display(this.cursor, this._entities);
    }

    MapScene.prototype.nextScene = function() {
        // Should depends on the map and a few other things. doesn't work yet
        if (!this.switchScenes) {
            throw new Error("switchScenes is false");
        }
    }

    MapScene.prototype.continuationInfo = function() {
        let result = {};
        /*

        this.inputAffected = 0; // index of user input affected entity. Only one at a time.
        this.cameraFollow = 0;  // index of camera tracked entity. Only one at a time.
        where they spaw non the next scene
        // hwo isinput contr
        */
        return result;
    }

    return {
        MapScene: MapScene
    };
});