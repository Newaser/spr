import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

/**
 * @param {GameEvent} trigger
 * @param {Player} player
 */
function getTos(trigger, player) {
	let targets = trigger.targets.length == 1 ?
		[trigger.player] : trigger.targets;
	targets = game.filterPlayer(i =>
		targets.includes(i) &&
		i != player &&
		i.countCards("he") > 0,
	);
	targets.sortBySeat(_status.currentPhase);
	return targets;
}

export default new SkillData("spr_qunbian|群辩", {
	description: `
当你成为其他角色使用锦囊牌的目标后，若你<b>为</b>/<b>不为</b>唯一目标，\
你可以令此牌的<b>使用者</b>/<b>至多两个其他目标</b>选择一项：交给你一张牌；你弃置其一张牌。
`,
	voices: [
		"可笑汝错漏百出，却仍不自知。",
		"哼！班门弄斧。",
	],
	skill: {
		trigger: {
			target: "useCardToTargeted",
		},
		filter(event, player, name, target) {
			return (
				event.player != player &&
				event.card &&
				get.type2(event.card) == "trick" &&
				getTos(event, player).length > 0
			);
		},
		async cost(event, trigger, player) {
			const tos = getTos(trigger, player);
			if (tos.length == 1) {
				event.result = await player.chooseBool({
					prompt: get.prompt("spr_qunbian", tos[0]),
					prompt2: "令其选择交给你牌或者被你弃牌",
					ai: () => {
						return get.effect(
							tos[0],
							{ name: "shunshou", isCard: true },
							player,
							player,
						) > 0;
					},
				}).forResult();
				if (event.result.bool) {
					event.result.targets = tos;
				}
			} else {
				event.result = await player.chooseTarget({
					selectTarget: [1, 2],
					prompt: get.prompt("spr_qunbian"),
					prompt2: `令${tos.map(get.translation).join("、")}中至多两名依次选择交给你牌或者被你弃牌`,
					filterTarget(card, player, target) {
						return tos.includes(target);
					},
					ai(target) {
						return get.effect(
							target,
							{ name: "shunshou", isCard: true },
							player,
							player,
						);
					},
				}).forResult();
			}
		},
		async content(event, trigger, player) {
			for (const target of event.targets.sortBySeat(_status.currentPhase)) {
				const playerName = get.translation(player);
				const result = await target.chooseCard({
					prompt: `${playerName}的【${get.translation("spr_qunbian")}】发动`,
					prompt2: `选择一张牌交给${playerName}，或点“取消”被${playerName}弃置一张牌`,
					ai(card) {
						if (get.attitude(target, player) > 0) return 1;
						return 3 - get.value(card);
					},
				}).forResult();
				if (result.bool) {
					target.give(result.cards, player);
				} else {
					player.discardPlayerCard({
						forced: true,
						target,
					});
				}
			}
		},
		ai: {
			effect: {
				target(card, player, target, result2) {
					if (
						get.type(card) != "trick" ||
						get.tag(card, "multitarget") ||
						get.attitude(player, target) > 0
					) return;
					const hasZhijueWuxie =
						target.hasSkill("spr_zhijue") &&
						target.storage.spr_zhijue_used !== undefined &&
						!target.storage.spr_zhijue_used.includes("wuxie");
					const hasLowValueCard = Boolean(
						player.countCards("he", i => get.value(i) < 3),
					);
					const results = {
						true: {
							true: [0, 0.5, 1, -1],
							false: [0, -0.5, 1, -1.5],
						},
						false: {
							true: [1, 1, 1, -1],
							false: [1, 0, 1, -1.5],
						},
					};
					const ret = results[hasZhijueWuxie][Number(hasLowValueCard)];
					return ret;
				},
			},
		},
	},
});
