import Application from './index.js';
import { GameDifficulty } from './interfaces.js';
class GameManager {
    root;
    buttons;
    title;
    currentIndex = 0;
    levelProgress;
    textBox;
    hintBox;
    constructor(context) {
        this.root = context;
        this.buttons = [];
        this.levelProgress = [];
        for (let i = 0; i < Application.difficulty; i++) {
            let button = document.createElement('button');
            button.dataset["id"] = `answer-button-${i}`;
            this.root.appendChild(button);
            this.buttons.push(button);
        }
        this.textBox = document.createElement('input');
        this.textBox.type = 'text';
        this.textBox.placeholder = 'Enable Japanese Keyboard In Settings';
        this.textBox.style.visibility = 'hidden';
        this.root.appendChild(this.textBox);
        this.hintBox = document.createElement('span');
        this.hintBox.classList.add('hint');
        this.hintBox.innerText = '❔';
        this.root.appendChild(this.hintBox);
        this.title = this.root.getChildById("quiz-question");
    }
    start() {
        this.reset();
        if (this.levelProgress.length === 0) {
            this.levelProgress = [...Application.hiragana[Application.currentLevel]];
        }
        if (this.currentIndex++ >= Application.hiragana[Application.currentLevel].length) {
            this.currentIndex = 0;
            Application.currentLevel++;
            this.levelProgress = [...Application.hiragana[Application.currentLevel]];
        }
        let answer = this.getQuestion();
        if (Application.difficulty === GameDifficulty.VeryHard) {
            this.hintBox.onclick = () => {
                this.title.innerText = `${answer.roumaji}\n${answer.kana}`;
            };
            this.title.innerText = `${answer.roumaji}`;
            this.fillWriting(answer);
        }
        else {
            let fakes = this.getFakes(answer);
            let guesses = [answer, ...fakes];
            guesses.sort(() => Math.random() - 0.5);
            let useEnglishTitle = randomInt(0, 1) == 1;
            let title = useEnglishTitle ? answer.roumaji : answer.kana;
            this.title.innerText = title;
            this.fill(guesses, useEnglishTitle, answer);
        }
    }
    reset() {
        for (let button of this.buttons) {
            button.disabled = false;
            button.dataset["correct"] = "0";
            button.style.visibility = Application.difficulty == GameDifficulty.VeryHard ? "hidden" : "visible";
        }
        this.textBox.style.visibility = Application.difficulty == GameDifficulty.VeryHard ? "visible" : "hidden";
        if (this.textBox.value) {
            this.textBox.placeholder = "";
        }
        this.textBox.value = "";
    }
    fillWriting(answer) {
        this.textBox.oninput = (event) => {
            let input = event.target;
            let correct = input.value === answer.kana;
            if (correct) {
                input.classList.add('correct');
                this.start();
            }
            else {
                input.classList.add('wrong');
            }
        };
    }
    fill(guesses, useEnglishTitle, answer) {
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
                    this.start();
                }
                else {
                    button.disabled = true;
                }
            };
        }
    }
    getQuestion() {
        let answer = randomValue(this.levelProgress);
        this.levelProgress.splice(this.levelProgress.indexOf(answer), 1);
        return answer;
    }
    getFakes(answer) {
        let difficulty = Application.difficulty == GameDifficulty.VeryHard ? GameDifficulty.Hard : Application.difficulty;
        let arr = [];
        let answerPack = Application.hiragana.slice(0).flat();
        while (arr.length < difficulty - 1) {
            if (answerPack.length == 0) {
                answerPack = [...Application.hiragana[Application.currentLevel]];
            }
            let answer = randomValue(answerPack);
            if (!arr.includes(answer)) {
                arr.push(answer);
            }
            answerPack = answerPack.filter(x => x != answer);
        }
        return arr;
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
    Application.currentGame = game;
    game.start();
}
//# sourceMappingURL=game.js.map