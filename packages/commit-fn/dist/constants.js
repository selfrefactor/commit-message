"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explanationOfTypes = exports.typesOfCommit = exports.FEATURE = exports.ASK_FOR_MESSAGE = exports.ASK_FOR_CUSTOM_LABEL = exports.ASK_FOR_LABEL = exports.ASK_FOR_TYPE = void 0;
exports.ASK_FOR_TYPE = 'What is the type of the commit?';
exports.ASK_FOR_LABEL = 'Select label';
exports.ASK_FOR_CUSTOM_LABEL = 'Write your label';
exports.ASK_FOR_MESSAGE = 'What is the message of the commit?';
exports.FEATURE = {
    explanation: '💡   Add new feature',
    key: 'FEATURE',
    value: 'feat',
};
const TEST = {
    explanation: '🔍   Create unit or end-to-end test',
    key: 'TEST',
    value: 'test',
};
const FIX = {
    explanation: '🐛   Submit a bug fix',
    key: 'FIX',
    value: 'fix',
};
const SUPPORT = {
    explanation: '☂️   Chore',
    key: 'SUPPORT',
    value: 'chore',
};
const DOCS = {
    explanation: '✍   Edit documentation',
    key: 'DOCS',
    value: 'docs',
};
exports.typesOfCommit = [
    exports.FEATURE,
    FIX,
    TEST,
    SUPPORT,
    DOCS,
];
exports.explanationOfTypes = [
    `${exports.FEATURE.key} - ${exports.FEATURE.explanation}`,
    `${FIX.key} - ${FIX.explanation}`,
    `${SUPPORT.key} - ${SUPPORT.explanation}`,
    `${TEST.key} - ${TEST.explanation}`,
    `${DOCS.key} - ${DOCS.explanation}`,
];
//# sourceMappingURL=constants.js.map