define(["entities/EntityMaker", "scene/Script", "physics/Vector", "lib/goody", "scene/Scene", "map/Map" , "physics/CollisionHandler", "display/MapCamera", "assets/vars", "entities/Attack"],
function(EntityMaker, Script, Vector, goody, Scene, Map, CollisionHandler, MapCamera, vars, Attack) 
{    
    MapScene.prototype = new Scene.Scene();
    MapScene.prototype.constructor = MapScene;

    function MapScene(ctx, json, tileset, continuationInfo) {
        if (continuationInfo) {
            this.inputAffected = continuationInfo.inputAffected; // index of user input affected entity. Only one at a time.
            this.cameraFollow = continuationInfo.cameraFollow;  // index of camera tracked entity. Only one at a time.
            this.party = continuationInfo.party;
            this.spawnTile = continuationInfo.spawnTile;
            this._entities = [];
            for (let i=0; i<this.party.length; i++) {
                this._entities.push(this.party[i]);
            }
        } else {
            this.inputAffected = 0; // index of user input affected entity. Only one at a time.
            this.cameraFollow = 0;  // index of camera tracked entity. Only one at a time.
            this.party = [];
            this._entities = [];
        }
        // Logic holder and controller of maps and cameras.
        this.map = new Map.Map(json, tileset);
        this.collisionHandler = new CollisionHandler.CollisionHandler();
        this.camera = new MapCamera.MapCamera(ctx);
        this.attacks = [];
        this.enemies = [];
        this.sceneTransitions = [];
        this.camera.loadMap(this.map);
        this.loadEntities();
        this.camera.assignEnity(this.party[this.cameraFollow]);
        this._changing = false;
        this.switchScenes = false;
    }

    MapScene.prototype.loadEntities = function() {
        // takes the entity spawn info from from the map object and makes the objects
        for (let i=0; i< this.map.objects.length; i++) {
            let entity = this.map.objects[i];
            let position = this.map.tileToPixel(entity.spawntile);
            entity = EntityMaker(entity.spawn, position);
            this._entities.push(entity);
            if (entity.isEnemy) {
                this.enemies.push(entity);
            }
        }
        for (let i=0; i< this.map.events.sceneTransition.length; i++) { 
            let sceneTransition = this.map.events.sceneTransition[i];
            let entity = EntityMaker('SceneTransitionEntity', {"x": sceneTransition.x, "y": sceneTransition.y}, sceneTransition);
            this._entities.push(entity);
            this.sceneTransitions.push(entity);
        }
        if (this.spawnTile === undefined) { // use the default spawnpoint if it's not from a previous room
            let position = new Vector.Vector(parseInt(this.map.events.defaultSpawn[0].x), parseInt(this.map.events.defaultSpawn[0].y))
            for (let i=0; i<vars.partyList.length; i++) {
                let entity = EntityMaker(vars.partyList[i], position);
                this.party.push(entity);
                this._entities.push(entity);
            } 
        } else {
            let position = this.map.tileToPixel(this.spawnTile);
            for (let i=0; i<this.party.length; i++) {
                this.party[i].setPosition(position);
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
                if (this.cameraFollow === this.party.length){
                    this.cameraFollow = 0;
                    this.inputAffected = 0;
                }
                this.camera.assignEnity(this.party[this.cameraFollow]);
            }
        } else {
            this._changing = false;
        }
        this.party[this.inputAffected].update(input, this.map, this.collisionHandler, delta)
        if (this.party[this.inputAffected].spawn.length !== 0) {
            for (let i=0; i < this.party[this.inputAffected].spawn.length ; i++ ) {
                let spawnInfo = this.party[this.inputAffected].spawn[i];
                let spawn = EntityMaker(spawnInfo[0], spawnInfo[1], spawnInfo[2]);
                if (spawn instanceof Attack.Attack) {
                    this._entities.push(spawn);
                    this.attacks.push(spawn);
                }
            }
            this.party[this.inputAffected].spawn = [];
        }



        //this.collisionHandler.collidingObjects();
        // ;-;
        for (let i=0; i<this.attacks.length; i++) {
            if (this.attacks[i].active) {
                this.attacks[i].update();
                if (!this.attacks[i].isEnemyOwned()) {
                    for (let n=0; n<this.enemies.length; n++) {
                        if (this.collisionHandler.collidingObjects(this.attacks[i], this.enemies[n])) {
                            //this.projectile[i].active = false;
                            //enemies[n].collide(projectile[i]);
                        }
                    }
                }
                else {
                    // check against enemies and players
                    for (let n=0; n<this.party.length; n++) {
                        if (this.collisionHandler.collidingObjects(this.attacks[i], this.party[n])) {
                            //this.attacks[i].living = false; /// if and whne this changes to attacks, some attacks may pierece/AOE
                            //this.party[n].collide(this.attacks[i]);
                        }
                    }
                }
            }
        }
        for (let i=0; i<this.party.length; i++) {
            // check against enemies? and events
            if (i === this.inputAffected) { // is the character under player control
                for (let n=0; n<this.sceneTransitions.length; n++) {
                    if (this.collisionHandler.collidingObjects(this.party[i], this.sceneTransitions[n])) {
                        this.nextScene = this.sceneTransitions[n].nextScene;
                        this.nextSceneTile = this.sceneTransitions[n].nextSceneTile;
                        this.switchScenes = true;

                    }
                }
            }
        }
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