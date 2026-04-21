import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_baier|白毦", {
	description:
		"每回合限一次，当一张造成过伤害的【杀】结算结束后，其使用者可以令你获得之。",
	voices: [
		"精锐之师，何人能挡！",
		"扬大汉之英气，无往而不利！",
	],
	skill: {
		trigger: {
			global: "useCardAfter",
		},
		usable: 1,
		filter(event, player, name, target) {
			return (
				event.card.name == "sha" &&
				event.player.hasHistory("sourceDamage",
					evt => evt.card == event.card) &&
				event.player.isIn() &&
				event.cards.filterInD().length > 0
			);
		},
		async cost(event, trigger, player) {
			let prompt2 = "";
			if (player != trigger.player)
				prompt2 += `令${get.translation(player)}`;
			prompt2 += `获得${get.translation(trigger.cards)}`;

			event.result = await trigger.player.chooseBool({
				prompt: get.prompt("spr_baier"),
				prompt2,
				ai(event, p) {
					return get.attitude(p, player) > 0;
				},
			}).forResult();
		},
		async content(event, trigger, player) {
			await player.gain({
				cards: trigger.cards.filterInD(),
				animate: "gain2",
			});
		},
	},
});
