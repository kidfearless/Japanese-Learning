import Application from './index.js';

class GameManager
{
	root: HTMLElement;
	buttons: HTMLButtonElement[];
	title: HTMLElement;
	constructor(context:HTMLElement)
	{
		this.root = context;
		this.buttons = [];
		for(let i = 0; i < 4; i++)
		{
			this.buttons.push(this.root.getChildById(`answer-button-${i}`) as HTMLButtonElement);
		}

		console.assert(this.buttons.length === 4, "There should be 4 buttons");

		this.title = this.root.getChildById("quiz-question")!;
	}

	public fillBoard()
	{
		for(let button of this.buttons)
		{
			button.style.backgroundColor = "#444";
			button.disabled = false;
		}
		let hiragana = randomValue(Application.hiragana);
		
		let useEnglish = Math.random() > 0.5;



		// could probably simplify this
		if(useEnglish)
		{
			this.title.innerText = hiragana.roumaji;
			for(let i = 0; i < 4; i++)
			{
				let randomCharacter = randomValue(Application.hiragana);
				this.buttons[i].innerText = randomCharacter.kana;
				this.buttons[i].onclick = () =>
				{
					// set the background color to red
					this.buttons[i].style.backgroundColor = "red";
					// disable the button;
					this.buttons[i].disabled = true;
				}
			}

			// fill in the correct answer
			let correctAnswerIndex = randomInt(0, 3);
			this.buttons[correctAnswerIndex].innerText = hiragana.kana;

			// fill in a new board on click
			this.buttons[correctAnswerIndex].onclick = () =>
			{
				this.fillBoard();
			}
		}
		else
		{
			this.title.innerText = hiragana.kana;
			for(let i = 0; i < 4; i++)
			{
				let randomCharacter = randomValue(Application.hiragana);
				this.buttons[i].innerText = randomCharacter.roumaji;
				this.buttons[i].onclick = () =>
				{
					// set the background color to red
					this.buttons[i].style.backgroundColor = "red";
					// disable the button;
					this.buttons[i].disabled = true;
				}
			}

			// fill in the correct answer
			let correctAnswerIndex = randomInt(0, 3);
			this.buttons[correctAnswerIndex].innerText = hiragana.roumaji;

			// fill in a new board on click
			this.buttons[correctAnswerIndex].onclick = () =>
			{
				this.fillBoard();
			}
		}

	}
}


function randomValue<T>(arr: T[]): T
{
	return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min:number = 0, max:number = 1)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default function (context: HTMLElement)
{
	let game = new GameManager(context);
	game.fillBoard();

}