type AudioInfo = AudioInfo[] | string | number | boolean;

/**
 * 播放音频
 * @param event 当前事件或触发事件
 * @param player 
 * @param name triggername
 * @param indexedData trigger times的索引
 * @param result cost事件的result
 * @returns
 */
export type LogAudioFunc = (
	event: GameEvent,
	player: Player,
	name?: string,
	indexedData?: number,
	result?: Result
) => AudioInfo;
