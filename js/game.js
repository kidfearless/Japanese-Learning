import Application from './index.js';
class GameManager {
    root;
    buttons;
    title;
    constructor(context) {
        this.root = context;
        this.buttons = [];
        for (let i = 0; i < 4; i++) {
            this.buttons.push(this.root.getChildById(`answer-button-${i}`));
        }
        console.assert(this.buttons.length === 4, "There should be 4 buttons");
        this.title = this.root.getChildById("quiz-question");
    }
    fillBoard() {
        for (let button of this.buttons) {
            button.style.backgroundColor = "#444";
            button.disabled = false;
        }
        let hiragana = randomValue(Application.hiragana);
        let useEnglish = Math.random() > 0.5;
        if (useEnglish) {
            this.title.innerText = hiragana.roumaji;
            for (let i = 0; i < 4; i++) {
                let randomCharacter = randomValue(Application.hiragana);
                this.buttons[i].innerText = randomCharacter.kana;
                this.buttons[i].onclick = () => {
                    this.buttons[i].style.backgroundColor = "red";
                    this.buttons[i].disabled = true;
                };
            }
            let correctAnswerIndex = randomInt(0, 3);
            this.buttons[correctAnswerIndex].innerText = hiragana.kana;
            this.buttons[correctAnswerIndex].onclick = () => {
                this.fillBoard();
            };
        }
        else {
            this.title.innerText = hiragana.kana;
            for (let i = 0; i < 4; i++) {
                let randomCharacter = randomValue(Application.hiragana);
                this.buttons[i].innerText = randomCharacter.roumaji;
                this.buttons[i].onclick = () => {
                    this.buttons[i].style.backgroundColor = "red";
                    this.buttons[i].disabled = true;
                };
            }
            let correctAnswerIndex = randomInt(0, 3);
            this.buttons[correctAnswerIndex].innerText = hiragana.roumaji;
            this.buttons[correctAnswerIndex].onclick = () => {
                this.fillBoard();
            };
        }
    }
}
function randomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomInt(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default function (context) {
    let game = new GameManager(context);
    game.fillBoard();
}
//# sourceMappingURL=game.js.map