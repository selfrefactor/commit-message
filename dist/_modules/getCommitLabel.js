"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const promptInput_1 = require("./promptInput");
const log_1 = require("log");
const package_storage_1 = require("package-storage");
const promptSelect_1 = require("./promptSelect");
const PADDING_LIMIT = 10;
const getPadding = (str) => {
    const howLong = PADDING_LIMIT - str.length;
    return howLong > 0 ?
        Array(howLong).fill(' ').join('') :
        '';
};
/**
 * Every time custom label is selected
 * it will be saved as label in the current `commitType` context
 */
async function askCustomLabel(input) {
    const label = await promptInput_1.promptInput(constants_1.ASK_FOR_CUSTOM_LABEL);
    const key = input.commitType.key.toLowerCase();
    /**
     * When this is not the first label for this `commitType` context
     */
    const loaded = package_storage_1.load('commitMessage', key, true);
    const isNewLabel = loaded === undefined || loaded.push === undefined;
    const toSave = isNewLabel ?
        [label] :
        [...loaded, label];
    package_storage_1.save('commitMessage', key, toSave, true);
    log_1.log(`label '${label}' is part of '${key}' context | is.new = '${isNewLabel}'`, 'info');
    return label;
}
exports.askCustomLabel = askCustomLabel;
async function getCommitLabel(input) {
    log_1.log('sepx');
    log_1.log(`${input.commitType.key} - ${input.commitType.explanation}`, '');
    log_1.log('sepx');
    const filteredLabels = input.labels.filter(singleLabel => {
        return singleLabel.belongsTo.includes(input.commitType);
    });
    const filteredLabelsValue = filteredLabels
        .map(singleLabel => {
        const padding = getPadding(singleLabel.value);
        return `${singleLabel.value}${padding} ${singleLabel.explanation}`;
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
        askCustomLabel(input) :
        label;
}
exports.getCommitLabel = getCommitLabel;
//# sourceMappingURL=getCommitLabel.js.map