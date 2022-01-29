import Application from './index.js';
import { Hiragana, GameDifficulty, IGameManager } from './interfaces.js';


class GameManager implements IGameManager
{
	root: HTMLElement;
	buttons: HTMLButtonElement[];
	title: HTMLElement;
	currentIndex: number = 0;
	levelProgress: Hiragana[];
	textBox: HTMLInputElement;
	hintBox: HTMLElement;
	constructor(context: HTMLElement)
	{
		this.root = context;
		this.buttons = [];
		this.levelProgress = [];

		for (let i = 0; i < Application.difficulty; i++)
		{
			let button = document.createElement('button');
			button.dataset["id"] = `answer-button-${i}`;

			this.root.appendChild(button);

			this.buttons.push(button);
		}

		this.textBox = document.createElement('input');
		this.textBox.type = 'text';
		this.textBox.placeholder = 'Enable Japanese Keyboard In Settings';
		this.textBox.style.visibility = 'hidden';

		this.root.appendChild(this.textBox);

		this.hintBox = document.createElement('span');
		this.hintBox.classList.add('hint');
		this.hintBox.innerText = '❔';

		this.root.appendChild(this.hintBox);

		this.title = this.root.getChildById("quiz-question")!;
	}


	public start()
	{
		// fill the buttons and title with values from Application.hiragana
		// use the Application.difficulty to determine which indexes to use

		this.reset();

		if (this.levelProgress.length === 0)
		{
			this.levelProgress = [...Application.hiragana[Application.currentLevel]];
		}
		// grab at least the number of items in the level
		if (this.currentIndex++ >= Application.hiragana[Application.currentLevel].length)
		{
			this.currentIndex = 0;
			Application.currentLevel++;
			this.levelProgress = [...Application.hiragana[Application.currentLevel]];
		}

		let answer = this.getQuestion();


		if (Application.difficulty === GameDifficulty.VeryHard)
		{
			this.hintBox.onclick = () => 
			{
				this.title.innerText = `${answer.roumaji}\n${answer.kana}`;
			};
			this.title.innerText = `${answer.roumaji}`;
			this.fillWriting(answer);
		}
		else
		{
			let fakes = this.getFakes(answer);


			let guesses = [answer, ...fakes];
			guesses.sort(() => Math.random() - 0.5);
			let useEnglishTitle = randomInt(0, 1) == 1;

			let title = useEnglishTitle ? answer.roumaji : answer.kana;
			this.title.innerText = title;
			this.fill(guesses, useEnglishTitle, answer);
		}

	}

	private reset()
	{
		for (let button of this.buttons)
		{
			button.disabled = false;
			button.dataset["correct"] = "0";
			button.style.visibility = Application.difficulty == GameDifficulty.VeryHard ? "hidden" : "visible";
		}

		this.textBox.style.visibility = Application.difficulty == GameDifficulty.VeryHard ? "visible" : "hidden";
		if (this.textBox.value)
		{
			this.textBox.placeholder = "";
		}
		this.textBox.value = "";
	}

	private fillWriting(answer: Hiragana)
	{
		this.textBox.oninput = (event: Event) =>
		{
			let input = event.target as HTMLInputElement;
			let correct = input.value === answer.kana;
			if (correct)
			{
				input.classList.add('correct');
				this.start();
			}
			else
			{
				input.classList.add('wrong');
			}
		};
	}

	private fill(guesses: Hiragana[], useEnglishTitle: boolean, answer: Hiragana)
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
					this.start();
				}

				else
				{
					button.disabled = true;
				}
			};
		}
	}

	private getQuestion()
	{
		let answer = randomValue(this.levelProgress);
		// remove the answer from the levelProgress
		this.levelProgress.splice(this.levelProgress.indexOf(answer), 1);
		return answer;
	}

	private getFakes(answer: Hiragana)
	{
		let difficulty = Application.difficulty == GameDifficulty.VeryHard ? GameDifficulty.Hard : Application.difficulty;

		let arr: Hiragana[] = [];


		// flatten the levels from the start of the array to the current level
		let answerPack = Application.hiragana.slice(0).flat();

		while (arr.length < difficulty - 1)
		{
			if (answerPack.length == 0)
			{
				answerPack = [...Application.hiragana[Application.currentLevel]];
			}
			let answer = randomValue(answerPack);
			if (!arr.includes(answer))
			{
				arr.push(answer);
			}

			answerPack = answerPack.filter(x => x != answer);
		}

		return arr;
	}
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
	Application.currentGame = game;

	game.start();

}