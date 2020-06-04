// Class that manages player input
define(["physics/Vector"],
function(Vector)
{    
    function InputHandler() {
        // up down left right are true while pressed, false when not
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
        this.space = false;
        this.change = false;
        this.changePressed = false;
        this.mousePosition = new Vector.Vector();
    }

    InputHandler.prototype.update = function(event, scene) {
        switch(event.type) {
            case "mousemove":
                this.mousePosition.x = event.offsetX;
                this.mousePosition.y = event.offsetY;
                break;
            case "click":
                scene.click(this.mousePosition);
                break;
            case "contextmenu":
                scene.rightClick(this.mousePosition);
                break;
            default: // keyup or keydown
                switch(event.which) {
                    case 87: // w up
                        this.up = event.type === "keydown";
                        break;
                    case 65: // a left
                        this.left = event.type === "keydown";
                        break;
                    case 83: // s down
                        this.down = event.type === "keydown";
                        break;
                    case 68: // d right
                        this.right = event.type === "keydown";
                        break;
                    case 32: // space
                        this.space = (event.type === "keydown") && (!event.repeat);
                        break;
                    case 81: // q
                        this.change = (event.type === "keydown") && (!event.repeat);
                        break;
                }
        }
    }

    return {
        InputHandler: InputHandler
    };
});