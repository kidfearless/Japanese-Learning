import Application from './index.js';
import * as Handwriting from './handwriting.js';
class VeryHardGameManager {
    root;
    title;
    canvasBox;
    hintBox;
    handwriting;
    answer;
    questionPool;
    resetButton;
    constructor(context) {
        this.root = context;
        this.questionPool = Application.hiragana.flat().sort(() => Math.random() - 0.5);
        this.answer = null;
        this.canvasBox = context.getChildById("writing-box");
        this.hintBox = context.getChildById("hint-box");
        this.title = this.root.getChildById("quiz-question");
        this.resetButton = this.root.getChildById("reset-button");
        this.handwriting = new Handwriting.Canvas(this.canvasBox);
        this.handwriting.cxt.strokeStyle = "white";
        this.handwriting.ondraw = this.onDraw.bind(this);
        this.resetButton.onclick = () => this.handwriting.erase();
    }
    start() {
        this.reset();
        let answer = this.answer = this.getQuestion();
        this.hintBox.onclick = () => {
            this.title.innerText = `${answer.roumaji}\n${answer.kana}`;
        };
        this.title.innerText = `${answer.roumaji}`;
    }
    reset() {
        this.handwriting.erase();
    }
    getQuestion() {
        let answer = randomValue(this.questionPool);
        this.questionPool.splice(this.questionPool.indexOf(answer), 1);
        return answer;
    }
    async onDraw(canvas) {
        let response = await canvas.recognize({ language: "ja" });
        if (response.characters[0] === this.answer?.kana) {
            this.start();
        }
        console.info(response);
    }
}
function randomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomInt(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default function (context) {
    let game = new VeryHardGameManager(context);
    Application.currentGame = game;
    game.start();
}
//# sourceMappingURL=game-veryhard.js.map