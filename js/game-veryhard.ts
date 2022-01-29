import Application from './index.js';
import { Hiragana, GameDifficulty, IGameManager } from './interfaces.js';

import * as Handwriting from './handwriting.js';


class VeryHardGameManager implements IGameManager
{
	root: HTMLElement;
	title: HTMLElement;
	canvasBox: HTMLCanvasElement;
	hintBox: HTMLElement;
	handwriting: Handwriting.Canvas;
	answer: Hiragana | null;
	questionPool: Hiragana[];
	resetButton: HTMLButtonElement;
	constructor(context: HTMLElement)
	{
		this.root = context;

		this.questionPool = Application.hiragana.flat().sort(() => Math.random() - 0.5);
		this.answer = null;

		this.canvasBox = context.getChildById<HTMLCanvasElement>("writing-box")!;
		this.hintBox = context.getChildById<HTMLElement>("hint-box")!;
		this.title = this.root.getChildById("quiz-question")!;
		this.resetButton = this.root.getChildById<HTMLButtonElement>("reset-button")!;

		this.handwriting = new Handwriting.Canvas(this.canvasBox);
		this.handwriting.cxt.strokeStyle = "white";

		this.handwriting.ondraw = this.onDraw.bind(this);
		this.resetButton.onclick = () => this.handwriting.erase();
	}


	public start()
	{
		this.reset();

		let answer = this.answer = this.getQuestion();

		this.hintBox.onclick = () => 
		{
			this.title.innerText = `${answer.roumaji}\n${answer.kana}`;
		};

		this.title.innerText = `${answer.roumaji}`;
	}

	private reset()
	{
		this.handwriting.erase();
	}

	private getQuestion()
	{
		let answer = randomValue(this.questionPool);
		// remove the answer from the levelProgress
		this.questionPool.splice(this.questionPool.indexOf(answer), 1);
		return answer;
	}


	private async onDraw(canvas: Handwriting.Canvas)
	{
		let response = await canvas.recognize({ language: "ja" });

		if(response.characters[0] === this.answer?.kana)
		{
			this.start();
		}

		console.info(response);
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
	let game = new VeryHardGameManager(context);
	Application.currentGame = game;

	game.start();

}