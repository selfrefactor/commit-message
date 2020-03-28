"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveWorkInProgress = void 0;
const package_storage_1 = require("../../../package-storage/");
function saveWorkInProgress(commitMessageValue) {
    try {
        package_storage_1.save('commitMessage', 'workInProgress', commitMessageValue, true);
    }
    catch (e) {
        console.log(e);
    }
}
exports.saveWorkInProgress = saveWorkInProgress;
//# sourceMappingURL=saveWorkInProgress.js.map