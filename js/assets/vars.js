// Global aviables
define([],
function()
{
    // For the direction the object is facing, done on the Y-axis of the image
    let directions = {
        "U" : 0,
        "R" : 1,
        "D" : 2,
        "L" : 3,
    }

    // FPS is used in interval calculations, defined here
    let fps = 30;

    return {
        displayHeight: 528,
        displayWidth: 748,
        tileDimension: 24,
        fps: fps,
        interval: 1000/fps,
        directions: directions,
    }
});
