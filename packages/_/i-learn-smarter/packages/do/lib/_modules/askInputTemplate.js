"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const log_1 = require("log");
async function askInputTemplate(input) {
    if (input.info) {
        log_1.log(input.info, 'info');
    }
    const answer = await inquirer_1.prompt([{
            message: `${input.question}?`,
            name: input.key,
            type: 'input',
        }]);
    log_1.log('sep');
    return answer[input.key].trim();
}
exports.askInputTemplate = askInputTemplate;
//# sourceMappingURL=askInputTemplate.js.map