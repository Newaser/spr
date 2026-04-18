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

pkg.addCharacter("spr_zhugeliang|星诸葛亮", {
	character: new Character({
		sex: "male",
		group: "shu",
		hp: 3,
		skills: ["spr_qunbian", "spr_zhijue"],
	}),
	intro: `
字孔明，号卧龙，琅琊阳都人，蜀汉丞相。诸葛亮只身随鲁肃过江、游说东吴群臣。\
诸葛亮以其超人的胆识同东吴群儒展开舌战，并以其滔滔辩才使对手一个个皆成“口”下败将，\
并最终说服了孙权，使孙刘联盟共抗曹操的局面得以形成。
`.trim(),
	title: "过江说盟",
	dieVoice: "可恨，未能助君成业……",
	rank: "s",
	rarity: "legend",
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
