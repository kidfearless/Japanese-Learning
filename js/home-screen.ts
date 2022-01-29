import Application from './index.js';
import { Views } from './interfaces.js';

export default function (context: HTMLElement)
{
	context.getChildById("start-button")!.onclick = function ()
	{
		Application.setTemplate(Views.SelectType);
	}
}