"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASK_FOR_TYPE = 'What is the type of the commit?';
exports.ASK_FOR_LABEL = 'Select label';
exports.ASK_FOR_MESSAGE = 'What is the message of the commit?';
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
    value: 'typings',
};
exports.SUPPORT = {
    explanation: 'update build tasks, lint files or similar; no production code change.',
    key: 'SUPPORT',
    needsLabel: false,
    value: 'chore',
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
const EMPTY_LABEL = {
    belongsTo: exports.typesOfCommit,
    explanation: 'No label',
    value: '',
};
const CUSTOM_LABEL = {
    belongsTo: exports.typesOfCommit,
    explanation: 'Write your own label',
    value: 'custom_label',
};
const PERFORMANCE_LABEL = {
    belongsTo: [
        exports.FEATURE,
        exports.SUPPORT,
    ],
    explanation: 'Improve code performance',
    value: 'perf',
};
const UI_LABEL = {
    belongsTo: [
        exports.FIX,
        exports.FEATURE,
        exports.TEST,
    ],
    explanation: 'Frontend related changes',
    value: 'UI',
};
const STYLE_LABEL = {
    belongsTo: [
        exports.FIX,
        exports.FEATURE,
        exports.TEST,
    ],
    explanation: 'CSS related changes',
    value: 'style',
};
const IMPORTANT_LABEL = {
    belongsTo: [
        exports.FIX,
        exports.FEATURE,
        exports.TEST,
        exports.TYPINGS,
        exports.SUPPORT,
    ],
    explanation: 'Commit has higher significance',
    value: 'important',
};
const SMALL_LABEL = {
    belongsTo: exports.typesOfCommit,
    explanation: 'Small change is made',
    value: 'small',
};
const DEPENDENCY_LABEL = {
    belongsTo: [
        exports.FEATURE,
        exports.FIX,
        exports.SUPPORT,
    ],
    explanation: 'Add, remove or update dependencies',
    value: 'dependency',
};
const CHANGE_LABEL = {
    belongsTo: [exports.FEATURE],
    explanation: 'Changing behaviour of current feature',
    value: 'change',
};
const BREAK_LABEL = {
    belongsTo: [
        exports.FEATURE,
        exports.FIX,
    ],
    explanation: 'Introduce breaking changes',
    value: 'break',
};
const EXAMPLES_LABEL = {
    belongsTo: [exports.DOCS],
    explanation: 'Add, remove or update examples in documentation',
    value: 'examples',
};
const PUBLISH_LABEL = {
    belongsTo: [exports.SUPPORT],
    explanation: 'Publish new version of the code',
    value: 'publish',
};
const TYPO_LABEL = {
    belongsTo: [exports.FIX],
    explanation: 'Fixing typo',
    value: 'typo',
};
exports.labels = [
    EMPTY_LABEL,
    STYLE_LABEL,
    UI_LABEL,
    PERFORMANCE_LABEL,
    CHANGE_LABEL,
    TYPO_LABEL,
    DEPENDENCY_LABEL,
    PUBLISH_LABEL,
    EXAMPLES_LABEL,
    BREAK_LABEL,
    IMPORTANT_LABEL,
    SMALL_LABEL,
    CUSTOM_LABEL,
];
//# sourceMappingURL=constants.js.map