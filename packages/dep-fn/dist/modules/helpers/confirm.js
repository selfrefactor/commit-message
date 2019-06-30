"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
exports.confirm = async (question, dependency) => {
    if (process.env.DEP_FN_UPDATE_ALL === 'true')
        return true;
    const { answer } = await inquirer_1.prompt([
        { type: exports.confirm, name: 'answer', default: 'Y', message: question },
    ]);
    return answer.toLowerCase() === 'y';
};
//# sourceMappingURL=confirm.js.map