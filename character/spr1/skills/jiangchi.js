import * as util from "../../../utils/util.js";
import { URL } from "../../../utils/constants.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

/**
 * @param {Player} player
 * @param {Card} card 
 * @param {boolean} log 
 * @returns {number}
 */
function jiangchiUseValue(player, card, log = false) {
	const
		// effect of using the card restrictedly
		// @ts-expect-error distance can be assigned with true
		rEff = player.getUseValue(card, true, true),
		// effect of using the card unrestrictedly
		unrEff = player.getUseValue(card, false, false),
		// the weight of effect increase
		incWeight = 0.15,
		// effect of using the card
		useEff = (1 - incWeight) * unrEff + incWeight * (unrEff - rEff),
		// effect of drawing a card
		drawEff = get.effect(player, { name: "draw" }, player, player);

	// for test
	if (log) {
		console.log([
			`card: ${get.translation(card)}`,
			`rEff: ${rEff.toFixed(4)}`,
			`unrEff: ${unrEff.toFixed(4)}`,
			`incWeight: ${incWeight.toFixed(4)}`,
			`useEff: ${useEff.toFixed(4)}`,
			`drawEff: ${drawEff.toFixed(4)}`,
		].join("\n"));
	}

	if (useEff <= drawEff || unrEff <= rEff) return -1;
	return useEff;
}

export default new SkillData("spr_jiangchi|将驰", {
	description:
		"出牌阶段限两次，你可以使用一张牌（无距离和次数限制）或摸一张牌。当你杀死一名角色后，你视为未发动此技能。",
	voices: [
		"策马扬鞭，奔驰万里！",
		"掩敌不备，一鼓而擒！",
		"见可而进，知难而退。",
		"知不可为，遵时养晦。",
		"率师而行，所向皆破！",
	],
	skill: {
		enable: "phaseUse",
		usable: 2,
		direct: true,
		delay: false,
		async content(event, trigger, player) {
			event.trigger("spr_jiangchi_invoke");
		},
		group: [
			"spr_jiangchi_invoke",
			"spr_jiangchi_onKill",
		],
		subSkill: {
			invoke: {
				/** @type {import("../../../utils/type.ts").LogAudioFunc} */
				logAudio(event, player, name, indexedData, result) {
					let idx = [1, 2];
					if (result && result.cost_data && result.cost_data.spr_jiangchi === true) {
						idx = [3, 4];
					}
					return `${URL.SKILL_AUDIO}/spr_jiangchi${idx.randomGet()}.mp3`;
				},
				trigger: {
					player: "spr_jiangchi_invoke",
				},
				async cost(event, trigger, player) {
					event.result = await player.chooseToUse({
						prompt: "将驰：你可以无距离与次数限制地使用一张牌，或点“取消”摸一张牌",
						ai1(card) {
							return jiangchiUseValue(player, card, true);
						},
						filterTarget(card, player, target) {
							return lib.filter.targetEnabled(card, player, target) || false;
						},
						chooseonly: true,
					}).forResult();
					if (!event.result.bool) {
						event.result.cost_data = { spr_jiangchi: true };
						event.result.bool = true;
					}
				},
				async content(event, trigger, player) {
					// util.playSkillAudio("spr_nuzhan", [1, 2, 3]);
					if (event.cost_data && event.cost_data.spr_jiangchi === true) {
						await player.draw();
					} else {
						await player.useCard({
							card: event.cards[0],
							targets: event.targets,
						});
					}
				},
			},
			onKill: {
				logAudio: util.logSkillAudio("spr_jiangchi", 5),
				trigger: {
					source: "dieAfter",
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					player.refreshSkill("spr_jiangchi");
				},
			},
		},
		ai: {
			order() { return get.order({ name: "sha" }) - 0.1; },
			result: {
				player: 1,
			},
		},
	},
});
