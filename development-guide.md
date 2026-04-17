# FreeKill-like 无名杀扩展开发指南

本文档用于指导开发者如何在本项目的特色框架（Freekill-like）中**添加武将与技能**，以及如何正确组织资源与提交代码。

---

# 1. 什么是 FreeKill-like ？

即“**类新月杀**”模式。本扩展采用了武将、技能、卡牌等元素的单元化模式，类似于新月杀组织这些元素的风格。具体表现为：
1. 底层的配置代码与业务逻辑解耦，使得开发者能更专注于业务逻辑；
2. 一块代码完成一个武将的所有内容，包括名字、信息、台词、语音、翻译等；
3. 武将按子包划分，不同子包在不同目录里分隔开；
4. 一个技能一个文件，使得技能更加模块化，便于管理；
5. ……

# 2. 准备工作

如果你用的是VS Code，推荐你加入以下代码模板（添加方式：打开VS Code，然后 `Ctrl + Shift + P` -> `Snippets: Configure Snippets` -> `javascript` ，添加下面代码并保存。以后就能通过快捷短语来召唤这些模板了），以便开发：
```json
{
  "Noname Add Character Template": {
    "prefix": "nnct",
    "body": [
      "pkg.addCharacter(\"${1:id}|${2:name}\", {",
      "  character: new Character({",
      "    sex: \"${3:male}\",",
      "    group: \"${4:shu}\",",
      "    hp: ${5:4},",
      "    skills: [\"${6:skill1}\", \"${7:skill2}\"],",
      "  }),",
      "  intro: \"${8:intro text}\",",
      "  title: \"${9:title}\",",
      "  dieVoice: \"${10:die voice}\",",
      "  victoryVoice: \"${11:victory voice}\",",
      "  rank: \"${12:a}\",",
      "  rarity: \"${13:common}\",",
      "  audioRedirect: {",
      "    \"${14:skill id}\": [\"${15:voice1}\", \"${16:voice2}\"],",
      "  },",
      "})"
    ],
    "description": "无名杀添加武将模板"
  },
  "Noname Add Skill Template": {
    "prefix": "nnst",
    "body": [
      "import { SkillData } from \"../../import/structs.js\";",
      "import { lib, game, ui, get, ai, _status } from \"../../../../noname.js\";",
      "",
      "export default new SkillData(\"${1:skill_id}|${2:skill_name}\", {",
      "  description: \"${3:description}\",",
      "  voices: [",
      "    \"${4:voice1}\",",
      "    \"${5:voice2}\",",
      "  ],",
      "  skill: {",
      "    ${6}",
      "  },",
      "});"
    ],
    "description": "无名杀添加技能模板"
  },
  "Noname Index Skill Template": {
    "prefix": "nnis",
    "body": [
      "import ${1:name} from \"./${1}.js\";"
    ],
    "description": "无名杀技能索引模板"
  }
}
```

# 3. 项目结构
作为业务开发者，你只需要知道以下内容（PS：以当前目录为根目录，下同）
1. `./package/character` 目录下存放**创建武将包**（即子扩展包）以及**创建武将**的代码；
2.  `./skill/character` 目录下存放**创建武将技能**的代码；
3.  `./import` 目录下存放导入武将、技能等游戏元素的一些工具类，在实际创建武将/技能等元素时会用到；
4.  `./image/character`、`./audio/die`、`./audio/skill`目录下存放插画和语音等素材文件。
5.  武将的创建是基于子包的。换句话说，每个武将必须归属于一个子包，否则将会用原始的办法才能创建武将。

# 4. 创建子包

`./package/character` 目录下里存放着所有子包以及武将的信息。想要创建子包，要用到三步走战略（之后创建技能也类似），这里拿创建 `sprTest` （中文译名“☆SPR·测试”）来举例：
1. 新建文件 `./package/character/sprTest.js` 并输入：
```javascript
import { CharacterPackageMaker } from "../../import/importers.js";
import { Character } from "../../../../noname/library/element/index.js";

const pkg = new CharacterPackageMaker("sprTest|☆SPR·测试");

export default pkg

```
2. 打开 `./package/character/index.js` ，添加包索引：
```javascript
import spr1 from "./spr1.js";
// import spr2 from "./spr2.js";
// import spr3 from "./spr3.js";
import sprTest from "./sprTest.js"; // 添加 import

export default [
	spr1,
	// spr2,
	// spr3,
    sprTest, // 添加 export
];
```
3. 返回 `./package/character/sprTest.js` ，并完善这个子包内容（即添加武将）。

# 5.创建武将

本章教你如何在本框架下创建武将，我将拿 `spr_guanyu` （译名“星关羽”）举例。

## 5.1.素材准备
1. 将武将插画 `spr_guanyu.jpg` 放入 `./image/character` 目录下；
2. 将武将阵亡语音 `spr_guanyu.mp3` 放入 `./audio/die` 目录下；
3. 准备好武将的名字、性别、血量等基本信息，以及阵亡台词等文本信息。

## 5.2.添加武将
打开 `./package/character/sprTest.js` 添加以下代码（可以用`nnct`热解快捷创建）
```javascript
...
const pkg = new CharacterPackageMaker("sprTest|☆SPR·测试");

pkg.addCharacter("spr_guanyu|星关羽", {
  character: new Character({
    sex: "male",
    group: "wei",
    hp: 4,
    skills: ["wusheng", "spr_biyue"],
  }),
  intro: "建安五年，曹操东征刘备，关羽兵败被俘，暂时投靠曹操。参加官渡之战，诛杀颜良，解白马之围，受封汉寿亭侯。得知刘备下落后，前往投奔。",
  title: "单骑千里",
  dieVoice: "大哥，三弟，云长去矣……",
  rank: "a",
  rarity: "common",
  audioRedirect: {
    "wusheng": [
      "可知关某之威！", 
      "关某既出，敌将定皆披靡！"
    ],
  },
});

export default pkg;
```
这样就算添加好了。

## 5.3.语音重定向
此添加武将法支持便捷地对已有技能的语音进行重定向。不能难注意到以上代码有这样一个条目：
```javascript
  audioRedirect: {
    "wusheng": [
      "可知关某之威！", 
      "关某既出，敌将定皆披靡！"
    ],
  },
```
这正是 `spr_guanyu` 在使用标武圣时能发的不同于原版技能的语音，以及这两句语音对应的台词。不过仅仅是这样还不行，要加入相关的文件，格式为

> `<技能id>__<武将id><语音编号>.mp3`

所以关羽这两句武圣语音的文件名就应该是
   - `wusheng__spr_guanyu1.mp3`
   - `wusheng__spr_guanyu2.mp3`

最后放于 `./audio/skill` 目录下。

# 6.创建武将技能
与创建子包类似，也分为三步。这里拿 `spr_biyue` （译名“闭月”）举例：
1. 新建文件 `./skill/character/biyue.js` 并输入（可以用`nnst`热解快捷创建）：
```javascript
import { SkillData } from "../../import/structs.js";
import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

export default new SkillData("spr_biyue|闭月", {
  description: "结束阶段，你可以摸一张牌。",
  voices: [
    "失礼了。",
    "羡慕吧。",
  ],
  skill: {
    
  },
});
```
然后将准备好的

  - `spr_biyue1.mp3`
  - `spr_biyue2.mp3`

放于 `./audio/skill` 目录下。

2. 打开 `./skill/character/index.js` ，添加技能索引：
```javascript
import liezhi from "./liezhi.js";
import shouye from "./shouye.js";
import biyue from "./biyue.js"; // 添加 import，可用 `nnis` 热键快捷添加

export default [
  liezhi,
  shouye,
  biyue, // 添加 export
];
```
3. 返回 `./skill/character/biyue.js` ，在 `skill: { ... }` 中添加业务代码即可。
