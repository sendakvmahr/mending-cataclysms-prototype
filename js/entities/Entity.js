/*
Base class for all entities
*/
define(["lib/goody", "physics/Vector", "physics/Rect", "assets/vars"],
function(goody, Vector, Rect, vars)
{    
    function Entity(x, y, z) {       
        this.velocity = new Vector.Vector(0, 0); 
        this.rect = new Rect.Rect(x, y, vars.tileDimension, vars.tileDimension);
    }

    Entity.prototype.setPosition = function(x, y) {
        this.rect.setLeft(x);
        this.rect.setTop(y);
    }

    Entity.prototype.drawImage = function(ctx, offset) {
        this.rect.draw(ctx, offset);
    }

    Entity.prototype.update = function() {

    }
    
    return {
        Entity:Entity
    };
});