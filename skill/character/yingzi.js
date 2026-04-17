import { SkillData } from "../../import/structs.js";
import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

export default new SkillData("spr_yingzi|英姿", {
	description: "摸牌阶段，你可以多摸一张牌。",
	voices: [
		"鸾铃到处，敌皆破胆！",
	],
	skill: {
		audio: "ext:☆SPR/audio/skill:1",
		trigger: {
			player: "phaseDrawBegin2",
		},
		filter(event, player, name, target) {
			const a = 3;
			return !event.numFixed;
		},
		async content(event, trigger, player) {
			let v = 1;
			if (player.storage.spr_jinzi_shown && player.storage.spr_jinzi_shown >= 3) {
				v *= 2;
			}
			trigger.num += v;
		},
		prompt2(event, player) {
			const info = get.skillInfoTranslation("spr_yingzi");
			return (
				player.storage.spr_jinzi_shown &&
				player.storage.spr_jinzi_shown >= 3
			) ? info.replace("一", "<span class=\"bluetext\">两</span>") :
				info;
		},
	},
});
