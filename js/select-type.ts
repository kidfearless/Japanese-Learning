import Application, { GameDifficulty } from './index.js';


export default function (context: HTMLElement)
{
	let buttons = context.querySelectorAll('button');
	for(let i = 0; i < buttons.length; i++)
	{
		buttons[i].onclick = function (event:PointerEvent | MouseEvent)
		{
			let button = event.target as HTMLButtonElement;
			let difficulty = button.dataset["difficulty"] as keyof typeof GameDifficulty;
			Application.difficulty = GameDifficulty[difficulty];
			Application.setTemplate('game-template');
		}
	}
}