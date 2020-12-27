"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commitAndPushFast = void 0;
const execCommand_1 = require("./_modules/execCommand");
const commitMessageFast_1 = require("./commitMessageFast");
async function commitAndPushFast(cwd) {
    const commitMessageValue = await commitMessageFast_1.commitMessageFast(cwd);
    await execCommand_1.execCommand('git add . --all');
    await execCommand_1.execCommand(`git commit -m "${commitMessageValue}"`);
    await execCommand_1.execCommand('git push');
}
exports.commitAndPushFast = commitAndPushFast;
//# sourceMappingURL=commitAndPushFast.js.map