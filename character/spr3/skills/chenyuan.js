import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_chenyuan|陈怨", {
	description: "当你受到伤害后，你可以拼点：没赢者摸三张牌。",
	voices: [
		"叹匏瓜之无匹，咏牵牛之独处。",
		"悔入帝王家，万怨皆成空。",
	],
	skill: {
		trigger: {
			player: "damageEnd",
		},
		filter(event, player, name, target) {
			return game.hasPlayer(i => player.canCompare(i));
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseTarget({
				prompt: get.prompt("spr_chenyuan"),
				prompt2: get.skillInfoTranslation("spr_chenyuan"),
				filterTarget(card, player, target) {
					return player.canCompare(target);
				},
				ai(target) {
					const minNum = Math.min(...player.getCards("h").map(i => i.number || 0));
					if (minNum > 4) {
						return get.attitude(player, target);
					}
					return Infinity - get.attitude(player, target);
				},
			}).forResult();
		},
		async content(event, trigger, player) {
			const to = event.targets[0];
			/** @type {Result} */
			const result = await player.chooseToCompare(to).set("small", true).forResult();
			/** @type {Player[]} */
			let drawers;
			if (result.bool) {
				drawers = [to];
			} else if (result.tie) {
				drawers = [player, to];
			} else {
				drawers = [player];
			}
			await game.asyncDraw(drawers.sortBySeat(_status.currentPhase), 3);
		},
		ai: {
			maixie: true,
		},
	},
});
