define(["display/Animation", "entities/enemies/Enemy", "physics/Vector", "lib/goody"],
function(Animation, Enemy, Vector, goody, vars)
{    
    DandeBunny.prototype = new Enemy.Enemy({"x":0, "y": 0});
    DandeBunny.prototype.constructor = DandeBunny;

    function DandeBunny(info) {
        //location
        Enemy.Enemy.apply(this, arguments);
        this.isEnemy = true;
        this._velCap = 2;
        // HERE FOR REFERENCE FOR LATER
        this._sprite = new Animation.Animation(images.projectile_enemy, 1, 36, 72);
        //this._shadowSprite = new Animation.Animation(images.MCshadow, 1, 20, 8);

        this.rect.width = 21;
        this.rect.height = 27;
        this._spriteOffset = new Vector.Vector(-8, -40);
        this.moveTarget = new Vector.Vector(this.rect.position.x, this.rect.position.y);
    }

    DandeBunny.prototype.applyAttack = function(attack) {
        this.toDelete = true;
    }

    DandeBunny.prototype.moveTowards = function(position, collisionHandler, timeDelta, map) {
        let direction = this.moveTarget.subtract(this.rect.position); 
        
        if (direction.length() < this._velCap) {
            this.rect.position = this.moveTarget;
        } else {
            direction.setLength(this._velCap);
            this.velocity = direction;
        }

        this.moveAxis("x", this.velocity.x * timeDelta/9, collisionHandler, map);
        this.moveAxis("y", this.velocity.y * timeDelta/9, collisionHandler, map);
     
    }
    
    DandeBunny.prototype.update = function(mapScene, collisionHandler, timeDelta) {
        let target = this.moveTarget.subtract(this.rect.position);
        if (target.length() < 10){
            this.moveTarget = new Vector.Vector(goody.randint(0, mapScene.map.pixelWidth - this.rect.width), goody.randint(0, mapScene.map.pixelHeight - this.rect.height))
        }
        this.moveTowards(this.moveTarget, collisionHandler, timeDelta, mapScene.map);
        // if it hasn't done anything for a while make a projection, otherwise it just sits there

    }

    return {
        DandeBunny: DandeBunny
    };
});