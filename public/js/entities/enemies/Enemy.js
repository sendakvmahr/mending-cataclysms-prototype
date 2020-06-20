define(["display/Animation", "entities/Entity", "physics/Vector", "assets/vars", "lib/goody"],
function(Animation, Entity, Vector, vars, goody)
{    
    Enemy.prototype = new Entity.Entity({"x":0, "y": 0});
    Enemy.prototype.constructor = Enemy;

    function Enemy(info) {
        //location
        Entity.Entity.apply(this, arguments);
        this.isEnemy = true;
        // HERE FOR REFERENCE FOR LATER
        this._sprite = new Animation.Animation(images.projectile_enemy, 1, 36, 72);
        //this._shadowSprite = new Animation.Animation(images.MCshadow, 1, 20, 8);

        this.velocity = new Vector.Vector(0, 0); 
        this.rect.width = 21;
        this.rect.height = 27;
        this._spriteOffset = new Vector.Vector(-8, -80);
    }

    Enemy.prototype.applyAttack = function(attack) {
        this.toDelete = true;
    }
    
    Enemy.prototype.update = function(map, collisionHandler, timeDelta) {
        // if it hasn't done anything for a while make a projection, otherwise it just sits there
    }

    Enemy.prototype.moveBack = function(isXaxis, distance, newTile, map){
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

    Enemy.prototype.moveAxis = function(axis, distance, collisionHandler, map) {
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
        let newTiles = collisionHandler.collidingTiles(map, this.rect);
        for (let i = 0; i < newTiles.length; i++) {
            if (map.collisionMap[newTiles[i]] !== 0) {
                this.moveBack(isXaxis, distance, newTiles[i], map);
                i = newTiles.length;
            }
        }
    }

    Enemy.prototype.drawImage = function(ctx, offset) {
        var displayOffset = this.rect.position.add(offset);
        this._sprite.display(ctx, displayOffset.add(this._spriteOffset));

        if (vars.debug) {
           this.rect.draw(ctx, offset, "#FF0000");
        }
    }

    return {
        Enemy: Enemy
    };
});