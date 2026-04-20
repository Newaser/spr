import skills from "./skill-index.js";
import { CharacterSubackage } from "../../utils/import.js";
import { Character } from "../../../../noname/library/element/index.js";

export default new CharacterSubackage("spr1|☆SPR·其一")
	.addSkills(skills)
	.addCharacter("spr_machao|星马超", {
		basic: new Character({
			sex: "male",
			group: "qun",
			hp: 4,
			skills: ["spr_jinzi", "spr_shichou"],
		}),
		title: "杵杆摧敌",
		dieVoice: "血仇无报，坎坷一生，唉……",
		rank: "ap",
		rarity: "epic",
	})


	.addCharacter("spr_zhugeliang|星诸葛亮", {
		basic: new Character({
			sex: "male",
			group: "shu",
			hp: 3,
			skills: ["spr_miaobian", "spr_zhijue"],
			groupBorder: "wu",
		}),
		intro:
			"字孔明，号卧龙，琅琊阳都人，蜀汉丞相。诸葛亮只身随鲁肃过江、游说东吴群臣。诸葛亮" +
			"以其超人的胆识同东吴群儒展开舌战，并以其滔滔辩才使对手一个个皆成“口”下败将，并最" +
			"终说服了孙权，使孙刘联盟共抗曹操的局面得以形成。",
		title: "过江说盟",
		dieVoice: "可恨，未能助君成业……",
		rank: "s",
		rarity: "legend",
	})


	.addCharacter("spr_guanyu|星关羽", {
		basic: new Character({
			sex: "male",
			group: "wei",
			hp: 4,
			skills: ["wusheng", "spr_nuzhan", "spr_nianen"],
		}),
		intro:
			"字云长，河东郡解县人。跟从刘备起兵，镇压黄巾起义。刘备夺取徐州后，行下邳太守。" +
			"建安五年，曹操东征刘备，关羽兵败被俘，暂时投靠曹操。参加官渡之战，诛杀颜良，" +
			"解白马之围，受封汉寿亭侯。得知刘备下落后，前往投奔。",
		title: "单骑千里",
		dieVoice: "大哥，三弟，云长去矣……",
		rank: "a",
		rarity: "rare",
		audioRedirect: {
			"wusheng": [
				"可知关某之威！",
				"关某既出，敌将定皆披靡！",
			],
		},
	})


	.addCharacter("spr_xuyou|星许攸", {
		basic: new Character({
			sex: "male",
			group: "wei",
			hp: 3,
			skills: ["spr_qingman", "spr_shigong", "spr_siyan"],
		}),
		intro:
			"字子远，南阳人。本为袁绍帐下谋士，官渡之战时投曹。曹操取得冀州后，许攸立有功劳，" +
			"于是自恃功高，屡次轻慢曹操，每次出席，不分场合，直呼曹操小名。曹操表面上嘻笑，" +
			"但心里颇有芥蒂。一次，许攸从行出邺城东门时口出狂言，有人向曹操告发，于是许攸被收捕。" +
			"最终，许攸因“恃旧不虔”而被曹操诛杀。",
		title: "居功自傲",
		dieVoice: "大胆许褚，便是你家主公也……啊！！",
		rank: "ap",
		rarity: "epic",
	})


	.addCharacter("spr_shenpei|星审配", {
		basic: new Character({
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
	})


	.addCharacter("spr_caozhang|星曹彰", {
		basic: new Character({
			sex: "male",
			group: "wei",
			hp: 4,
			skills: ["spr_jiangchi"],
		}),
		title: "神勇壮猛",
		dieVoice: "黄须金甲，也难敌骨肉毒心……",
		rank: "bp",
		rarity: "rare",
	})


	.addCharacter("spr_guohuai|星郭淮", {
		basic: new Character({
			sex: "male",
			group: "wei",
			hp: 4,
			skills: ["spr_jingce"],
		}),
		title: "垂问秦淮",
		dieVoice: "五子哀母，不惜其身，淮又安能坐视……",
		rank: "a",
		rarity: "epic",
	})


	.addCharacter("spr_zoushi|星邹氏", {
		basic: new Character({
			sex: "female",
			group: "qun",
			hp: 3,
			skills: ["spr_xunxin", "spr_zhenxia"],
		}),
		title: "醉琴卧花",
		dieVoice: "世间的成败得失，都要怪红颜祸水吗……",
		rank: "c",
		rarity: "junk",
	});

