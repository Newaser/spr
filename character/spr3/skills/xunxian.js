import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_xunxian|逊贤", {
	description: "当你于回合内因弃置或于回合外非因弃置而失去牌后，你可以令一名其他角色获得这些牌。",
	voices: [
		"督军之才，子明强于我甚多。",
		"此间重任，公卿可担之。",
	],
	skill: {
		trigger: {
			global: [
				"loseAfter",
				"equipAfter",
				"addJudgeAfter",
				"gainAfter",
				"loseAsyncAfter",
				"addToExpansionAfter",
			],
		},
		filter(event, player, name, indexedData) {
			return (_status.currentPhase == player && event.type == "discard" ||
				_status.currentPhase != player && event.type != "discard") &&
				(event.getl?.(player)?.hs?.someInD("od") || event.getl?.(player)?.es?.someInD("od")) &&
				game.hasPlayer(i => i != player);
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseTarget({
				prompt: "逊贤：你可以令一名其他角色获得你失去的牌",
				filterTarget(card, player, target) {
					return target != player;
				},
				ai(target) {
					return get.attitude(player, target);
				},
			}).forResult();
		},
		async content(event, trigger, player) {
			const cards = trigger.getl?.(player)?.hs?.filterInD("od")
				.concat(trigger.getl?.(player)?.es?.filterInD("od"));
			await event.targets[0].gain({
				cards,
				animate: "gain2",
			});
		},
	},
});
