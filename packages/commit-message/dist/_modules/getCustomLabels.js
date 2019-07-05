"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../package-storage/index.js");
function getCustomLabels() {
    const loaded = index_js_1.load('commitMessage', undefined, true);
    return Object.keys(loaded).length === 0 ?
        false :
        loaded;
}
exports.getCustomLabels = getCustomLabels;
//# sourceMappingURL=getCustomLabels.js.map