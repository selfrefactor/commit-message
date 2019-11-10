"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const comparator_1 = require("../_modules/comparator");
function normalize(word, synonyms) {
    const normalized = rambdax_1.flatten(synonyms.map(singleSynonym => singleSynonym.split(', ').filter(x => !x.toLowerCase().includes(word))));
    return rambdax_1.uniq(rambdax_1.sort(comparator_1.comparator, normalized));
}
exports.normalize = normalize;
//# sourceMappingURL=normalize.js.map