declare global
{
	interface HTMLElement
	{
		getChildById<T = HTMLElement>(id: string): T | null;
	}
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

export default function ()
{
	HTMLElement.prototype.getChildById = function getChildById<T = HTMLElement>(id: string): T | null
	{
		return this.querySelector(`[data-id="${id}"]`) as T | null;
	};

};