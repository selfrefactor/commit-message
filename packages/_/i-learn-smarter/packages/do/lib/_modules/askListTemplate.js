"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const log_1 = require("log");
const generateChoices_1 = require("./generateChoices");
async function askListTemplate(input) {
    if (input.info) {
        log_1.log(input.info, 'info');
    }
    const answer = await inquirer_1.prompt([{
            choices: generateChoices_1.generateChoices(input.choices),
            message: `${input.question}?`,
            name: input.key,
            type: 'list',
        }]);
    log_1.log('sep');
    return answer[input.key];
}
exports.askListTemplate = askListTemplate;
//# sourceMappingURL=askListTemplate.js.map