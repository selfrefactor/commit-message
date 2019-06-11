"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_storage_1 = require("package-storage");
function getCustomLabels() {
    const loaded = package_storage_1.load('commitMessage', undefined, true);
    return Object.keys(loaded).length === 0 ?
        false :
        loaded;
}
exports.getCustomLabels = getCustomLabels;
//# sourceMappingURL=getCustomLabels.js.map