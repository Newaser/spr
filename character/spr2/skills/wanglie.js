import * as util from "../../../utils/util.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_wanglie|往烈", {
	description:
		"出牌阶段限一次，你可以展示任意张相同牌名的手牌并令一名角色获得之，" +
		"然后其可以使用一张牌（无距离限制且不可被响应）。",
	voices: [
		"猛将之烈，统帅之所往。",
		"与子龙忠勇相往，猛烈相合。",
		"击敌百里，一往无前！",
		"此城非朝夕可取，诚如是也。",
	],
	skill: {
		logAudio: util.logSkillAudio("spr_wanglie", [1, 2]),
		enable: "phaseUse",
		usable: 1,
		filter(event, player, name, target) {
			return player.countCards("h") > 0;
		},

		selectCard: [1, Infinity],
		filterCard(card) {
			if (!ui.selected.cards.length) return true;
			return card.name == ui.selected.cards[0].name;
		},
		complexCard: true,
		check(/** @type {Card} */card) {
			return ui.selected.cards.length > 1 ? 0 : 10 - get.value(card);
		},

		filterTarget: true,

		discard: false,
		lose: false,
		delay: false,

		async content(event, trigger, player) {
			const to = event.target, cards = event.cards;
			await player.showCards(cards);
			if (player != to) {
				await to.gain({
					cards: cards,
					source: player,
					animate: "gain2",
					delay: true,
				});
			}
			const evt = to.chooseToUse({
				prompt: "往烈：你可以使用一张牌（无距离限制且不可被响应）",
				filterCard(card, player, event) {
					if (get.itemtype(card) != "card" ||
						!["h", "s"].includes(get.position(card))) {
						return false;
					}
					return lib.filter.filterCard(card, player, event);
				},
				filterTarget(card, player, target) {
					return lib.filter.targetEnabled(card, player, target) || false;
				},
				ai1(card) {
					let eff = to.getUseValue(card);
					if (get.is.damageCard(card)) {
						eff += 10;
					}
					return eff;
				},
			});
			/** @type {import("../../../utils/type.ts").OnCardFunc} */
			evt.oncard = (card, _) => {
				//@ts-expect-error directHit必为Player[]
				_status.event.directHit.addArray(game.players);
				util.playSkillAudio("spr_wanglie", 3, false, player);
				player.line(to, "fire");
			};
			/** @type {Result} */
			const result = await evt.forResult();
			if (!result.bool) {
				util.playSkillAudio("spr_wanglie", 4, false, player);
				to.popup("取消用牌", "fire");
			}
		},

		ai: {
			order(item, player) {
				return get.order({ name: "sha" }) + 0.1;
			},
			expose: 0.4,
			result: {
				target(player, target, card) {
					return player == target ? 1 : 2;
				},
			},
		},
	},
});
