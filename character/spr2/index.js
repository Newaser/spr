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
		victoryVoice: "以锐不可当之勇，得胜归营！",
		rank: "am",
		rarity: "epic",
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
		rank: "b",
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
		rank: "a",
		rarity: "epic",
	})


	.addCharacter("spr_chendong|星陈武董袭", {
		basic: new Character({
			sex: "male",
			group: "wu",
			hp: 4,
			skills: ["spr_shangjia", "spr_duanxie", "spr_fenming"],
		}),
		title: "殒身不恤",
		dieVoice: "杀身为主，死而无憾……",
		rank: "d",
		rarity: "common",
	})


	.addCharacter("spr_caochun|星曹纯", {
		basic: new Character({
			sex: "male",
			group: "wei",
			hp: 4,
			skills: ["spr_shanjia"],
		}),
		title: "锐兵坚甲",
		dieVoice: "纯……终不负众望……",
		victoryVoice: "小瞧虎豹骑，可是要付出代价的！",
		rank: "bp",
		rarity: "rare",
	})


	.addCharacter("spr_wangwang|星王桃王悦", {
		basic: new Character({
			sex: "female",
			group: "shu",
			hp: 3,
			skills: ["spr_shuangbi", "spr_tongzheng"],
		}),
		intro:
			"王桃是在《花关索传》中登场的虚拟人物，盗贼王令公的" +
			"两个女儿之一，王悦的姐姐，与妹妹都是关索之妻。姐妹俩" +
			"原为卢塘寨山贼，以武艺与美貌而闻名，被众多男性求婚" +
			"却皆不与理睬。她们在关索回西川认父途中与关索交手时不敌，" +
			"因意气投合而一齐下嫁。虽为架空之人物，但四川省内有记述" +
			"夫妻三人共同守护葭萌关一事，民间亦流传如夫妻三人曾共同" +
			"参与诸葛亮之南蛮征伐等轶事。",
		title: "春悦桃秾",
		dieVoice: "妹妹，何时能再赏此景……姐姐，此景桃花似汝颜……",
		rank: "d",
		rarity: "common",
	})


	.addCharacter("spr_sunchen|星孙綝", {
		basic: new Character({
			sex: "male",
			group: "wu",
			// groupBorder: "jin",
			hp: 4,
			skills: ["spr_xiongju", "spr_shanfei"],
		}),
		title: "食髓的朝堂客",
		dieVoice: "愿陛下念臣昔日之功……陛下？陛下！",
		rank: "a",
		rarity: "epic",
	});
