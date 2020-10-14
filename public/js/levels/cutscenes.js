define([],
function()
{
    cutscenes = {
    	"sample" : { 
			"map": "new",
			"cameraFollow": "Florence",
			"characters": {
			    "flo" : {
			        "joking": ["flo pose neutral.png", "flo mouth happy.png", "flo eyes side.png"],
			        "annoyed": ["flo pose neutral.png", "flo mouth happy.png", "flo eyes neutral.png"]
			     }
			},
			"mapChars":  {"flo": [10, 10] },
			"script": [
				"say flo annoyed:What? Thirty eyes ruined, thirty eyes given. That sounds like a fair payment, doesn't it? move while flo 60,60 ",
				"say flo joking:Hmph."
			]
		}
    }
    return cutscenes;
});
