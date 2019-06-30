"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateQuestion = (input) => {
    return `Update dependency '${input.dependency}' from
'${input.currentTag}' to '${input.latestTag}' ?`;
};
//# sourceMappingURL=getUpdateQuestion.js.map