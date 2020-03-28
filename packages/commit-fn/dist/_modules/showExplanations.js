"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showExplanations = exports.normalize = void 0;
const helpers_fn_1 = require("helpers-fn");
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
    let counter = 0;
    constants_1.explanationOfTypes.forEach(explanation => {
        const tag = counter % 2 === 0 ? 'tag=foo' : 'tag=bar';
        helpers_fn_1.log(normalize(explanation), tag);
        counter++;
    });
}
exports.showExplanations = showExplanations;
//# sourceMappingURL=showExplanations.js.map