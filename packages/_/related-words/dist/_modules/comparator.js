"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertToNum(char) {
    return char.charCodeAt(0) - 97;
}
function comparator(x, y) {
    const diff = x.length - y.length;
    return diff === 0 ?
        convertToNum(x) - convertToNum(y) :
        diff;
}
exports.comparator = comparator;
//# sourceMappingURL=comparator.js.map