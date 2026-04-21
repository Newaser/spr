import * as util from "../../../utils/util.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_yongan|永安", {
	description:
		"<b>锁定技</b>，每回合限三次，当其他角色于其回合内" +
		"（摸牌阶段除外）获得牌时，你摸等量的牌。" +
		"每回合结束时，你将手牌弃至体力值。",
	voices: [
		"长河如衣带，高山如砥石，国可得久安！",
		"今指山河为誓，此生不过江南，不从吴狗！",
	],
	skill: {
		logAudio: util.logSkillAudio("spr_yongan", 1),
		forced: true,
		usable: 3,
		trigger: {
			global: ["gainAfter", "loseAsyncAfter"],
		},
		filter(event, player, name, target) {
			const to = event.player;
			return to != player &&
				to == _status.currentPhase &&
				event.getParent("phaseDraw")?.name != "phaseDraw" &&
				event.getg(to).length > 0;
		},
		async content(event, trigger, player) {
			const num = trigger.getg(trigger.player).length;
			await player.draw(num);
		},
		group: "spr_yongan_discard",
		subSkill: {
			discard: {
				logAudio: util.logSkillAudio("spr_yongan", 2),
				forced: true,
				trigger: {
					global: "phaseEnd",
				},
				filter(event, player, name, target) {
					return player.countCards("h") > player.hp;
				},
				async content(event, trigger, player) {
					const selectCard = player.countCards("h") - player.hp;
					await player.chooseToDiscard({
						forced: true,
						selectCard,
						position: "h",
						ai(card) {
							const list = game.players.sortBySeat(_status.currentPhase);
							const enemiesBeforeMe = list
								.slice(1, list.indexOf(player))
								.filter(i => get.attitude(i, player) < 0 && i.inRange(player));
							if (enemiesBeforeMe.length == 0)
								return -get.value(card, player);
							return get.useful(card, player);
						},
					});
				},
			},
		},
	},
});
