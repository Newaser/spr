import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_junbing|郡兵", {
	description: "每回合限一次，当一名角色失去手牌后，若其没有手牌，你可以摸两张牌并交给其一张牌。",
	voices: [
		"男儿慷慨，军中豪迈。",
		"郡国当有搜狩习战之备。",
	],
	skill: {
		usable: 1,
		trigger: {
			global: [
				"loseAfter",
				"equipAfter",
				"addJudgeAfter",
				"gainAfter",
				"loseAsyncAfter",
				"addToExpansionAfter",
			],
		},
		getIndex(event, player) {
			return game
				.filterPlayer(current => {
					if (current.countCards("h")) {
						return false;
					}
					const evt = event.getl(current);
					return evt?.hs?.length;
				})
				.sortBySeat(_status.currentPhase);
		},
		filter: (event, player, name, target) => target?.isIn(),
		logTarget: (event, player, name, target) => target,
		check: (event, player, name, target) =>
			get.attitude(player, target) > 0 ||
			player.countCards("he") > 2,
		async content(event, trigger, player) {
			const to = event.targets[0];
			await player.draw(2);
			if (to != player && player.countCards("he") > 0) {
				await player.chooseToGive({
					target: to,
					forced: true,
					prompt: `郡兵：你须交给${get.translation(to)}一张牌`,
					ai(card) {
						if (get.attitude(player, to) > 0) {
							if (to.isPhaseUsing()) {
								return get.value(card, to);
							}
							return get.useful(card, to);
						}
						if (player.isPhaseUsing()) {
							return -get.value(card, player);
						}
						return -get.useful(card, to);
					},
				});
			}
		},
	},
});
