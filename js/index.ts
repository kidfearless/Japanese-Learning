let interfaces = await import("./interfaces.js");
interfaces.default();

class ApplicationManager
{
	root: HTMLElement;
	templateContext: HTMLElement;
	hasHiragana: boolean;
	constructor()
	{
		this.hasHiragana = false;
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

}

const Application = new ApplicationManager();
// @ts-ignore
globalThis.Application = Application;

Application.setTemplate('start-template');





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