import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_chongzhen|冲阵", {
	description:
		`当你发动${get.poptip("longdan")}时，你可以获得对方一张牌。` +
		`<i>${get.poptip("spr_chiyue")}：弃置此牌，对其造成1点伤害。</i>`,
	voices: [
		"单骑冲阵，力挽狂澜！",
		"久闻袁氏威名，某今便一试！",
	],
	texts: {
		"(poptip)spr_chiyue|驰越":
			"当你对一名角色发动一个效果后，若你与其距离1以内，" +
			"且其与你距离1以外，你可以发动“驰越”对应的效果。",
	},
	skill: {

	},
});
