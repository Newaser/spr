import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

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
		usable: 1,
		async content(event, trigger, player) {
			await game.asyncDraw([trigger.player, trigger.source].sortBySeat());
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
		},
	},
});
