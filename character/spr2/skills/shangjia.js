import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_shangjia|上甲", {
	description:
		"<b>锁定技</b>，当你使用与你装备区内的牌花色相同的伤害类卡牌时，" +
		"你摸一张牌或令此牌不可被响应。",
	voices: [
		"吾等十万军，岂会败你八百众！",
		"杀敌建功，卫我家国！",
	],
	skill: {
		forced: true,
		trigger: {
			player: "useCard",
		},
		filter(event, player, name, target) {
			return get.is.damageCard(event.card, true) &&
				player.countCards("e", i =>
					get.suit(i, player) == get.suit(event.card, player),
				) > 0;
		},
		async content(event, trigger, player) {
			const result = await player.chooseControl({
				prompt: "上甲：你须选择一项",
				controls: [
					"摸一张牌",
					`令${get.translation(trigger.card.name)}不可响应`,
				],
			}).forResult();
			if (result.control == "摸一张牌") {
				await player.draw();
			} else {
				//@ts-expect-error directHit必为Player[]
				trigger.directHit.addArray(game.players);
			}
		},
		mod: {
			aiOrder(player, card, num) {
				if (get.type(card) == "equip")
					return num + 10;
			},
		},
	},
});
