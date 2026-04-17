import { SkillData } from "../../import/structs.js";
import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

export default new SkillData("spr_mashu|马术", {
	description: "<b>锁定技</b>，你与其他角色的距离-1。",
	skill: {
		locked: true,
		mod: {
			globalFrom(from, to, distance) {
				let v = 1;
				if (from.storage.spr_jinzi_shown &&
					from.storage.spr_jinzi_shown > 3) {
					v *= 2;
				}
				return distance - v;
			},
		},
	},
});
