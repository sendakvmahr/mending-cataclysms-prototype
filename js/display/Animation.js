define(["physics/Vector", "lib/goody", "assets/vars"],
function(Vector, goody, vars)
{    
    function Animation(image, frames, width, height, times) {
        this.width = width;
        this.height = height;
        this._maxFrames = frames;
        this._frame = 0;
        this._image = image;
        if (Array.isArray(times)) {
            this.times = times;
        } else {
            this.times = [];
            for (let i=0; i<this._maxFrames; i++) {
                this.times.push(times);
            }
        }
        //imageOffset is the current top left corner of a frame on an animation's spritesheet
        this._imageOffset = new Vector.Vector(0, 0);
        this._lastOffset = new Date;
    }

    Animation.prototype.orient = function(direction) {
        // Mainly used for rotating sprites at the moment
        this._imageOffset.x = this.width * vars.directions[direction];
    }
    
    Animation.prototype.update = function() {
        // Changes to the next frame and loops if needed
        if (Date.now() - this._lastOffset > this.times[this._frame]) {
            this._frame = goody.incrementLoop(this._frame, this._maxFrames);
            this._imageOffset.y = this._frame * this.height;
            this._lastOffset = Date.now()
        }
    }
    
    Animation.prototype.display = function(ctx, offset){
        // Draws the current sprite
        ctx.drawImage(   
            this._image,                                                      //image
            this._imageOffset.x,                                              //x position on image
            this._imageOffset.y,                                              //y position on image
            this.width,                                                 //imageWidth on Source
            this.height,                                                //imageHeight on Source
            Math.floor(offset.x),                                                   //xPosCanvas    
            Math.floor(offset.y),                                                   //yPosCanvas, integer offsets are for centering  
            this.width,                                                 //imageWidth on Canvas
            this.height                                                 //imageHeight on Canvas                
        )
    }

    return {
        Animation:Animation
    };
});