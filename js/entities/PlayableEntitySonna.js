define(["display/Animation", "entities/PlayableEntity", "physics/Vector", "lib/goody", "assets/vars"],
function(Animation, PlayableEntity, Vector, goody, vars)
{    
    PlayableEntitySonna.prototype = new PlayableEntity.PlayableEntity();
    PlayableEntitySonna.prototype.constructor = PlayableEntitySonna;

    function PlayableEntitySonna(x, y) {
        PlayableEntity.PlayableEntity.apply(this, arguments, "Sonna");
        this._accel = 1.5;
        this._velCap = 3;
        this._friction = .5;
        this._orientation = "D";
        this._status = "idle";
        // HERE FOR REFERENCE FOR LATER
        this._sprites = {
            "walking" : new Animation.Animation(images["sonna_walk"], 4, 36, 96, 150, -8, -60),
            "idle" : new Animation.Animation(images["sonna_idle"], 2, 36, 96, 300, -8, -60)
        }
        this._sprite = this._sprites["idle"];
        //this._shadowSprite = new Animation.Animation(images.MCshadow, 1, 20, 8);

        this.rect.width = 21;
        this.rect.height = 27;
    }

    PlayableEntitySonna.prototype.update = function(input, map, collisionHandler, timeDelta) {
        // this is entirely variable by game but this is not a bad defualt
        // if moving 
        this._orient(input);
        if (input && input.space && !this.spawning) {
            let center = this.rect.center();
            this.spawn.push(["FollowAttack", center, {
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