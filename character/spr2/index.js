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
		rank: "am",
		rarity: "rare",
	})


	.addCharacter("spr_luoxian|星罗宪", {
		basic: new Character({
			sex: "male",
			group: "shu",
			doubleGroup: ["shu", "wei"],
			hp: 4,
			skills: ["spr_yongan", "spr_juxi", "spr_xuzhong"],
		}),
		title: "介然毕命",
		dieVoice: "国朝用命之时，奈何无计可施……",
		rank: "bp",
		rarity: "rare",
	})


	.addCharacter("spr_chendao|星陈到", {
		basic: new Character({
			sex: "male",
			group: "shu",
			hp: 4,
			skills: ["spr_wanglie", "spr_baier"],
		}),
		title: "白毦督",
		dieVoice: "征南厚重，忠心后土……",
		victoryVoice: "victory_voice",
		rank: "c",
		rarity: "junk",
	})


	.addCharacter("spr_chengui|星陈珪", {
		basic: new Character({
			sex: "male",
			group: "qun",
			hp: 3,
			skills: ["spr_guimou", "spr_congshi"],
		}),
		title: "弄辞成掇",
		dieVoice: "终日戏虎，竟为虎所噬……",
		rank: "bp",
		rarity: "rare",
	});

