import Application from './index.js';
class GameManager {
    root;
    buttons;
    title;
    currentIndex = 0;
    constructor(context) {
        this.root = context;
        this.buttons = [];
        for (let i = 0; i < Application.difficulty; i++) {
            let button = document.createElement('button');
            button.dataset["id"] = `answer-button-${i}`;
            this.root.appendChild(button);
            this.buttons.push(button);
        }
        this.title = this.root.getChildById("quiz-question");
    }
    fillBoard() {
        for (let button of this.buttons) {
            button.disabled = false;
            button.dataset["correct"] = "0";
        }
        if (this.currentIndex++ >= Application.hiragana[Application.currentLevel].length) {
            this.currentIndex = 0;
            Application.currentLevel++;
        }
        let hiragana = Application.hiragana[Application.currentLevel];
        let answer = randomValue(hiragana);
        let fakes = this.getFakes(answer);
        if (fakes.length != Application.difficulty - 1) {
            debugger;
        }
        let guesses = [answer, ...fakes];
        guesses.sort(() => Math.random() - 0.5);
        let useEnglishTitle = randomInt(0, 1) == 1;
        let title = useEnglishTitle ? answer.roumaji : answer.kana;
        this.title.innerText = title;
        this.fillButtons(guesses, useEnglishTitle, answer);
    }
    fillButtons(guesses, useEnglishTitle, answer) {
        for (let i = 0; i < guesses.length; i++) {
            let button = this.buttons[i];
            let guess = guesses[i];
            let text = useEnglishTitle ? guess.kana : guess.roumaji;
            button.innerText = text;
            if (guess == answer) {
                button.dataset["correct"] = "1";
            }
            button.onclick = (event) => {
                if (button.dataset["correct"] == '1') {
                    this.fillBoard();
                }
                else {
                    button.disabled = true;
                }
            };
        }
    }
    getFakes(answer) {
        let arr = [];
        for (let i = 0; i <= Application.maxLevel; i++) {
            let level = [...Application.hiragana[i]];
            while (level.length > 0) {
                let value = randomValue(level);
                if (value !== answer) {
                    arr.push(value);
                }
                level.splice(level.indexOf(value), 1);
                if (arr.length === Application.difficulty - 1) {
                    return arr;
                }
            }
        }
        return arr;
    }
}
function setState(...args) {
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