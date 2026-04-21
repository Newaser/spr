import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_cuorui|挫锐", {
	description:
		"每回合限两次，当你对其他角色造成伤害后，你可以弃置你与其各一张牌：" +
		"若其被弃置的牌不为【杀】，你获得之；否则，你对其造成1点伤害。",
	voices: [
		"广散惧意，尽懈敌之斗志！",
		"哼哼，若尔等惧我，自当卷甲以降！",
	],
	skill: {
		trigger: {
			source: "damageSource",
		},
		usable: 2,
		logTarget: "player",
		filter(event, player, name, target) {
			return (
				event.player != player &&
				player.countCards("he") > 0 &&
				event.player.countCards("he") > 0
			);
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseToDiscard({
				prompt: get.prompt("spr_cuorui"),
				prompt2: get.prompt2("spr_cuorui"),
				position: "he",
				ai(card) {
					if (get.attitude(player, event.player) > 0)
						return -1;
					return 7 - get.useful(card);
				},
			}).forResult();
		},
		async content(event, trigger, player) {
			const result = await player.discardPlayerCard({
				target: trigger.player,
				forced: true,
				position: "he",
			}).forResult();
			/** @type {Card} */
			const card = result.links[0];
			if (card.name != "sha") {
				await player.gain({
					cards: [card],
					animate: "gain2",
				});
			} else {
				await trigger.player.damage();
			}
		},
	},
});
