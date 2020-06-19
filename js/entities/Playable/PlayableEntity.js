define(["display/Animation", "entities/Entity", "physics/Vector", "lib/goody", "assets/vars"],
function(Animation, Entity, Vector, goody, vars)
{    
    PlayableEntity.prototype = new Entity.Entity({"x":0, "y": 0});
    PlayableEntity.prototype.constructor = PlayableEntity;

    function PlayableEntity(info) {
        // x, y
        Entity.Entity.apply(this, arguments);
        this._accel = 1.5;
        this._velCap = 3;
        this._friction = .7;
        this._orientation = "D";
        this._status = "idle";
        // HERE FOR REFERENCE FOR LATER
        this._sprites = {
            "idle" : new Animation.Animation(images["sonna_idle"], 2, 36, 96, 300)
        }
        this._sprite = this._sprites["idle"];
        //this._shadowSprite = new Animation.Animation(images.MCshadow, 1, 20, 8);

        this.rect.width = 21;
        this.rect.height = 27;
    }

    PlayableEntity.prototype.setSpriteStatus = function(status) {
        if (this._status !== status && status in this._sprites) {
            this._sprite = this._sprites[status];
            this._sprite.orient(this._orientation);
            this._status = status;
        }
    }

    PlayableEntity.prototype._orient = function(input) {
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
    };

    PlayableEntity.prototype.update = function(map, collisionHandler, timeDelta) {
        this._sprite.update(timeDelta);
    }

    PlayableEntity.prototype.inputUpdate = function(input, map, collisionHandler, timeDelta) {
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
    PlayableEntity.prototype.drawImage = function(ctx, offset) {
        let displayOffset = this.rect.position.add(offset);
        this._sprite.display(ctx, displayOffset);
        if (vars.debug) {
           this.rect.draw(ctx, offset, "#00FF00");
        }
    }
    
    PlayableEntity.prototype._move = function(map, collisionHandler, timeDelta) {
        this.moveAxis("x", this.velocity.x * timeDelta/9, collisionHandler, map);
        this.moveAxis("y", this.velocity.y * timeDelta/9, collisionHandler, map);
    }

    PlayableEntity.prototype.moveAxis = function(axis, distance, collisionHandler, map) {
        var isXaxis = axis === "x";
        var currentTiles = collisionHandler.collidingTiles(map, this.rect);
        // Move forward the right position area, then look at the tiles the rect is on
        // and see if there are any new tile effects to be applied
        if (isXaxis) { 
            this.rect.position.x = goody.cap(this.rect.position.x + distance, 0, map.pixelWidth - this.rect.width - 1); 
        } 
        else { 
            this.rect.position.y = goody.cap(this.rect.position.y + distance, 0, map.pixelHeight - this.rect.height - 1); 
        }
        var newTiles = collisionHandler.collidingTiles(map, this.rect);
        // See if you're on any new tiles
        for (var i = 0; i < newTiles.length; i++) {
            // If the one of the new tiles was just stepped onto is in the collision map
            if (map.collisionMap[newTiles[i]] !== 0) {
                this.moveBack(isXaxis, distance, newTiles[i], map);
                i = newTiles.length;
            }
        }
    }

    PlayableEntity.prototype.setPosition = function(position) {
        // mainly for scene transitions
        this.rect.setLeft(position.x);
        this.rect.setTop(position.y);
    }

    PlayableEntity.prototype.moveBack = function(isXaxis, distance, newTile, map){
        // moves the entity out of walls it has collided with

        // moving right, hit left side of wall
        if (isXaxis && distance > 0) {
            this.rect.setRight(map.tileToPixel(newTile).x-1);
        }
        // moving left, hit right side of wall
        else if (isXaxis && distance < 0) {
            this.rect.setLeft(map.tileToPixel(newTile).x+vars.tileDimension+1);
        }
        // moving down, hit top side of wall
        else if (distance > 0) {
            this.rect.setBottom(map.tileToPixel(newTile).y-1);
        }
        // moving up, hit bottom side of wall
        else {
            this.rect.setTop(map.tileToPixel(newTile).y+vars.tileDimension+1);
        } 
    }
    
    return {
        PlayableEntity: PlayableEntity
    };
});