/**
 * @typedef {(string | number | boolean)} AudioInfoItem
 * @typedef {(AudioInfoItem[] | string | number | boolean)} AudioInfo
 */

const note = {
  /**
   * 
   * @param {GameEvent} event 
   * @param {Player} player 
   * @param {string} name trigger name
   * @param {number} indexedData 
   * @param {GameEvent} evt cost result
   * @returns {AudioInfo}
   */
  logAudio: function (event, player, name, indexedData, evt) {
    return true
  }
}