import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_xiandeng|先登", {
	description:
		"<b>限定技</b>，每轮开始时，你可以将手牌摸至四张并执行一个使用牌无距离与次数限制的额外回合。",
	voices: [
		"亲临战场，必为三军表率！",
		"奋勇当前，只为国家效劳！",
	],
	skill: {
		trigger: {
			global: "roundStart",
		},
		limited: true,
		skillAnimation: true,
		animationColor: "thunder",
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			await player.drawTo(4);
			player.phase(event.name);
			player.addSkill("spr_xiandeng_onPhase");
		},
		subSkill: {
			onPhase: {
				charlotte: true,
				direct: true,
				trigger: {
					player: "phaseBegin",
				},
				filter(event, player, name, target) {
					return event.skill == "spr_xiandeng";
				},
				async content(event, trigger, player) {
					player.removeSkill(event.name);
					player.addTempSkill("spr_xiandeng_unlimited");
				},
			},
			unlimited: {
				mark: true,
				intro: {
					content: "本回合使用牌无距离与次数限制。",
				},
				mod: {
					targetInRange(card, player, target, result) {
						return true;
					},
					cardUsable(card, player, num) {
						return Infinity;
					},
				},
			},
		},
		ai: {
			threaten(player, target) {
				if (!player.awakenedSkills.includes("spr_xiandeng"))
					return 1.2 + Math.max(4 - target.countCards("h"), 0) * 0.1;
			},
		},
	},
});
