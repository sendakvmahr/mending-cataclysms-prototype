define(["display/Animation", "entities/playable/PlayableEntity", "physics/Vector", "lib/goody", "assets/vars"],
function(Animation, PlayableEntity, Vector, goody, vars)
{    
    PlayableEntityPharynx.prototype = new PlayableEntity.PlayableEntity({"x":0, "y": 0});
    PlayableEntityPharynx.prototype.constructor = PlayableEntityPharynx;

    function PlayableEntityPharynx(info) {
        // x, y
        PlayableEntity.PlayableEntity.apply(this, arguments);
        this._accel = 1.5;
        this._velCap = 2;
        this._friction = .1;
        this._orientation = "D";
        this._status = "idle";
        // HERE FOR REFERENCE FOR LATER
        this._sprites = {
            "walking" : new Animation.Animation(images["pharynx_walk"], 4, 36, 96, 150, -8, -60),
            "idle" : new Animation.Animation(images["pharynx_idle"], 2, 36, 96, 300, -8, -60)
        }
        this._sprite = this._sprites["idle"];
        //this._shadowSprite = new Animation.Animation(images.MCshadow, 1, 20, 8);

        this.rect.width = 21;
        this.rect.height = 27;
        this.initiated = true;
        this.health = 150;
    }

    PlayableEntityPharynx.prototype.inputUpdate = function(input, map, collisionHandler, timeDelta) {
        // this is entirely variable by game but this is not a bad defualt
        // if moving 
        this._orient(input);
        if (this.velocity.length() > .1) {
            this.setSpriteStatus("walking");
        } else {
            this.setSpriteStatus("idle");
        }
        this._move(map, collisionHandler, timeDelta);
        this._sprite.update(timeDelta);
    }

    return {
        PlayableEntityPharynx: PlayableEntityPharynx
    };
});