define(["display/Animation", "physics/Vector", "lib/goody"],
function(Animation, Vector, goody)
{    
    function Cursor(element) {
        this.position = new Vector.Vector(0,0); 
    };

    Cursor.prototype.display = function(ctx) {
        ctx.strokeStyle = "#FF0000";
        ctx.strokeRect(this.position.x, this.position.y, 2, 2);
    }

    Cursor.prototype.update = function(input) {
        this.move(input);
    }
    
    Cursor.prototype.move = function(input) {
        this.position.x = input.mousePosition.x;
        this.position.y = input.mousePosition.y;
    };
                
    return {
        Cursor:Cursor
    }    
});