import * as util from "../../../utils/util.js";
import { URL } from "../../../utils/constants.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_qingman|轻慢", {
	description:
		"每轮限一次，你可以视为使用一张【酒】，然后令一名其他角色视为对你使用一张【决斗】。",
	voices: [
		"贪而不治，那又如何？",
		"我若自比管乐，亦可算是谦辞。",
		"孟德尚且敬我，汝意欲何为？",
		"你也配姓许？！",
	],
	skill: {
		logAudio: util.logSkillAudio("spr_qingman", [1, 2]),
		enable: "phaseUse",
		round: 1,
		hiddenCard(player, name) {
			if (!player.storage.spr_qingman_roundcount)
				return name == "jiu";
		},
		selectCard: -1,
		filterCard: (card, player) => false,
		viewAs: {
			name: "jiu",
			isCard: true,
			// @ts-expect-error viewAs里可以放storage
			storage: { spr_qingman: true },
		},
		group: "spr_qingman_afterJiu",
		subSkill: {
			afterJiu: {
				logAudio: util.logSkillAudio("spr_qingman", [3, 4]),
				trigger: {
					player: "useCardAfter",
				},
				filter(event, player, name, target) {
					return event.card.storage &&
						event.card.storage.spr_qingman === true &&
						game.countPlayer(p => player.canUse("juedou", p)) > 0;
				},
				async cost(event, trigger, player) {
					event.result = await player.chooseTarget({
						forced: true,
						prompt: "【轻慢】效果发动",
						prompt2: "须令一名其他角色视为对你使用【决斗】",
						filterTarget(card, player, target) {
							return target != player;
						},
						ai(target) {
							return get.effect(
								player,
								{ name: "juedou", isCard: true },
								target,
								player,
							);
						},
					}).forResult();
				},
				async content(event, trigger, player) {
					event.targets[0].useCard({
						// @ts-expect-error card可以这样取值
						card: { name: "juedou", isCard: true },
						targets: [player],
					});
				},
			},
		},
		ai: {
			order: 8,
			result: {
				player(player) {
					if (player.isDying()) return 1;
					if (player.hasSkill("spr_shigong") &&
						!player.storage.spr_shigong)
						player.storage.spr_qingman_gettingResult = true;
					const jiuEff = get.effect(
						player,
						{ name: "jiu", isCard: true },
						player,
						player,
					);
					const maxJuedouEff = Math.max(
						...game.players
							.filter((i) => i != player)
							.map((cur) =>
								get.effect(
									player,
									{ name: "juedou", isCard: true },
									cur,
									player,
								),
							),
					);
					delete player.storage.spr_qingman_gettingResult;
					const res = jiuEff + maxJuedouEff;
					// // for test
					// console.log([
					// 	`jiuEff: ${jiuEff.toFixed(4)}`,
					// 	`maxJuedouEff: ${maxJuedouEff.toFixed(4)}`,
					// 	`spr_qingman result to player: ${res.toFixed(4)}`,
					// ].join("\n"));
					return res;
				},
			},
		},
	},
});
