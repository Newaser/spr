import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

/**
 * 判断一张牌是否为“非【杀】基本牌” 
 * @param {Card} card 
 */
function isNonShaBasic(card) {
	return get.type(card) == "basic" && card.name != "sha";
}

export default new SkillData("spr_juxi|拒袭", {
	description:
		"<b>蜀势力技</b>，你可以将所有非【杀】基本牌" +
		"当无次数限制的普通【杀】使用（须先展示手牌）。",
	voices: [
		"国朝倾覆，吾宁当为降虏乎？！",
	],
	skill: {
		groupSkill: "shu",
		enable: "chooseToUse",
		prompt: "将所有非【杀】基本牌当无次数限制的普通【杀】使用",
		filter(event, player, name, target) {
			return player.group == "shu" &&
				player.countCards("h", isNonShaBasic) > 0;
		},
		selectCard: -1,
		filterCard(card, player) {
			return isNonShaBasic(card);
		},
		position: "h",
		viewAs: {
			name: "sha",
			//@ts-expect-error 'storage' can be here
			storage: { spr_juxi: true },
		},
		async precontent(event, trigger, player) {
			event.name = "spr_juxi";
			const name = player == game.me ? "你" : get.translation(player);
			await player.showHandcards(`${get.translation("spr_juxi")}展示${name}的手牌`);
			await game.delay(2);
		},
		mod: {
			cardUsable(card, player, num) {
				if (card.storage?.spr_juxi)
					return Infinity;
			},
		},
		ai: {
			order(item, player) {
				return get.order({ name: "tao" }) - 0.1;
			},
			result: {
				player(player, target, card) {
					const cards = player.getCards("h", isNonShaBasic);
					return player.getUseValue({ name: "sha", cards: cards });
				},
			},
			tag: {
				respondSha: 1,
			},
			skillTagFilter(player, tag, arg) {
				return player.group == "shu" &&
					player.countCards("h", isNonShaBasic) > 0;;
			},
		},
	},
});
