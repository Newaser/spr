import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

/**
 * 
 * @param {Player} player 
 * @param {Player} target 
 * @returns {boolean}
 */
function isQujiTarget(player, target) {
	return !player.getStorage("spr_quji_targeted").includes(target) &&
		target.countDiscardableCards(player, "he") > 0 &&
		target.isDamaged();
}

export default new SkillData("spr_quji|去疾", {
	description:
		"出牌阶段每名角色各限一次，你可以弃置一名已受伤角色的一张牌，" +
		"然后其回复1点体力。若此牌为♠牌，你获得之并失去1点体力。",
	voices: [
		"若不去兵之疾，则将何以守国？",
		"愿为将士，略尽绵薄。",
	],
	skill: {
		enable: "phaseUse",
		filter(event, player, name, target) {
			return game.hasPlayer((i) => isQujiTarget(player, i));
		},
		filterTarget(card, player, target) {
			return isQujiTarget(player, target);
		},
		async content(event, trigger, player) {
			const to = event.target;
			player.addTempSkill("spr_quji_targeted", "phaseUseAfter");
			player.markAuto("spr_quji_targeted", to);

			/** @type {Result} */
			const result = await player.discardPlayerCard({
				forced: true,
				target: to,
			}).forResult();

			await to.recover();

			if (get.suit(result.cards[0]) == "spade") {
				await player.gain({
					cards: result.cards,
					animate: "gain2",
				});
				await player.loseHp();
			}
		},
		subSkill: {
			targeted: {
				onremove: true,
				charlotte: true,
			},
		},
		ai: {
			order: 9,
			result: {
				target(player, target, card) {
					return get.recoverEffect(target, player, target) - 1;
				},
				player(player, target, card) {
					if (target.isAllCardsKnown(player) &&
						target.getCards("he").every(i => get.suit(i) == "spade")) {
						return get.effect(player, { name: "loseHp" }, player, player) + 1;
					}
					return 0;
				},
			},
		},
	},
});
