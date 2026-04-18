import { SkillData } from "../../../util/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

const DERIVED_SKILLS = ["spr_mashu", "spr_mengjin", "spr_yingzi"];

export default new SkillData("spr_jinzi|锦姿", {
	description: `
<b>锁定技</b>，回合开始时，你展示手牌并执行前X项（X为手牌花色数）：本回合获得\
${get.poptip("spr_mashu")}/${get.poptip("spr_mengjin")}/${get.poptip("spr_yingzi")}；\
本回合上述技能的效果翻倍。
`,
	voices: [
		"让你们看看，我西凉健儿的雄姿！",
	],
	skill: {
		audio: "ext:☆SPR/audio/skill:1",
		forced: true,
		trigger: {
			player: "phaseBegin",
		},
		filter(event, player, name, target) {
			return player.countCards("h") > 0;
		},
		async content(event, trigger, player) {
			const
				hs = player.getCards("h"),
				x = (new Set(hs.map(i => get.suit(i, player)))).size,
				prompt = `${get.translation(player)}展示了手牌的花色数：${get.cnNumber(x, true)}`;
			await player.showCards(hs, prompt);
			player.addTempSkill("spr_jinzi_shown");
			player.storage.spr_jinzi_shown = x;
			for (let i = 0; i < Math.min(x, 3); i++) {
				player.addTempSkill(DERIVED_SKILLS[i]);
			}
			await game.delay(3);
		},
		subSkill: {
			shown: {
				mark: true,
				intro: {
					content: "本回合展示的手牌花色数：#",
				},
				onremove: true,
			},
		},
	},
});
