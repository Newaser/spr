export const DEFAULT_EXTENSION_NAME = "☆SPR";

/**
 * @typedef {"s"|"ap"|"a"|"am"|"bp"|"b"|"bm"|"c"|"d"} Rank
 */

/**
 * @typedef {"legend"|"epic"|"rare"|"common"|"junk"} Rarity
 */

/**
 * @typedef {Object} CharacterInfo
 * @property {*} character
 * @property {string=} intro
 * @property {string=} title
 * @property {Rank=} rank
 * @property {Rarity=} rarity
 * @property {string=} dieVoice
 * @property {string=} victoryVoice
 */

/**
 * @typedef {Object} SkillInfo
 * @property {*} skill
 * @property {string=} description
 * @property {string[]=} voices
 * @property {Record<string,string>=} texts
 */

/**
 * @typedef {CharacterInfo | SkillInfo} Info
 */

/**
 * 抽象数据类
 * @template T
 */
class AbstractData {
  /**
   * @param {string} formattedName
   * @param {T} data
   * @param {string} extensionName
   */
  constructor(formattedName, data, extensionName) {
    const [id, name] = formattedName.split("|");

    /** @type {string} */
    this.id = id;

    /** @type {string|undefined} */
    this.name = name || undefined;

    /** @type {T} */
    this.info = data;

    /** @protected */
    this.extensionName = extensionName;
  }

  /** @returns {Record<string,string>} */
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
   * @param {string} formattedName
   * @param {CharacterInfo} data
   * @param {string} extensionName
   */
  constructor(formattedName, data, extensionName) {
    super(formattedName, data, extensionName);
  }

  /** @returns {Record<string,string>} */
  getTranslates() {
    /** @type {Record<string,string>} */
    const ret = {};

    if (this.name !== undefined) {
      ret[this.id] = this.name;
    }

    if (this.info.dieVoice !== undefined) {
      ret[`#ext:${this.extensionName}/audio/die/${this.id}:die`] =
        this.info.dieVoice;
      ret[`#${this.id}:die`] = this.info.dieVoice;
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
   * @param {string} formattedName
   * @param {SkillInfo} data
   * @param {string=} extensionName
   */
  constructor(formattedName, data, extensionName) {
    super(
      formattedName,
      data,
      extensionName || DEFAULT_EXTENSION_NAME
    );
  }

  /** @returns {Record<string,string>} */
  getTranslates() {
    /** @type {Record<string,string>} */
    const ret = {};

    if (this.name !== undefined) {
      ret[this.id] = this.name;
    }

    if (this.info.description !== undefined) {
      ret[this.id + "_info"] = this.info.description;
    }

    if (Array.isArray(this.info.voices)) {
      for (let i = 0; i < this.info.voices.length; i++) {
        const voice = this.info.voices[i];
        ret[`#ext:${this.extensionName}/audio/skill/${this.id}${i}`] =
          voice;
      }
    }

    if (this.info.texts) {
      for (const [key, value] of Object.entries(this.info.texts)) {
        ret[key] = value;
      }
    }

    return ret;
  }
}
