import * as util from "../../../utils/util.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

const zhengsuOptions = ["zhengsu_leijin", "zhengsu_bianzhen", "zhengsu_mingzhi"];

export default new SkillData("spr_jingce|精策", {
	description:
		`出牌阶段开始时，你可以进行任意次“${get.poptip("rule_zhengsu")}”。` +
		"若如此做，弃牌阶段结束后，若这些整肃均未失败，你依次获得这些整肃的奖励，" +
		`然后获得${get.poptip("spr_juyu")}直到你的下回合开始。`,
	voices: [
		"思我之薄弱，知敌之计谋。",
		"精细入微，策敌制胜。",
		"兵非贵益多，料敌取人而已。",
		"料敌取胜，于吾不过易事。",
		"此一举两全之策，吾等何不用之？",
		"两城皆加防备，不可顾此失彼。",
		"哈哈哈哈哈哈，若长此以往，蜀贼可平！",
		"敌计尽料，蜀军何可越境？",
		"有此一失，功败垂成啊！",
		"棋差一招，棋差一招啊！",
	],
	skill: {
		logAudio: util.logSkillAudio("spr_jingce", [1, 2]),
		trigger: {
			player: "phaseUseBegin",
		},
		filter(event, player, name, target) {
			return zhengsuOptions.some(i => !player.hasSkill(i));
		},
		async cost(event, trigger, player) {
			let prompt = `###${get.prompt("spr_jingce")}###`;
			prompt += "整肃任意次，均成功才能奖励";
			const result = await player.chooseButton({
				createDialog: [
					prompt,
					[zhengsuOptions, "vcard"],
				],
				filterButton(button, player) {
					return !player.hasSkill(button.link);
				},
				selectButton: [1, 3],
				ai(button) {
					return Math.random() - 0.5;
				},
			}).forResult();
			if (result.bool && result.links) {
				event.result = {
					bool: true,
					cost_data: {
						choices:
							result.links.map((/** @type {string[]} */ i) => i[2]),
					},
				};
			}
		},
		async content(event, trigger, player) {
			/** @type {string[]} */
			const choices = event.cost_data.choices;
			const expire = { player: ["phaseDiscardAfter", "phaseAfter"] };
			player.addTempSkill("spr_jingce_check", expire);
			choices.forEach(choice => {
				player.addTempSkill(choice, expire);
				player.storage.spr_jingce_check.push(choice);
			});

			game.log(
				player,
				`发起了${choices.length > 1 ? "多重" : ""}整肃：`,
				choices
					.map(i => `<span class="greentext">${get.translation(i)}</span>`)
					.join("、"),
			);
		},
		subSkill: {
			check: {
				charlotte: true,
				forced: true,
				popup: false,
				init(player, skill) {
					player.storage[skill] = [];
				},
				onremove: true,
				trigger: {
					player: "phaseDiscardEnd",
				},
				async content(event, trigger, player) {
					/** @type {string[]} */
					const choices = player.getStorage("spr_jingce_check");
					const num = choices.filter(i => player.storage[i]).length;
					if (num < choices.length) {
						game.log(player, "整肃失败");
						util.playSkillAudio("spr_jingce", [9, 10], false, player);
						player.popup("整肃失败", "fire");
						await game.delay(4);
					} else {
						game.log(player, `整肃成功${get.cnNumber(num)}次`);
						const idx = (num + 1) * 2;
						util.playSkillAudio("spr_jingce", [idx - 1, idx], false, player);
						player.popup("整肃成功", "wood");
						await game.delayx();
						for (let i = 0; i < num; i++) {
							await player.chooseDrawRecover({
								forced: true,
								prompt: "整肃奖励：摸两张牌或回复1点体力",
								num1: 2,
							});
						}
						player.addTempSkill("spr_juyu", { player: "phaseBefore" });
						game.log(
							player,
							"获得",
							`【${get.translation("spr_juyv")}】`,
							"直到其下回合开始",
						);
					}
				},
			},
		},
		derivation: "spr_juyu",
	},
});
