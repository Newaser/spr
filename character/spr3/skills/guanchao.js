import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_guanchao|观潮", {
	description: `游戏开始时或当你使用锦囊牌结算后，你可以令一名角色获得或转换${get.poptip("spr_chaoxi")}。`,
	voices: [
		"朝夕之间，可知所进退。",
		"月盈，潮起晨暮也；月亏，潮起日半也。",
	],
	skill: {
		trigger: {
			global: "phaseBefore",
			player: ["enterGame", "useCardAfter"],
		},
		filter(event, player, name, indexedData) {
			if (name == "phaseBefore") {
				return game.phaseNumber == 0;
			}
			if (name == "enterGame") {
				return true;
			}
			if (name == "useCardAfter") {
				return get.type2(event.card) == "trick";
			}
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseTarget({
				prompt: "观潮：你可以令一名角色获得或转换【潮汐】",
				ai(target) {
					let ret = get.attitude(player, target);
					if (target.hasSkill("spr_chaoxi") && !target.storage.spr_chaoxi)
						ret = - ret;
					return ret;
				},
			}).forResult();
		},
		async content(event, trigger, player) {
			const to = event.targets[0];
			if (to.hasSkill("spr_chaoxi")) {
				to.changeZhuanhuanji("spr_chaoxi");
			} else {
				to.addSkillLog("spr_chaoxi");
			}
		},
		derivation: "spr_chaoxi",
	},
});
