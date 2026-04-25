import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_miaosuan|庙算", {
	description: "<b>锁定技</b>，当其他角色对你使用的锦囊牌结算后，若此牌未对你造成伤害，你获得其一张牌。",
	voices: [
		"对其策为小，反其策为间。",
		"哼，吾施谋一生，岂会为计所累。",
	],
	skill: {
		forced: true,
		trigger: { global: "useCardAfter" },
		filter(event, player, name, target) {
			return event.player != player &&
				event.targets?.includes(player) &&
				get.type2(event.card) == "trick" &&
				!player.hasHistory(
					"damage",
					evt =>
						evt.card && evt.getParent(2) == event,
				);
		},
		logTarget: "player",
		async content(event, trigger, player) {
			await player.gainPlayerCard({
				forced: true,
				target: trigger.player,
				position: "he",
			});
		},
	},
});
