"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const promptInput_1 = require("./promptInput");
const log_1 = require("log");
const promptSelect_1 = require("./promptSelect");
function pluck(keyToPluck, arr) {
    const willReturn = [];
    arr.map(val => {
        if (!(val[keyToPluck] === undefined)) {
            willReturn.push(val[keyToPluck]);
        }
    });
    return willReturn;
}
async function getCommitLabel(input) {
    try {
        log_1.log(`${input.commitType.key} - ${input.commitType.explanation}`, 'box');
        const filteredLabels = input.labels.filter(singleLabel => {
            return singleLabel.belongsTo.includes(input.commitType);
        });
        filteredLabels.map(singleLabel => {
            if (singleLabel.value !== constants_1.EMPTY_LABEL.value) {
                log_1.log(`${singleLabel.value} - ${singleLabel.explanation}`, '');
            }
        });
        const filteredLabelsValue = pluck('value', filteredLabels);
        const promptOptions = {
            choices: filteredLabelsValue,
            default: '',
            question: constants_1.ASK_FOR_LABEL,
        };
        const label = await promptSelect_1.promptSelect(promptOptions);
        return label === constants_1.CUSTOM_LABEL.value ?
            await promptInput_1.promptInput(constants_1.ASK_FOR_CUSTOM_LABEL) :
            label;
    }
    catch (err) {
        throw err;
    }
}
exports.getCommitLabel = getCommitLabel;
//# sourceMappingURL=getCommitLabel.js.map