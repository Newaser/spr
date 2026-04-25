import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_shencun|慎存", {
	description: "<b>锁定技</b>，当你受到大于1点的伤害时，防止之。",
	voices: [
		"行于中道，谋以肃身！",
		"主可弃，吾命不可失。",
	],
	skill: {
		forced: true,
		trigger: {
			player: "damageBegin4",
		},
		filter(event, player, name, target) {
			return event.num > 1;
		},
		async content(event, trigger, player) {
			trigger.cancel();
		},
		ai: {
			noShan: true,
			filterDamage: true,
			skillTagFilter(player, tag, arg) {
				return arg?.num > 1;
			},
		},
	},
});
