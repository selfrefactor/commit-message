"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptInput = void 0;
const inquirer_1 = require("inquirer");
async function promptInput(question) {
    const { answer } = await inquirer_1.prompt([{
            type: 'input',
            name: 'answer',
            message: question,
        }]);
    return answer;
}
exports.promptInput = promptInput;
//# sourceMappingURL=promptInput.js.map