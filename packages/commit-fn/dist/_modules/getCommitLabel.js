"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommitLabel = void 0;
const constants_1 = require("../constants");
const helpers_fn_1 = require("helpers-fn");
const promptSelect_1 = require("./promptSelect");
const PADDING_LIMIT = 10;
const getPadding = (str) => {
    const howLong = PADDING_LIMIT - str.length;
    return howLong > 0 ? Array(howLong).fill(' ').join('') : '';
};
function extractValue(actualLabel) {
    const [toReturn] = actualLabel.split(' ');
    return toReturn;
}
async function getCommitLabel(input) {
    console.log({ input });
    helpers_fn_1.log('sepx');
    helpers_fn_1.log(`${input.commitType.key} - ${input.commitType.explanation}`, '');
    helpers_fn_1.log('sepx');
    const filteredLabels = input.labels.filter(singleLabel => {
        return singleLabel.belongsTo.includes(input.commitType);
    });
    const filteredLabelsValue = filteredLabels.map(singleLabel => {
        const padding = getPadding(singleLabel.value);
        return `${singleLabel.value}${padding} ${singleLabel.explanation}`;
    });
    const promptOptions = {
        choices: filteredLabelsValue,
        default: filteredLabelsValue[0],
        question: constants_1.ASK_FOR_LABEL,
    };
    const labelAnswer = await promptSelect_1.promptSelect(promptOptions);
    const [labelRaw] = filteredLabelsValue.filter(x => x === labelAnswer);
    const label = extractValue(labelRaw);
    console.log({ label });
    return 'toReturn';
}
exports.getCommitLabel = getCommitLabel;
//# sourceMappingURL=getCommitLabel.js.map