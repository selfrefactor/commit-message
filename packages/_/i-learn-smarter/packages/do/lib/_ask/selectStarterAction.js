"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts = require("prompts");
const rambdax_1 = require("rambdax");
const string_fn_1 = require("string-fn");
const getAllConstants_1 = require("../_helpers/getAllConstants");
const sorter_1 = require("../_helpers/sorter");
async function selectStarterAction(input) {
    try {
        const location = `${input.srcDirectory}/constants.ts`;
        const allConstants = getAllConstants_1.getAllConstants(location);
        const choicesRaw = allConstants.map(_ => ({ title: string_fn_1.dotCase(_) }));
        const choices = rambdax_1.sort(sorter_1.sortByProp('title'), choicesRaw);
        const question = {
            choices,
            message: 'Pick your starter action(DOTCASE)',
            name: 'answer',
            limit: 30,
            type: 'autocomplete',
        };
        const { answer } = await prompts([question]);
        console.log(answer);
        return answer;
    }
    catch (err) {
        throw err;
    }
}
exports.selectStarterAction = selectStarterAction;
//# sourceMappingURL=selectStarterAction.js.map