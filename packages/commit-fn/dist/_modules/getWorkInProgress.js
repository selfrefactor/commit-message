"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkInProgress = void 0;
const package_storage_1 = require("../../../package-storage/");
function getWorkInProgress() {
    try {
        return package_storage_1.load('commitMessage', 'workInProgress', true) || '';
    }
    catch (e) {
        return '';
    }
}
exports.getWorkInProgress = getWorkInProgress;
//# sourceMappingURL=getWorkInProgress.js.map