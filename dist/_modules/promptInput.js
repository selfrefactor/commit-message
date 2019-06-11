"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
async function promptInput(question) {
    const result = await inquirer_1.prompt([{
            message: question,
            name: 'answer',
            type: 'input',
        }]);
    return result.answer;
}
exports.promptInput = promptInput;
//# sourceMappingURL=promptInput.js.map