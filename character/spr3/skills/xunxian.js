import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_xunxian|逊贤", {
	description: "你可以跳过摸牌阶段，令一名其他角色执行一个摸牌阶段。",
	voices: [
		"督军之才，子明强于我甚多。",
		"此间重任，公卿可担之。",
	],
	skill: {
		trigger: {
			player: "phaseDrawBefore",
		},
		filter(event, player, name, indexedData) {
			return game.hasPlayer(i => i != player);
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseTarget({
				prompt: "逊贤：你可以跳过摸牌阶段，令一名其他角色执行一个摸牌阶段",
				filterTarget(card, player, target) {
					return target != player;
				},
				ai(target) {
					return get.attitude(player, target) &&
						!player.storage.spr_chaoxi;
				},
			}).forResult();
		},
		async content(event, trigger, player) {
			trigger.cancel();
			const to = event.targets[0];
			const next = to.phaseDraw();
			next.owner = ["spr_xunxian", player];
			await next;
		},
	},
});
