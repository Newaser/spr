import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_xuzhong|恤众", {
	description:
		"<b>魏势力技</b>，当其他角色受到伤害后，" +
		"若其手牌数与体力值均小于你，你可以交给其一张牌。",
	voices: [
		"弃百姓之所养，君子不为也。",
	],
	skill: {
		groupSkill: "wei",
		trigger: {
			global: "damageEnd",
		},
		logTarget: "player",
		filter(event, player, name, target) {
			return (
				player.group == "wei" &&
				event.player.isIn() &&
				event.player != player &&
				event.player.hp < player.hp &&
				event.player.countCards("h") < player.countCards("h")
			);
		},
		check(event, player, triggername, target) {
			return get.attitude(player, event.player) > 0;
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseCard({
				prompt: get.prompt("spr_xuzhong"),
				prompt2: get.skillInfoTranslation("spr_xuzhong"),
				position: "he",
			}).forResult();
		},
		async content(event, trigger, player) {
			await player.give(event.cards, trigger.player);
		},
	},
});
