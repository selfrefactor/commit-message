"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_storage_1 = require("package-storage");
function isDependencyEligible(dependency) {
    const loaded = package_storage_1.load('depFn', undefined, true);
    return Array.isArray(loaded) ? !loaded.includes(dependency) : true;
}
exports.isDependencyEligible = isDependencyEligible;
