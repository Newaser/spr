import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_mengjin|猛进", {
	description: "当你使用的【杀】被【闪】抵消时，你可以弃置目标角色的一张牌。",
	dynamicDescription(player, desc) {
		if (player.storage.spr_jinzi_shown &&
			player.storage.spr_jinzi_shown > 3) {
			return desc.replace("一", "两");
		}
	},
	voices: [
		"休想跑！",
		"趁锐气正盛，擒敌军之将！",
	],
	skill: {
		trigger: {
			player: "shaMiss",
		},
		filter(event, player, name, target) {
			return event.target.countCards("he") > 0;
		},
		check(event, player, trigger, target) {
			return get.attitude(player, event.target) < 0;
		},
		logTarget: "target",
		async content(event, trigger, player) {
			let v = 1;
			if (player.storage.spr_jinzi_shown &&
				player.storage.spr_jinzi_shown > 3) {
				v *= 2;
			}
			await player.discardPlayerCard({
				forced: true,
				target: trigger.target,
				selectButton: v,
			});
		},
	},
});
