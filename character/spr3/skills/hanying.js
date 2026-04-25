import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

const icesha = { name: "sha", nature: "ice" };

export default new SkillData("spr_hanying|寒影", {
	description:
		"准备阶段或结束阶段，你须令一名角色选择一项：" +
		`获得一张${get.poptip("detailed_ying")}；` +
		`将一张【影】当${get.poptip("detailed_icesha")}使用。`,
	voices: [
		"自古佳人多命薄，闭门春尽杨花落。",
		"风袅袅兮目渺渺，余怅视兮莫言。",
	],
	texts: {
		"(poptip)detailed_ying|【影】":
			"均为黑桃A的基本牌，不能使用或打出，没有任何效果。" +
			"游戏外无限量供应；当【影】进入弃牌堆后改为移出游戏；" +
			"一名角色获得【影】默认从游戏外获得。",
		"(poptip)detailed_icesha|冰【杀】":
			"出牌阶段限一次，对你攻击范围内的一名其他角色使用。" +
			"你对其造成1点冰冻伤害（当一名角色造成不为连环伤害的" +
			"冰冻伤害时，若受伤角色有牌，伤害来源可以防止此伤害，" +
			"然后依次弃置其两张牌）。",
	},
	skill: {
		trigger: {
			player: ["phaseZhunbei", "phaseJieshu"],
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseTarget({
				forced: true,
				prompt: "寒影：你须令一名角色选择一项",
				prompt2: "获得一张【影】；将一张【影】当冰【杀】使用",
				ai(target) {
					return get.attitude(player, target);
				},
			}).forResult();
		},
		async content(event, trigger, player) {
			const to = event.targets[0];
			/**
			 * @todo 更好的触发转化牌方式
			 * @type {Result}
			 */
			const result = await to.chooseCardTarget({
				prompt: "【寒影】效果发动",
				prompt2: "你须将一张【影】当冰【杀】使用，否则获得一张【影】",

				filterCard(card, player, event) {
					return card.name == "ying";
				},
				position: "hes",

				filterTarget(card, player, target) {
					return player.canUse(icesha, target);
				},

				ai1(card) {
					return 1;
				},
				ai2(target) {
					return get.effect(target, icesha, player, player);
				},
			}).forResult();
			if (result.bool) {
				await player.useCard({
					//@ts-expect-error card can be like this
					card: icesha,
					cards: result.cards,
					targets: result.targets,
				});
			} else {
				await to.gain(lib.card.ying.getYing(1), "gain2");
			}
		},
	},
});
