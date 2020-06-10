// images are fetched from root/images
let imageNames = [
	"dragonfly",
	"MC",
    "BaseTiles" ,
    "MCshadow", 
    "demo",
    "Pharynx",
    "Remni",
    "sonna_walk",
    "sonna_idle",
    "pharynx_walk",
    "pharynx_idle",
    "florence_idle",
    "Florence",
    "tileset_Phar_Room_test",
    "projectile",
    "projectile_enemy",
]

let images = {};
let loaded = 0;
let numImages = imageNames.length;
if (imageNames.length == 0) {
    start();
}
else {
    for (let i = 0; i < numImages; i++) {
        let index = imageNames[i];
        images[index] = new Image();
        images[index].src = "images/" + index + ".png";
        images[index].onload = function(){ 
            loaded++;
            if (loaded === numImages) {
                start();
            } 
        }
    }
}       