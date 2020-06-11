define(["display/Animation", "entities/Entity", "physics/Vector", "lib/goody", "assets/vars"],
function(Animation, Entity, Vector, goody, vars)
{    
    SceneTransitionEntity.prototype = new Entity.Entity();
    SceneTransitionEntity.prototype.constructor = SceneTransitionEntity;

    function SceneTransitionEntity(x, y, z, length, width, nextScene, nextSceneTile) {
        this.rect = new Rect.Rect(x, y, length, width);
        this._nextScene = nextScene;
        this._nextSceneTile = nextSceneTile;
    }

    SceneTransitionEntity.prototype.drawImage = function(ctx, offset) {
        this.rect.draw(ctx, offset, "#FFFF00");
    }
    
    return {
        SceneTransitionEntity: SceneTransitionEntity
    };
});