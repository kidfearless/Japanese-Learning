export default function () {
    HTMLElement.prototype.getChildById = function getChildById(id) {
        return this.querySelector(`[data-id="${id}"]`);
    };
}
;
//# sourceMappingURL=interfaces.js.map