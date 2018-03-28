"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_storage_1 = require("package-storage");
function saveWorkInProgress(commitMessageValue) {
    try {
        package_storage_1.save('commitMessage', 'workInProgress', commitMessageValue, true);
    }
    catch (e) {
        console.log(e.message);
    }
}
exports.saveWorkInProgress = saveWorkInProgress;
//# sourceMappingURL=saveWorkInProgress.js.map