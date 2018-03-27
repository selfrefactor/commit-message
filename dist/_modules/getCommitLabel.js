"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const promptInput_1 = require("./promptInput");
const log_1 = require("log");
const promptSelect_1 = require("./promptSelect");
const PADDING_LIMIT = 15;
const getPadding = (str) => {
    const howLong = PADDING_LIMIT - str.length;
    return howLong > 0 ?
        Array(howLong).fill(' ').join('') :
        '';
};
async function askCustomLabel(input) {
    try {
        const label = await promptInput_1.promptInput(constants_1.ASK_FOR_CUSTOM_LABEL);
        return label;
    }
    catch (err) {
        throw err;
    }
}
exports.askCustomLabel = askCustomLabel;
async function getCommitLabel(input) {
    try {
        log_1.log(`${input.commitType.key} - ${input.commitType.explanation}`, 'box');
        const filteredLabels = input.labels.filter(singleLabel => {
            return singleLabel.belongsTo.includes(input.commitType);
        });
        const filteredLabelsValue = filteredLabels.map(singleLabel => {
            const padding = getPadding(singleLabel.value);
            return `${singleLabel.value}${padding}|-| ${singleLabel.explanation}`;
        });
        const promptOptions = {
            choices: filteredLabelsValue,
            default: filteredLabelsValue[0],
            question: constants_1.ASK_FOR_LABEL,
        };
        const labelRaw = await promptSelect_1.promptSelect(promptOptions);
        const labelIndex = filteredLabelsValue.indexOf(labelRaw);
        const label = filteredLabels[labelIndex].value;
        return label === constants_1.CUSTOM_LABEL.value ?
            await askCustomLabel(input) :
            label;
    }
    catch (err) {
        throw err;
    }
}
exports.getCommitLabel = getCommitLabel;
//# sourceMappingURL=getCommitLabel.js.map