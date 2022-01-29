declare global
{
	interface HTMLElement
	{
		getChildById<T = HTMLElement>(id: string): T | null;
	}
}

export enum Views
{
	Start = 'start-template',
	SelectType = 'select-type-template',
	Game = 'game-template',
	GameVeryHard = 'game-veryhard-template'
}


export enum GameDifficulty
{
	/**
	 * Gives two options to pick from while playing.
	 */
	Easy = 2,
	/**
	 * Gives four options to pick from while playing.
	 */
	Medium = 4,
	/**
	 * Gives eight options to pick from while playing.
	 */
	Hard = 8,
	/**
	 * [NOT IMPLEMENTED YET]
	 * Forces user too fill in the blank.
	 */
	VeryHard = -1
}



export interface Hiragana
{
	/**
	 * the Japanese hyrogliphics
	 *
	 * @type {string}
	 * @memberof Hiragana
	 */
	kana: string,
	/**
	 * The english translation of the kana
	 *
	 * @type {string}
	 * @memberof Hiragana
	 */
	roumaji: string,
}

export interface IGameManager
{
	start(): void;
}

HTMLElement.prototype.getChildById = function getChildById<T = HTMLElement>(id: string): T | null
{
	return this.querySelector(`[data-id="${id}"]`) as T | null;
}
