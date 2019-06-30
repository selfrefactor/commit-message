"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMEOUT = 50000;
exports.waitForNetwork = {
    timeout: exports.TIMEOUT,
    waitUntil: 'networkidle0',
};
exports.waitForLoad = {
    timeout: exports.TIMEOUT,
    waitUntil: 'load',
};
//# sourceMappingURL=constants.js.map