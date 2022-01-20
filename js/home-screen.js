import Application from './index.js';
export default function (context) {
    context.getChildById("start-button").onclick = function () {
        Application.setTemplate('start-template');
    };
}
//# sourceMappingURL=home-screen.js.map