define(["lib/goody"],
function(goody)
{    
    function CollisionHandler() {}

    CollisionHandler.prototype.collidingTiles = function(map, rect) {
        // Given a rect, find out which tiles it is on
        let points = rect.getCorners();
        // THIS HAS A CHANCE OF RETURNING THE SAME TILE TWICE 
        // IF HTE OBJECT IS SMALLER THAN A TILE
        let result = [];
        for (let i=0; i<4; i++) {
            let tile = map.pixelToTile(points[i]);
            if (!goody.inArray(result, tile)) {
                 result.push(tile);
            }
        }
        return result;
    }

    CollisionHandler.prototype.collidingObjects = function(entity1, entity2) {
        return entity1.rect.collideRect(entity2.rect)
    }
    
    return {
        CollisionHandler: CollisionHandler
    };
});