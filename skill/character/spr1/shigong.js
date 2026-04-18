import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_shigong|恃功", {
	description: `
<b>转换技</b>，阳：当你使用基本牌指定目标后，你可以摸一张牌。\
阴：当你成为普通锦囊牌的目标后，你可以令其使用者弃置一张牌。
`,
	voices: [
		"此战，难道不全凭我计策精妙？",
		"阿瞒帐下谋臣如云，哪个有我这般功绩？",
	],
	skill: {
	},
});
