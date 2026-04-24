import skills from "./skill-index.js";
import { CharacterSubackage } from "../../utils/import.js";
import { Character } from "../../../../noname/library/element/index.js";

export default new CharacterSubackage("spr3|☆SPR·其三")
	.addSkills(skills)
	.addCharacter("spr_zhaoyun|星赵云", {
		basic: new Character({
			sex: "male",
			group: "qun",
			hp: 3,
			skills: ["longdan", "spr_yicong", "spr_chongzhen"],
		}),
		intro:
			"呀啊啊啊啊😱公孙将军😡呀哈哈哈😂可有遗言😏弓箭手😏放😤" +
			"休伤吾主😡一人😠一枪😡一匹马😤胜尔百万军！👍你是😱" +
			"匹夫😠可识我常山赵子龙😤",
		title: "威名尽显",
		dieVoice: "河北名将，果真名不虚传……",
		victoryVoice: "今日磐河救主，定叫天下知我锋芒！",
		rank: "a",
		rarity: "epic",
		audioRedirect: {
			"longdan|longdan:sha|longdan:shan": [
				"云虽无名，亦不怯尔等半分！",
				"少年何惧千军阵，银枪龙胆鉴丹心！",
			],
		},
	});

