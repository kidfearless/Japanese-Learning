let serviceWorkerInstance = await navigator.serviceWorker.register("serviceworker.js");


import { IGameManager } from "./game.js";
import interfaces, { Views, GameDifficulty } from "./interfaces.js";
import { Hiragana } from './interfaces.js';
interfaces();

class ApplicationManager
{
	
	root: HTMLElement;
	templateContext: HTMLElement;
	difficulty: GameDifficulty = GameDifficulty.Medium;
	currentLevel: number = 1;
	maxLevel: number = 10;
	hiragana: Hiragana[][] = [];
	currentGame?: IGameManager;
	constructor()
	{
		this.templateContext = document.body;
		this.root = document.getElementById('app')!;
		window.onpopstate = (ev) => this.onPopState(ev);

		// @ts-ignore - Allows for access to the Application from outside the module
		globalThis.Application = this;
	}

	public clearChildren()
	{
		while (this.root.lastChild)
		{
			this.root.lastChild.remove();
		}
	}

	// sets the template passing in one of the values from the Views enum
	public setTemplate(template: Views, setstate: boolean = true)
	{
		if(setstate)
		{
			window.history.pushState(template, template);
		}
		console.info(template);
		this.clearChildren();
		this.root.appendChild(getTemplate(template, this.root));
	}

	public async importData()
	{
		let response = await fetch("/data/hiragana.json");
		let data: Hiragana[][] = await response.json();
		this.hiragana = data;
	}

	public onPopState(ev: PopStateEvent): any
	{
		console.info(ev.state);
		this.setTemplate(ev.state as Views, false);
		return true;
	}
}

const Application = new ApplicationManager();
Application.importData();
Application.setTemplate(Views.Start);



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