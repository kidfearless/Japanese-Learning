import Application from './index.js';
export default function (context) {
    context.getChildById("select-type-button").onclick = () => {
        let hiragana = context.getChildById("hiragana").checked;
        let katakana = context.getChildById("katakana")?.checked || false;
        let kanji = context.getChildById("kanji")?.checked || false;
        Application.hasHiragana = hiragana;
        Application.setTemplate('game-template');
    };
}
//# sourceMappingURL=select-type.js.map