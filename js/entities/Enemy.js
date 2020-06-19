define(["display/Animation", "entities/Entity", "physics/Vector", "lib/goody", "assets/vars"],
function(Animation, Entity, Vector, goody, vars)
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

        this.rect.width = 21;
        this.rect.height = 27;
        this._spriteOffset = new Vector.Vector(-8, -80);
    }

    Enemy.prototype.applyAttack = function(attack) {
        this.toDelete = true;
    }
    
    Enemy.prototype.update = function(input, map, collisionHandler, timeDelta) {
        // if it hasn't done anything for a while make a projection, otherwise it just sits there
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