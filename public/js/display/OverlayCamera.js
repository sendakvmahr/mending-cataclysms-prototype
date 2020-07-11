define(["physics/Vector", "lib/goody", "assets/vars"],
function(Vector, goody, vars)
{    
    function OverlayCamera(ctx) {
        this._party_buffer = document.createElement("canvas");
        this._party_buffer.width = vars.displayWidth;
        this._party_buffer.height = vars.displayHeight;
        this._buffer = document.createElement("canvas");
        this._buffer.width = vars.displayWidth;
        this._buffer.height = vars.displayHeight;
    }

    OverlayCamera.prototype.showString = function(ctx, string, textbox) {
        // more additional processing is needed for multiple lines later
        // ctx.measureText(txt).width
        /*
        string = string split by " "
        strings = []
        current string =""
        keep adding the next thing and space to currrent string until adding one more hting is too much
        append it an d the nextthing i sth enext current string
        */
        //this._ctx.measureText(txt).width
        this._ctx.fillText(string, 10, y, textbox.width);
    }

    OverlayCamera.prototype.displayPartyStatus = function(party) {
        /*
        for member in party:
        show name
        hp, mp
        */
    }

    OverlayCamera.prototype.display = function(cursor, status) {
        // if party = [] then it's a cutscene or menu is up
        if (status.partyChanged) {
            // rerender party info
        }
        /*
        if there's text or menu, render that
        and the cursor
        else pop up hte party info
        */

        /*
        draw status which does the party status
text = [char, expressions/pieces, text]
pause = true/false -> default programmed overlay
menu -> evolve from pause
*/
    }
    
    return {
        OverlayCamera: OverlayCamera
    };
});