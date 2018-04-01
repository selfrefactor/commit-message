"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_storage_1 = require("package-storage");
function getCustomLabels() {
    try {
        const loaded = package_storage_1.load('commitMessage');
        return Object.keys(loaded).length === 0 ?
            false :
            loaded;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
exports.getCustomLabels = getCustomLabels;
//# sourceMappingURL=getCustomLabels.js.map