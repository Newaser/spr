import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_xunxian|逊贤", {
	description: "每轮限一次，你可以将两张牌交给一名其他角色，视为使用一张【无懈可击】。",
	voices: [
		"督军之才，子明强于我甚多。",
		"此间重任，公卿可担之。",
	],
	skill: {
		enable: "chooseToUse",
		viewAs: {
			name: "wuxie",
			isCard: true,
		},
		viewAsFilter(player) {
			return !player.hasSkill("spr_xunxian_used") &&
				player.countCards("he") >= 2 &&
				game.hasPlayer(i => i != player);
		},
		selectCard: -1,
		filterCard: (card, player) => false,
		async precontent(event, trigger, player) {
			/** @type {Result} */
			const result = await player.chooseCardTarget({
				forced: true,
				prompt: "逊贤：须交给一名其他角色两张牌，视为使用【无懈可击】",
				selectCard: 2,
				position: "he",
				filterTarget(card, player, target) {
					return target != player;
				},
				ai2(target) {
					return get.attitude(player, target);
				},
			}).forResult();
			await player.addTempSkill("spr_xunxian_used", "roundEnd");
			await player.give(result.cards, result.targets[0]);
		},
		hiddenCard(player, name) {
			if (get.info("spr_xunxian").viewAsFilter?.(player))
				return name == "wuxie";
		},
		subSkill: { used: {} },
	},
});
