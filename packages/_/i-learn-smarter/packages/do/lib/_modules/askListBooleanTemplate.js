"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const log_1 = require("log");
const generateChoices_1 = require("./generateChoices");
const choices = generateChoices_1.generateChoices(['TRUE', 'FALSE']);
async function askListBooleanTemplate(input) {
    if (input.info) {
        log_1.log(input.info, 'info');
    }
    const answer = await inquirer_1.prompt([{
            choices: choices,
            message: `${input.question}?`,
            name: input.key,
            type: 'list',
        }]);
    return answer[input.key] === 'TRUE';
}
exports.askListBooleanTemplate = askListBooleanTemplate;
//# sourceMappingURL=askListBooleanTemplate.js.map