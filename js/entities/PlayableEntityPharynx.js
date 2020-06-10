define(["display/Animation", "entities/PlayableEntity", "physics/Vector", "lib/goody", "assets/vars"],
function(Animation, PlayableEntity, Vector, goody, vars)
{    
    PlayableEntityPharynx.prototype = new PlayableEntity.PlayableEntity();
    PlayableEntityPharynx.prototype.constructor = PlayableEntityPharynx;

    function PlayableEntityPharynx(x, y) {
        PlayableEntity.PlayableEntity.apply(this, arguments, "Sonna");
        this._accel = 1.5;
        this._velCap = 2;
        this._friction = .1;
        this._orientation = "D";
        this._status = "idle";
        // HERE FOR REFERENCE FOR LATER
        this._sprites = {
            "walking" : new Animation.Animation(images["pharynx_walk"], 4, 36, 96, 150),
            "idle" : new Animation.Animation(images["pharynx_idle"], 2, 36, 96, 300)
        }
        this._sprite = this._sprites["idle"];
        this._spriteOffset = new Vector.Vector(-8, -80);
        //this._shadowSprite = new Animation.Animation(images.MCshadow, 1, 20, 8);

        this.rect.width = 21;
        this.rect.height = 27;
    }

    PlayableEntityPharynx.prototype.update = function(input, map, collisionHandler, timeDelta) {
        // this is entirely variable by game but this is not a bad defualt
        // if moving 
        if (input !== 0) {
            if (input.up||input.down||input.right||input.left) {
                // TODO = Better orientation based on dx and dy
                if (input.up) {   
                    this.velocity.y -= this._accel;
                }
                if (input.right) {
                    this.velocity.x += this._accel;
                }
                if (input.down) {
                    this.velocity.y += this._accel;
                }
                if (input.left) {
                    this.velocity.x -= this._accel;
                }        
                if (this.velocity.length() > this._velCap) {
                    this.velocity.setLength(this._velCap);
                }; 
            }
            else {
                this.velocity.mult(this._friction);
            }
            var angle = 180 * this.velocity.getDirection() / Math.PI;
            if (angle < 0) {angle += 360;}
            if (angle > 22.5 && angle < 122.5) {
                this._orientation = "D";
            }
            else if (angle > 202.5 && angle < 292.5) {
                this._orientation = "U";
            }
            else if (angle > 122.5 && angle < 202.5) {
                this._orientation = "L";
            }
            else {
                this._orientation = "R";
            }
            this._sprite.orient(this._orientation);
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
        PlayableEntityPharynx: PlayableEntityPharynx
    };
});