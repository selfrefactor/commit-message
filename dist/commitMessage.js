"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("log");
const rambdax_1 = require("rambdax");
const constants_1 = require("./constants");
const getCommitLabel_1 = require("./_modules/getCommitLabel");
const getCommitType_1 = require("./_modules/getCommitType");
const getWorkInProgress_1 = require("./_modules/getWorkInProgress");
const promptInput_1 = require("./_modules/promptInput");
const saveWorkInProgress_1 = require("./_modules/saveWorkInProgress");
const showExplanations_1 = require("./_modules/showExplanations");
function getWorkInProgressFlag(commitLabel) {
    return commitLabel === constants_1.START_LABEL.value ||
        commitLabel === constants_1.STOP_LABEL.value ||
        commitLabel === constants_1.PROGRESS_LABEL.value;
}
// It ask the user for type and text of commit
// and returns the final commit message.
// ============================================
async function commitMessage(flag) {
    const workInProgress = getWorkInProgress_1.getWorkInProgress();
    showExplanations_1.showExplanations();
    const commitType = await getCommitType_1.getCommitType(constants_1.typesOfCommit);
    const commitLabel = await getCommitLabel_1.getCommitLabel({
        commitType,
        labels: constants_1.labels,
    });
    const commitFirstPart = commitLabel === '' ?
        `${commitType.value}:` :
        flag ?
            `${commitType.value}(${commitLabel}):` :
            `${commitType.value}@${commitLabel}`;
    if (workInProgress.length > 0) {
        log_1.log(`WorkInProgress - '${workInProgress}'`, 'info');
    }
    const inputResult = await promptInput_1.promptInput(constants_1.ASK_FOR_MESSAGE);
    const hasWorkInProgress = getWorkInProgressFlag(commitLabel);
    const separatorFlag = hasWorkInProgress &&
        commitLabel !== constants_1.START_LABEL.value &&
        inputResult.trim() !== '';
    const separator = separatorFlag ?
        ' | ' :
        '';
    let commitMessageValue = hasWorkInProgress ?
        `${workInProgress}${separator}${inputResult.trim()}` :
        inputResult;
    if (commitLabel === constants_1.START_LABEL.value) {
        saveWorkInProgress_1.saveWorkInProgress(inputResult);
    }
    else if (commitLabel === constants_1.STOP_LABEL.value) {
        commitMessageValue = workInProgress;
        saveWorkInProgress_1.saveWorkInProgress('');
    }
    return commitMessageValue.trim() === '' ?
        rambdax_1.init(commitFirstPart) :
        `${commitFirstPart} ${commitMessageValue.trim()}`;
}
exports.commitMessage = commitMessage;
//# sourceMappingURL=commitMessage.js.map