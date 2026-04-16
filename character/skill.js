import { lib, game, ui, get, ai, _status } from "../../../noname.js";

/**
 * @type {importCharacterConfig['skill']}
 */
const skill = {
  spr_liezhi: {
    audio: "ext:☆SPR/audio/spr_shenpei:2",
    init(player, skill) {
      player.addMark("spr_liezhi", 1, false)
    },
    log: false,
    enable: "phaseUse",
    usable: 1,
    async precontent(event, trigger, player) {
      player.logSkill("spr_liezhi")
      await player.damage({ num: player.countMark("spr_liezhi"), nosource: true })
      player.addMark("spr_liezhi", 1, false)
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
        return "下次烈直的伤害：" + player.countMark("spr_liezhi")
      },
    },
    ai: {
      result: {
        target(player, target, card) {
          let nh = target.countCards("h")
          if (get.mode() == "identity") {
            if (target.isZhu && nh <= 2 && target.hp <= 1) return -100
          }
          if (nh == 0) return -2
          if (nh == 1) return -1.7
          return -1.5
        },
        target_use(player, target) {
          if (player.hasUnknown(2) && get.mode() != "guozhan") return 0
          let nh = target.countCards("h")
          if (get.mode() == "identity") {
            if (target.isZhu && nh <= 2 && target.hp <= 1) return -100
          }
          if (nh == 0) return -2
          if (nh == 1) return -1.7
          return -1.5
        },
        player(player) {
          const saveCards = player.countCards("h", i =>
            get.tag(i, "save")
          )
          const damage = player
            .getEquips(2)
            .some(i => i.name == "baiyin")
            ? 1
            : player.countMark("spr_liezhi")
          if (damage >= player.hp + saveCards) return -Infinity
          if (
            player.hasSkill("spr_shouye") &&
            !player.storage.spr_shouye
          )
            return Math.min(player.getDamagedHp(true), 2 - damage) * 2
          return -damage * 2
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
            return 0
        }
      },
    },
  },
  spr_shouye: {
    // audio: "ext:☆SPR/audio/spr_shenpei/integrated:4",
    // audioname: ["spr_shouye_1", "spr_shouye_2"],
    mark: true,
    marktext: "☯",
    zhuanhuanji: true,
    intro: {
      content(storage, player, skill) {
        return storage ?
          "当你造成伤害后，你可以弃置至多两名角色各一张牌。" :
          "当你受到伤害后，你可以回复2点体力。"
      },
    },
    group: ["spr_shouye_1", "spr_shouye_2"],
    subSkill: {
      "1": {
        audio: "ext:☆SPR/audio/spr_shenpei:2",
        trigger: {
          player: "damageEnd",
        },
        filter(event, player) {
          return !player.storage.spr_shouye && player.isDamaged()
        },
        prompt2: "当你受到伤害后，你可以回复2点体力。",
        check(event, player, triggername, target) {
          return player.maxHp < 3 || player.getDamagedHp() >= 2
        },
        async content(event, trigger, player) {
          player.changeZhuanhuanji("spr_shouye")
          await player.recover({ num: 2 })
        },
        ai: {
          threaten(player) {
            if (player.storage.spr_shouye)
              return
            return 0.9
          },
          skillTagFilter(player, tag, arg) {
            return !player.storage.spr_shouye
          },
          tag: {
            "maixie_defend": 1,
          },
        },
      },
      "2": {
        audio: "ext:☆SPR/audio/spr_shenpei:2",
        trigger: {
          source: "damageSource",
        },
        filter(event, player, name, target) {
          return player.storage.spr_shouye
        },
        direct: true,
        async content(event, trigger, player) {
          /** @type {Result} */
          const result = await player
            .chooseTarget({
              prompt: get.prompt("spr_shouye"),
              prompt2: "当你造成伤害后，你可以弃置至多两名角色各一张牌。",
              filterTarget: (card, player, target) => {
                return target.countCards("he") > 0
              },
              selectTarget: [1, 2],
              ai: target => {
                return 1 - get.attitude(get.player(), target)
              },
            })
            .forResult()
          if (result.bool) {
            player.changeZhuanhuanji("spr_shouye")
            result.targets.sortBySeat(_status.currentPhase)
            event.targets = result.targets
            player.line(result.targets, "green")
            player.logSkill("spr_shouye_2", result.targets)

            for (const target of result.targets) {
              await player.discardPlayerCard({
                forced: true,
                target: target,
              })
            }
          }
        },
      },
    },
  },
};

export default skill;