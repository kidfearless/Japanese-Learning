import Application from './index.js';

export default function (context: HTMLElement)
{
	context.getChildById("start-button")!.onclick = function ()
	{
		Application.setTemplate('select-type-template');
	}
}