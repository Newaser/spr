import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_zhenxia|贞瑕", {
	description:
		"<b>觉醒技</b>，当男性角色对你造成伤害后，你与其各回复1点体力，" +
		`然后你获得${get.poptip("spr_huoshui")}。`,
	voices: [
		"青衣沾赤，金莲染尘……",
		"生逢乱世，身何由己……",
	],
	skill: {
		trigger: {
			player: "damageSource",
		},
		filter(event, player, name, targert) {
			return event.source && event.source.hasSex("male");
		},
		forced: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: "gray",
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			await player.recover();
			await trigger.source.recover();
			player.addSkill("spr_huoshui");
		},
		derivation: "spr_huoshui",
		ai: {
			effect: {
				target(card, player, target, result2) {
					if (
						get.attitude(player, target) >= 0 ||
						!player.hasSex("male") ||
						target.awakenedSkills.includes("spr_zhenxia") ||
						get.is.damageCard(card)
					) return;
					if (player.hasSkillTag("jueqing", false, target))
						return [1, -2];
					return [
						1,
						get.recoverEffect(target, target, target),
						1,
						get.recoverEffect(player, target, player) - 1.3,
					];
				},
			},
		},
	},
});
