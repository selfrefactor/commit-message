"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptInput = void 0;
const enquirer_1 = require("enquirer");
async function promptInput(question) {
    const result = await enquirer_1.prompt([
        {
            message: question,
            name: 'answer',
            type: 'input',
        },
    ]);
    return result.answer;
}
exports.promptInput = promptInput;
//# sourceMappingURL=promptInput.js.map