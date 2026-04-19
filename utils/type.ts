import { Character } from "../../../noname/library/element/index.js";

/** 武将评级 */
export type Rank = "s" | "ap" | "a" | "am" | "bp" | "b" | "bm" | "c" | "d";

/** 
 * **武将稀有度**
 * 
 * 与龙的样式的对应关系：
 * - `legend` - 炎龙
 * - `epic` - 玉龙
 * - `rare` - 金龙
 * - `common` - 银龙
 * - `junk` - 无龙
 */
export type Rarity = "legend" | "epic" | "rare" | "common" | "junk";

/**
 * **武将信息**
 * 
 * 包含武将的基本信息、介绍、称号、评级、稀有度、台词等。
 */
export interface CharacterInfo {
	/**
	 * 武将基本信息
	 */
	basic: Character;
	/**
	 * 武将介绍
	 */
	intro?: string;
	/**
	 * 武将称号
	 */
	title?: string;
	/**
	 * 阵亡台词
	 */
	dieVoice?: string;
	/**
	 * 胜利台词
	 */
	victoryVoice?: string;
	/**
	 * 武将评级
	 */
	rank?: Rank;
	/**
	 * 稀有度
	 */
	rarity?: Rarity;
	/**
	 * ### 技能语音重定向
	 * 
	 * 格式：
	 * ```javascript
	 * audioRedirect: {
	 *   "已有技能的id": [ "台词1", "台词2", ... ],
	 *   ...
	 * },
	 * ```
	 * 
	 * 对应地，相应的音频文件应命名为：
	 * 
	 * - `已有技能的id__武将id1.mp3`
	 * - `已有技能的id__武将id2.mp3`
	 * - `...`
	 * 
	 * 放在扩展的技能语音目录下。
	 * 
	 * ---
	 * 
	 * ### 案例
	 * 
	 * 以武将`spr_guanyu`举例，若其有如下值：
	 * 
	 * ```javascript
	 * audioRedirect: {
	 *   "wusheng": [
	 *     "可知关某之威！",
	 *     "关某既出，敌将定皆披靡！",
	 *   ],
	 * },
	 * ```
	 * 
	 * 则相应的音频文件应命名为：
	 * - `wusheng__spr_guanyu1.mp3`
	 * - `wusheng__spr_guanyu2.mp3`
	 */
	audioRedirect?: Record<string, string[]>;
}

/**
 * **技能信息**
 * 
 * 包含技能的名称、代码、描述、台词等。
 */
export interface SkillInfo {
	/**
	 * 技能代码
	 */
	skill: Skill;
	/**
	 * 技能描述
	 */
	description?: string;
	/**
	 * 技能描述动态翻译函数
	 * @param player 技能拥有者
	 * @param desc 原始描述
	 * @returns 动态翻译后的描述，若不返回则为原描述
	 */
	dynamicDescription?: (player: Player, desc: string) => string | undefined;
	/**
	 * 技能台词
	 */
	voices?: string[];
	/**
	 * 技能包含的其他文本信息
	 */
	texts?: Record<string, string>;
}

type AudioInfo = AudioInfo[] | string | number | boolean;

/**
 * 音频播放函数
 * @param event 当前事件或触发事件
 * @param player 
 * @param name triggername
 * @param indexedData trigger times的索引
 * @param result cost事件的result
 * @returns
 */
export type LogAudioFunc = (
	event: GameEvent,
	player: Player,
	name?: string,
	indexedData?: number,
	result?: Result
) => AudioInfo;
