import Application from './index.js';
import { Hiragana } from './interfaces.js';

class GameManager
{
	root: HTMLElement;
	buttons: HTMLButtonElement[];
	title: HTMLElement;
	currentIndex: number = 0;
	constructor(context: HTMLElement)
	{
		this.root = context;
		this.buttons = [];

		for (let i = 0; i < Application.difficulty; i++)
		{
			let button = document.createElement('button');
			button.dataset["id"] = `answer-button-${i}`;

			this.root.appendChild(button);

			this.buttons.push(button);
		}

		this.title = this.root.getChildById("quiz-question")!;
	}

	public fillBoard()
	{
		// fill the buttons and title with values from Application.hiragana
		// use the Application.difficulty to determine which indexes to use

		for(let button of this.buttons)
		{
			button.disabled = false;
			button.dataset["correct"] = "0";
		}

		// grab at least the number of items in the level
		if(this.currentIndex++ >= Application.hiragana[Application.currentLevel].length)
		{
			this.currentIndex = 0;
			Application.currentLevel++;
		}

		let hiragana = Application.hiragana[Application.currentLevel];
		let answer = randomValue(hiragana);
		let fakes = this.getFakes(answer);
		if(fakes.length != Application.difficulty - 1)
		{
			debugger;
		}

		let guesses = [answer, ...fakes];
		guesses.sort(() => Math.random() - 0.5);

		let useEnglishTitle = randomInt(0, 1) == 1;
		let title = useEnglishTitle ? answer.roumaji : answer.kana;
		this.title.innerText = title;

		this.fillButtons(guesses, useEnglishTitle, answer);
	}

	private fillButtons(guesses: Hiragana[], useEnglishTitle: boolean, answer: Hiragana)
	{
		for (let i = 0; i < guesses.length; i++)
		{
			let button = this.buttons[i];
			let guess = guesses[i];
			let text = useEnglishTitle ? guess.kana : guess.roumaji;
			button.innerText = text;
			if (guess == answer)
			{
				button.dataset["correct"] = "1";
			}
			button.onclick = (event: PointerEvent | MouseEvent) =>
			{
				if (button.dataset["correct"] == '1')
				{
					// TODO: increment character correct counter.
					// TODO: increment level counter.
					this.fillBoard();
				}

				else
				{
					button.disabled = true;
				}
			};
		}
	}

	getFakes(answer: Hiragana)
	{
		let arr:Hiragana[] = [];
		
		for(let i = 0; i <= Application.maxLevel; i++)
		{
			// copy the level to modify
			let level = [...Application.hiragana[i]];
			while(level.length > 0)
			{
				let value = randomValue(level);
				if(value !== answer)
				{
					arr.push(value);
				}
				level.splice(level.indexOf(value), 1);
				if(arr.length === Application.difficulty - 1)
				{
					return arr;
				}
			}
		}

		return arr;
	}
}

function setState(...args: any[])
{

}


function randomValue<T>(arr: T[]): T
{
	return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number = 0, max: number = 1)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default function (context: HTMLElement)
{
	let game = new GameManager(context);
	game.fillBoard();

}