import Application, { GameDifficulty } from './index.js';
export default function (context) {
    let buttons = context.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function (event) {
            let button = event.target;
            let difficulty = button.dataset["difficulty"];
            Application.difficulty = GameDifficulty[difficulty];
            Application.setTemplate('game-template');
        };
    }
}
//# sourceMappingURL=select-type.js.map