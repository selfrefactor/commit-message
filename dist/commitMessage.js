"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const getCommitLabel_1 = require("./modules/getCommitLabel");
const getCommitType_1 = require("./modules/getCommitType");
const getWorkInProgress_1 = require("./modules/getWorkInProgress");
const promptInput_1 = require("./modules/promptInput");
const saveWorkInProgress_1 = require("./modules/saveWorkInProgress");
const showExplanations_1 = require("./modules/showExplanations");
function getWorkInProgressFlag(commitLabel) {
    return commitLabel === constants_1.START_LABEL.value ||
        commitLabel === constants_1.STOP_LABEL.value ||
        commitLabel === constants_1.PROGRESS_LABEL.value;
}
/**
 * It ask the user for type and text of commit and returns the final commit message.
 *
 * @returns {Promise<string>}
 */
async function commitMessage(flag) {
    const workInProgress = getWorkInProgress_1.getWorkInProgress();
    showExplanations_1.showExplanations();
    const commitType = await getCommitType_1.getCommitType(constants_1.typesOfCommit);
    const commitLabel = await getCommitLabel_1.getCommitLabel({
        commitType,
        labels: constants_1.labels,
    });
    const commitFirstPart = commitLabel === '' ?
        `${commitType.value}` :
        flag ?
            `${commitType.value}(${commitLabel})` :
            `${commitType.value}@${commitLabel}`;
    const inputResult = await promptInput_1.promptInput(constants_1.ASK_FOR_MESSAGE);
    const hasWorkInProgress = getWorkInProgressFlag(commitLabel);
    const separatorFlag = hasWorkInProgress &&
        commitLabel !== constants_1.START_LABEL.value &&
        inputResult.trim() !== '';
    const separator = separatorFlag ?
        ' | ' :
        '';
    const commitMessageValue = hasWorkInProgress ?
        `${workInProgress}${separator}${inputResult.trim()}` :
        inputResult;
    if (commitLabel === constants_1.START_LABEL.value) {
        saveWorkInProgress_1.saveWorkInProgress(inputResult);
    }
    else if (commitLabel === constants_1.STOP_LABEL.value) {
        saveWorkInProgress_1.saveWorkInProgress('');
    }
    return `${commitFirstPart}: ${commitMessageValue.trim()}`;
}
exports.commitMessage = commitMessage;
//# sourceMappingURL=commitMessage.js.map