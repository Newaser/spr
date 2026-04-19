import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_juyu|拒御", {
	description: "每回合限一次，当其他角色使用伤害类卡牌时，你可以弃置一张相同牌名的牌，令此牌无效。",
	voices: [
		"知汝必将攻此，吾已早设防备。",
		"有淮御蜀，必保魏境无虞。",
	],
	skill: {
		trigger: {
			global: "useCard",
		},
		usable: 1,
		filter(event, player, name, target) {
			return event.player != player &&
				get.is.damageCard(event.card, true) &&
				player.hasCard(event.card.name);
		},
		async cost(event, trigger, player) {
			const namestr = `【${get.translation(trigger.card.name)}】`,
				dest = get.translation(trigger.player);
			event.result = await player.chooseCard({
				prompt: get.prompt("spr_juyu"),
				prompt2: `弃置一张${namestr}，令${dest}的${namestr}无效`,
				filterCard(card, player, event) {
					return card.name == trigger.card.name &&
						lib.filter.cardDiscardable(card, player);
				},
				ai(card) {
					//@ts-expect-error 谋看破是存在的
					if (lib.skill.sbkanpo.subSkill.kanpo.check(trigger, player))
						return Infinity - get.value(card, player);
					return -1;
				},
			}).forResult();
		},
		async content(event, trigger, player) {
			player.discard({ cards: event.cards });
			trigger.targets.length = 0;
			trigger.all_excluded = true;
			game.log(trigger.player, "的", trigger.card, "被无效");
		},
	},
});
