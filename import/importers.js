import {
  DEFAULT_EXTENSION_NAME,
  CharacterData,
} from "./structs.js";

/**
 * 武将包制作器
 */
export class CharacterPackageMaker {
  /**
   * @param {string} formattedName
   * @param {string=} extensionName
   */
  constructor(formattedName, extensionName) {
    /** @type {CharacterData[]} */
    this.dataset = [];

    const [id, name] = formattedName.split("|");

    /** @type {string} */
    this.id = id;

    /** @type {string|undefined} */
    this.name = name || undefined;

    /** @protected */
    this.extensionName =
      extensionName || DEFAULT_EXTENSION_NAME;
  }

  /**
   * @param {string} formattedName
   * @param {import("./structs.js").CharacterInfo} data
   */
  addCharacter(formattedName, data) {
    const character = new CharacterData(
      formattedName,
      data,
      this.extensionName
    );
    this.dataset.push(character);
  }

  /** @returns {Record<string,string>} */
  getTranslates() {
    /** @type {Record<string,string>} */
    const ret = {};

    if (this.name !== undefined) {
      ret[this.id] = this.name;
    }

    for (const character of this.dataset) {
      Object.assign(ret, character.getTranslates());
    }

    return ret;
  }
}