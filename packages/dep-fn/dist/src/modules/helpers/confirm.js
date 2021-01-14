"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirm = void 0;
const inquirer_1 = require("inquirer");
const confirm = async (question) => {
    if (process.env.DEP_FN_UPDATE_ALL === 'true')
        return true;
    const { answer } = await inquirer_1.prompt([
        { type: exports.confirm, name: 'answer', default: 'Y', message: question },
    ]);
    return answer.toLowerCase() === 'y';
};
exports.confirm = confirm;
