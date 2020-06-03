define([
	"entities/Entity", 
	"entities/GreenEntity",
	"entities/Cursor",
	"entities/PlayableEntity"
	],
function(
	Entity, 
	GreenEntity, 
	Cursor,
	PlayableEntity)
{    
    function EntityMaker(entityName, entityLocation) {
	switch(entityName) {
		case "Entity":
			return new Entity.Entity(entityLocation.x, entityLocation.y)
		case "GreenEntity":
			return new GreenEntity.GreenEntity(entityLocation.x, entityLocation.y)
		case "Cursor":
			return new Cursor.Cursor(entityLocation.x, entityLocation.y)
		case "PlayableEntity":
			return new PlayableEntity.PlayableEntity(entityLocation.x, entityLocation.y, "Sonna")
		default:
			return new Entity.Entity(entityLocation.x, entityLocation.y)
		} 
    }
                
    return EntityMaker;
});