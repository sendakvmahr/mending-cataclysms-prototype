define([
	"entities/Entity", 
	"entities/GreenEntity",
	"entities/Cursor",
	"entities/PlayableEntity",
	"entities/PlayableEntitySonna",
	"entities/PlayableEntityPharynx",
	"entities/PlayableEntityFlorence",
	"entities/ProjectileEnemy",
	"entities/Projectile",
	],
function(
	Entity, 
	GreenEntity, 
	Cursor,
	PlayableEntity,
	PlayableEntitySonna,
	PlayableEntityPharynx,
	PlayableEntityFlorence,
	ProjectileEnemy,
	Projectile)
{    
    function EntityMaker(entity, entityLocation) {
    let entityName = entity.spawn;
	switch(entityName) {
		case "Entity":
			return new Entity.Entity(entityLocation.x, entityLocation.y)
		case "GreenEntity":
			return new GreenEntity.GreenEntity(entityLocation.x, entityLocation.y)
		case "Cursor":
			return new Cursor.Cursor(entityLocation.x, entityLocation.y)
		case "PlayableEntity":
			if (entity.name === "Sonna") {
				return new PlayableEntitySonna.PlayableEntitySonna(entityLocation.x, entityLocation.y)
			} else if (entity.name === "Florence") {
				return new PlayableEntityFlorence.PlayableEntityFlorence(entityLocation.x, entityLocation.y)
			} else if (entity.name === "Pharynx") {
				return new PlayableEntityPharynx.PlayableEntityPharynx(entityLocation.x, entityLocation.y)
			}
			return new PlayableEntity.PlayableEntity(entityLocation.x, entityLocation.y, entity.name)
		case "ProjectileEnemy":
			return new ProjectileEnemy.ProjectileEnemy(entityLocation.x, entityLocation.y)
		default:
			return new Entity.Entity(entityLocation.x, entityLocation.y)
		} 
    }
                
    return EntityMaker;
});