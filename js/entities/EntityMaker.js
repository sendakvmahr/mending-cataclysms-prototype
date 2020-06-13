define([
	"entities/Entity", 
	"entities/GreenEntity",
	"entities/Cursor",
	"entities/PlayableEntity",
	"entities/PlayableEntitySonna",
	"entities/PlayableEntityPharynx",
	"entities/PlayableEntityFlorence",
	"entities/Enemy",
	"entities/Attack",
	"entities/SceneTransitionEntity",
	"entities/FollowAttack"
	],
function(
	Entity, 
	GreenEntity, 
	Cursor,
	PlayableEntity,
	PlayableEntitySonna,
	PlayableEntityPharynx,
	PlayableEntityFlorence,
	Enemy,
	Attack,
	SceneTransitionEntity,
	FollowAttack
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
		case "Enemy":
			return new Enemy.Enemy(entityLocation.x, entityLocation.y)
		case "SceneTransitionEntity":
			return new SceneTransitionEntity.SceneTransitionEntity(entityLocation.x, entityLocation.y, info);
		case "FollowAttack":
			return new FollowAttack.FollowAttack(entityLocation.x, entityLocation.y, info["direction"], info["owner"]);
		default:
			console.log("Unknown entity: " + entityName)
			return new Entity.Entity(entityLocation.x, entityLocation.y)
		} 
    }
                
    return EntityMaker;
});