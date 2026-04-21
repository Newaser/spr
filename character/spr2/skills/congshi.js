import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_congshi|从势", {
	description:
		"每回合限一次，当你受到伤害后，你可以令伤害来源获得造成此伤害的牌，然后你回复1点体力。",
	voices: [
		"阁下奉天子以令诸侯，珪自当相从。",
		"将军率六师以伐不臣，珪何敢相抗？",
	],
	skill: {
		trigger: {
			player: "damageEnd",
		},
		usable: 1,
		logTarget: "source",
		filter(event, player, name, target) {
			return get.itemtype(event.cards) == "cards" &&
				event.cards.filterInD().length > 0 &&
				event.source?.isIn();
		},
		async content(event, trigger, player) {
			await trigger.source.gain({
				cards: trigger.cards,
				animate: "gain2",
			});
			await player.recover();
		},
		prompt2(event, player) {
			return `令${get.translation(event.source)}获得` +
				`${get.translation(event.card)}，然后你回复1点体力`;
		},
		ai: {
			maixie_defend: true,
			threaten: 0.95,
		},
	},
});
