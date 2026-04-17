import { DEFAULT_EXTENSION_NAME, CharacterInfo, CharacterData } from "./structs";

/**
 * 武将包制作器
 * 
 * 用于格式化地创建武将包（子包），包含多个武将数据。
 */
export class CharacterPackageMaker {
  /**
   * 武将数据集
   */
  dataset: CharacterData[];
  /**
   * 武将包id
   */
  id: string;
  /**
   * 武将包名
   */
  name?: string;
  /**
   * 扩展名
   */
  protected extensionName: string;

  /**
   * 生成一个武将包制作器，用于格式化地创建武将包
   * @param formattedName 武将包（子包）的名称，格式为 "id|译名"
   * @param extensionName 扩展包的名称，默认为 "☆SPR"
   */
  constructor(formattedName: string, extensionName?: string) {
    this.dataset = [];
    const [id, name] = formattedName.split('|');
    this.id = id;
    this.name = name || undefined;
    this.extensionName = extensionName || DEFAULT_EXTENSION_NAME;
  }

  /**
   * 添加一个武将
   * @param formattedName 格式化的武将名称，格式为 "id|译名"
   * @param data 武将数据
   */
  addCharacter(formattedName: string, data: CharacterInfo) {
    const character = new CharacterData(formattedName, data, this.extensionName);
    this.dataset.push(character);
  }

  /**
   * 获取武将包以及本包所有武将相关的翻译文本
   */
  getTranslates(): Record<string, string> {
    const ret: Record<string, string> = {};
    if (this.name !== undefined) {
      ret[this.id] = this.name;
    }

    for (const character of this.dataset) {
      Object.assign(ret, character.getTranslates());
    }
    return ret;
  }
}
