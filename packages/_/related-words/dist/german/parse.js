"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const comparator_1 = require("../_modules/comparator");
function parse(word, input) {
    if (input.synsets === undefined) {
        return [];
    }
    const synonyms = [];
    input.synsets.forEach(singleSet => {
        const toPush = rambdax_1.pluck('term', singleSet.terms)
            .filter(singleSynonym => !singleSynonym.toLowerCase().includes(word));
        synonyms.push(...toPush);
    });
    return rambdax_1.sort(comparator_1.comparator, rambdax_1.uniq(synonyms));
}
exports.parse = parse;
//# sourceMappingURL=parse.js.map