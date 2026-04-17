export const DEFAULT_EXTENSION_NAME = '☆SPR';

type Character = import('@/library/element/character.js').Character

/**
 * 武将评级
 */
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

/**
 * 武将信息
 * 
 * 包含武将的基本信息、介绍、称号、评级、稀有度、台词等。
 */
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

/**
 * 技能信息
 * 
 * 包含技能的名称、代码、描述、台词等。
 */
export interface SkillInfo {
  /** 
   * 技能代码
   * */
  skill: Skill;
  /** 
   * 技能描述
   * */
  description?: string;
  /** 
   * 技能台词
   * */
  voices?: string[];
  /**
   * 技能包含的文本信息
   */
  texts?: Record<string, string>;
}

type Info = CharacterInfo | SkillInfo;

/**
 * 抽象数据类
 * 
 * 包含此类型的数据的id、名称、信息等。
 */
abstract class AbstractData {
  /**
   * 此类型的数据对应的id
   */
  id: string;
  /**
   * 此类型的数据对应的译名
   */
  name?: string;
  /**
   * 此类型的数据对应的信息
   */
  info: Info;
  /**
   * 扩展名
   */
  protected extensionName: string;

  constructor(formattedName: string, data: Info, extensionName: string) {
    const [id, name] = formattedName.split('|');
    this.id = id;
    this.name = name || undefined;
    this.info = data;
    this.extensionName = extensionName;
  }

  /**
   * 获取此类型数据的相关翻译文本
   */
  abstract getTranslates(): Record<string, string>
}

/**
 * 武将数据
 */
export class CharacterData extends AbstractData {
  /**
   * 武将信息
   */
  declare info: CharacterInfo;

  /**
   * 创建一个武将数据对象，用于存储武将的id、名称、信息等。
   * @param formattedName 格式化的武将名称，格式为 "id|译名"
   * @param data 武将数据
   * @param extensionName 扩展名
   */
  constructor(formattedName: string, data: CharacterInfo, extensionName: string) {
    super(formattedName, data, extensionName);
  }

  /**
   * 获取武将相关的翻译文本
   */
  getTranslates() {
    const ret: Record<string, string> = {};

    if (this.name !== undefined) {
      ret[this.id] = this.name;
    }
    if (this.info.dieVoice !== undefined) {
      ret[`#ext:${this.extensionName}/audio/die/${this.id}:die`] = this.info.dieVoice;
      ret[`#${this.id}:die`] = this.info.dieVoice;
    }
    return ret;
  }
}

/**
 * 技能数据
 */
export class SkillData extends AbstractData {
  /**
   * 技能信息
   */
  declare info: SkillInfo;

  /**
   * 创建一个技能数据对象，用于存储技能的id、名称、信息等。
   * @param formattedName 格式化的技能名称，格式为 "id|译名"
   * @param data 技能数据
   * @param extensionName 扩展名
   */
  constructor(formattedName: string, data: SkillInfo, extensionName?: string) {
    super(formattedName, data, extensionName || DEFAULT_EXTENSION_NAME);
  }

  /**
   * 获取技能相关的翻译文本
   */
  getTranslates() {
    const ret: Record<string, string> = {};

    if (this.name !== undefined) {
      ret[this.id] = this.name;
    }
    if (this.info.description !== undefined) {
      ret[this.id + "_info"] = this.info.description;
    }
    if (Array.isArray(this.info.voices)) {
      for (let i = 0; i < this.info.voices.length; i++) {
        const voice = this.info.voices[i];
        ret[`#ext:${this.extensionName}/audio/skill/${this.id}${i}`] = voice;
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
