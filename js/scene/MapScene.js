define(["entities/EntityMaker", "scene/Script", "physics/Vector", "lib/goody", "scene/Scene", "map/Map" , "physics/CollisionHandler", "display/MapCamera", "assets/vars", "entities/Attack"],
function(EntityMaker, Script, Vector, goody, Scene, Map, CollisionHandler, MapCamera, vars, Attack) 
{    
    MapScene.prototype = new Scene.Scene();
    MapScene.prototype.constructor = MapScene;

    function MapScene(ctx, json, tileset, continuationInfo) {
        this.entities = {
            "party": [],
            "enemies": [],
            "sceneTransitions": [],
            "attacks": [],
            "other": []
        }
        if (continuationInfo) {
            // for mapscenes, assume camera follows inputAffected
            this.inputAffected = continuationInfo.inputAffected; // index of user input affected entity. Only one at a time.
            this.spawnTile = continuationInfo.spawnTile;
            this.entities["party"] = continuationInfo.party;
        } else {
            this.inputAffected = 0;
        }
        // Logic holder and controller of maps and cameras.
        this.map = new Map.Map(json, tileset);
        this.collisionHandler = new CollisionHandler.CollisionHandler();
        this.camera = new MapCamera.MapCamera(ctx);
        this.camera.loadMap(this.map);
        this.loadEntities();
        this.camera.assignEnity(this.entities["party"][this.inputAffected]);
        this._changing = false;
        this.switchScenes = false;
    }

    MapScene.prototype.loadEntities = function() {
        // takes the entity spawn info from from the map object and makes the objects
        for (let i=0; i< this.map.objects.length; i++) {
            let entity = this.map.objects[i];
            let position = this.map.tileToPixel(entity.spawntile);
            entity = EntityMaker(entity.spawn, {"x": position.x, "y": position.y});
            if (entity.isEnemy) {
                this.entities.enemies.push(entity);
            }
            else {
                this.entities.other.push(entity);
            }
        }
        for (let i=0; i< this.map.events.sceneTransition.length; i++) { 
            let entityInfo = this.map.events.sceneTransition[i];
            entityInfo["x"] = this.map.events.sceneTransition.x;
            entityInfo["y"] = this.map.events.sceneTransition.y;
            let entity = EntityMaker('SceneTransitionEntity', entityInfo);
            this.entities['sceneTransitions'].push(entity);
        }
        if (this.spawnTile === undefined) { // use the default spawnpoint if it's not from a previous room
            let position = new Vector.Vector(parseInt(this.map.events.defaultSpawn[0].x), parseInt(this.map.events.defaultSpawn[0].y))
            for (let i=0; i<vars.partyList.length; i++) {
                let entity = EntityMaker(vars.partyList[i], {"x": position.x, "y": position.y});
                this.entities["party"].push(entity);
            } 
        } else {
            let position = this.map.tileToPixel(this.spawnTile);
            for (let i=0; i<this.entities["party"].length; i++) {
                this.entities["party"][i].setPosition(position);
            } 
        }
    }

    MapScene.prototype.updateEntites = function(delta){
        let toUpdate = ["enemies", "sceneTransitions", "attacks", "other"];
        for (let i=0; i < toUpdate.length; i++) {
            for (let n=0; n<this.entities[toUpdate[i]].length; n++) {
                this.entities[toUpdate[i]][n].update(this.map, this.collisionHandler, delta);
            }
        }
    }

    MapScene.prototype._spawnAttacks = function(entity){
        if (entity.spawn.length !== 0) {
            for (let i=0; i < entity.spawn.length ; i++ ) {
                let spawnInfo = entity.spawn[i];
                let spawn = EntityMaker(spawnInfo[0], spawnInfo[1]);
                if (spawn instanceof Attack.Attack) {
                    this.entities.attacks.push(spawn);
                }
            }
          entity.spawn = []; 
        } 
    }


    MapScene.prototype.update = function(input, delta) {
        // Updates input affected entity with a set of inputs
        this.updateEntites(delta);
        if (input.change) {
            if (!this._changing) {
                this._changing = true;
                this.inputAffected = goody.incrementLoop(this.inputAffected, this.entities["party"].length);
                this.camera.assignEnity(this.entities["party"][this.inputAffected]);
            }
        } else {
            this._changing = false;
        }
        for (let p=0; p < this.entities["party"].length; p++){
            if (this.inputAffected == p) {
                this.entities["party"][this.inputAffected].inputUpdate(input, this.map, this.collisionHandler, delta)
            } else {
                this.entities["party"][p].update(this.map, this.collisionHandler, delta);
            }
            this._spawnAttacks(this.entities["party"][p])
        }

        for (let i=0; i<this.entities.attacks.length; i++) {
            if (this.entities.attacks[i].active) {
                this.entities.attacks[i].update(delta);
                if (!this.entities.attacks[i].isEnemyOwned()) {
                    for (let n=0; n<this.entities.enemies.length; n++) {
                        if (this.collisionHandler.collidingObjects(this.entities.attacks[i], this.entities.enemies[n])) {
                            //this.projectile[i].active = false;
                            //enemies[n].collide(projectile[i]);
                        }
                    }
                }
                else {
                    // check against enemies and players
                    for (let n=0; n<this.entities["party"].length; n++) {
                        if (this.collisionHandler.collidingObjects(this.entities.attacks[i], this.entities["party"][n])) {
                            //this.attacks[i].living = false; /// if and whne this changes to attacks, some attacks may pierece/AOE
                            //this.party[n].collide(this.attacks[i]);
                        }
                    }
                }
            }
        }
        for (let i=0; i<this.entities["party"].length; i++) {
            // check against enemies? and events
            if (i === this.inputAffected) { // is the character under player control
                for (let n=0; n<this.entities.sceneTransitions.length; n++) {
                    if (this.collisionHandler.collidingObjects(this.entities["party"][i], this.entities.sceneTransitions[n])) {
                        this.nextScene = this.entities.sceneTransitions[n].nextScene;
                        this.nextSceneTile = this.entities.sceneTransitions[n].nextSceneTile;
                        this.switchScenes = true;

                    }
                }
            }
        }
        this.entities["enemies"] = this.entities["enemies"].filter(enemy => !enemy.toDelete);
        this.entities["attacks"] = this.entities["attacks"].filter(attack => !attack.toDelete);

    }

    MapScene.prototype.click = function(mousePosition) {
        //for click handling
    }

    MapScene.prototype.rightClick = function(mousePosition) {
        //for click handling
    }

    MapScene.prototype.display = function() {
        // draws the scene
        this.camera.display(this.cursor, this.entities);
        this.camera.showString(this.entities["attacks"].length.toString(), 20);
        if (this.entities["attacks"].length > 0) {
            this.camera.showString(this.entities["attacks"][this.entities["attacks"].length-1].duration.toString(), 40);
        }
    }

    MapScene.prototype.continuationInfo = function() {
        let result = {
            "inputAffected": this.inputAffected,
            "cameraFollow" : this.cameraFollow,
            "party": this.party,
            "spawnTile": this.nextSceneTile 
        };
        return result;
    }

    return {
        MapScene: MapScene
    };
});