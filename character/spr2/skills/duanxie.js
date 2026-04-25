import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_duanxie|断绁", {
	description:
		"出牌阶段限一次，你可以将一张牌当【铁索连环】使用，" +
		"然后对因此被重置的角色各造成1点伤害。",
	voices: [
		"区区绳索，就想挡住吾等去路！",
		"以身索敌，何惧同伤！",
	],
	skill: {
		enable: "phaseUse",
		usable: 1,
		filterCard: true,
		position: "hes",
		viewAs: {
			name: "tiesuo",
			// @ts-expect-error viewAs里可以放storage
			storage: {
				spr_duanxie: [],
			},
		},
		viewAsFilter(player) {
			return player.countCards("hes") > 0;
		},
		/**
		 * @param {Card} card
		 */
		check(card) {
			const player = get.player();
			return 5 + get.useful(card, player) - get.value(card, player);
		},
		group: [
			"spr_duanxie_before",
			"spr_duanxie_after",
		],
		subSkill: {
			before: {
				charlotte: true,
				direct: true,
				trigger: {
					player: "useCardToBegin",
				},
				filter(event, player, name, target) {
					return event.card.storage?.spr_duanxie &&
						event.target.isLinked();
				},
				async content(event, trigger, player) {
					trigger.card.storage.spr_duanxie.push(trigger.target);
				},
			},
			after: {
				direct: true,
				trigger: {
					player: "useCardAfter",
				},
				filter(event, player, name, target) {
					return event.card.storage?.spr_duanxie;
				},
				async content(event, trigger, player) {
					/** @type {Player[]} */
					const preLinked = trigger.card.storage.spr_duanxie;
					for (const i of trigger.targets.sortBySeat(_status.currentPhase)) {
						if (preLinked.includes(i) && !i.isLinked()) {
							await i.damage();
						}
					}
				},
			},
		},
		ai: {
			order: 7.2,
			effect: {
				player(card, player, target, result1) {
					if (!target ||
						target.hasSkill("nzry_jieying") ||
						target.hasSkill("drlt_qianjie"))
						return 0;
					if (card.storage?.spr_duanxie) {
						const damageEff = get.damageEffect(target, player, player);
						return [1, damageEff];
					}
				},
			},
		},
	},
});
