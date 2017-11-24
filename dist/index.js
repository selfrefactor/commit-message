"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTypeCommit_1 = require("./modules/getTypeCommit");
/**
 * It ask the user for type and text of commit and returns the final commit message.
 *
 * @returns {Promise<string>}
 */
async function commitMessage() {
    const typeCommit = await getTypeCommit_1.getTypeCommit();
    return typeCommit;
}
exports.commitMessage = commitMessage;
//# sourceMappingURL=index.js.map