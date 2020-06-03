/*
Base class for all entities
*/
define(["lib/goody", "assets/vars"],
function(goody, vars)
{    
    function Script(json) {   
        // testing locally and chrome is annoying with files when that happens
json = {
"map": "map",
"characters": {
    "flo" : {
        "joking": ["flo pose neutral.png", "flo mouth happy.png", "flo eyes side.png"],
        "annoyed": ["flo pose neutral.png", "flo mouth happy.png", "flo eyes neutral.png"]
     }
},
"mapChars":  {"flo": [10, 10] },
"script": 
`
say flo annoyed:What? Thirty eyes ruined, thirty eyes given. That sounds like a fair payment, doesn't it?
move while flo 60,60 
say flo joking:Hmph.
`
        }
        json.script = json.script.split("\n");
        this.json = json;
        this.index = 0;
        this.state = [];
        this.nextLine();
        this.characters = json.mapChars;
    }

    Script.prototype.update = function(delta) {
        this.state = this.instruction[0];
        switch(this.instruction[0]){
            case "say":
                break;
            case "move":
                var char = this.instruction[2];
                var coordinate = this.instruction[3].split(",");
                coordinate = [parseInt(coordinate[0]), parseInt(coordinate[1])];
                console.log(coordinate);
                this.characters[char] = coordinate;
        }
    }
    
    Script.prototype.getPortrait = function() {
        if (this.instruction !== "") {
        var chr = this.instruction[1];
        var mood = this.instruction[2];
        var prefix = "./images/portrait_composites/" + chr + "/";
        var files = this.json["characters"][chr][mood];
        var result = [];
        for (var i=0; i<files.length; i++) {
            result.push(prefix + files[i])
        }
        return result;
        }
        return ["", "", ""];    

    }
    
    Script.prototype.nextLine = function() {
        this.index += 1;
        var line = this.json.script[this.index].split(":");
        this.instruction = line[0].split(" ");
        this.line = line[1];
        this.update();
    }

    Script.prototype.click = function(mousePosition) {
        if (this.instruction[0] === "say") {
            this.nextLine();
        }
    }

    
    return {
        Script:Script
    };
});
