import { SkillData } from "../../../import/structs.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_nianen|念恩", {
	description: "<b>锁定技</b>，当你使用或打出基本牌时（使用【杀】除外），若你的手牌中仅有基本牌，你摸一张牌。",
	voices: [
		"单骑护嫂千里，只为桃园之义。",
		"心念桃园兄弟义，不背屯土忠君誓！",
	],
	skill: {
		audio: "ext:☆SPR/audio/skill:2",
		forced: true,
		trigger: {
			player: ["useCard", "respond"],
		},
		filter(event, player, name, target) {
			if (name == "useCard" && event.card.name == "sha") return false;
			return (
				get.type(event.card) == "basic" &&
				player.countCards("h") > 0 &&
				player.getCards("h").every(i => get.type(i) == "basic")
			);
		},
		async content(event, trigger, player) {
			await player.draw();
		},
	},
});
