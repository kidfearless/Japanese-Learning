import Application from './index.js';
import { Views } from './interfaces.js';
export default function (context) {
    context.getChildById("start-button").onclick = function () {
        Application.setTemplate(Views.SelectType);
    };
}
//# sourceMappingURL=home-screen.js.map