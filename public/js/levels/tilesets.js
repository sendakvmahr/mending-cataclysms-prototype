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
			"width": "384",
			"height": "384",
			"tilecount": "256",
			"properties": [
				{
					"id" : "9",
					"camera" : "true",
					"inputAffected" : "true",
					"name" : "Sonna",
					"spawn" : "PlayableEntity"
				},
				{
					"id" : "41",
					"camera" : "false",
					"inputAffected" : "false",
					"name" : "Pharynx",
					"spawn" : "PlayableEntity"
				},
				{
					"id" : "44",
					"camera" : "false",
					"inputAffected" : "false",
					"name" : "Florence",
					"spawn" : "PlayableEntity"
				},
				{
					"id" : "104",
					"spawn" : "DandeBunny"
				}
			]
		},

    }
    return tiles;
});
