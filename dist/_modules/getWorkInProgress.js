"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_storage_1 = require("package-storage");
function getWorkInProgress() {
    try {
        return package_storage_1.load('commitMessage', 'workInProgress');
    }
    catch (e) {
        console.log(e.message);
        return '';
    }
}
exports.getWorkInProgress = getWorkInProgress;
//# sourceMappingURL=getWorkInProgress.js.map