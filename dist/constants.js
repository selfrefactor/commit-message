"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASK_FOR_TYPE = 'What is the type of the commit?';
exports.ASK_FOR_MESSAGE = 'What is the message of the commit?';
exports.FEATURE_START = {
    key: 'FEATURE_START',
    value: 'feat:start',
};
exports.FEATURE_END = {
    key: 'FEATURE_END',
    value: 'feat:end',
};
exports.TEST_START = {
    key: 'TEST_START',
    value: 'test:start',
};
exports.TEST_END = {
    key: 'TEST_END',
    value: 'test:end',
};
exports.FIX_START = {
    key: 'FIX_START',
    value: 'fix:start',
};
exports.FIX_END = {
    key: 'FIX_END',
    value: 'fix:end',
};
exports.SUPPORT = {
    key: 'SUPPORT',
    value: 'choir:',
};
exports.REFACTOR = {
    key: 'SUPPORT',
    value: 'refactor:',
};
exports.DOCS = {
    key: 'DOCS',
    value: 'docs:',
};
exports.typesOfCommit = [
    exports.DOCS,
    exports.FEATURE_END,
    exports.FEATURE_START,
    exports.FIX_START,
    exports.FIX_END,
    exports.REFACTOR,
    exports.SUPPORT,
    exports.TEST_END,
    exports.TEST_START,
];
exports.typesOfCommitKeys = exports.typesOfCommit.map(x => x.key);
exports.explanationOfTypes = [
    `${exports.FIX_START.key} - start of fixing an issue`,
    `${exports.FEATURE_START.key} - start of add new functionality`,
    `${exports.TEST_START.key} - start of writing unit or end-to-end tests for specific feature`,
    `${exports.REFACTOR.key} - refactor code without affecting functionality`,
    `${exports.DOCS.key} - related to documentation of the project`,
    `${exports.SUPPORT.key} - cleaning tasks, such as remove unnecessary files or linting files.`,
];
//# sourceMappingURL=constants.js.map