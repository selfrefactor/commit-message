"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTag = void 0;
const rambdax_1 = require("rambdax");
const normalizeTag = (x) => {
    const firstChar = x[0] * 1;
    return Number.isNaN(firstChar) ? rambdax_1.tail(x) : x;
};
exports.normalizeTag = normalizeTag;
