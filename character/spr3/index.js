import skills from "./skill-index.js";
import { CharacterSubackage } from "../../utils/import.js";
import { Character } from "../../../../noname/library/element/index.js";
import { lib } from "../../../../noname.js";

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
		rank: "ap",
		rarity: "epic",
		audioRedirect: {
			"longdan|longdan:sha|longdan:shan": [
				"云虽无名，亦不怯尔等半分！",
				"少年何惧千军阵，银枪龙胆鉴丹心！",
			],
		},
	})


	.addCharacter("spr_yuejin|星乐进", {
		basic: new Character({
			sex: "male",
			group: "wei",
			hp: 4,
			skills: ["spr_xiaoguo", "spr_xiandeng"],
		}),
		title: "奋强突固",
		dieVoice: "不能再为主公，杀敌了……",
		rank: "c",
		rarity: "junk",
	})


	.addCharacter("spr_simalang|星司马朗", {
		basic: new Character({
			sex: "male",
			group: "wei",
			hp: 3,
			skills: ["spr_junbing", "spr_quji"],
		}),
		title: "躬亲致治",
		dieVoice: "微功未效，有辱国恩……",
		rank: "bp",
		rarity: "rare",
	})


	.addCharacter("spr_chengpu|星程普", {
		basic: new Character({
			sex: "male",
			group: "wu",
			hp: 4,
			skills: ["weizhong", "spr_chunlao", "spr_lihuo"],
		}),
		title: "厉火燃战",
		dieVoice: "病疠缠身，终天命难违……",
		rank: "c",
		rarity: "junk",
		audioRedirect: {
			"weizhong": [
				"三朝旧将，威令犹在！",
				"军心未散，尚可一战！",
			],
			"benghuai": ["以暴讨贼，竟遭报应吗……"],
		},
		runtime2(data) {
			lib.skill["weizhong"].audio = 2;
			lib.skill["benghuai"].audio = 1;
		},
	})


	.addCharacter("spr_zhenfu|星甄宓", {
		basic: new Character({
			sex: "female",
			group: "wei",
			hp: 3,
			skills: ["spr_hanying", "spr_chenyuan", "spr_luoshang"],
		}),
		intro:
			"文昭甄皇后（183年1月26日—221年8月4日），名不明史称甄夫人，" +
			"中山无极（今河北省无极县）人，上蔡令甄逸之女。魏文帝曹丕的妻子，" +
			"魏明帝曹叡的生母。<br>延康元年（220年），曹丕继位魏王，六月率军" +
			"南征，甄氏被留在邺城。同年十月，曹丕称帝，山阳公刘协进献二女为曹丕妃嫔，" +
			"后宫中文德郭皇后、李贵人和阴贵人都得到宠幸。甄氏愈发失意，流露出一些" +
			"怨恨的话语，曹丕大怒，黄初二年（221年）六月，遣使赐死甄氏，葬于邺城。",
		title: "薄幸幽兰",
		dieVoice: "揽騑辔以抗策，怅盘桓而不能去……",
		victoryVoice: "驾云车而出游，揽河洛之胜景。",
		rank: "s",
		rarity: "legend",
	})


	.addCharacter("spr_jiaxu|星贾诩", {
		basic: new Character({
			sex: "male",
			group: "qun",
			hp: 3,
			skills: ["spr_shencun", "spr_miaosuan", "spr_shanhuo", "spr_yaoji"],
		}),
		title: "神谟庙算",
		dieVoice: "此非智计有失，实乃天意使然……",
		victoryVoice: "算无遗策，方可搅动风云，独善其身！",
		rank: "s",
		rarity: "epic",
	});
