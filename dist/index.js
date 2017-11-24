"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const getTypeCommit_1 = require("./modules/getTypeCommit");
const promptInput_1 = require("./modules/promptInput");
/**
 * It ask the user for type and text of commit and returns the final commit message.
 *
 * @returns {Promise<string>}
 */
async function commitMessage() {
    const typeCommit = await getTypeCommit_1.getTypeCommit();
    const messageCommit = await promptInput_1.promptInput(constants_1.ASK_FOR_MESSAGE);
    return messageCommit;
    // return typeCommit
}
exports.commitMessage = commitMessage;
//# sourceMappingURL=index.js.map