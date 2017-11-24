"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
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
    const commitType = await getCommitType_1.getCommitType();
    const label = commitType.needsLabel ?
        await getLabel()
        :
    ;
    const messageCommit = await promptInput_1.promptInput(constants_1.ASK_FOR_MESSAGE);
    return `${commitType.value} - ${messageCommit}`;
}
exports.commitMessage = commitMessage;
//# sourceMappingURL=index.js.map