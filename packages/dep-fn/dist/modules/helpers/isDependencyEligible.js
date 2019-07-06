"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../../package-storage/index.js");
function isDependencyEligible(dependency) {
    const loaded = index_js_1.load('depFn', undefined, true);
    return Array.isArray(loaded) ?
        !loaded.includes(dependency) :
        true;
}
exports.isDependencyEligible = isDependencyEligible;
//# sourceMappingURL=isDependencyEligible.js.map