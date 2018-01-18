"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function getWorkInProgress() {
    const filePath = path_1.resolve(__dirname, '../../files/work_in_progress.txt');
    return fs_1.readFileSync(filePath).toString().trim();
}
exports.getWorkInProgress = getWorkInProgress;
//# sourceMappingURL=getWorkInProgress.js.map