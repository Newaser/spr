import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";
import { join } from "path";

/**
 * 
 * @param {Player} player 
 * @param {Player} target 
 * @param {Player} thief 
 * @param {boolean} log
 * @returns 
 */
function getHuogongEffect(player, target, thief, log = false) {
	// 计算【火攻】命中的收益

	player.storage.spr_xvnxin_gettingHuogongEffect = true;
	const damageEff = get.damageEffect(target, player, player, "fire");
	delete player.storage.spr_xvnxin_gettingHuogongEffect;

	const mostUseless = {};
	for (const hand of player.getCards("h")) {
		const suit = get.suit(hand);
		if (
			!mostUseless[suit] ||
			get.useful(hand) < mostUseless[suit]
		) {
			mostUseless[suit] = get.useful(hand);
		}
	}
	const uMU = Object.values(mostUseless);
	const avUMU =
		uMU.reduce((acc, num) => acc + num, 0) /
		uMU.length;
	const muUMU = Math.min(...uMU);
	const hitEff = damageEff - (target == player ? muUMU : avUMU);

	let missEff;
	// 计算【火攻】没命中的收益
	if (player.storage.spr_xvnxin_missEff) {
		missEff = thief.storage.spr_xvnxin_missEff;
	} else {
		const sgnAttitude = get.sgn(get.attitude(player, thief));
		const cardStolenEff = (card) => {
			return (
				get.value(card, thief) * sgnAttitude
				- get.useful(card, player)
			);
		};
		missEff = player
			.getCards("h", i => get.color(i) === "red")
			.sort((a, b) => {
				return (
					(cardStolenEff(b) - cardStolenEff(a)) *
					sgnAttitude
				);
			})
			.slice(0, 2)
			.reduce((a, b) => {
				a += cardStolenEff(b);
				return a;
			}, 0);
		thief.storage.spr_xvnxin_missEff = missEff;
	}

	// 计算【火攻】命中的概率
	const hsSuits = player
		.getCards("h")
		.reduce((a, b) => {
			a.add(b.suit);
			return a;
		}, new Set()).size;
	const probHit = player.canUse("huogong", target) ?
		(target == player ? 1 : hsSuits / 4) : 0;

	// 计算收益值的期望
	const E_Eff = probHit * hitEff + (1 - probHit) * missEff;

	// for test
	if (log) {
		console.log([
			`target: ${get.translation(target)}`,
			`discard avUMU: ${-avUMU.toFixed(2)}`,
			`discard muUMU: ${-muUMU.toFixed(2)}`,
			`damageEff: ${damageEff.toFixed(2)}`,
			`hitEff: ${hitEff.toFixed(2)}`,
			`missEff: ${missEff.toFixed(2)}`,
			`probHit: ${probHit.toFixed(2)}`,
			`E_Eff: ${E_Eff.toFixed(2)}`,
		].join("\n"));
	}

	return E_Eff;
}

/**
 * 
 * @param {Player} player 
 * @param {Player} target 
 * @param {Player} thief 
 * @param {boolean} log
 * @returns 
 */
function estimateHuogongEffect(player, target, thief, log = false) {
	// 估计值
	const est_avUMU = 3;
	const est_muUMU = 1;
	const est_avVRed = 3;
	const est_avURed = 3;

	// 估算【火攻】命中的收益
	const damageEff = get.damageEffect(target, player, player, "fire");
	const est_hitEff = damageEff - (target == player ? est_muUMU : est_avUMU);

	// 估算【火攻】没命中的收益
	const sgnAttitude = get.sgn(get.attitude(player, thief));
	const avStolenEff = est_avVRed * sgnAttitude - est_avURed;
	const E_redHs = player.countCards("h") * 0.5;
	const est_missEff = avStolenEff * Math.min(E_redHs, 2);

	// 估算【火攻】命中的概率
	const E_hsSuits = 4 * (1 - 0.75 ** player.countCards("h"));
	const est_probHit = player.canUse("huogong", target) ?
		(target == player ? 1 : E_hsSuits / 4) : 0;

	// 估算收益值的期望
	const est_E_Eff = est_probHit * est_hitEff + (1 - est_probHit) * est_missEff;

	// for test
	if (log) {
		console.log([
			`target: ${get.translation(target)}`,
			`damageEff: ${damageEff.toFixed(2)}`,
			`est_hitEff: ${est_hitEff.toFixed(2)}`,
			`est_missEff: ${est_missEff.toFixed(2)}`,
			`est_probHit: ${est_probHit.toFixed(2)}`,
			`est_E_Eff: ${est_E_Eff.toFixed(2)}`,
		].join("\n"));
	}

	return est_E_Eff;
}

export default new SkillData("spr_xunxin|熏心", {
	description:
		"出牌阶段限一次，你可以令一名其他角色视为使用一张不能被响应的【火攻】。" +
		"若此【火攻】未造成伤害，你观看其手牌，获得其两张红色牌。",
	voices: [
		"一笑倾城，再笑倾国。",
		"汉有游女，不可求思。",
		"红颜催人醉，你就别醒了吧。",
	],
	skill: {

	},
});
