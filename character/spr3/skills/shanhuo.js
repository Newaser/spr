import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_shanhuo|煽祸", {
	description: "<b>锁定技</b>，其他角色的出牌阶段开始时，其须将一张牌当【酒】或【过河拆桥】使用。",
	voices: [
		"乱世之中，弱者当死，强者方生！",
		"取乱之道，使彼相争，则可坐收渔利。",
	],
	skill: {
		forced: true,
		trigger: { global: "phaseUseBegin" },
		filter(event, player, name, target) {
			return event.player != player &&
				event.player.countCards("hes", i => {
					return player.hasUseTarget({ name: "jiu", cards: [i] }) ||
						player.hasUseTarget({ name: "guohe", cards: [i] });
				}) > 0;
		},
		logTarget: "player",
		async content(event, trigger, player) {
			const to = trigger.player;
			const controls = [];
			const hasUseTarget = (/** @type {string} */ cardname) => {
				return to.countCards("hes", i => {
					return to.hasUseTarget({ name: cardname, cards: [i] });
				}) > 0;
			};
			if (hasUseTarget("jiu")) controls.push("当酒");
			if (hasUseTarget("guohe")) controls.push("当过河");
			/** @type {Result} */
			const result = await to.chooseControl({
				prompt: "【煽祸】效果发动",
				prompt2: "你须将一张牌当【酒】或【过河拆桥】使用",
				controls,
				ai(event, player) {
					return controls.randomGet();
				},
			}).forResult();
			if (result.control == "当酒") {
				/** @type {Result} */
				const result1 = await to.chooseCard({
					forced: true,
					prompt: "煽祸：你须将一张牌当【酒】使用",
					filterCard(card, player, event) {
						return to.canUse({ name: "jiu", cards: [card] }, to);
					},
				}).forResult();
				to.useCard({
					//@ts-expect-error 可以这样
					card: { name: "jiu" },
					cards: result1.cards,
					targets: [to],
				});
			} else {
				/** @type {Result} */
				const result2 = await to.chooseCardTarget({
					forced: true,
					prompt: "煽祸：你须将一张牌当【过河拆桥】使用",
					filterCard(card, player, event) {
						return to.hasUseTarget({ name: "guohe", cards: [card] });
					},
					filterTarget(card, player, target) {
						return to.canUse({ name: "guohe", cards: [card] }, target);
					},
					ai2(target) {
						return get.effect(target, { name: "guohe" }, to, to);
					},
				}).forResult();
				to.useCard({
					//@ts-expect-error 可以这样
					card: { name: "guohe" },
					cards: result2.cards,
					targets: result2.targets,
				});
			}
		},
	},
});
