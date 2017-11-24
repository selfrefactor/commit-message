"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
async function promptSelect(input) {
    try {
        const { answer } = await inquirer_1.prompt([{
                choices: input.choices,
                message: input.question,
                name: 'answer',
                type: 'list',
            }]);
        return answer;
    }
    catch (err) {
        throw err;
    }
}
exports.promptSelect = promptSelect;
//# sourceMappingURL=promptSelect.js.map