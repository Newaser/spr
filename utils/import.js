import { EXTENSION, URL } from "./constants.js";
import { lib } from "../../../noname.js";
import { Character } from "../../../noname/library/element/index.js";

/** 武将评级
 * @typedef {"s"|"ap"|"a"|"am"|"bp"|"b"|"bm"|"c"|"d"} Rank
 */

/** **武将稀有度**
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

/** **武将信息**
 * 
 * 包含武将的基本信息、介绍、称号、评级、稀有度、台词等。
 * @typedef {Object} CharacterInfo
 * @property {Character} basic 武将基本信息
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

/** **技能信息**
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

/** **抽象数据类**
 * 
 * 包含此类型数据的id、名称、信息等。
 * @template T
 */
class AbstractData {
	/**
	 * @param {string} formattedName
	 * @param {T} data
	 */
	constructor(formattedName, data) {
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

/** 武将数据
 * @extends {AbstractData<CharacterInfo>}
 */
export class CharacterData extends AbstractData {
	/**
	 * 创建一个武将数据对象，用于存储武将的id、名称、信息等。
	 * @param {string} formattedName 格式化的武将名称，格式为 `id|译名`
	 * @param {CharacterInfo} data 武将数据
	 */
	constructor(formattedName, data) {
		super(formattedName, data);
		this._info.intro = this._info.intro?.trim();
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
			ret[`#ext:${EXTENSION.NAME}/audio/die/${this.id}:die`] =
				this._info.dieVoice;
			ret[`#${this.id}:die`] = this._info.dieVoice;
		}

		if (this._info.audioRedirect !== undefined) {
			for (const [skillId, voices] of Object.entries(this._info.audioRedirect)) {
				for (let i = 0; i < voices.length; i++) {
					const key =
						`#ext:${EXTENSION.NAME}/audio/skill/${skillId}__${this.id}${i + 1}`;
					ret[key] = voices[i];
				}
			}
		}

		return ret;
	}

	/**
	 * 将武将的评级、稀有度注册到游戏内（须运行时操作）
	 */
	registerRank() {
		const rank = /** @type {any} */ (lib).rank;
		if (rank) {
			if (this._info.rank) {
				rank[this._info.rank].push(this.id);
			}
			if (rank.rarity && this._info.rarity) {
				rank.rarity[this._info.rarity].push(this.id);
			}
		}
	}

	/**
	 * 将武将的技能语音重定向注册到游戏内（须运行时操作）
	 */
	registerAudioRedirects() {
		if (this._info.audioRedirect !== undefined) {
			for (const skillId in this._info.audioRedirect) {
				if (!lib.skill[skillId].audioname2) {
					lib.skill[skillId].audioname2 = {};
				}
				lib.skill[skillId].audioname2[this.id] = `${skillId}__${this.id}`;
			}
		}
	}
}

/** 技能数据
 * @extends {AbstractData<SkillInfo>}
 */
export class SkillData extends AbstractData {
	/**
	 * 创建一个技能数据对象，用于存储技能的id、名称、信息等。
	 * @param {string} formattedName 格式化的技能名称，格式为 `id|译名`
	 * @param {SkillInfo} data 技能数据
	 * @param {boolean} isAudioFormatted
	 * 技能的语音是否格式化，即一句台词对应一句语音。默认为 `true`
	 */
	constructor(formattedName, data, isAudioFormatted = true) {
		super(formattedName, data);
		this._info.description = this._info.description?.trim();

		const voices = this._info.voices;
		if (isAudioFormatted && voices && voices.length > 0) {
			this._info.skill.audio = `${URL.SKILL_AUDIO}:${voices.length}`;
		}
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
				ret[`#ext:${EXTENSION.NAME}/audio/skill/${this.id}${i + 1}`] = voice;
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

/** **武将子包**
 * 
 * 一个扩展中可能包含多个武将包，每个包即一个子包，每个子包可包含多个武将数据。
 */
export class CharacterSubackage {
	/**
	 * 格式化地创建一个武将子包
	 * @param {string} formattedName 武将子包的名称，格式为 `id|译名`
	 */
	constructor(formattedName) {
		const [id, name] = formattedName.split("|");

		/** 
		 * 子包id
		 * @type {string} 
		 * */
		this.id = id;

		/** 
		 * 子包名
		 * @type {string|undefined} 
		 */
		this.name = name || undefined;

		/** 
		 * 武将
		 * @type {CharacterData[]}
		 */
		this.characters = [];

		/** 
		 * 武将技能
		 * @type {SkillData[]}
		 */
		this.skills = [];
	}

	/**
	 * 添加一个武将
	 * @param {string} formattedName 格式化的武将名称，格式为 `id|译名`
	 * @param {CharacterInfo} data 武将数据
	 * @returns {CharacterSubackage} 返回自身。支持链式添加元素
	 */
	addCharacter(formattedName, data) {
		const character = new CharacterData(formattedName, data);
		this.characters.push(character);
		return this;
	}

	/**
	 * 添加一个武将技能
	 * @param {SkillData} skill 
	 * @returns {CharacterSubackage} 返回自身。支持链式添加元素
	 */
	addSkill(skill) {
		this.skills.push(skill);
		return this;
	}

	/**
	 * 一次性添加多个武将技能
	 * @param {SkillData[]} skills 
	 * @returns {CharacterSubackage} 返回自身。支持链式添加元素
	 */
	addSkills(skills) {
		skills.forEach(skill => this.addSkill(skill));
		return this;
	}

	/** 
	 * 获取所有与本包相关的翻译文本
	 * @returns {Record<string,string>}
	 */
	getTranslates() {
		/** @type {Record<string,string>} */
		const ret = {};

		if (this.name !== undefined) {
			ret[this.id] = this.name;
		}

		for (const character of this.characters) {
			Object.assign(ret, character.getTranslates());
		}

		for (const skill of this.skills) {
			Object.assign(ret, skill.getTranslates());
		}

		return ret;
	}

	/**
	 * 运行时初始化
	 */
	setupRuntime() {
		this.characters.forEach(character => {
			character.registerRank();
			character.registerAudioRedirects();
		});
	}
}

/** **武将包**
 * 
 * 所有武将子包的集合
 */
export class CharacterPackage {
	/**
	 * 创建一个武将包，用于整合多个武将子包
	 */
	constructor() {
		/**
		 * 子包集合
		 * @type {CharacterSubackage[]}
		 * @protected
		 */
		this._subpkgs = [];
	}

	/**
	 * 添加一个子包
	 * @param {CharacterSubackage} subpkg 
	 */
	addSubackage(subpkg) {
		this._subpkgs.push(subpkg);
	}

	/**
	 * 添加多个子包
	 * @param {CharacterSubackage[]} subpkgs
	 */
	addSubpackages(subpkgs) {
		subpkgs.forEach(subpkg => this.addSubackage(subpkg));
	}

	/**
	 * 武将包内的所有内容打包成 `importCharacterConfig` 的形式
	 * @returns {importCharacterConfig}
	 */
	pack() {
		const
			/** @type {importCharacterConfig['character'] & Record<string, Character>} */
			characterBasic = {},

			/** @type {importCharacterConfig['characterIntro']} */
			characterIntro = {},

			/** @type {importCharacterConfig['characterTitle']} */
			characterTitle = {},

			/** @type {importCharacterConfig['characterSort']} */
			characterSort = { [EXTENSION.ID]: {} },

			/** @type {importCharacterConfig['skill']} */
			skills = {},

			/** @type {importCharacterConfig['translate']} */
			translate = {},

			/** @type {importCharacterConfig['dynamicTranslate']} */
			dynamicTranslate = {},

			/** @type {SkillData[]} */
			audioRedirectSkills = [];
		for (const pkg of this._subpkgs) {
			// add characters
			const sort = [];
			for (const character of pkg.characters) {
				const info = character.getInfo();
				characterBasic[character.id] = info.basic;
				characterBasic[character.id].img =
					`extension/${EXTENSION.NAME}/image/character/${character.id}.jpg`;
				characterBasic[character.id].dieAudios =
					[`ext:${EXTENSION.NAME}/audio/die/${character.id}.mp3`];
				if (info.intro !== undefined) {
					characterIntro[character.id] = info.intro;
				}
				if (info.title !== undefined) {
					characterTitle[character.id] = info.title;
				}
				sort.push(character.id);
				if (info.audioRedirect !== undefined) {
					for (const skillId in info.audioRedirect) {
						audioRedirectSkills.push(new SkillData(`${skillId}__${character.id}`, {
							voices: info.audioRedirect[skillId],
							skill: {
								audio: `ext:${EXTENSION.NAME}/audio/skill:${info.audioRedirect[skillId].length}`,
							},
						}));
					}
				}
			}
			characterSort[EXTENSION.ID][pkg.id] = sort;

			// add skills
			for (const skill of pkg.skills.concat(audioRedirectSkills)) {
				skills[skill.id] = skill.getInfo().skill;
				const dynamicDesc = skill.getDynamicTranslate();
				if (dynamicDesc !== undefined) {
					dynamicTranslate[skill.id] = dynamicDesc;
				}
			}

			// add translates
			Object.assign(translate, pkg.getTranslates());
		}

		return {
			name: EXTENSION.ID,
			character: characterBasic,
			characterIntro,
			characterTitle,
			characterSort,
			skill: skills,
			translate,
			dynamicTranslate,
		};
	}

	/**
	 * 运行时初始化
	 */
	setupRuntime() {
		this._subpkgs.forEach(pkg => pkg.setupRuntime());
	}
}
