import { SkillData } from "../../../import/structs.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_yingzi|英姿", {
	description: "摸牌阶段，你可以多摸一张牌。",
	dynamicDescription(player, desc) {
		if (player.storage.spr_jinzi_shown &&
			player.storage.spr_jinzi_shown > 3) {
			return desc.replace("一", "两");
		}
	},
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
			if (player.storage.spr_jinzi_shown &&
				player.storage.spr_jinzi_shown > 3) {
				v *= 2;
			}
			trigger.num += v;
		},
	},
});
