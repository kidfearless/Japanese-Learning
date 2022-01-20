import Application from './index.js';


export default function (context: HTMLElement)
{
	
	context.getChildById<HTMLButtonElement>("select-type-button")!.onclick = () =>
	{
		let hiragana = context.getChildById<HTMLInputElement>("hiragana")!.checked;
		let katakana = context.getChildById<HTMLInputElement>("katakana")?.checked || false;
		let kanji = context.getChildById<HTMLInputElement>("kanji")?.checked || false;
		
		Application.hasHiragana = hiragana;
		Application.setTemplate('game-template');
	}
}