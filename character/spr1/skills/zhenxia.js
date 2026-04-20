import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_zhenxia|贞瑕", {
	description:
		"<b>觉醒技</b>，当男性角色对你造成伤害后，你与其各回复1点体力，" +
		`然后你获得${get.poptip("spr_huoshui")}。`,
	voices: [
		"青衣沾赤，金莲染尘……",
		"生逢乱世，身何由己……",
	],
	skill: {
		derivation: "spr_huoshui",
	},
});
