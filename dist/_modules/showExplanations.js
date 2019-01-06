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
    let counter = 0;
    // empty log to assosiate blue with tag=foo
    // as blue is too bright
    // ============================================
    log_1.log('', 'tag=foo');
    constants_1.explanationOfTypes.map(explanation => {
        const tag = counter % 2 === 0 ?
            'tag=baz' :
            'tag=bar';
        log_1.log(normalize(explanation), tag);
        counter++;
    });
}
exports.showExplanations = showExplanations;
//# sourceMappingURL=showExplanations.js.map