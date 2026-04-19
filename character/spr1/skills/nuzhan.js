import { URL } from "../../../utils/constants.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_nuzhan|怒斩", {
	description: `
<b>蓄力技（0/3）</b>，出牌阶段限一次或当你受到伤害后，\
你可以弃置一张牌并获得1点蓄力点。当你使用♥【杀】时，你消耗所有蓄力点，\
令此【杀】视为火属性、基础伤害+X、且需使用X张【闪】才能抵消（X为你消耗的蓄力点数）。
`,
	voices: [
		"狂妄贼子，速来领死！",
		"汝等若不早降，顷刻便为吾刀下之鬼！",
		"触关某之逆鳞者，杀无赦！",
		"天下碌碌之辈，安敢小觑关某！",
		"喝啊！！！",
	],
	skill: {
		chargeSkill: 3,
		group: [
			"spr_nuzhan_phaseUse",
			"spr_nuzhan_onDamage",
			"spr_nuzhan_enchant",
			"spr_nuzhan_wushuang",
		],
		subSkill: {
			phaseUse: {
				enable: "phaseUse",
				usable: 1,
				filter(event, player, name, target) {
					return player.countCards("he") > 0 &&
						player.countCharge(true) > 0;
				},
				filterCard: true,
				position: "he",
				prompt: "弃置一张牌并获得1点蓄力",
				/** @type {import("../../../utils/type.ts").LogAudioFunc} */
				logAudio(event, player, name, indexedData, evt) {
					const idx = [1, 2].randomGet();
					return `${URL.SKILL_AUDIO}/spr_nuzhan${idx}.mp3`;
				},
				/** @param {Card} card */
				check(card) {
					return 7 - get.value(card);
				},
				async content(event, trigger, player) {
					player.addCharge();
				},
				ai: {
					order() { return get.order({ name: "jiu" }) - 0.1; },
					result: {
						player: 1,
					},
				},
			},
			onDamage: {
				trigger: {
					player: "damageEnd",
				},
				filter(event, player, name, target) {
					return player.countCards("he") > 0 &&
						player.countCharge(true) > 0;
				},
				/** @type {import("../../../utils/type.ts").LogAudioFunc} */
				logAudio(event, player, name, indexedData, evt) {
					const idx = [3, 4].randomGet();
					return `ext:${URL.SKILL_AUDIO}/spr_nuzhan${idx}.mp3`;
				},
				async cost(event, trigger, player) {
					event.result = await player.chooseToDiscard({
						prompt: get.prompt("spr_nuzhan"),
						prompt2: "弃置一张牌并获得1点蓄力",
						position: "he",
						ai(card) {
							return 7 - get.useful(card);
						},
					}).forResult();
				},
				async content(event, trigger, player) {
					player.addCharge();
				},
			},
			enchant: {
				trigger: {
					player: "useCard1",
				},
				forced: true,
				filter(event, player, name, target) {
					return (
						event.card.name == "sha" &&
						get.suit(event.card) == "heart" &&
						player.countCharge() > 0
					);
				},
				/** @type {import("../../../utils/type.ts").LogAudioFunc} */
				logAudio(event, player, name, indexedData, result) {
					if (player.countCharge() > 2) {
						return `ext:${URL.SKILL_AUDIO}/spr_nuzhan5.mp3`;
					}
					return false;
				},
				async content(event, trigger, player) {
					const x = player.countCharge();
					player.removeCharge(x);
					game.setNature(trigger.card, "fire");
					trigger.baseDamage += x;
					if (x > 1) {
						if (!trigger.card.storage)
							trigger.card.storage = {};
						trigger.card.storage.spr_nuzhan = x - 1;
					}
				},
				ai: {
					fireAttack: true,
					damageBonus: true,
					effect: {
						player(card, player, target, result1) {
							const charge = player.countCharge();
							if (
								card.name == "sha" &&
								get.suit(card) == "heart" &&
								charge > 0
							) return charge;
						},
					},
				},
			},
			wushuang: {
				trigger: {
					player: "useCardToPlayered",
				},
				direct: true,
				filter(event, player, name, target) {
					const parent = event.getParent();
					return (
						event.card.storage &&
						event.card.storage.spr_nuzhan &&
						!(
							parent &&
							Array.isArray(parent.directHit) &&
							parent.directHit.includes(event.target)
						)
					);
				},
				async content(event, trigger, player) {
					const
						parent = trigger.getParent(),
						id = trigger.target.playerid;
					if (parent === undefined || id === undefined)
						throw new Error("parent or id undefined");

					const
						map = parent.customArgs,
						x = trigger.card.storage.spr_nuzhan;

					if (!map[id]) map[id] = {};
					if (typeof map[id].shanRequired == "number") {
						map[id].shanRequired += x;
					} else {
						map[id].shanRequired = x + 1;
					}
				},
				ai: {
					directHit_ai: true,
					skillTagFilter(player, tag, arg) {
						const st = arg.card.storage;
						if (
							!st ||
							!st.spr_nuzhan ||
							arg.target.mayHaveShan(arg.target, "use", null, "count") > st.spr_nuzhan
						) return false;
					},
				},
			},
		},
	},
});
