export var HiraganaType;
(function (HiraganaType) {
    HiraganaType[HiraganaType["dakuon"] = 0] = "dakuon";
    HiraganaType[HiraganaType["extended"] = 1] = "extended";
    HiraganaType[HiraganaType["gojuuon"] = 2] = "gojuuon";
    HiraganaType[HiraganaType["handakuon"] = 3] = "handakuon";
    HiraganaType[HiraganaType["sokuon"] = 4] = "sokuon";
    HiraganaType[HiraganaType["youon"] = 5] = "youon";
})(HiraganaType || (HiraganaType = {}));
export default function () {
    HTMLElement.prototype.getChildById = function getChildById(id) {
        return this.querySelector(`[data-id="${id}"]`);
    };
}
;
//# sourceMappingURL=interfaces.js.map