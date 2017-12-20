"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("log");
const constants_1 = require("../constants");
const MIN_LENGTH = 12;
const SEPARATOR = ' - ';
function normalize(x) {
    const [first, last] = x.split(SEPARATOR);
    const charToAdd = MIN_LENGTH - first.length;
    const padding = Array(charToAdd).fill(' ').join('');
    return `${first}${padding}${SEPARATOR}${last}`;
}
exports.normalize = normalize;
function showExplanations() {
    constants_1.explanationOfTypes.map(explanation => {
        log_1.log('sep');
        log_1.log(normalize(explanation), '');
    });
    log_1.log('sep');
    log_1.log('sep');
}
exports.showExplanations = showExplanations;
//# sourceMappingURL=showExplanations.js.map