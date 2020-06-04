define(["display/Animation", "entities/Entity", "physics/Vector", "lib/goody", "assets/vars"],
function(Animation, Entity, Vector, goody, vars)
{    
    ProjectileEnemy.prototype = new Entity.Entity();
    ProjectileEnemy.prototype.constructor = ProjectileEnemy;

    function ProjectileEnemy(x, y, z) {
        Entity.Entity.apply(this, arguments);
        // HERE FOR REFERENCE FOR LATER
        this._sprite = new Animation.Animation(images.projectile_enemy, 1, 36, 72);
        //this._shadowSprite = new Animation.Animation(images.MCshadow, 1, 20, 8);

        this.rect.width = 21;
        this.rect.height = 27;
        this._spriteOffset = new Vector.Vector(-8, -80);
    }

    ProjectileEnemy.prototype.update = function(input, map, collisionHandler, timeDelta) {
        // if it hasn't done anything for a while make a projection, otherwise it just sits there
    }

    ProjectileEnemy.prototype.drawImage = function(ctx, offset) {
        var displayOffset = this.rect.position.add(offset);
        this._sprite.display(ctx, displayOffset.add(this._spriteOffset));
    }

    return {
        ProjectileEnemy: ProjectileEnemy
    };
});