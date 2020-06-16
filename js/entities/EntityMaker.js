
define([
    'entities/Entity',
	'entities/Enemy',
	'entities/FollowAttack',
	'entities/PlayableEntitySonna',
	'entities/PlayableEntityFlorence',
	'entities/PlayableEntityPharynx',
	'entities/SceneTransitionEntity',
	'entities/PlayableEntity',
	'entities/Attack'
    ],
function(
    Entity,
	Enemy,
	FollowAttack,
	PlayableEntitySonna,
	PlayableEntityFlorence,
	PlayableEntityPharynx,
	SceneTransitionEntity,
	PlayableEntity,
	Attack
    )
{    
    function EntityMaker(entityName, info) {
    switch(entityName) {
        case "Entity":
            return new Entity.Entity(info);
        case "Enemy":
            return new Enemy.Enemy(info);
        case "FollowAttack":
            return new FollowAttack.FollowAttack(info);
        case "PlayableEntitySonna":
            return new PlayableEntitySonna.PlayableEntitySonna(info);
        case "PlayableEntityFlorence":
            return new PlayableEntityFlorence.PlayableEntityFlorence(info);
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
            return new Entity.Entity(info);
        }
    }              
    return EntityMaker;
});
