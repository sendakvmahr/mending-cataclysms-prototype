/*
Base class for all entities
*/
define(["lib/goody", "assets/vars"],
function(goody, vars)
{    
    function Script(json) {   
        json.script = json.script.split("\n");
        this.json = json;
        this.line = "";
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
    
    Script.prototype.getPortraitImages = function() {
        if (this.instruction !== "") {
            let chr = this.instruction[1],
                mood = this.instruction[2];
                prefix = "portrait_composites/" + chr + "/";
                files = this.json["characters"][chr][mood];
                result = [];
            for (var i=0; i<files.length; i++) {
                result.push(images[prefix + files[i]])
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
