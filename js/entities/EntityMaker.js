
define([
    'entities/Entity',
	'entities/Enemy',
	'entities/Cursor',
	'entities/FollowAttack',
	'entities/PlayableEntitySonna',
	'entities/PlayableEntityFlorence',
	'entities/GreenEntity',
	'entities/PlayableEntityPharynx',
	'entities/SceneTransitionEntity',
	'entities/PlayableEntity',
	'entities/Attack'
    ],
function(
    Entity,
	Enemy,
	Cursor,
	FollowAttack,
	PlayableEntitySonna,
	PlayableEntityFlorence,
	GreenEntity,
	PlayableEntityPharynx,
	SceneTransitionEntity,
	PlayableEntity,
	Attack
    )
{    
    function EntityMaker(entity, entityLocation, info) {
    let entityName = entity;
    switch(entityName) {
        case "Entity":
            return new Entity.Entity(info);
        case "Enemy":
            return new Enemy.Enemy(info);
        case "Cursor":
            return new Cursor.Cursor(info);
        case "FollowAttack":
            return new FollowAttack.FollowAttack(info);
        case "PlayableEntitySonna":
            return new PlayableEntitySonna.PlayableEntitySonna(info);
        case "PlayableEntityFlorence":
            return new PlayableEntityFlorence.PlayableEntityFlorence(info);
        case "GreenEntity":
            return new GreenEntity.GreenEntity(info);
        case "PlayableEntityPharynx":
            return new PlayableEntityPharynx.PlayableEntityPharynx(info);
        case "SceneTransitionEntity":
            return new SceneTransitionEntity.SceneTransitionEntity(info);
        case "PlayableEntity":
            return new PlayableEntity.PlayableEntity(info);
        case "Attack":
            return new Attack.Attack(info);

        default:
            console.log("Unknown entity: " + entityName)
            return new Entity.Entity(entityLocation.x, entityLocation.y);
        }
    }              
    return EntityMaker;
});
