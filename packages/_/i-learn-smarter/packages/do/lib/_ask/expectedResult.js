"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const normalizeInput_1 = require("../_helpers/normalizeInput");
async function askExpectedResult() {
    const { expectedResult } = await inquirer_1.prompt([{
            message: 'Expected test result',
            name: 'expectedResult',
            type: 'input',
        }]);
    return normalizeInput_1.normalizeInput(expectedResult);
}
exports.askExpectedResult = askExpectedResult;
//# sourceMappingURL=expectedResult.js.map