"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const normalizeInput_1 = require("../_helpers/normalizeInput");
async function askTestInput(input) {
    if (input === '') {
        return undefined;
    }
    const inputList = input.split(',');
    const willReturn = {};
    for (const singleInput of inputList) {
        const { singleAnswer } = await inquirer_1.prompt([{
                message: `Test input for argument '${singleInput}'`,
                name: 'singleAnswer',
                type: 'input',
            }]);
        willReturn[singleInput] = normalizeInput_1.normalizeInput(singleAnswer);
    }
    return willReturn;
}
exports.askTestInput = askTestInput;
//# sourceMappingURL=testInput.js.map