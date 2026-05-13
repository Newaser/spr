import * as util from "../../../utils/util.js";
import { URL } from "../../../utils/constants.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

const
	/** @type {CardBaseUIData} */
	jiu = {
		name: "jiu",
		isCard: true,
		// @ts-expect-error viewAs里可以放storage
		storage: { spr_qingman: true },
	},
	juedou = { name: "juedou", isCard: true };

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
		enable: "chooseToUse",
		round: 1,
		hiddenCard(player, name) {
			if (!player.storage.spr_qingman_roundcount)
				return name == "jiu";
		},
		selectCard: -1,
		filterCard: (card, player) => false,
		viewAs: jiu,
		group: "spr_qingman_afterJiu",
		subSkill: {
			afterJiu: {
				direct: true,
				trigger: {
					player: "useCardAfter",
				},
				filter(event, player, name, target) {
					return event.card.storage &&
						event.card.storage.spr_qingman === true &&
						game.countPlayer(p => player.canUse(juedou, p)) > 0;
				},
				async content(event, trigger, player) {
					/** @type {Result} */
					const result = await player.chooseTarget({
						forced: true,
						prompt: "【轻慢】效果发动",
						prompt2: "须令一名其他角色视为对你使用【决斗】",
						filterTarget(card, player, target) {
							return target != player;
						},
						ai: target =>
							get.effect(player, juedou, target, player),
					}).forResult();
					util.playSkillAudio("spr_qingman", [3, 4], false, player);
					result.targets[0].useCard({
						// @ts-expect-error card可以这样取值
						card: juedou,
						targets: [player],
					});
				},
			},
		},
		mod: {
			aiValue(player, card, num) {
				if (card.name == "sha")
					return num + 3;
			},
		},
		ai: {
			order: 8,
			result: {
				player(player, target, card) {
					if (player.isDying())
						return 1;
					const
						jiuEff = get.effect(player, jiu, player, player),
						juedouEffs = game
							.filterPlayer(i => i != player)
							.map(p => get.effect(player, juedou, p, player)),

						juedouEff = Math.max(...juedouEffs);

					return jiuEff + juedouEff;
				},
			},
		},
	},
});
