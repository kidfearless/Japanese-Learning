declare global
{
	interface HTMLElement
	{
		getChildById<T = HTMLElement>(id: string): T | null;
	}
}


export default function ()
{
	HTMLElement.prototype.getChildById = function getChildById<T = HTMLElement>(id: string): T | null
	{
		return this.querySelector(`[data-id="${id}"]`) as T | null;
	};

};