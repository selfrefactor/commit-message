"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execCommand_1 = require("./_modules/execCommand");
const commitMessage_1 = require("./commitMessage");
async function commitAndPush(flag) {
    try {
        const commitMessageValue = await commitMessage_1.commitMessage(flag);
        await execCommand_1.execCommand('git add . --all');
        await execCommand_1.execCommand(`git commit -m "${commitMessageValue}"`);
        await execCommand_1.execCommand('git push');
        return `Pushed with message '${commitMessageValue}'`;
    }
    catch (err) {
        throw err;
    }
}
exports.commitAndPush = commitAndPush;
//# sourceMappingURL=commitAndPush.js.map