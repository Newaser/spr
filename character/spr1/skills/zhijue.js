import { URL } from "../../../utils/constants.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_zhijue|智绝", {
	description:
		`每回合每种${get.poptip("mobile_zhinangs")}各限一次，你可以将一张牌当任意智囊使用。`,
	voices: [
		"摇此羽扇，立唤东风！",
		"虚者虚之，疑中生疑。",
		"哼！班门弄斧！",
		"管仲乐毅之用兵，未必过此。",
		"区区雕虫小技，微不足道矣。",
		"亮素以谋制人，岂为人谋所制？",
	],
	texts: {
		"(poptip)mobile_zhinangs|智囊": "即【过河拆桥】、【无懈可击】、【无中生有】。",
	},
	skill: {
		enable: "chooseToUse",
		init(player, skill) {
			player.storage.spr_zhijue_used = [];
		},
		hiddenCard(player, name) {
			return (
				player.countCards("he") > 0 &&
				!player.storage.spr_zhijue_used.includes("wuxie") &&
				name == "wuxie"
			);
		},
		filter(event, player, name, target) {
			if (player.countCards("he") == 0) return false;
			for (const zhinang of get.zhinangs()) {
				if (!player.storage.spr_zhijue_used.includes(zhinang) &&
					event.filterCard({ name: zhinang }, player, event)) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				const list = [];
				for (const zhinang of get.zhinangs()) {
					if (!player.storage.spr_zhijue_used.includes(zhinang) &&
						event.filterCard({ name: zhinang }, player, event)) {
						list.push(zhinang);
					}
				}
				return ui.create.dialog([list, "vcard"]);
			},
			check(button) {
				const parent = _status.event.getParent();
				if (parent && parent.type != "phase") return 1;
				const player = get.player();
				return player.getUseValue(button.link[2]);
			},
			backup(links, player) {
				/** @type {string} */
				const cardname = links[0][2];
				/** @type {Skill} */
				const viewAsSkill = {
					selectCard: 1,
					filterCard: true,
					position: "hes",
					popname: true,
					/**  @param {Card} card  */
					check(card) {
						return 7 - get.value(card);
					},
					viewAs: {
						name: cardname,
					},
					/** @type {import("../../../utils/type.ts").LogAudioFunc} */
					logAudio(event, player, name, indexedData, evt) {
						let idx = ["wuzhong", "guohe", "wuxie"].indexOf(cardname) + 1;
						idx *= 2;
						idx = [idx - 1, idx].randomGet();
						return `${URL.SKILL_AUDIO}/spr_zhijue${idx}.mp3`;
					},
					onuse(result, player) {
						player.storage.spr_zhijue_used.push(cardname);
					},
				};
				return viewAsSkill;
			},
			prompt(links, player) {
				return `将一张牌当作${get.translation(links[0][2])}使用`;
			},
		},
		group: "spr_zhijue_refresh",
		subSkill: {
			refresh: {
				direct: true,
				trigger: {
					global: "phaseAfter",
				},
				async content(event, trigger, player) {
					player.storage.spr_zhijue_used = [];
				},
			},
		},
		ai: {
			order: 7,
			threaten: 2,
			result: {
				player: 1,
			},
		},
	},
});
