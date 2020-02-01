"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_fn_1 = require("string-fn");
function generateChoices(choices) {
    return choices.map(singleChoice => ({
        name: string_fn_1.pascalCase(singleChoice),
        value: string_fn_1.constantCase(singleChoice),
    }));
}
exports.generateChoices = generateChoices;
//# sourceMappingURL=generateChoices.js.map