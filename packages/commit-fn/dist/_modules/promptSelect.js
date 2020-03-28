"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptSelect = void 0;
const Enquirer = require("enquirer");
async function promptSelect(input) {
    const select = new Enquirer.Select({
        choices: input.choices,
        message: input.question,
        name: 'answer',
    });
    const answer = await select.run();
    return answer;
}
exports.promptSelect = promptSelect;
//# sourceMappingURL=promptSelect.js.map