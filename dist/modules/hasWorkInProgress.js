"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function getWorkInProgress(commitMessageValue) {
    const filePath = path_1.resolve(__dirname, '../../files/work_in_progress.txt');
    workInProgress = fs_1.readFileSync(filePath, commitMessageValue).toString().trim();
}
exports.getWorkInProgress = getWorkInProgress;
//# sourceMappingURL=hasWorkInProgress.js.map