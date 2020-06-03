define(["scene/Script", "physics/Vector", "lib/goody", "scene/Scene", "map/Map" , "entities/Cursor", "physics/CollisionHandler", "display/MapCamera", "entities/Entity"],
function(Script, Vector, goody, Scene, Map, Cursor, CollisionHandler, MapCamera, Entity) 
{    
    CutScene.prototype = new Scene.Scene();
    CutScene.prototype.constructor = CutScene;


    function CutScene(ctx, map, directionsJson) {
        this.map = new Map.Map(map);
        this.cursor = new Cursor.Cursor();
        this.cameraFollow = new Entity.Entity(0, 0);
		this._textbox = document.getElementById("text");
		var objects = this.map.objects;
		for (var i = 0; i < objects.length; i++) {
            if (objects[i].name === "MCSpawn") {
                this.cameraFollow.setPosition(objects[i].x, objects[i].y);
			}
		}
        this.loadEntities();
        this.collisionHandler = new CollisionHandler.CollisionHandler();
        this.camera = new MapCamera.MapCamera(ctx);
        this.camera.loadMap(this.map);
        this.script = new Script.Script(directionsJson);
        this._displayedText = "";
        this._character = [document.getElementById("portrait"), document.getElementById("mouth"), document.getElementById("eyes")];  
    }

    CutScene.prototype.loadEntities = function() {
        this._entities = this.map.objects;
        this._events = this.map.eventMap;
    }

    CutScene.prototype.update = function(input, delta) {
        this.cursor.update(input);
        this.script.update(delta);
    }

    CutScene.prototype.click = function(mousePosition) {
        this.script.click(mousePosition);
    }

    CutScene.prototype.rightClick = function(mousePosition) {
    }

    CutScene.prototype.showText = function() {
        if (this.script.state === "say") {
            this._textbox.innerHTML = this._displayedText;
            var images = this.script.getPortrait();
            this._character[0].src = images[0];
            this._character[1].src = images[1];
            this._character[2].src = images[2];
        }
    }


    CutScene.prototype.display = function() {
        this.camera.display(this.cameraFollow, this.cursor, []);
        //this.script.display(this.camera._ctx);//!!
        if (this.script.line !== this._displayedText) {
            this._displayedText = this.script.line;
            this.showText();
        }
        var keys = Object.keys(this.script.characters);
        this.camera._ctx.fillStyle = "#ff0000";
        for (let charInd in keys) {
            var char = this.script.characters[keys[charInd]];
            this.camera._ctx.rect(char[0], char[1], 24, 48);
            this.camera._ctx.fill();
        }
    }

    CutScene.prototype.nextScene = function() {
        // Should depends on the map and a few other things
        if (!this.switchScenes) {
            throw new Error("switchScenes is false");
        }
    }
    return {
        CutScene: CutScene
    };
});
