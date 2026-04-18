import { SkillData } from "../../../import/structs.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";


/**
 * @param {Player} player
 * @param {Card[]} cards
 * @param {string} color
 */
function getColoredShaEff(player, cards, color) {
	const useEffSum = cards.reduce((acc, cur) => {
		const info = get.info(cur);
		const eff =
			(info && !info.notarget) ?
				player.getUseValue(cur)
				:
				get.useful(cur, player);
		return acc + eff;
	}, 0);
	const shaEff = player.getUseValue({
		name: "sha",
		storage: {
			spr_shichou: true,
			spr_shichou_cardlen: cards.length,
		},
		color: color,
	});
	return shaEff - useEffSum;
}
/**
 * @param {Player} player
 * @param {Card[]} cards
 * @param {string} color
 */
function getNextColoredEffs(player, cards, color) {
	const nextEffs = [];
	for (let i = 0; i < cards.length; i++) {
		const thisEff = player.getUseValue(cards[i]);
		if (thisEff <= 0) continue;
		const nextCards = cards.slice(0, i).concat(cards.slice(i + 1));
		const nextEff =
			nextCards.length ?
				getColoredShaEff(player, nextCards, color) : 0;
		nextEffs.push(thisEff + nextEff);
	}
	return nextEffs;
}
/**
 * @param {Player} player
 */
function getOpt(player) {
	const colorShaEffs = {};
	for (const color of ["red", "black"]) {
		const cards = player.getCards("h", { color: color });
		if (cards.length)
			colorShaEffs[color] = getColoredShaEff(player, cards, color);
	}
	const opt = Object.entries(colorShaEffs).reduce((max, cur) => {
		return cur[1] > max[1] ? cur : max;
	});
	return opt;
}
/**
 * @param {Player} player
 */
function getNextOptEff(player) {
	const nextEffs = [];
	for (const color of ["red", "black"]) {
		const cards = player.getCards("h", { color: color });
		if (cards.length)
			nextEffs.push(...getNextColoredEffs(player, cards, color));
	}
	return Math.max(...nextEffs);
}

export default new SkillData("spr_shichou|誓仇", {
	description:
		"你可以将一种颜色的所有手牌当无次数限制的普通【杀】使用（须先展示手牌）。此【杀】可指定的目标数改为转化牌数。",
	voices: [
		"父仇在胸，国恨在目，西凉马超，誓杀曹贼！",
		"不枭曹贼之首祀于父前，吾枉为人子！",
	],
	skill: {
		audio: "ext:☆SPR/audio/skill:2",
		enable: "chooseToUse",
		filter(event, player, name, target) {
			return (
				event.filterCard(
					{
						name: "sha",
						storage: {
							spr_shichou: true,
						},
					},
					player,
					event,
				) && player.countCards("h") > 0
			);
		},
		hiddenCard(player, name) {
			return name == "sha";
		},
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog(
					`###${get.prompt("spr_shichou")
					}###将一种颜色的所有手牌当【杀】使用`,
				);
			},
			chooseControl(event, player) {
				const hand = player.getCards("h");
				const colors = new Set();
				for (const card of hand) colors.add(get.color(card));
				const options = Array.from(colors);
				options.push("cancel2");
				return options;
			},
			check(button) {
				const [color, eff] = getOpt(get.player());
				return color;
			},
			backup(links, player) {
				/** @type {Skill} */
				const viewAsSkill = {
					audio: "spr_shichou",
					filterCard(card, player) {
						// @ts-expect-error links被用作result导致类型解析错误
						return get.color(card) == links.control;
					},
					selectCard: -1,
					position: "h",
					viewAs(cards, player) {
						return {
							name: "sha",
							storage: {
								spr_shichou: true,
								cardsLength: cards.length,
							},
						};
					},
					async precontent(event, trigger, player) {
						event.name = "spr_shichou";
						const name = player == game.me ? "你" : get.translation(player);
						await player.showHandcards(`${get.translation("spr_shichou")}展示${name}的手牌`);
						await game.delay(2);
					},
				};
				return viewAsSkill;
			},
			prompt: () => "请选择【杀】的目标",
		},
		mod: {
			cardUsable(card, player, num) {
				if (card.storage && card.storage.spr_shichou) return Infinity;
			},
			selectTarget(card, player, range) {
				if (card.storage && card.storage.spr_shichou && range[1] != -1)
					range[1] += card.storage.cardsLength - 1;
			},
		},
		ai: {
			order: Infinity,
			threaten: 1.3,
			result: {
				player(player, target, card) {
					const [color, eff] = getOpt(player);
					const nextOptEff = getNextOptEff(player);
					return (eff > 0 && eff >= nextOptEff) ? 1 : -1;
				},
			},
			tag: {
				respondSha: 1,
			},
			skillTagFilter(player) {
				return player.countCards("h") > 0;
			},
		},
	},
});
