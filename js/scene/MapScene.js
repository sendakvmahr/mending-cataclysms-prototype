define(["entities/EntityMaker", "scene/Script", "physics/Vector", "lib/goody", "scene/Scene", "map/Map" , "physics/CollisionHandler", "display/MapCamera"],
function(EntityMaker, Script, Vector, goody, Scene, Map, CollisionHandler, MapCamera) 
{    
    MapScene.prototype = new Scene.Scene();
    MapScene.prototype.constructor = MapScene;

    function MapScene(ctx, json, tileset) {
        // Logic holder and controller of maps and cameras.
        this.map = new Map.Map(json, tileset);
        this.inputAffected = 0; // index of user input affected entity. Only one at a time.
        this.cameraFollow = 0;  // index of camera tracked entity. Only one at a time.
        this.collisionHandler = new CollisionHandler.CollisionHandler();
        this.camera = new MapCamera.MapCamera(ctx);
        this.camera.loadMap(this.map);
        this.loadEntities();
        this.camera.assignEnity(this._entities[this.cameraFollow]);
    }

    MapScene.prototype.loadEntities = function() {
        // takes the entity spawn info from from the map object and makes the objects
        this._entities = [];
        for (var i=0; i< this.map.objects.length; i++) {
            var entity = this.map.objects[i];
            var position = this.map.tileToPixel(entity.spawntile);

            this._entities.push(EntityMaker(entity.spawn, position));
            if ("camera" in entity) {
                this.cameraFollo = this._entities.length-1;
            }
            if ("inputAffected" in entity) {
                this.inputAffected = this._entities.length-1;
            } 
        }
        this._events = this.map.eventMap;
    }

    MapScene.prototype.update = function(input, delta) {
        // Updates input affected entity with a set of inputs
        this._entities[this.inputAffected].update(input, this.map, this.collisionHandler, delta)
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

    return {
        MapScene: MapScene
    };
});