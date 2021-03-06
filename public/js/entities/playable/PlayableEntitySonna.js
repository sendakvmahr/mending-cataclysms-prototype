define(["display/Animation", "entities/playable/PlayableEntity", "physics/Vector", "lib/goody", "assets/vars"],
function(Animation, PlayableEntity, Vector, goody, vars)
{    
    PlayableEntitySonna.prototype = new PlayableEntity.PlayableEntity({"x":0, "y": 0});
    PlayableEntitySonna.prototype.constructor = PlayableEntitySonna;

    function PlayableEntitySonna(info) {
        // x, y
        PlayableEntity.PlayableEntity.apply(this, arguments);
        this._accel = 1.5;
        this._velCap = 3;
        this._friction = .5;
        this._orientation = "D";
        this._status = "idle";
        // HERE FOR REFERENCE FOR LATER
        this._sprites = {
            "walking" : new Animation.Animation(images["sonna_walk"], 4, 36, 96, 150, -5, -35),
            "idle" : new Animation.Animation(images["sonna_idle"], 2, 36, 96, 300, -5, -35)
        }
        this._sprite = this._sprites["idle"];
        //this._shadowSprite = new Animation.Animation(images.MCshadow, 1, 20, 8);

        this.rect.width = 30;
        this.rect.height = 50;
        this.initiated = true;
        this.health = 100;
    }
    
    PlayableEntitySonna.prototype.inputUpdate = function(input, map, collisionHandler, timeDelta) {
        // this is entirely variable by game but this is not a bad defualt
        // if moving 
        this._orient(input);
        
        if (input && input.space && !this.spawning) {
            let center = this.rect.center();
            this.spawn.push(["FollowAttack", {
                "position": center,
                "owner" : this,
                "direction" : this._orientation
            }]);
            this.spawning = true;
        } else if (input && !input.space){
            this.spawning = false;
        }

        if (this.velocity.length() > .1) {
            this.setSpriteStatus("walking");
        } else {
            this.setSpriteStatus("idle");
        }
        this._move(map, collisionHandler, timeDelta);        
        this._sprite.update(timeDelta);
    }

    return {
        PlayableEntitySonna: PlayableEntitySonna
    };
});