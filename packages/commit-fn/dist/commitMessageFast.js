"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commitMessageFast = void 0;
const constants_1 = require("./constants");
const FuzzySet = require("fuzzyset");
const FUZZY_LIMIT = 0.3;
function applySearch(fuzzyInstance, defaultValue, searchString) {
    const fuzzyResult = fuzzyInstance
        .get(searchString)
        .filter(([score]) => score > FUZZY_LIMIT)
        // .map(tap(console.log))
        .map(([, x]) => x);
    if (fuzzyResult.length === 0)
        return defaultValue;
    return fuzzyResult[0];
}
async function commitMessageFast(input) {
    const allModes = constants_1.typesOfCommit.map(x => x.value);
    const allTags = constants_1.ALL_LABELS.map(x => x.includes(' ') ? x.split(' ')[1] : x);
    const commitMode = applySearch(FuzzySet(allModes, false, 1, 2), allModes[0], input.commitMode);
    const commitTag = input.commitTag
        ? applySearch(FuzzySet(allTags, false, 1, 2), '', input.commitTag)
        : '';
    if (!commitTag) {
        return `${commitMode}: ${input.commitMessage}`;
    }
    return `${commitMode}@${commitTag} ${input.commitMessage}`;
}
exports.commitMessageFast = commitMessageFast;
//# sourceMappingURL=commitMessageFast.js.map