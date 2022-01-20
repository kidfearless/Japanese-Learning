let interfaces = await import("./interfaces.js");
interfaces.default();
class ApplicationManager {
    root;
    templateContext;
    hasHiragana;
    constructor() {
        this.hasHiragana = false;
        this.templateContext = document.body;
        this.root = document.getElementById('app');
    }
    clearChildren() {
        while (this.root.lastChild) {
            this.root.lastChild.remove();
        }
    }
    setTemplate(template) {
        this.clearChildren();
        this.root.appendChild(getTemplate(template, this.root));
    }
}
const Application = new ApplicationManager();
globalThis.Application = Application;
Application.setTemplate('start-template');
export function getTemplate(id, ctx = document.body) {
    Application.templateContext = ctx;
    let template = document.getElementById(id);
    console.assert(template && template instanceof HTMLTemplateElement);
    return template.content.cloneNode(true);
}
export function setTemplate(element, template) {
    Application.templateContext = element;
    while (element.lastChild) {
        element.lastChild.remove();
    }
    element.appendChild(getTemplate(template, element));
}
export default Application;
//# sourceMappingURL=index.js.map