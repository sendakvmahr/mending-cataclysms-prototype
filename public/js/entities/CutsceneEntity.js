define(["physics/Rect", "display/Animation", "entities/Entity", "physics/Vector", "lib/goody", "assets/vars"],
function(Rect, Animation, Entity, Vector, goody, vars)
{    
    CutsceneEntity.prototype = new Entity.Entity({"x":0, "y": 0});
    CutsceneEntity.prototype.constructor = CutsceneEntity;

    function CutsceneEntity(info) {
        //x y width height transition transitionTile
        
        Entity.Entity.apply(this, arguments);
        this.rect = new Rect.Rect(info.x, info.y, parseInt(info.width), parseInt(info.height));
        this.nextScene = info.cutscene;
        this.triggered = false;
    }

    CutsceneEntity.prototype.drawImage = function(ctx, offset) {
        if (vars.debug) {
            this.rect.draw(ctx, offset, "#FF00FF");
        }
    }
    
    return {
        CutsceneEntity: CutsceneEntity
    };
});