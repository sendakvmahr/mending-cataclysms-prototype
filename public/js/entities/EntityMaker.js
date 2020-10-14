
define([
    'entities/Entity',
	'entities/Cursor',
	'entities/SceneTransitionEntity',
	'entities/CutsceneEntity',
	'entities/playable/PlayableEntitySonna',
	'entities/playable/PlayableEntityFlorence',
	'entities/playable/PlayableEntityPharynx',
	'entities/playable/PlayableEntity',
	'entities/attacks/FollowAttack',
	'entities/attacks/Attack',
	'entities/enemies/DandeBunny',
	'entities/enemies/Enemy'
    ],
function(
    Entity,
	Cursor,
	SceneTransitionEntity,
	CutsceneEntity,
	PlayableEntitySonna,
	PlayableEntityFlorence,
	PlayableEntityPharynx,
	PlayableEntity,
	FollowAttack,
	Attack,
	DandeBunny,
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
        case "CutsceneEntity":
            return new CutsceneEntity.CutsceneEntity(info);
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
        case "DandeBunny":
            return new DandeBunny.DandeBunny(info);
        case "Enemy":
            return new Enemy.Enemy(info);

        default:
            console.log("Unknown entity: " + entityName)
            return new Entity.Entity(info);
        }
    }              
    return EntityMaker;
});
