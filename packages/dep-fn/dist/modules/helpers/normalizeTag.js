"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
exports.normalizeTag = (x) => {
    const firstChar = x[0] * 1;
    return Number.isNaN(firstChar) ?
        rambdax_1.tail(x) :
        x;
};
//# sourceMappingURL=normalizeTag.js.map