define(["display/Animation", "entities/PlayableEntity", "physics/Vector", "lib/goody", "assets/vars"],
function(Animation, PlayableEntity, Vector, goody, vars)
{    
    PlayableEntityFlorence.prototype = new PlayableEntity.PlayableEntity({"x":0, "y": 0});
    PlayableEntityFlorence.prototype.constructor = PlayableEntityFlorence;

    function PlayableEntityFlorence(info) {
        // x, y
        PlayableEntity.PlayableEntity.apply(this, arguments);
        this._accel = 1.8;
        this._velCap = 4;
        this._friction = .8;
        this._orientation = "D";
        this._status = "idle";
        // HERE FOR REFERENCE FOR LATER
        this._sprites = {
            "run" : new Animation.Animation(images["florence_run"], 4, 72, 96, 150, -30, -60),
            "idle" : new Animation.Animation(images["florence_idle"], 2, 36, 96, 300, -8, -60)
        }
        this._sprites["walking"] = this._sprites["run"];
        this._sprite = this._sprites["idle"];
        //this._shadowSprite = new Animation.Animation(images.MCshadow, 1, 20, 8);

        this.rect.width = 21;
        this.rect.height = 27;
        this.initiated = true;
    }

    PlayableEntityFlorence.prototype.inputUpdate = function(input, map, collisionHandler, timeDelta) {
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
        PlayableEntityFlorence: PlayableEntityFlorence
    };
});