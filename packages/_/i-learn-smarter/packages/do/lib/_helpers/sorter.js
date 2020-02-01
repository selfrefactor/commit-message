"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertToNum(char) {
    return char.charCodeAt(0) - 97;
}
function sorter(x, y) {
    const diff = x.length - y.length;
    return diff === 0 ?
        convertToNum(x) - convertToNum(y) :
        diff;
}
exports.sorter = sorter;
function sortByProp(prop) {
    return (x, y) => sorter(x[prop], y[prop]);
}
exports.sortByProp = sortByProp;
//# sourceMappingURL=sorter.js.map