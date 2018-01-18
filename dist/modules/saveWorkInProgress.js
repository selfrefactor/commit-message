"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function saveWorkInProgress(commitMessageValue) {
    const filePath = path_1.resolve(__dirname, '../../files/work_in_progress.txt');
    fs_1.writeFileSync(filePath, commitMessageValue);
}
exports.saveWorkInProgress = saveWorkInProgress;
//# sourceMappingURL=saveWorkInProgress.js.map