"use strict";
console.info(`current script: ${document.currentScript.outerHTML}`);
import(document.currentScript.dataset["src"]).then(function (module) {
    module.default(Application.templateContext);
});
//# sourceMappingURL=template.js.map