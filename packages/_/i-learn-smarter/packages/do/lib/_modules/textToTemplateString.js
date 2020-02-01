"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const StringFn = require("string-fn");
// tslint:disable
function textToTemplateString(templatePath, input) {
    try {
        const templateContentRaw = fs_extra_1.readFileSync(templatePath).toString();
        const templateContent = `\`${templateContentRaw}\``;
        let result;
        const _ = StringFn;
        const codeToEvaluate = 'result = eval(templateContent)';
        eval(codeToEvaluate);
        return result;
    }
    catch (e) {
        console.log(e);
        return '';
    }
}
exports.textToTemplateString = textToTemplateString;
// tslint:enable
//# sourceMappingURL=textToTemplateString.js.map