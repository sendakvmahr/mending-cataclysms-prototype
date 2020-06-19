define(["display/Animation", "entities/Entity", "physics/Vector", "lib/goody", "assets/vars", "entities/PlayableEntity"],
function(Animation, Entity, Vector, goody, vars, PlayableEntity)
{    
    Attack.prototype = new Entity.Entity({"x":0, "y": 0});
    Attack.prototype.constructor = Attack;

    function Attack(info) {
        // postion, direction, owner
        Entity.Entity.apply(this, arguments);
        this._accel = 1.5;
        this._velCap = 3;
        this._friction = .7;
        this.direction = info.direction;
        this.owner = info.owner;
        this.rect.position = info.position;
        this.pierce = false;
        this.duration = 500000000000; //ms
        // HERE FOR REFERENCE FOR LATER
        //this._sprite = new Animation.Animation(images.MC, 1, 24, 48);
        //this._shadowSprite = new Animation.Animation(images.MCshadow, 1, 20, 8);

        this.rect.width = 5;
        this.rect.height = 5;
    }

    Attack.prototype.update = function(map, collisionHandler, timeDelta) {
        this._move(map, collisionHandler, timeDelta);
        //this._sprite.update();
    }

    Attack.prototype.drawImage = function(ctx, offset) {
        this.rect.draw(ctx, offset, "#FFFFFF");
    }
    
    Attack.prototype._move = function(map, collisionHandler, timeDelta) {
        this.moveAxis("x", this.velocity.x * timeDelta/9, collisionHandler, map);
        this.moveAxis("y", this.velocity.y * timeDelta/9, collisionHandler, map);
    }

    Attack.prototype.moveAxis = function(axis, distance, collisionHandler, map) {
        let isXaxis = axis === "x";
        let currentTiles = collisionHandler.collidingTiles(map, this.rect);
        // Move forward the right position area, then look at the tiles the rect is on
        // and see if there are any new tile effects to be applied
        if (isXaxis) { 
            this.rect.position.x = goody.cap(this.rect.position.x + distance, 0, map.pixelWidth - this.rect.width - 1); 
        } 
        else { 
            this.rect.position.y = goody.cap(this.rect.position.y + distance, 0, map.pixelHeight - this.rect.height - 1); 
        }
        if (!this.pierce) {
            let newTiles = collisionHandler.collidingTiles(map, this.rect);
            // See if you're on any new tiles
            for (let i = 0; i < newTiles.length; i++) {
                // If the one of the new tiles was just stepped onto is in the collision map
                if (map.collisionMap[newTiles[i]] !== 0) {
                    this.moveBack(isXaxis, distance, newTiles[i], map);
                    i = newTiles.length;
                }
            }
        }
    }

    Attack.prototype.isEnemyOwned = function() {
        return !this.owner instanceof PlayableEntity.PlayableEntity;
    }

    Attack.prototype.onHit = function() {
    }

    Attack.prototype.moveBack = function(isXaxis, distance, newTile, map){
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
        Attack: Attack
    };
});