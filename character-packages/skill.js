import { lib, game, ui, get, ai, _status } from "../../../noname.js";

/**
 * @type {importCharacterConfig['skill']}
 */
const skill = {
  spr_liezhi: {
    audio: "ext:☆SPR/audio/spr_shenpei:2",
    init(player, skill) {
      player.addMark("spr_liezhi", 1, false);
    },
    log: false,
    enable: "phaseUse",
    usable: 1,
    async precontent(event, trigger, player) {
      player.logSkill("spr_liezhi");
      await player.damage({ num: player.countMark("spr_liezhi"), nosource: true });
      player.addMark("spr_liezhi", 1, false);
    },
    selectCard: -1,
    filterCard: (card, player) => false,
    viewAs: {
      name: "wanjian",
      isCard: true,
    },
    intro: {
      name2: "烈直",
      content(storage, player, skill) {
        return "下次烈直的伤害：" + player.countMark("spr_liezhi");
      },
    },
    ai: {
      result: {
        target(player, target, card) {
          const nh = target.countCards("h");
          if (get.mode() == "identity") {
            if (target.isZhu && nh <= 2 && target.hp <= 1) return -100;
          }
          if (nh == 0) return -2;
          if (nh == 1) return -1.7;
          return -1.5;
        },
        target_use(player, target) {
          if (player.hasUnknown(2) && get.mode() != "guozhan") return 0;
          const nh = target.countCards("h");
          if (get.mode() == "identity") {
            if (target.isZhu && nh <= 2 && target.hp <= 1) return -100;
          }
          if (nh == 0) return -2;
          if (nh == 1) return -1.7;
          return -1.5;
        },
        player(player) {
          const saveCards = player.countCards("h", i =>
            get.tag(i, "save")
          );
          const damage = player
            .getEquips(2)
            .some(i => i.name == "baiyin")
            ? 1
            : player.countMark("spr_liezhi");
          if (damage >= player.hp + saveCards) return -Infinity;
          if (
            player.hasSkill("spr_shouye") &&
            !player.storage.spr_shouye
          )
            return Math.min(player.getDamagedHp(true), 2 - damage) * 2;
          return -damage * 2;
        },
      },
      basic: {
        order: 9,
        useful: 1,
        value: 5,
      },
      tag: {
        respond: 1,
        respondShan: 1,
        damage: 1,
        multitarget: 1,
        multineg: 1,
      },
      /**
       * 
       * @param {Player} target 
       * @param {Card} card 
       * @param {Player} player 
       * @param {Player} viewer 
       * @param {number} status 
       * @returns {number|void}
       */
      wuxie(target, card, player, viewer, status) {
        if (
          get.attitude(viewer, target) > 0 &&
          target.countCards("h", "shan")
        ) {
          if (
            !target.countCards("h") ||
            target.hp == 1 ||
            Math.random() < 0.7
          )
            return 0;
        }
      },
    },
  },
  spr_shouye: {
    audio: "ext:☆SPR/audio/spr_shenpei/integrated:4",
    mark: true,
    marktext: "☯",
    zhuanhuanji: true,
    intro: {
      content(storage, player, skill) {
        return storage ?
          "当你造成伤害后，你可以弃置至多两名角色各一张牌。" :
          "当你受到伤害后，你可以回复2点体力。";
      },
    },
    trigger: {
      player: "damageEnd",
      source: "damageSource",
    },
    filter(event, player, name, target) {
      if (name == "damageEnd") {
        return !player.storage.spr_shouye && player.isDamaged();
      }
      if (name == "damageSource") {
        return player.storage.spr_shouye;
      }
    },
    async cost(event, trigger, player) {
      if (!player.storage.spr_shouye) {
        event.result = await player.chooseBool({
          prompt: get.prompt("spr_shouye"),
          prompt2: "当你受到伤害后，你可以回复2点体力。",
          ai: (event, player) => {
            return player.maxHp < 3 || player.getDamagedHp() >= 2;
          }
        }).forResult();
      } else {
        event.result = await player.chooseTarget({
          prompt: get.prompt("spr_shouye"),
          prompt2: "当你造成伤害后，你可以弃置至多两名角色各一张牌。",
          filterTarget: (card, player, target) => {
            return target.countCards("he") > 0;
          },
          selectTarget: [1, 2],
          ai: target => {
            return 1 - get.attitude(get.player(), target);
          },
        }).forResult();
      }
    },
    /**
     * @param {GameEvent} event 
     * @param {Player} player 
     * @param {string} name trigger name
     * @param {number} indexedData 
     * @param {GameEvent} evt cost result
     */
    logAudio(event, player, name, indexedData, evt) {
      let idx = [1, 2].randomGet();
      if (player.storage.spr_shouye) idx += 2;
      return "ext:☆SPR/audio/spr_shenpei/integrated/spr_shouye" + idx + ".mp3";
    },
    async content(event, trigger, player) {
      player.changeZhuanhuanji("spr_shouye");
      if (player.storage.spr_shouye) {
        await player.recover({ num: 2 });
      } else {
        for (const target of event.targets.sortBySeat(_status.currentPhase)) {
          await player.discardPlayerCard({
            forced: true,
            target: target,
          });
        }
      }
    },
    ai: {
      threaten(player) {
        if (player.storage.spr_shouye === false)
          return 0.9;
      },
      skillTagFilter(player, tag, arg) {
        return !player.storage.spr_shouye;
      },
      tag: {
        "maixie_defend": 1,
      },
    },
  },
};

export default skill;