"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const getCommitLabel_1 = require("./modules/getCommitLabel");
const getCommitType_1 = require("./modules/getCommitType");
const promptInput_1 = require("./modules/promptInput");
const showExplanations_1 = require("./modules/showExplanations");
/**
 * It ask the user for type and text of commit and returns the final commit message.
 *
 * @returns {Promise<string>}
 */
async function commitMessage() {
    showExplanations_1.showExplanations();
    const commitType = await getCommitType_1.getCommitType(constants_1.typesOfCommit);
    const commitLabel = await getCommitLabel_1.getCommitLabel({
        commitType,
        labels: constants_1.labels,
    });
    const commitFirstPart = commitLabel === '' ?
        `${commitType.value}` :
        `${commitType.value}@${commitLabel}`;
    const commitMessageValue = await promptInput_1.promptInput(constants_1.ASK_FOR_MESSAGE);
    return `${commitFirstPart}: ${commitMessageValue}`;
}
exports.commitMessage = commitMessage;
//# sourceMappingURL=index.js.map