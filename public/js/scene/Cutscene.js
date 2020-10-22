define(["levels/maps", "scene/Script", "physics/Vector", "lib/goody", "scene/Scene", "map/Map" , "entities/Cursor", "physics/CollisionHandler", "display/MapCamera", "entities/Entity"],
function(maps, Script, Vector, goody, Scene, Map, Cursor, CollisionHandler, MapCamera, Entity) 
{    
    Cutscene.prototype = new Scene.Scene();
    Cutscene.prototype.constructor = Cutscene;


    function Cutscene(ctx, info, tilesets, continuation) {
        //load map, positions, and dialogue from the file
        /* things to put in the Cutscene
        */
        // placeholder for now

info = {
"map": "new",
"characters": {
    "flo" : {
        "joking": ["flo pose neutral", "flo mouth happy", "flo eyes side"],
        "annoyed": ["flo pose neutral", "flo mouth happy", "flo eyes neutral"]
     }
},
"mapChars":  {"flo": [10, 10] },
"script": 
`
say flo annoyed:What? Thirty eyes ruined, thirty eyes given. That sounds like a fair payment, doesn't it?
say flo joking:Hmph.
`
//move while flo 60,60 
}

        this.camera = new MapCamera.MapCamera(ctx);
        let mapName = info.map;
        this.map = mapName == continuation.map.name ? continuation.map : new Map.Map(maps[mapName], tilesets)
        this.cameraFollow = continuation.cameraFollow;
        this.inputAffected = continuation.inputAffected;
        this.entities = {
            "party": continuation.party,
            "enemies": [],
            "sceneTransitions": [],
            "attacks": [],
            "other": [],
            "cutscenes" : []
        }

        this.camera = new MapCamera.MapCamera(ctx);
        this.camera.loadMap(this.map);
        this.camera.assignEnity(this.entities["party"][this.inputAffected]);

        this.switchScenes = false;
        this.script = new Script.Script(info);
        this._displayedText = ""
        this._character = [];
        this._changing = false;
    }

    Cutscene.prototype.loadEntities = function() {
    }

    Cutscene.prototype.update = function(input, delta) {
        //this.cursor.update(input);
        if (input.space) {
            if (!this._changing) {
                this.script.nextLine();
                this._changing = true;
            } 
        } else {
            this._changing = false;
        }
        this.script.update(delta);
    }

    Cutscene.prototype.click = function(mousePosition) {
    }

    Cutscene.prototype.rightClick = function(mousePosition) {
    }

    Cutscene.prototype.display = function() {
        this.camera.display(this.entities);
        if (this.script.line !== ""){
            this.camera.displayText(this.script.line, this.script.getPortraitImages());
        }
        /*
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
        }*/

    }

    Cutscene.prototype.nextScene = function() {
        // Should depends on the map and a few other things
        if (!this.switchScenes) {
            throw new Error("switchScenes is false");
        }
    }
    
    return {
        Cutscene: Cutscene
    };
});
