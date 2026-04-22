import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_shuangbi|双璧", {
	description:
		"每回合限一次，当其他角色于其出牌阶段内使用【杀】时，你可以交给其两张牌。" +
		"若如此做，本回合其使用【杀】的次数上限+2。",
	voices: [
		"赠君瑶佩，佑君安好。",
		"此战虽险，悦亦可助之！",
	],
	skill: {
		usable: 1,
		trigger: {
			global: "useCard",
		},
		logTarget: "player",
		filter(event, player, name, target) {
			return (
				event.player != player &&
				event.player.isPhaseUsing() &&
				event.card.name == "sha" &&
				player.countCards("he") >= 2
			);
		},
		async cost(event, trigger, player) {
			const to = trigger.player;
			event.result = await player.chooseCard({
				prompt: get.prompt("spr_shuangbi", to),
				prompt2: "交给其两张牌，令其本阶段使用【杀】的次数上限+2",
				selectCard: 2,
				ai(card) {
					if (get.attitude(player, to) <= 0)
						return -1;
					let ret = get.value(card, to);
					if (get.name(card, player) == "sha")
						ret += 10;
					return ret;
				},
			}).forResult();
		},
		async content(event, trigger, player) {
			player.give(event.cards, trigger.player);
			trigger.player.addTempSkill("spr_shuangbi_shaPlus");
		},
		subSkill: {
			shaPlus: {
				mod: {
					cardUsable(card, player, num) {
						if (card.name == "sha")
							return num + 2;
					},
				},
				mark: true,
				marktext: "杀次数+2",
				intro: {
					name: "双璧 ",
					content: "本回合使用【杀】的次数上限+2",
				},
			},
		},
		ai: {
			expose: 0.8,
		},
	},
});
