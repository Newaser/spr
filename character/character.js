/** @type { importCharacterConfig['character'] } */
const character = {
	spr_shenpei: {
		sex: "male",
		group: "qun",
		hp: "2/3/0",
		skills: ["spr_liezhi", "spr_shouye"],
	},
};

for (let i in character) {
	character[i].img = "extension/☆SPR/image/character/standard/" + i + ".jpg";
	character[i].dieAudios = ["../extension/☆SPR/audio/die/" + i + ".mp3"];
}

export default character;
