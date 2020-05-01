"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptSelect = void 0;
const inquirer_1 = require("inquirer");
async function promptSelect(input) {
    const defaultIndex = input.choices.indexOf(input.default);
    const { answer } = await inquirer_1.prompt([{
            type: 'list',
            name: 'answer',
            message: input.question,
            choices: input.choices,
            default: defaultIndex === -1 ? 0 : defaultIndex
        }]);
    return answer;
}
exports.promptSelect = promptSelect;
//# sourceMappingURL=promptSelect.js.map