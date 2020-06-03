define(["display/Animation", "entities/Entity", "physics/Vector", "lib/goody", "assets/vars"],
function(Animation, Entity, Vector, goody, vars)
{    
    GreenEntity.prototype = new Entity.Entity();
    GreenEntity.prototype.constructor = GreenEntity;

    function GreenEntity(x, y, z) {
        Entity.Entity.apply(this, arguments);
        this._accel = 1.5;
        this._velCap = 3;
        this._friction = .7;
        this._floatOffset = 0;        // image offsets as a result of flying and sinking
        this._targetFloatOffset = 0;  // target image offset at min/max height
        // HERE FOR REFERENCE FOR LATER
        //this._sprite = new Animation.Animation(images.MC, 1, 24, 48);
        //this._shadowSprite = new Animation.Animation(images.MCshadow, 1, 20, 8);

        this.rect.width = 21;
        this.rect.height = 27;
    }

    GreenEntity.prototype.update = function(input, map, collisionHandler, timeDelta) {
        // this is entirely variable by game but this is not a bad defualt
        // if moving 
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
        /*
        var angle = 180 * this.velocity.getDirection() / Math.PI;
        if (angle < 0) {angle += 360;}
        if (angle > 22.5 && angle < 122.5) {
            this._sprite.orient("D");
        }
        else if (angle > 202.5 && angle < 292.5) {
            this._sprite.orient("U");
        }
        else if (angle > 122.5 && angle < 202.5) {
            this._sprite.orient("L");;
        }
        else {
            this._sprite.orient("R");
        }
        */
        this._move(map, collisionHandler, timeDelta);
        //this._sprite.update();
    }

    GreenEntity.prototype.drawImage = function(ctx, offset) {
        this.rect.draw(ctx, offset, "#00FF00");
    }
    
    GreenEntity.prototype._move = function(map, collisionHandler, timeDelta) {
        this.moveAxis("x", this.velocity.x * timeDelta/9, collisionHandler, map);
        this.moveAxis("y", this.velocity.y * timeDelta/9, collisionHandler, map);
    }

    GreenEntity.prototype.moveAxis = function(axis, distance, collisionHandler, map) {
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

    GreenEntity.prototype.moveBack = function(isXaxis, distance, newTile, map){
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
        GreenEntity: GreenEntity
    };
});