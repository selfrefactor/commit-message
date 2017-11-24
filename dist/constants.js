"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASK_FOR_TYPE = 'What is the type of the commit?';
exports.ASK_FOR_MESSAGE = 'What is the message of the commit?';
const featureExplanation = 'start of add new functionality';
exports.FEATURE_START = {
    explanation: featureExplanation,
    key: 'FEATURE_START',
    value: 'feat:start',
};
exports.FEATURE_END = {
    explanation: featureExplanation,
    key: 'FEATURE_END',
    value: 'feat:end',
};
const testExplanation = 'writing unit or end-to-end tests for specific feature';
exports.TEST_START = {
    explanation: testExplanation,
    key: 'TEST_START',
    value: 'test:start',
};
exports.TEST_END = {
    explanation: testExplanation,
    key: 'TEST_END',
    value: 'test:end',
};
const fixExplanation = 'fixing an issue. Start with: \'broken\', \'missing typing\' ...';
exports.FIX_START = {
    explanation: fixExplanation,
    key: 'FIX_START',
    value: 'fix:start',
};
exports.FIX_END = {
    explanation: fixExplanation,
    key: 'FIX_END',
    value: 'fix:end',
};
exports.SUPPORT = {
    explanation: 'cleaning tasks, such as remove unnecessary files or linting files.',
    key: 'SUPPORT',
    value: 'choir:',
};
exports.REFACTOR = {
    explanation: 'refactor code without affecting functionality',
    key: 'REFACTOR',
    value: 'refactor:',
};
exports.DOCS = {
    explanation: 'add to the documentation of the project',
    key: 'DOCS',
    value: 'docs:',
};
exports.typesOfCommit = [
    exports.FEATURE_END,
    exports.FEATURE_START,
    exports.FIX_START,
    exports.FIX_END,
    exports.TEST_END,
    exports.TEST_START,
    exports.REFACTOR,
    exports.SUPPORT,
    exports.DOCS,
];
exports.typesOfCommitKeys = exports.typesOfCommit.map(x => x.key);
exports.explanationOfTypes = [
    `${exports.FIX_START.key} - ${exports.FIX_START.explanation}`,
    `${exports.FEATURE_START.key} - ${exports.FEATURE_START.explanation}`,
    `${exports.TEST_START.key} - ${exports.TEST_START.explanation}`,
    `${exports.REFACTOR.key} - ${exports.REFACTOR.explanation}`,
    `${exports.DOCS.key} - ${exports.DOCS.explanation}`,
    `${exports.SUPPORT.key} - ${exports.SUPPORT.explanation}`,
];
//# sourceMappingURL=constants.js.map