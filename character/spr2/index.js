import skills from "./skill-index.js";
import { CharacterSubackage } from "../../utils/import.js";
import { Character } from "../../../../noname/library/element/index.js";

export default new CharacterSubackage("spr2|☆SPR·其二")
	.addSkills(skills)
	.addCharacter("spr_zhangliao|星张辽", {
		basic: new Character({
			sex: "male",
			group: "qun",
			hp: 4,
			skills: ["spr_cuorui", "spr_tafeng"],
		}),
		title: "踏锋饮血",
		dieVoice: "一生驰骋，早料到会如此……",
		rank: "b",
		rarity: "common",
	});
