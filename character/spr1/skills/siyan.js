import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_siyan|肆言", {
	description: "当你受到伤害后，你可以将一张牌当【无中生有】使用。若如此做，你横置或翻面。",
	voices: [
		"若不是我许子远，阿瞒焉能进这邺城？",
		"阿瞒若是无我，定是寸步也难行！",
	],
	skill: {
		trigger: {
			player: "damageEnd",
		},
		filter(event, player, name, target) {
			return player.countCards("hes") > 0 &&
				player.getCards("hes").some(c => player.canUse({
					name: "wuzhong",
					cards: [c],
				}, player));
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseCard({
				prompt: get.prompt("spr_siyan"),
				prompt2: get.skillInfoTranslation("spr_siyan"),
				position: "hes",
				filterCard(card, player, event) {
					return player.canUse({
						name: "wuzhong",
						cards: [card],
					}, player);
				},
				ai(card) {
					if (player.isLinked() && !player.isTurnedOver())
						return -1;
					return Infinity - get.value(card);
				},
			}).forResult();
		},
		async content(event, trigger, player) {
			await player.useCard({
				// @ts-expect-error card可以这样取值
				card: { name: "wuzhong", isCard: true },
				cards: event.cards,
				targets: [player],
			});

			if (!player.isLinked()) {
				const result = await player.chooseControl({
					prompt: "【肆言】效果发动",
					prompt2: "请选择一项并执行",
					controls: ["横置", "翻面"],
					ai(event, player) {
						if (player.isTurnedOver())
							return "翻面";
						return "横置";
					},
				}).forResult();
				if (result.control == "横置") {
					player.link(true);
				} else if (result.control == "翻面") {
					player.turnOver();
				}
			} else {
				player.turnOver();
			}
		},
		ai: {
			maixie: true,
			skillTagFilter(player, tag, arg) {
				if (tag == "maixie" && player.isLinked() && !player.isTurnedOver())
					return false;
			},
			effect: {
				target(card, player, target, result2) {
					if (player.skills.includes("jueqing") || !target.hasFriend())
						return;
					if (get.is.damageCard(card) && target.isTurnedOver())
						return [1, 1.5];
				},
			},
		},
	},
});
