import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_xiaoguo|骁果", {
	description:
		"当你使用牌指定其他角色为目标后，你可以弃置一张基本牌并令其选择一项：" +
		"弃置一张装备牌；受到你造成的1点伤害。",
	voices: [
		"当敌制决，靡有遗失！",
		"奋强突固，无坚不可陷！",
	],
	skill: {
		trigger: {
			player: "useCardToPlayered",
		},
		logTarget: "target",
		filter(event, player, name, target) {
			return event.target != player &&
				player.countCards("he") > 0;
		},
		async cost(event, trigger, player) {
			const to = trigger.target;
			/** @type {Result} */
			const result = await player.chooseToDiscard({
				chooseonly: true,
				prompt: get.prompt("spr_xiaoguo", to),
				prompt2: "弃置一张基本牌，其须弃置装备牌或受到伤害",
				position: "h",
				filterCard(card, player, event) {
					return get.type(card) == "basic";
				},
				ai(card) {
					if (get.attitude(player, to) >= 0)
						return -1;
					return 8 - get.value(card, player);
				},
			}).forResult();
			if (result.bool) {
				event.result = {
					bool: true,
					cards: result.cards,
				};
			}
		},
		async content(event, trigger, player) {
			await player.discard({ cards: event.cards });
			const to = trigger.target;
			/** @type {Result} */
			const result = await to.chooseToDiscard({
				prompt: "骁果：你须弃置一张装备牌，否则受到伤害",
				position: "he",
				filterCard(card, player, event) {
					return get.type(card) == "equip";
				},
				ai(card) {
					return Infinity - get.value(card, to);
				},
			}).forResult();
			if (!result.bool) {
				to.damage();
			}
		},
		ai: {
			threaten(player, target) {
				return 1 + target.countCards("h") * 0.1;
			},
		},
	},
});
