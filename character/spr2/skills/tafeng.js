import * as util from "../../../utils/util.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_tafeng|踏锋", {
	description:
		"准备阶段，你可以失去1点体力并摸一张牌，然后将一张牌当" +
		`${get.poptip("chuqibuyi")}使用。`,
	voices: [
		"横戈跃马，敌军自惧！",
		"一与一，勇者得前耳！",
	],
	skill: {
		trigger: {
			player: "phaseZhunbei",
		},
		filter(event, player, name, target) {
			return player.hp > 0;
		},
		check(event, player) {
			return player.hp > 1 &&
				player.getUseValue("chuqibuyi") > 0;
		},
		async content(event, trigger, player) {
			await player.loseHp();
			await player.draw();

			if (player.countCards("hes", card => {
				const cqby = get.autoViewAs({ name: "chuqibuyi" }, [card]);
				return player.hasUseTarget(cqby);
			}) == 0) return;

			await util.chooseToViewAs(player, {
				viewAs: { name: "chuqibuyi" },

				forced: true,
				prompt: "将一张牌当【出其不意】使用",

				filterCard: true,
				position: "hes",

				filterTarget(card, player, target) {
					return player.canUse("chuqibuyi", target);
				},

				ai1(card) {
					return -get.value(card);
				},
				ai2(target) {
					const cqby = { name: "chuqibuyi", isCard: true };
					return get.effect(target, cqby, player, player);
				},
			});
		},
	},
});
