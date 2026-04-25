import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

/**
 * 
 * @param {Player} player 
 * @returns {number}
 */
function getX(player) {
	return game.countPlayer(i => i != player && i.group == player.group);
}

export default new SkillData("spr_yanwang|燕王", {
	description: "<b>主公技</b>，<b>锁定技</b>，摸牌阶段，你多摸X张牌；你的手牌上限+X（X为与你势力相同的其他角色数）。",
	voices: [
		"曹魏可王，吾亦可王！",
		"凡从我大燕者，授印封爵，全族俱荣！",
	],
	skill: {
		zhuSkill: true,
		forced: true,
		trigger: { player: "phaseDrawBegin2" },
		filter(event, player) {
			if (!player.hasZhuSkill("spr_yanwang")) {
				return false;
			}
			return !event.numFixed && getX(player) > 0;
		},
		async content(event, trigger, player) {
			trigger.num += getX(player);
		},
		group: "spr_yanwang_maxHand",
		subSkill: {
			maxHand: {
				locked: true,
				mod: {
					maxHandcard(player, num) {
						return num + getX(player);
					},
				},
			},
		},
		ai: {
			threaten: 1.8,
		},
	},
});
