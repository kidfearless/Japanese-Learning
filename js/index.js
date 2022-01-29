let serviceWorkerInstance = await navigator.serviceWorker.register("serviceworker.js");
import { Views, GameDifficulty } from "./interfaces.js";
class ApplicationManager {
    root;
    templateContext;
    difficulty = GameDifficulty.Medium;
    currentLevel = 1;
    maxLevel = 10;
    hiragana = [];
    currentGame;
    constructor() {
        this.templateContext = document.body;
        this.root = document.getElementById('app');
        window.onpopstate = (ev) => this.onPopState(ev);
        globalThis.Application = this;
    }
    clearChildren() {
        while (this.root.lastChild) {
            this.root.lastChild.remove();
        }
    }
    setTemplate(template, setstate = true) {
        if (setstate) {
            window.history.pushState(template, template);
        }
        console.info(template);
        this.clearChildren();
        this.root.appendChild(getTemplate(template, this.root));
    }
    async importData() {
        let response = await fetch("/data/hiragana.json");
        let data = await response.json();
        this.hiragana = data;
    }
    onPopState(ev) {
        console.info(ev.state);
        this.setTemplate(ev.state, false);
        return true;
    }
}
const Application = new ApplicationManager();
Application.importData();
Application.setTemplate(Views.Start);
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