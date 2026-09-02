import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

/**
 * 点数记录器
 * 最多保存最近两条点数历史记录。
 */
class NumberRecorder {
	/**
	 * 创建点数记录器。
	 */
	constructor() {
		this.data = [];
	}

	/**
	 * 添加一条历史记录。
	 * 当历史记录超过两条时，自动移除最旧的一条。
	 *
	 * @param {number} value 要添加的历史记录
	 */
	add(value) {
		this.data.push(value);

		if (this.data.length > 2) {
			this.data.shift();
		}
	}

	/**
	 * 获取当前所有历史记录。
	 * 返回数组的副本，不会影响内部数据。
	 *
	 * @returns {number[]} 当前历史记录
	 */
	get() {
		return [...this.data];
	}

	/**
	 * 判断历史记录是否已满。
	 *
	 * @returns {boolean} 历史记录不少于两条时返回 true，否则返回 false
	 */
	isFull() {
		return this.data.length >= 2;
	}

	/**
	 * 返回两个历史记录值的和。
	 *
	 * @returns {number|undefined} 两条记录的和；记录不足两条时返回 undefined
	 */
	sum() {
		if (this.data.length < 2) {
			return undefined;
		}

		return this.data[0] + this.data[1];
	}

	/**
	 * 返回两个历史记录值的差的绝对值。
	 *
	 * @returns {number|undefined} 两条记录差的绝对值；记录不足两条时返回 undefined
	 */
	difference() {
		if (this.data.length < 2) {
			return undefined;
		}

		return Math.abs(this.data[0] - this.data[1]);
	}

	/**
	 * 将历史记录转换为字符串。
	 *
	 * @param {string} separator 历史记录之间的分隔符，默认为空格
	 * @returns {string} 历史记录字符串
	 */
	toString(separator = " ") {
		return this.data.join(separator);
	}
}

export default new SkillData("spr_zhilue|知略", {
	description:
		"当你使用牌时，若此牌与的点数为你使用的前两张有点数的牌的点数之<b>和</b>/<b>差</b>，" +
		"你可选择一项：令一名角色<b>摸</b>/<b>弃置</b>两张牌；移动场上一张牌。",
	voices: [
		"知敌之薄弱，略我之计谋。",
		"料敌之计，明敌之意，因况反制。",
	],
	skill: {
		init(player, skill) {
			player.setStorage(skill, new NumberRecorder());
		},
		intro: {
			content(storage, player, skill) {
				return `最近两次使用牌的点数：${storage.toString("，")}`;
			},
		},

		popup: false,
		trigger: {
			player: "useCard",
		},
		filter(event, player, name, target) {
			return typeof get.number(event.card) === "number";
		},
		async cost(event, trigger, player) {
			const
				/** @type {NumberRecorder} */
				recorder = player.getStorage("spr_zhilue"),
				num = get.number(trigger.card);
			if (recorder.isFull() &&
				(num == recorder.sum() || num == recorder.difference())) {
				const
					choices = [],
					allChoices = ["令一名角色摸两张牌", "令一名角色弃置两张牌", "移动场上一张牌"];
				if (num == recorder.sum()) {
					choices.push(allChoices[0]);
				}
				if (num == recorder.difference() && game.hasPlayer(i => i.hasCards("he"))) {
					choices.push(allChoices[1]);
				}
				if (player.canMoveCard()) {
					choices.push(allChoices[2]);
				}
				/** @type {Result} */
				const result = await player.chooseControlList({
					prompt: "知略：你可选择一项",
					list: choices,
					ai(event, player) {
						const valuableChoices = [];
						for (let i = 0; i < 2; i++) {
							if (!choices.includes(allChoices[i]))
								continue;
							if (i == 1 && !game.hasPlayer(i => get.attitude(player, i) <= 0 && !i.hasSkillTag("nodiscard")))
								continue;
							if (i == 2 && !player.canMoveCard(true))
								continue;
							valuableChoices.push(allChoices[i]);
						}
						return valuableChoices.randomGet();
					},
				}).forResult();
				if (result.control != "cancel2") {
					console.log([
						`index: ${result.index}`,
						`control: ${result.control}`,
						`allChoices.indexOf(result.control): ${allChoices.indexOf(result.control)}`,
					].join("\n"));
					const types = ["draw", "discard", "move"];
					event.result = {
						bool: true,
						cost_data: { type: types[allChoices.indexOf(choices[result.index])] },
					};
				}
			} else {
				event.result = {
					bool: true,
					cost_data: { type: "recordOnly" },
				};
			}
		},
		async content(event, trigger, player) {
			const
				/** @type {string} */
				type = event.cost_data.type,
				/** @type {NumberRecorder} */
				recorder = player.getStorage("spr_zhilue"),
				num = /** @type {number} */ (get.number(trigger.card));
			recorder.add(num);
			player.markSkill(event.name);
			if (type == "recordOnly") return;

			player.logSkill("spr_zhilue");
			if (type == "draw") {
				/** @type {Result} */
				const result = await player.chooseTarget({
					forced: true,
					prompt: "知略：你须令一名角色名摸两张牌",
					ai(target) {
						return get.effect(target, { name: "draw" }, player, player);
					},
				}).forResult();
				await result.targets[0].draw(2);
			} else if (type == "discard") {
				/** @type {Result} */
				const result = await player.chooseTarget({
					forced: true,
					prompt: "知略：你须令一名角色名弃置两张牌",
					filterTarget(card, player, target) {
						return target.hasCards("he");
					},
					ai(target) {
						return get.effect(target, { name: "draw" }, player, player);
					},
				}).forResult();
				await result.targets[0].chooseToDiscard({
					forced: true,
					prompt: "知略：你须弃置两张牌",
					selectCard: 2,
					position: "he",
				});
			} else {
				await player.moveCard({ forced: true });
			}
		},
		mod: {
			aiOrder(player, card, num) {
				const
					/** @type {NumberRecorder} */
					recorder = player.getStorage("spr_zhilue"),
					number = get.number(card);
				if (recorder.isFull() &&
					(number == recorder.sum() || number == recorder.difference())) {
					return num + 10;
				}
			},
		},
	},
});
