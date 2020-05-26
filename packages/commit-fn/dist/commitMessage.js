"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commitMessage = void 0;
const helpers_fn_1 = require("helpers-fn");
const constants_1 = require("./constants");
const getLatestCommits_1 = require("./_modules/getLatestCommits");
const getCommitLabel_1 = require("./_modules/getCommitLabel");
const getCommitType_1 = require("./_modules/getCommitType");
const getWorkInProgress_1 = require("./_modules/getWorkInProgress");
const promptInput_1 = require("./_modules/promptInput");
const showExplanations_1 = require("./_modules/showExplanations");
// It ask the user for type and text of commit
// and returns the final commit message.
// ============================================
async function commitMessage(dir = process.cwd()) {
    const latestCommits = await getLatestCommits_1.getLatestCommits(dir);
    latestCommits.forEach(singleCommit => {
        helpers_fn_1.log(singleCommit, 'info');
    });
    helpers_fn_1.log('sep');
    const workInProgress = getWorkInProgress_1.getWorkInProgress();
    showExplanations_1.showExplanations();
    const commitType = await getCommitType_1.getCommitType(constants_1.typesOfCommit);
    const commitLabel = await getCommitLabel_1.getCommitLabel(commitType);
    if (workInProgress.length > 0) {
        helpers_fn_1.log(`WorkInProgress - '${workInProgress}'`, 'info');
    }
    const commitMessageValue = await promptInput_1.promptInput(constants_1.ASK_FOR_MESSAGE);
    const noInput = commitMessageValue.trim() === '';
    const noLabel = commitLabel === constants_1.NO_LABEL;
    if (noInput && noLabel) {
        return commitType.value;
    }
    if (noInput && !noLabel) {
        return `${commitType.value}@${commitLabel}`;
    }
    if (!noInput && noLabel) {
        return `${commitType.value}: ${commitMessageValue}`;
    }
    return `${commitType.value}@${commitLabel} ${commitMessageValue}`;
}
exports.commitMessage = commitMessage;
//# sourceMappingURL=commitMessage.js.map