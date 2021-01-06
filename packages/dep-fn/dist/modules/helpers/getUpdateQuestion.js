"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateQuestion = void 0;
const getUpdateQuestion = (input) => {
    return `Update dependency '${input.dependency}' from
'${input.currentTag}' to '${input.latestTag}' ?`;
};
exports.getUpdateQuestion = getUpdateQuestion;
