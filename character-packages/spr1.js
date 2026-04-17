import { CharacterPackageMaker } from "../pack.ts";
import { Character } from "../../../noname/library/element/index.js";

const pkg = new CharacterPackageMaker("spr1|☆SPR·其一");

pkg.addCharacter("spr_shenpei|星审配", {
  character: new Character({
		sex: "male",
		group: "qun",
		hp: 2,
		maxHp: 3,
		skills: ["spr_liezhi", "spr_shouye"],
  }),
  // no intro
  title: "正南义北",
  rank: "a",
  rarity: "rare",
})

export default pkg
