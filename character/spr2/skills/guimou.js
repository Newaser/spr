import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

/**
 * 
 * @param {Player} from 
 * @param {Player} to 
 * @returns {boolean}
 */
function redirectIsBetter(from, to) {
	const
		res = get.damageEffect(to, from, from),
		otherThanTo = game.filterPlayer(i => i != to);
	if (get.attitude(from, to) > 0) {
		return otherThanTo.some(i => {
			const newRes = get.damageEffect(i, from, from) + 2;
			return newRes > res;
		});
	}
	return otherThanTo.every(i => {
		const newRes = get.damageEffect(i, from, from) + 2;
		return newRes >= res;
	});
}

/**
 * 
 * @param {Player} redirector 
 * @param {GameEvent} trigger 
 * @param {Player} source 
 */
async function redirectDamage(redirector, trigger, source) {
	const victim = trigger.player;
	const result = await redirector.chooseTarget({
		forced: true,
		prompt: "诡谋：你须转移此伤害",
		filterTarget(card, player, target) {
			return target != trigger.player;
		},
		ai(target) {
			const deltaDamageEff =
				get.damageEffect(target, source, redirector) -
				get.damageEffect(victim, source, redirector);
			return deltaDamageEff;
		},
	}).forResult();
	const newVictim = result.targets[0];
	game.log(redirector, "将", victim, "即将受到的伤害转移给了", newVictim);
	trigger.player = newVictim;
}

export default new SkillData("spr_guimou|诡谋", {
	description:
		"每回合限一次，当一名角色受到你造成的伤害时，你可以选择一项：" +
		`转移此伤害；摸两张牌。<i>${get.poptip("rule_beishui")}：` +
		"本回合你不能对其他角色使用牌。</i>然后该角色执行未被选择的项。",
	voices: [
		"不过略施小计，聊戏莽夫耳。",
		"栖虎狼之侧，安能不图存身？",
	],
	skill: {
		trigger: {
			source: "damageBegin4",
		},
		usable: 1,
		filter(event, player, name, target) {
			return game.hasPlayer(i => i != event.player);
		},
		async cost(event, trigger, player) {
			/** @type {Result} */
			const result = await player.chooseControl({
				prompt: get.prompt("spr_guimou"),
				prompt2: get.skillInfoTranslation("spr_guimou"),
				controls: ["转移此伤害", "摸两张牌", "背水", "cancel2"],
				ai(event, player) {
					if (!redirectIsBetter(player, trigger.player)) {
						return "cancel2";
					}
					const controls = ["摸两张牌", "背水"];
					if (get.attitude(player, trigger.player) > 0)
						controls.unshift("转移此伤害");
					return controls.randomGet();
				},
			}).forResult();
			if (result.control != "cancel2") {
				event.result = {
					bool: true,
					cost_data: { control: result.control },
				};
			}
		},
		async content(event, trigger, player) {
			/** @type {string} */
			const control = event.cost_data.control;
			const to = trigger.player;

			if (control == "转移此伤害") {
				await redirectDamage(player, trigger, player);
				await to.draw(2);
			} else if (control == "摸两张牌") {
				await player.draw(2);
				await redirectDamage(to, trigger, player);
			} else {
				await redirectDamage(player, trigger, player);
				await player.draw(2);
				player.addTempSkill("spr_guimou_beishui");
			}
		},
		group: "spr_guimou_directHitAi",
		subSkill: {
			beishui: {
				charlotte: true,
				mark: true,
				marktext: "背水",
				intro: {
					content: "本回合不能对其他角色使用牌",
				},
				mod: {
					playerEnabled(card, player, target, result) {
						if (player != target) return false;
					},
				},
			},
			directHitAi: {
				trigger: {
					player: "useCardToPlayered",
				},
				filter(event, player, name, target) {
					if (player.storage.counttrigger?.spr_guimou > 0) {
						return false;
					}
					return get.is.damageCard(event.card) &&
						get.attitude(event.target, player) > 0;
				},
				direct: true,
				charlotte: true,
				firstDo: true,
				async content(event, trigger, player) {
					const expire = [
						"damageBegin3",
						"damageAfter",
						"damageCancelled",
						"damageZero",
						"dieAfter",
						"useCardAfter",
						"phaseAfter",
						"phaseBeforeStart",
					];
					trigger.target.addTempSkill(
						"spr_guimou_goodDamage",
						expire,
					);
				},
			},
			goodDamage: {
				ai: {
					effect: {
						target(card, player, target, result2) {
							if (player.hasSkill("spr_guimou") &&
								player.storage.counttrigger?.spr_guimou > 0) {
								return false;
							}
							if (get.is.damageCard(card) &&
								get.attitude(target, player) > 0) {
								return [0, 3.5];
							}
						},
					},
				},
			},
		},
		ai: {
			effect: {
				player(card, player, target, result1) {
					if (player.storage.counttrigger?.spr_guimou > 0 ||
						card.name?.endsWith("damage") ||
						!target) {
						return;
					}
					if (get.is.damageCard(card) &&
						redirectIsBetter(player, target)) {
						const otherThanTo = game.filterPlayer(i => i != target);
						const damageEffs =
							otherThanTo.map(i => get.damageEffect(i, player, player));
						return [0, Math.max(...damageEffs) + 2];
					}
				},
			},
		},
	},
});
