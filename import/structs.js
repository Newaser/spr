import { Character } from "../../../noname/library/element/index.js";

export const DEFAULT_EXTENSION_NAME = "☆SPR";

/**
 * 武将评级
 * @typedef {"s"|"ap"|"a"|"am"|"bp"|"b"|"bm"|"c"|"d"} Rank
 */

/**
 * **武将稀有度**
 * 
 * 与龙的样式的对应关系：
 * 
 * - `legend` - 炎龙
 * 
 * - `epic` - 玉龙
 * 
 * - `rare` - 金龙
 * 
 * - `common` - 银龙
 * 
 * - `junk` - 无龙
 * @typedef {"legend"|"epic"|"rare"|"common"|"junk"} Rarity
 */

/**
 * **武将信息**
 * 
 * 包含武将的基本信息、介绍、称号、评级、稀有度、台词等。
 * @typedef {Object} CharacterInfo
 * @property {Character} character 武将基本信息
 * @property {string=} intro 武将介绍
 * @property {string=} title 武将称号
 * @property {string=} dieVoice 阵亡台词
 * @property {string=} victoryVoice 胜利台词
 * @property {Rank=} rank 武将评级
 * @property {Rarity=} rarity 稀有度
 * @property {Record<string,string[]>=} audioRedirect
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

 * ---

 * ### 案例

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

   则相应的音频文件应命名为：
   - `wusheng__spr_guanyu1.mp3`
   - `wusheng__spr_guanyu2.mp3`
 */

/**
 * **技能信息**
 * 
 * 包含技能的名称、代码、描述、台词等。
 * @typedef {Object} SkillInfo
 * @property {Skill} skill 技能代码
 * @property {string=} description 技能描述
 * @property {(player: Player,desc:string)=>string|undefined=} dynamicDescription
 * 技能描述动态翻译函数（Skill Description Dynamic Translation Function）
 * 
 * _@param_ `player` 技能拥有者
 * 
 * _@param_ `desc` 原始描述
 * @property {string[]=} voices 技能台词
 * @property {Record<string,string>=} texts 技能包含的其他文本信息
 */

/**
 * **抽象数据类**
 * 
 * 包含此类型数据的id、名称、信息等。
 * @template T
 */
class AbstractData {
	/**
	 * @param {string} formattedName
	 * @param {T} data
	 * @param {string=} extensionName
	 */
	constructor(formattedName, data, extensionName) {
		const [id, name] = formattedName.split("|");

		/** 
		 * 此类型数据对应的id
		 * @type {string}
		 */
		this.id = id;

		/** 
		 * 此类型数据对应的译名
		 * @type {string|undefined}
		 */
		this.name = name || undefined;

		/** 
		 * 此类型数据对应的信息
		 * @type {T} 
		 * @protected
		 */
		this._info = data;

		/** 
		 * 扩展名
		 * @type {string}
		 * @protected
		 */
		this._extensionName = extensionName || DEFAULT_EXTENSION_NAME;
	}

	/**
	 * 获取此类型数据对应的信息
	 * @returns {T}
	 */
	getInfo() {
		return this._info;
	}

	/** 
	 * 获取此类型数据的相关翻译文本
	 * @returns {Record<string,string>} 
	 */
	getTranslates() {
		throw new Error("Abstract method");
	}
}

/**
 * 武将数据
 * @extends {AbstractData<CharacterInfo>}
 */
export class CharacterData extends AbstractData {
	/**
	 * 创建一个武将数据对象，用于存储武将的id、名称、信息等。
	 * @param {string} formattedName 格式化的武将名称，格式为 `id|译名`
	 * @param {CharacterInfo} data 武将数据
	 * @param {string=} extensionName 扩展名，默认为 `☆SPR`
	 */
	constructor(formattedName, data, extensionName) {
		super(formattedName, data, extensionName);
	}

	/**
	 * 获取武将信息
	 *  @returns {CharacterInfo} 
	 */
	getInfo() {
		return super.getInfo();
	}

	/** 
	 * 获取武将相关的翻译文本
	 * @returns {Record<string,string>} 
	 */
	getTranslates() {
		/** @type {Record<string,string>} */
		const ret = {};

		if (this.name !== undefined) {
			ret[this.id] = this.name;
		}

		if (this._info.dieVoice !== undefined) {
			ret[`#ext:${this._extensionName}/audio/die/${this.id}:die`] =
				this._info.dieVoice;
			ret[`#${this.id}:die`] = this._info.dieVoice;
		}

		return ret;
	}
}

/**
 * 技能数据
 * @extends {AbstractData<SkillInfo>}
 */
export class SkillData extends AbstractData {
	/**
	 * 创建一个技能数据对象，用于存储技能的id、名称、信息等。
	 * @param {string} formattedName 格式化的技能名称，格式为 `id|译名`
	 * @param {SkillInfo} data 技能数据
	 * @param {string=} extensionName 扩展名，默认为 `☆SPR`
	 */
	constructor(formattedName, data, extensionName) {
		super(
			formattedName,
			data,
			extensionName || DEFAULT_EXTENSION_NAME,
		);
	}

	/**
	 * 获取技能信息
	 * @returns {SkillInfo} 
	 */
	getInfo() {
		return super.getInfo();
	}

	/** 
	 * 获取技能相关的翻译文本
	 * @returns {Record<string,string>} 
	 */
	getTranslates() {
		/** @type {Record<string,string>} */
		const ret = {};

		if (this.name !== undefined) {
			ret[this.id] = this.name;
		}

		if (this._info.description !== undefined) {
			ret[`${this.id}_info`] = this._info.description;
		}

		if (Array.isArray(this._info.voices)) {
			for (let i = 0; i < this._info.voices.length; i++) {
				const voice = this._info.voices[i];
				ret[`#ext:${this._extensionName}/audio/skill/${this.id}${i + 1}`] = voice;
			}
		}

		if (this._info.texts) {
			for (const [key, value] of Object.entries(this._info.texts)) {
				ret[key] = value;
			}
		}

		return ret;
	}

	/** 
	 * 获取技能描述的动态翻译
	 * @returns {((player: Player) => string) | void} 
	 */
	getDynamicTranslate() {
		const
			desc = this._info.description,
			defaultDesc = `${this.id}_info`,
			dynamicDesc = this._info.dynamicDescription;
		if (dynamicDesc) {
			return (player) =>
				dynamicDesc(player, desc || defaultDesc) || desc || defaultDesc;
		}
	}
}
