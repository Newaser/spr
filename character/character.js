import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import { Card, Character, GameEvent, Player, VCard } from "../../../noname/library/element/index.js";
/** equals to `importCharacterConfig['character']`
 * @type { Record<string, Character> } 
 * */
const character = {
	spr_shenpei: new Character({
		sex: "male",
		group: "qun",
		hp: 2,
		maxHp: 3,
		skills: ["spr_liezhi", "spr_shouye"],
	}),
};

for (let i in character) {
	character[i].img = "extension/☆SPR/image/character/standard/" + i + ".jpg";
	character[i].dieAudios = ["ext:☆SPR/audio/die/" + i + ".mp3"];
}

export default character;
