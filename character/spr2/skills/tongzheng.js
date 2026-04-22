import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_tongzheng|同征", {
	description:
		"每回合限一次，当一名角色进入濒死状态时，" +
		"当前回合角色可以令你摸两张牌并回复1点体力。",
	voices: [
		"长刀系红缨，身伴千军万马，情随万水千山。",
		"与君共进退，何处皆可栖！",
	],
	skill: {
		usable: 1,
		trigger: {
			global: "dying",
		},
		async cost(event, trigger, player) {
			const cur = _status.currentPhase;
			event.result = await cur.chooseBool({
				prompt: get.prompt("spr_tongzheng", player),
				prompt2: "令其摸两张牌并回复1点体力",
				ai(event, player) {
					return get.attitude(cur, player) > 0;
				},
			}).forResult();
		},
		async content(event, trigger, player) {
			_status.currentPhase.line(player);
			await player.draw(2);
			await player.recover();
		},
		ai: {
			threaten: 1.1,
			effect: {
				target(card, player, target, result2) {
					if (player.storage?.counttrigger?.spr_tongzheng > 0) {
						return;
					}
					if (get.is.damageCard(card) &&
						get.attitude(player, target) > 0 &&
						get.attitude(_status.currentPhase, target) > 0 &&
						!player.hasSkillTag("damageBonus") &&
						target.hp == 1) {
						return [0, 2];
					}
				},
			},
		},
	},
});
