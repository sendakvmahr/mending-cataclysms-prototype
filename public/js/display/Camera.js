define(["physics/Vector", "lib/goody", "assets/vars"],
function(Vector, goody, vars)
{    
    function Camera(ctx) {
        this._ctx = ctx;
        this._ctx.font = "20px sans-serif";
        this._ctx.fillStyle = "#FF0000";
    }

    Camera.prototype.display = function() {
    }


    return {
        Camera:Camera
    };
});