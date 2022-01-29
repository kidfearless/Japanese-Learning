let serviceWorkerInstance = await navigator.serviceWorker.register("serviceworker.js");


import { IGameManager } from "./game.js";
import interfaces from "./interfaces.js";
import { Hiragana } from './interfaces.js';
interfaces();

export enum GameDifficulty
{
	/**
	 * Gives two options to pick from while playing.
	 */
	Easy = 2,
	/**
	 * Gives four options to pick from while playing.
	 */
	Medium = 4,
	/**
	 * Gives eight options to pick from while playing.
	 */
	Hard = 8,
	/**
	 * [NOT IMPLEMENTED YET]
	 * Forces user too fill in the blank.
	 */
	VeryHard = -1
}

class ApplicationManager
{
	root: HTMLElement;
	templateContext: HTMLElement;
	difficulty: GameDifficulty = GameDifficulty.Medium;
	currentLevel: number = 0;
	maxLevel: number = 10;
	hiragana: Hiragana[][] = [];
	currentGame?: IGameManager;
	constructor()
	{
		this.templateContext = document.body;
		this.root = document.getElementById('app')!;
	}

	public clearChildren()
	{
		while (this.root.lastChild)
		{
			this.root.lastChild.remove();
		}
	}

	public setTemplate(template: string)
	{
		this.clearChildren();
		this.root.appendChild(getTemplate(template, this.root));
	}

	public async importData()
	{
		let response = await fetch("/data/hiragana.json");
		let data: Hiragana[][] = await response.json();
		this.hiragana = data;
	}
}

const Application = new ApplicationManager();
// @ts-ignore
globalThis.Application = Application;
await Application.importData();
Application.difficulty = GameDifficulty.VeryHard;
// Application.difficulty = GameDifficulty.Medium;

Application.setTemplate('game-template');




export function getTemplate(id: string, ctx: HTMLElement = document.body)
{
	Application.templateContext = ctx;
	let template = document.getElementById(id)! as HTMLTemplateElement;
	console.assert(template && template instanceof HTMLTemplateElement);
	return template.content.cloneNode(true);
}

export function setTemplate(element: HTMLElement, template: string)
{
	Application.templateContext = element;
	while (element.lastChild)
	{
		element.lastChild.remove();
	}

	element.appendChild(getTemplate(template, element));
}








export default Application;