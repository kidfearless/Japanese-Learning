let serviceWorkerInstance = await navigator.serviceWorker.register("serviceworker.js");
import interfaces from "./interfaces.js";
interfaces();
export var GameDifficulty;
(function (GameDifficulty) {
    GameDifficulty[GameDifficulty["Easy"] = 2] = "Easy";
    GameDifficulty[GameDifficulty["Medium"] = 4] = "Medium";
    GameDifficulty[GameDifficulty["Hard"] = 8] = "Hard";
    GameDifficulty[GameDifficulty["VeryHard"] = -1] = "VeryHard";
})(GameDifficulty || (GameDifficulty = {}));
class ApplicationManager {
    root;
    templateContext;
    difficulty = GameDifficulty.Medium;
    currentLevel = 1;
    maxLevel = 10;
    hiragana = [];
    constructor() {
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
    async importData() {
        let response = await fetch("/data/hiragana.json");
        let data = await response.json();
        this.hiragana = data;
    }
}
const Application = new ApplicationManager();
globalThis.Application = Application;
await Application.importData();
Application.setTemplate('game-template');
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