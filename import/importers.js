import {
	DEFAULT_EXTENSION_NAME,
	CharacterData,
} from "./structs.js";

/**
 * **武将包制作器**
 * 
 * 用于格式化地创建武将包（子包），包含多个武将数据。
 */
export class CharacterPackageMaker {
	/**
   * 生成一个武将包制作器，用于格式化地创建武将包
   * @param {string} formattedName 武将包（子包）的名称，格式为 `id|译名`
   * @param {string=} extensionName 扩展包的名称，默认为 `☆SPR`
   */
	constructor(formattedName, extensionName) {
		/** 
     * 武将数据集
     * @type {CharacterData[]}
     */
		this.dataset = [];

		const [id, name] = formattedName.split("|");

		/** 
     * 武将包id
     * @type {string} 
     * */
		this.id = id;

		/** 
     * 武将包名
     * @type {string|undefined} 
     */
		this.name = name || undefined;

		/** 
     * 扩展名
     * @protected
     * @type {string}
     */
		this.extensionName =
      extensionName || DEFAULT_EXTENSION_NAME;
	}

	/**
   * 添加一个武将
   * @param {string} formattedName 格式化的武将名称，格式为 `id|译名`
   * @param {import("./structs.js").CharacterInfo} data 武将数据
   */
	addCharacter(formattedName, data) {
		const character = new CharacterData(
			formattedName,
			data,
			this.extensionName,
		);
		this.dataset.push(character);
	}

	/** 
   * 获取武将包以及本包所有武将相关的翻译文本
   * @returns {Record<string,string>}
   */
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