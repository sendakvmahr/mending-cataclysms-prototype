/*
*  Attack that follows the parent entity that spawned the attack
*/
define(["display/Animation", "entities/attacks/Attack", "physics/Vector", "lib/goody", "assets/vars"],
function(Animation, Attack, Vector, goody, vars)
{    
    FollowAttack.prototype = new Attack.Attack(
            {
                "direction": "U", 
                "owner": "", 
                "position": new Vector.Vector(0, 0)
            }
        );
    FollowAttack.prototype.constructor = FollowAttack;

    function FollowAttack(info) {
        Attack.Attack.apply(this, arguments);
        // HERE FOR REFERENCE FOR LATER
        //this._sprite = new Animation.Animation(images.MC, 1, 24, 48);
        //this._shadowSprite = new Animation.Animation(images.MCshadow, 1, 20, 8);
        this.ownerPosition = this.owner.rect.center();
        this.rect.width = 40;
        this.rect.height = 40;
        this.duration = 200;

        let offset = "";
        if (this.direction == "D") { 
            offset = new Vector.Vector(Math.floor(-this.rect.width/2), 60);
        } else if (this.direction == "U") {
            offset = new Vector.Vector(Math.floor(-this.rect.width/2), -60);
        } else if (this.direction == "R") {
            offset = new Vector.Vector(60, Math.floor(-this.rect.height/2));
        } else if (this.direction == "L") {
            offset = new Vector.Vector(-60, Math.floor(-this.rect.height/2));
        }
        this.rect.position = this.rect.position.add(offset);
        this.ignore = [];
    }

    FollowAttack.prototype.update = function(map, collisionHandler, timeDelta) {
        let offset = this.owner.rect.center().subtract(this.ownerPosition);
        this.rect.position = this.rect.position.add(offset);
        this.ownerPosition = this.owner.rect.center();
        this.duration -= timeDelta;
        this.toDelete = this.duration <= 0;
    }
    FollowAttack.prototype.onHit = function(entity) {
        //this.toDelete = true;
        this.ignore.push(entity);
    }
    FollowAttack.prototype.drawImage = function(ctx, offset) {
        this.rect.draw(ctx, offset, "#FFFFFF");
    }
    
    return {
        FollowAttack: FollowAttack
    };
});