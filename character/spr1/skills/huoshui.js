import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_huoshui|祸水", {
	description: "<b>锁定技</b>，伤害过你的男性角色受到黑色牌造成的伤害+1。",
	voices: [
		"君爱一时欢，烽烟作良辰。",
		"须臾刀兵起，君恩何处寻？",
	],
	skill: {
		init(player, skill) {
			game
				.filterPlayer(i => {
					return i.hasSex("male") &&
						i.hasAllHistory("sourceDamage",
							evt => evt.player == player);
				})
				.forEach(i => {
					i.addSkill("spr_huoshui_raper");
					i.storage.spr_huoshui_sources.add(player);
				});
		},
		onremove(player, type) {
			game.players.forEach(i => {
				if (i.hasSkill("spr_huoshui_raper")) {
					/** @type {Set} */
					const srcs = i.storage.spr_huoshui_sources;
					srcs.delete(player);
					if (srcs.size == 0) {
						i.removeSkill("spr_huoshui_raper");
					}
				}
			});
		},
		forced: true,
		trigger: {
			global: "damageBegin3",
		},
		logTarget: "player",
		filter(event, player, name, target) {
			return (
				event.player.hasSkill("spr_huoshui_raper") &&
				event.card &&
				get.color(event.card, event.source) == "black"
			);
		},
		async content(event, trigger, player) {
			trigger.num++;
		},
		group: "spr_huoshui_recorder",
		subSkill: {
			recorder: {
				charlotte: true,
				direct: true,
				trigger: {
					player: "damageSource",
				},
				filter(event, player, name, target) {
					return event.source.hasSex("male");
				},
				async content(event, trigger, player) {
					const to = trigger.source;
					to.addSkill("spr_huoshui_raper");
					to.storage.spr_huoshui_sources.add(player);
				},
			},
			raper: {
				mark: true,
				intro: {
					content: "受到黑色牌的伤害+1。",
				},
				init(player, skill) {
					player.storage.spr_huoshui_sources = new Set();
				},
				onremove: true,
				ai: {
					effect: {
						target(card, player, target, result2) {
							if (get.color(card, player) == "black" &&
								get.is.damageCard(card)) {
								const damageEff =
									get.damageEffect(target, player, target);
								return [1, damageEff];
							}
						},
					},
				},
			},
		},
	},
});
