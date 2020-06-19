
define([
    'entities/Entity',
	'entities/Cursor',
	'entities/SceneTransitionEntity',
	'entities/Playable/PlayableEntitySonna',
	'entities/Playable/PlayableEntityFlorence',
	'entities/Playable/PlayableEntityPharynx',
	'entities/Playable/PlayableEntity',
	'entities/Attacks/FollowAttack',
	'entities/Attacks/Attack',
	'entities/Enemies/Enemy'
    ],
function(
    Entity,
	Cursor,
	SceneTransitionEntity,
	PlayableEntitySonna,
	PlayableEntityFlorence,
	PlayableEntityPharynx,
	PlayableEntity,
	FollowAttack,
	Attack,
	Enemy
    )
{    
    function EntityMaker(entityName, info) {
    switch(entityName) {
        case "Entity":
            return new Entity.Entity(info);
        case "Cursor":
            return new Cursor.Cursor(info);
        case "SceneTransitionEntity":
            return new SceneTransitionEntity.SceneTransitionEntity(info);
        case "PlayableEntitySonna":
            return new PlayableEntitySonna.PlayableEntitySonna(info);
        case "PlayableEntityFlorence":
            return new PlayableEntityFlorence.PlayableEntityFlorence(info);
        case "PlayableEntityPharynx":
            return new PlayableEntityPharynx.PlayableEntityPharynx(info);
        case "PlayableEntity":
            return new PlayableEntity.PlayableEntity(info);
        case "FollowAttack":
            return new FollowAttack.FollowAttack(info);
        case "Attack":
            return new Attack.Attack(info);
        case "Enemy":
            return new Enemy.Enemy(info);

        default:
            console.log("Unknown entity: " + entityName)
            return new Entity.Entity(info);
        }
    }              
    return EntityMaker;
});
