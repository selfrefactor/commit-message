"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASK_FOR_TYPE = 'What is the type of the commit?';
exports.ASK_FOR_LABEL = 'Select label';
exports.ASK_FOR_CUSTOM_LABEL = 'Write your label';
exports.ASK_FOR_MESSAGE = 'What is the message of the commit?';
exports.FEATURE = {
    explanation: 'Significant change in the functionality',
    key: 'FEATURE',
    value: 'feat',
};
const TEST = {
    explanation: 'writing unit or end-to-end tests for specific feature',
    key: 'TEST',
    value: 'test',
};
const FIX = {
    explanation: 'fixing an issue. Start with: \'broken\', \'missing typing\' ...',
    key: 'FIX',
    value: 'fix',
};
const TYPINGS = {
    explanation: 'edit Typescript definitions',
    key: 'TYPINGS',
    value: 'typings',
};
const SUPPORT = {
    explanation: 'update build tasks, lint files or similar; no production code change.',
    key: 'SUPPORT',
    value: 'chore',
};
const REFACTOR = {
    explanation: 'refactor code without affecting functionality',
    key: 'REFACTOR',
    value: 'refactor',
};
const DOCS = {
    explanation: 'add to the documentation of the project',
    key: 'DOCS',
    value: 'docs',
};
exports.typesOfCommit = [
    exports.FEATURE,
    FIX,
    TEST,
    REFACTOR,
    TYPINGS,
    SUPPORT,
    DOCS,
];
exports.explanationOfTypes = [
    `${FIX.key} - ${FIX.explanation}`,
    `${exports.FEATURE.key} - ${exports.FEATURE.explanation}`,
    `${TEST.key} - ${TEST.explanation}`,
    `${REFACTOR.key} - ${REFACTOR.explanation}`,
    `${TYPINGS.key} - ${TYPINGS.explanation}`,
    `${DOCS.key} - ${DOCS.explanation}`,
    `${SUPPORT.key} - ${SUPPORT.explanation}`,
];
exports.EMPTY_LABEL = {
    belongsTo: exports.typesOfCommit,
    explanation: 'No label',
    value: '',
};
exports.CUSTOM_LABEL = {
    belongsTo: exports.typesOfCommit,
    explanation: 'Write your own label',
    value: 'custom_label',
};
const PERFORMANCE_LABEL = {
    belongsTo: [
        exports.FEATURE,
        SUPPORT,
    ],
    explanation: 'Improve code performance',
    value: 'perf',
};
const UI_LABEL = {
    belongsTo: [
        FIX,
        exports.FEATURE,
        TEST,
    ],
    explanation: 'Frontend related changes',
    value: 'UI',
};
const STYLE_LABEL = {
    belongsTo: [
        FIX,
        exports.FEATURE,
        TEST,
    ],
    explanation: 'CSS related changes',
    value: 'style',
};
const IMPORTANT_LABEL = {
    belongsTo: [
        FIX,
        exports.FEATURE,
        TEST,
        TYPINGS,
        SUPPORT,
    ],
    explanation: 'Commit has higher significance',
    value: 'important',
};
const SMALL_LABEL = {
    belongsTo: [
        DOCS,
        SUPPORT,
        REFACTOR,
    ],
    explanation: 'Small change is made',
    value: 'small',
};
const DEPENDENCY_LABEL = {
    belongsTo: [
        FIX,
        SUPPORT,
    ],
    explanation: 'Add, remove or update dependencies',
    value: 'dependency',
};
const BREAK_LABEL = {
    belongsTo: [
        exports.FEATURE,
        FIX,
    ],
    explanation: 'Introduce breaking changes',
    value: 'break',
};
const EXAMPLES_LABEL = {
    belongsTo: [DOCS],
    explanation: 'Add, remove or update examples in documentation',
    value: 'examples',
};
const PUBLISH_LABEL = {
    belongsTo: [SUPPORT],
    explanation: 'Publish new version of the code',
    value: 'publish',
};
const TYPO_LABEL = {
    belongsTo: [FIX],
    explanation: 'Fixing typo',
    value: 'typo',
};
exports.labels = [
    exports.EMPTY_LABEL,
    STYLE_LABEL,
    UI_LABEL,
    PERFORMANCE_LABEL,
    TYPO_LABEL,
    DEPENDENCY_LABEL,
    PUBLISH_LABEL,
    EXAMPLES_LABEL,
    BREAK_LABEL,
    IMPORTANT_LABEL,
    SMALL_LABEL,
    exports.CUSTOM_LABEL,
];
//# sourceMappingURL=constants.js.map