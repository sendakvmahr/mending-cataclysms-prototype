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
	"entities/SceneTransitionEntity"
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
	Projectile,
	SceneTransitionEntity
	)
{    
    function EntityMaker(entity, entityLocation, info) {
    let entityName = entity;
	switch(entityName) {
		case "Entity":
			return new Entity.Entity(entityLocation.x, entityLocation.y)
		case "GreenEntity":
			return new GreenEntity.GreenEntity(entityLocation.x, entityLocation.y)
		case "Cursor":
			return new Cursor.Cursor(entityLocation.x, entityLocation.y)
		case "PlayableEntitySonna":
			return new PlayableEntitySonna.PlayableEntitySonna(entityLocation.x, entityLocation.y)
		case "PlayableEntityFlorence":
			return new PlayableEntityFlorence.PlayableEntityFlorence(entityLocation.x, entityLocation.y)
		case "PlayableEntityPharynx":
			return new PlayableEntityPharynx.PlayableEntityPharynx(entityLocation.x, entityLocation.y)
		case "ProjectileEnemy":
			return new ProjectileEnemy.ProjectileEnemy(entityLocation.x, entityLocation.y)
		case "sceneTransition":
			return new SceneTransitionEntity.SceneTransitionEntity(entityLocation.x, entityLocation.y) 
		default:
			console.log("Unknown entity: " + entityName)
			return new Entity.Entity(entityLocation.x, entityLocation.y)
		} 
    }
                
    return EntityMaker;
});