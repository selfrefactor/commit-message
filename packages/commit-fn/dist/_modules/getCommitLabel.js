"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommitLabel = void 0;
const constants_1 = require("../constants");
const helpers_fn_1 = require("helpers-fn");
const inquirer = require("inquirer");
const fuzzy = require("fuzzy");
const rambdax_1 = require("rambdax");
function sortFn(a, b) {
    if (a.includes(' ') && !b.includes(' '))
        return -1;
    if (!a.includes(' ') && b.includes(' '))
        return 1;
    return a > b ? -1 : 1;
}
async function searchStates(_, input) {
    const labels = fuzzy.filter(input || '', constants_1.ALL_LABELS).map(function (el) {
        return el.original;
    });
    const sorted = rambdax_1.sort(sortFn)(labels);
    if (labels.length === 0)
        return [constants_1.NO_LABEL];
    if (labels.length === constants_1.ALL_LABELS.length)
        return [constants_1.NO_LABEL, ...sorted];
    return sorted;
}
async function pickLabel() {
    const { state } = await inquirer.prompt([
        {
            type: 'autocomplete',
            name: 'state',
            message: 'Label:',
            suggestOnly: true,
            source: searchStates,
        },
    ]);
    if (!state.includes(' '))
        return state;
    return rambdax_1.last(state.split(' '));
}
async function getCommitLabel(input) {
    inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
    helpers_fn_1.log('sepx');
    helpers_fn_1.log(`${input.key} - ${input.explanation}`, '');
    helpers_fn_1.log('sepx');
    return pickLabel();
}
exports.getCommitLabel = getCommitLabel;
//# sourceMappingURL=getCommitLabel.js.map