import * as util from "../../../utils/util.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_xiongju|凶倨", {
	description:
		`出牌阶段限一次，你可以与一名角色${get.poptip("sxrm_compare")}` +
		"并视为对其使用一张【决斗】。若其因此打出过【杀】，公开结果：若你赢，你对其造成2点伤害。",
	voices: [
		"以杀立威，谁敢反我！",
		"将这些乱臣贼子，尽皆诛之！",
	],
	skill: {
		enable: "phaseUse",
		usable: 1,
		filter(event, player, name, target) {
			return game.hasPlayer(i => player.canCompare(i));
		},
		filterTarget(card, player, target) {
			return player.canCompare(target);
		},
		async content(event, trigger, player) {
			const to = event.target;
			const maxNum = Math.max(...to.getCards("h").map(i => i.number || 0));

			const delayedCompare = player.chooseToCompare(to);
			delayedCompare.isDelay = true;
			await delayedCompare;
			await game.delay();

			const juedou = {
				name: "juedou",
				isCard: true,
				storage: {
					spr_xiongju: [delayedCompare, to],
				},
			};
			if (player.canUse(juedou, to)) {
				to.addTempSkill("spr_xiongju_noShaAi", ["useCardAfter"]);
				to.storage.spr_xiongju_noShaAi = maxNum;
				await player.useCard({
					// @ts-expect-error card可以这样取值
					card: juedou,
					targets: [to],
				});
			}
		},
		group: "spr_xiongju_damage",
		subSkill: {
			damage: {
				charlotte: true,
				direct: true,
				trigger: {
					player: "useCardAfter",
				},
				filter(event, player, name, target) {
					if (!event.card.storage?.spr_xiongju)
						return false;

					/** @type {Player} */
					const to = event.card.storage.spr_xiongju[1];
					return to.getHistory("respond", (/** @type {GameEvent} */ evt) => {
						return evt.card.name == "sha" && evt.respondTo?.[1] == event.card;
					}).length > 0;
				},
				async content(event, trigger, player) {
					/**  @type {[GameEvent, Player]}  */
					const [delayedCompare, to] = trigger.card.storage.spr_xiongju;
					/** @type {Result} */
					const result = await util
						.revealDelayedCompare(player, delayedCompare)
						.forResult();
					if (result?.winner == player) {
						await to.damage({ num: 2 });
					} else {
						player.say("……");
						await game.delay();
					}
				},
			},
			noShaAi: {
				onremove: true,
				ai: {
					noSha: "respond",
					skillTagFilter(player, tag, arg) {
						if (player.storage.spr_xiongju_noShaAi < 7) {
							return false;
						}
					},
				},
			},
		},
		ai: {
			result: {
				target(player, target, card) {
					const juedouEff = get.effect(
						target,
						{ name: "juedou", isCard: true },
						player,
						target,
					);
					return juedouEff - 1;
				},
			},
		},
	},
});
