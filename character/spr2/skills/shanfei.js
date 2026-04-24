import * as util from "../../../utils/util.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_shanfei|擅废", {
	description:
		"<b>限定技</b>，出牌阶段，你可令一名已受伤的其他角色减1点体力上限、失去主公技、废除非空装备栏。",
	voices: [
		"当今天子乃我所立，他敢怎样？",
		"我兄弟三人同掌禁军，有何所惧？",
		"（破碎声）",
	],
	skill: {
		logAudio: util.logSkillAudio("spr_shanfei", [1, 2]),
		enable: "phaseUse",
		limited: true,
		skillAnimation: true,
		animationColor: "purple",
		line: "purple",
		filter(event, player, name, target) {
			return game.hasPlayer(i => i != player && i.isDamaged());
		},
		filterTarget(card, player, target) {
			return target != player &&
				target.isDamaged();
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			const to = event.target;

			util.playSkillAudio("spr_shanfei", 3);

			// 减1点体力上限
			await to.loseMaxHp({ num: 1 });

			// 失去主公技
			for (const skill of to.skills) {
				if (get.info(skill).zhuSkill) {
					to.removeSkill(skill);
				}
			}

			// 废除非空装备栏
			const toDisable = [];
			for (let i = 1; i <= 5; i++) {
				if (to.getEquips(i).length > 0) {
					toDisable.push(`equip${i}`);
				}
			}
			await to.disableEquip({ slots: toDisable, source: player });
		},
		ai: {
			result: {
				target: -3,
			},
		},
	},
});
