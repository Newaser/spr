type Character = import('@/library/element/character.js').Character
type Rank = 's' | 'ap' | 'a' | 'am' | 'bp' | 'b' | 'bm' | 'c' | 'd';
/**
 * 武将稀有度
 * 
 * 与龙的样式的对应关系：
 * 
 * legend - 炎龙
 * 
 * epic - 玉龙
 * 
 * rare - 金龙
 * 
 * common - 银龙
 * 
 * junk - 无龙
 */
type Rarity = 'legend' | 'epic' | 'rare' | 'common' | 'junk';

export interface CharacterInfo {
  /** 
   * 武将基本信息
   * */
  character: Character;
  /** 
   * 武将介绍
   * */
  intro?: string;
  /** 
   * 武将称号
   * */
  title?: string;
  /** 
   * 武将评级
   * */
  rank?: Rank;
  /** 
   * 稀有度
   * */
  rarity?: Rarity;
  /** 
   * 阵亡台词
   * */
  dieVoice?: string;
  /** 
   * 胜利台词
   * */
  victoryVoice?: string;
};

export class CharacterData {
  id: string;
  name: string;
  info: CharacterInfo;
  protected extensionName: string;
  constructor(formattedName: string, data: CharacterInfo, extensionName: string) {
    const [id, name] = formattedName.split('|');
    this.id = id;
    this.name = name || id;
    this.info = data;
    this.extensionName = extensionName;
  }
  getTranslates() {
    return {
      [this.id]: this.name,
      [`#ext:${this.extensionName}/audio/die/${this.id}:die`]: this.info.dieVoice,
      [`#${this.id}:die`]: this.info.dieVoice,
    };
  }
}

export class CharacterPackageMaker {
  dataset: CharacterData[];
  id: string;
  name: string;
  protected extensionName: string;
  /**
   * 
   * @param formattedName 武将包（子包）的名称
   * 
   * 格式为 "id|翻译"，其中 id 是武将包的唯一标识，翻译是该武将包的中文名（可选）。
   * 如果没有翻译，则使用 id 作为显示名称。
   * @param extensionName 扩展包的名称，默认为 "☆SPR"
   */
  constructor(formattedName: string, extensionName?: string) {
    this.dataset = [];
    const [id, name] = formattedName.split('|');
    this.id = id;
    this.name = name || id;
    this.extensionName = extensionName || '☆SPR';
  }
  /**
   * 
   * @param formattedName 
   * 格式为 "id|翻译"，其中 id 是武将的唯一标识，翻译是该武将的中文名（可选）。
   * 如果没有翻译，则使用 id 作为显示名称。
   * @param data 
   */
  addCharacter(formattedName: string, data: CharacterInfo) {
    const character = new CharacterData(formattedName, data, this.extensionName);
    this.dataset.push(character);
  }
  getTranslates(): Record<string, string> {
    const ret: Record<string, string> = {
      [this.id]: this.name,
    };

    for (const character of this.dataset) {
      Object.assign(ret, character.getTranslates());
    }

    return ret;
  }
}
