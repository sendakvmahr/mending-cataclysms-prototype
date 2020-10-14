
let imageNames = [
	'Pharynx',
	'projectile_enemy',
	'tileset Phar Room',
	'Tileset',
	'cursor',
	'Palette',
	'pharynx_idle',
	'projectile',
	'icon',
	'Remni',
	'tileset_Phar_Room_test',
	'sonna_walk',
	'MCshadow',
	'Pharyncx-export',
	'BaseTiles',
	'MC',
	'everything',
	'dragonfly',
	'Florence',
	'pharynx_walk',
	'height',
	'florence_run',
	'florence_idle',
	'demo',
	'sonna_idle',
	'portrait_composites/fletch/fletch eyes neutral',
	'portrait_composites/fletch/fletch mouth happy',
	'portrait_composites/fletch/fletch mouth neutral',
	'portrait_composites/fletch/fletch eyes side',
	'portrait_composites/fletch/fletch pose neutral',
	'portrait_composites/pharynx/pharynx eyes sad',
	'portrait_composites/pharynx/pharynx pose neutral',
	'portrait_composites/pharynx/pharynx mouth happy',
	'portrait_composites/pharynx/pharynx mouth neutral',
	'portrait_composites/pharynx/pharynx eyes closed',
	'portrait_composites/pharynx/pharynx mouth uneasy',
	'portrait_composites/pharynx/pharynx eyes side',
	'portrait_composites/pharynx/pharynx eyes happy',
	'portrait_composites/pharynx/pharynx eyes surprised',
	'portrait_composites/pharynx/pharynx mouth sad',
	'portrait_composites/pharynx/pharynx eyes neutral',
	'portrait_composites/flo/flo eyes neutral',
	'portrait_composites/flo/flo mouth happy',
	'portrait_composites/flo/flo pose neutral',
	'portrait_composites/flo/flo mouth uneasy',
	'portrait_composites/flo/flo eyes closed',
	'portrait_composites/flo/flo eyes side',
	'portrait_composites/flo/flo mouth angry',
	'portrait_composites/flo/flo mouth neutral',
	'portrait_composites/flo/flo eyes surprised',
	'portrait_composites/flo/flo eyes annoyed',
	'portrait_composites/flo/flo mouth sad',
	'portrait_composites/flo/flo eyes sad',
	'portrait_composites/sonna/sonna eyes neutral',
	'portrait_composites/sonna/sonna pose neutral',
	'portrait_composites/sonna/sonna mouth neutral',
	'portrait_composites/sonna/sonna eyes surprised',
	'portrait_composites/sonna/sonna eyes happy',
	'portrait_composites/sonna/sonna eyes side',
	'portrait_composites/sonna/sonna mouth uneasy',
	'portrait_composites/sonna/sonna mouth happy'
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
