import { URL } from "./constants.js";
import { lib, game, ui, get, ai, _status } from "../../../noname.js";

/**
 * 解析索引
 * 若为数组，则随机选取其中一个索引。
 * 若为数组且isRange == true，则改为从范围内选择一个数
 * @param {number|number[]} idx - 索引
 * @param {boolean} isRange - 是否为索引范围，默认不为
 * @returns {number} 解析后的索引
 */
function parseIndex(idx, isRange = false) {
	if (isRange) {
		if (!Array.isArray(idx) || idx.length != 2) {
			throw new Error("'idx' is suppused to be a range");
		}
		return get.rand(idx[0], idx[1]);
	}
	return Array.isArray(idx) ? idx.randomGet() : idx;
}

/**
 * 播放技能音频
 * @param {string} skillname - 技能名称
 * @param {number|number[]} idx - 音频索引。若为数组，则随机选取其中一个索引。
 * @param {boolean} isRange - 是否为索引范围，默认不为
 */
export function playSkillAudio(skillname, idx, isRange = false) {
	const url = `${URL.SKILL_AUDIO}/${skillname}${parseIndex(idx, isRange)}.mp3`;
	game.broadcastAll(() => {
		// @ts-expect-error lib.config运行时存在的
		if (lib.config.background_speak)
			game.playAudio({ path: url });
	});
}

/**
 * 生成一个特定的SKill.logAudio函数
 * @param {string} skillname - 技能名称
 * @param {number|number[]} idx - 音频索引。若为数组，则随机选取其中一个索引。
 * @param {boolean} isRange - 是否为索引范围，默认不为
 * @returns {import("./type.ts").LogAudioFunc}
 */
export function logSkillAudio(skillname, idx, isRange = false) {
	const url = `${URL.SKILL_AUDIO}/${skillname}${parseIndex(idx, isRange)}.mp3`;
	/** @type {import("./type.ts").LogAudioFunc} */
	return function (event, player, name, indexedData, result) {
		return url;
	};
}
