import { CharacterPackageMaker } from "../../import/importers.js";
import { Character } from "../../../../noname/library/element/index.js";

const pkg = new CharacterPackageMaker("spr1|☆SPR·其一");

pkg.addCharacter("spr_machao|星马超", {
	character: new Character({
		sex: "male",
		group: "qun",
		hp: 4,
		skills: ["spr_jinzi", "spr_shichou"],
	}),
	title: "杵杆摧敌",
	dieVoice: "血仇无报，坎坷一生，唉……",
	rank: "ap",
	rarity: "epic",
});

pkg.addCharacter("spr_shenpei|星审配", {
	character: new Character({
		sex: "male",
		group: "qun",
		hp: 2,
		maxHp: 3,
		skills: ["spr_liezhi", "spr_shouye"],
	}),
	title: "正南义北",
	dieVoice: "吾君在北，但求面北而亡。",
	rank: "a",
	rarity: "rare",
});

export default pkg;
