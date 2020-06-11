define(["physics/Rect", "display/Animation", "entities/Entity", "physics/Vector", "lib/goody", "assets/vars"],
function(Rect, Animation, Entity, Vector, goody, vars)
{    
    SceneTransitionEntity.prototype = new Entity.Entity();
    SceneTransitionEntity.prototype.constructor = SceneTransitionEntity;

    function SceneTransitionEntity(x, y, info) {
        this.rect = new Rect.Rect(x, y, parseInt(info.height), parseInt(info.width));
        this.nextScene = info.transition;
        this.nextSceneTile = parseInt(info.transitionTile);
    }

    SceneTransitionEntity.prototype.drawImage = function(ctx, offset) {
        this.rect.draw(ctx, offset, "#FFFF00");
    }
    
    return {
        SceneTransitionEntity: SceneTransitionEntity
    };
});