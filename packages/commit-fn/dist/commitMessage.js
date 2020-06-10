"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commitMessage = void 0;
const helpers_fn_1 = require("helpers-fn");
const string_fn_1 = require("string-fn");
const constants_1 = require("./constants");
const getLatestCommits_1 = require("./_modules/getLatestCommits");
const getCommitLabel_1 = require("./_modules/getCommitLabel");
const getCommitType_1 = require("./_modules/getCommitType");
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
    showExplanations_1.showExplanations();
    const commitType = await getCommitType_1.getCommitType(constants_1.typesOfCommit);
    const commitLabel = await getCommitLabel_1.getCommitLabel(commitType);
    const labelIsMessage = string_fn_1.count(commitLabel, ' ') > 0;
    if (labelIsMessage) {
        return `${commitType.value}: ${commitLabel}`;
    }
    const commitMessageValue = await promptInput_1.promptInput(constants_1.ASK_FOR_MESSAGE);
    const hasInput = commitMessageValue.trim() !== '';
    const hasLabel = commitLabel !== constants_1.NO_LABEL;
    if (hasInput && hasLabel) {
        return `${commitType.value}@${commitLabel} ${commitMessageValue}`;
    }
    if (!hasInput && hasLabel) {
        return `${commitType.value}@${commitLabel}`;
    }
    if (hasInput && !hasLabel) {
        return `${commitType.value}: ${commitMessageValue}`;
    }
    return commitType.value;
}
exports.commitMessage = commitMessage;
//# sourceMappingURL=commitMessage.js.map