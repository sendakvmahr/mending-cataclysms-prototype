// Global aviables
define([],
function()
{
    // For the direction the object is facing, done on the Y-axis of the image
    var directions = {
        "U" : 0,
        "UR" : 1,
        "R" : 2,
        "DR" : 3,
        "D" : 4,
        "DL" : 5,
        "L" : 6,
        "LU" : 7,
    }

    // FPS is used in interval calculations, defined here
    var fps = 30;

    return {
        displayHeight: 528,
        displayWidth: 748,
        tileDimension: 48,
        fps: fps,
        interval: 1000/fps,
        directions: directions,
    }
});
