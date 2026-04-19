import { URL } from "./constants.js";
import { lib, game, ui, get, ai, _status } from "../../../noname.js";
/**
 * 播放技能音频
 * @param {string} skillname - 技能名称
 * @param {number|number[]} idx - 音频索引。若为数组，则随机选取其中一个索引。
 */
export function playSkillAudio(skillname, idx) {
	const i = Array.isArray(idx) ? idx.randomGet() : idx;
	game.broadcastAll(() => {
		// @ts-expect-error lib.config运行时存在的
		if (lib.config.background_speak)
			game.playAudio({
				path: `${URL}/${skillname}${idx}.mp3`,
			});
	});
}
