define([],
function()
{
    tiles = {
		"BaseTiles": {
			"name": "BaseTiles",
			"image": "BaseTiles.png",
			"width": "192",
			"height": "192",
			"tilecount": "64",
			"properties": [
				{
					"id" : "1",
					"spawn" : "Entity"
				},
				{
					"id" : "8",
					"camera" : "true",
					"inputAffected" : "true",
					"spawn" : "GreenEntity"
				}
			]
		},
		"PharHome": {
			"name": "PharHome",
			"image": "tileset_Phar_Room_test.png",
			"width": "768",
			"height": "768",
			"tilecount": "256",
			"properties": [
				{
					"id" : "164",
					"camera" : "true",
					"inputAffected" : "true",
					"spawn" : "PlayableEntity"
				}
			]
		},

    }
    return tiles;
});
