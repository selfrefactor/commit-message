"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASK_FOR_TYPE = 'What is the type of the commit?';
exports.ASK_FOR_LABEL = 'Select label';
exports.ASK_FOR_MESSAGE = 'What is the message of the commit?';
exports.labels = [
    'none',
    'start',
    'end',
    'perf',
    'UI',
    'style',
    'important',
];
exports.FEATURE = {
    explanation: 'Significant change in the functionality',
    key: 'FEATURE',
    needsLabel: true,
    value: 'feat',
};
exports.TEST = {
    explanation: 'writing unit or end-to-end tests for specific feature',
    key: 'TEST',
    needsLabel: true,
    value: 'test',
};
exports.FIX = {
    explanation: 'fixing an issue. Start with: \'broken\', \'missing typing\' ...',
    key: 'FIX',
    needsLabel: true,
    value: 'fix',
};
exports.TYPINGS = {
    explanation: 'edit Typescript definitions',
    key: 'TYPINGS',
    needsLabel: false,
    value: 'typing',
};
exports.SUPPORT = {
    explanation: 'cleaning tasks, such as remove unnecessary files or linting files.',
    key: 'SUPPORT',
    needsLabel: false,
    value: 'choir',
};
exports.REFACTOR = {
    explanation: 'refactor code without affecting functionality',
    key: 'REFACTOR',
    needsLabel: false,
    value: 'refactor',
};
exports.DOCS = {
    explanation: 'add to the documentation of the project',
    key: 'DOCS',
    needsLabel: false,
    value: 'docs',
};
exports.typesOfCommit = [
    exports.FEATURE,
    exports.FIX,
    exports.TEST,
    exports.REFACTOR,
    exports.TYPINGS,
    exports.SUPPORT,
    exports.DOCS,
];
exports.typesOfCommitKeys = exports.typesOfCommit.map(x => x.key);
exports.explanationOfTypes = [
    `${exports.FIX.key} - ${exports.FIX.explanation}`,
    `${exports.FEATURE.key} - ${exports.FEATURE.explanation}`,
    `${exports.TEST.key} - ${exports.TEST.explanation}`,
    `${exports.REFACTOR.key} - ${exports.REFACTOR.explanation}`,
    `${exports.TYPINGS.key} - ${exports.TYPINGS.explanation}`,
    `${exports.DOCS.key} - ${exports.DOCS.explanation}`,
    `${exports.SUPPORT.key} - ${exports.SUPPORT.explanation}`,
];
//# sourceMappingURL=constants.js.map