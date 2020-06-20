define(["physics/Rect", "display/Animation", "entities/Entity", "physics/Vector", "lib/goody", "assets/vars"],
function(Rect, Animation, Entity, Vector, goody, vars)
{    
    SceneTransitionEntity.prototype = new Entity.Entity({"x":0, "y": 0});
    SceneTransitionEntity.prototype.constructor = SceneTransitionEntity;

    function SceneTransitionEntity(info) {
        //x y width height transition transitionTile
        
        Entity.Entity.apply(this, arguments);
        this.rect = new Rect.Rect(info.x, info.y, parseInt(info.width), parseInt(info.height));
        this.nextScene = info.transition;
        this.nextSceneTile = parseInt(info.transitionTile);
    }

    SceneTransitionEntity.prototype.drawImage = function(ctx, offset) {
        if (vars.debug) {
            this.rect.draw(ctx, offset, "#FFFF00");
        }
    }
    
    return {
        SceneTransitionEntity: SceneTransitionEntity
    };
});