export var Views;
(function (Views) {
    Views["Start"] = "start-template";
    Views["SelectType"] = "select-type-template";
    Views["Game"] = "game-template";
})(Views || (Views = {}));
export var GameDifficulty;
(function (GameDifficulty) {
    GameDifficulty[GameDifficulty["Easy"] = 2] = "Easy";
    GameDifficulty[GameDifficulty["Medium"] = 4] = "Medium";
    GameDifficulty[GameDifficulty["Hard"] = 8] = "Hard";
    GameDifficulty[GameDifficulty["VeryHard"] = -1] = "VeryHard";
})(GameDifficulty || (GameDifficulty = {}));
export default function () {
    HTMLElement.prototype.getChildById = function getChildById(id) {
        return this.querySelector(`[data-id="${id}"]`);
    };
}
;
//# sourceMappingURL=interfaces.js.map