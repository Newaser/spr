import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

/**
 * 
 * @param {Player} player 
 * @returns {boolean}
 */
function chunlaoAvailable(player) {
	return player &&
		player.hasSkill("spr_chunlao") &&
		player.storage.counttrigger?.spr_chunlao == 0;
}

export default new SkillData("spr_chunlao|醇醪", {
	description:
		`每回合限一次，你可以发动${get.poptip("wangxi")}，受伤角色回复1点体力，` +
		"伤害来源视为使用一张【酒】。受此【酒】影响的【杀】无距离与次数限制。",
	voices: [
		"若饮醇醪，不觉自醉。",
		"借此酒兴，请与老夫并肩杀敌！",
	],
	skill: {
		inherit: "wangxi",
		init(player, skill) {
			game.addGlobalSkill("spr_chunlao_global");
		},
		onremove(player, type) {
			game.players.concat(game.dead)
				.forEach(i => game.removeGlobalSkill("spr_chunlao_global", i));
		},
		usable: 1,
		async content(event, trigger, player) {
			const drawers = [trigger.player, trigger.source];
			await game.asyncDraw(drawers.sortBySeat(_status.currentPhase));
			await trigger.player.recover();
			await trigger.source.useCard({
				// @ts-expect-error card可以这样取值
				card: { name: "jiu", isCard: true },
				targets: [trigger.source],
			});
			trigger.source.addTempSkill("spr_chunlao_unlimited");
		},
		subSkill: {
			unlimited: {
				mark: true,
				intro: {
					content: "下一张【杀】无距离与次数限制。",
				},
				charlotte: true,
				direct: true,
				firstDo: true,
				trigger: {
					player: "useCard0",
				},
				filter(event, player, name, target) {
					return get.name(event.card, player) == "sha";
				},
				async content(event, trigger, player) {
					player.removeSkill(event.name);
				},
				mod: {
					cardUsable(card, player, num) {
						if (get.name(card, player) == "sha") {
							return Infinity;
						}
					},
					targetInRange(card, player, target, result) {
						if (get.name(card, player) == "sha") {
							return true;
						}
					},
				},
				ai: {
					/**
					 * 防止插入结算时，来源使用的被插入的牌结算后，
					 * 【酒】的状态被清除
					 */
					jiuSustain: true,
				},
			},
			global: {
				ai: {
					effect: {
						player(card, player, target, result1) {
							if (!chunlaoAvailable(player) &&
								!chunlaoAvailable(target))
								return;
							if (get.is.damageCard(card) &&
								!player.hasSkillTag("damageBonus") &&
								get.attitude(player, target) > 0) {
								return [1, 3, 0, 1];
							}
						},
						target(card, player, target, result2) {
							if (!chunlaoAvailable(player) &&
								!chunlaoAvailable(target))
								return;
							if (get.is.damageCard(card) &&
								!player.hasSkillTag("damageBonus") &&
								get.attitude(target, player) > 0) {
								return [0, 1, 1, 3];
							}
						},
					},
				},
			},
		},
	},
});
