"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCustomLabels_1 = require("./modules/getCustomLabels");
const string_fn_1 = require("string-fn");
exports.ASK_FOR_TYPE = 'What is the type of the commit?';
exports.ASK_FOR_LABEL = 'Select label';
exports.ASK_FOR_CUSTOM_LABEL = 'Write your label';
exports.ASK_FOR_MESSAGE = 'What is the message of the commit?';
exports.FEATURE = {
    explanation: 'Significant change in functionality',
    key: 'FEATURE',
    value: 'feat',
};
const TEST = {
    explanation: 'Writing unit or end-to-end tests for specific feature',
    key: 'TEST',
    value: 'test',
};
const FIX = {
    explanation: 'Fixing an issue',
    key: 'FIX',
    value: 'fix',
};
const TYPINGS = {
    explanation: 'Change Typescript definitions',
    key: 'TYPINGS',
    value: 'typings',
};
const SUPPORT = {
    explanation: 'Update build tasks, lint files or similar(no production code change)',
    key: 'SUPPORT',
    value: 'chore',
};
const REFACTOR = {
    explanation: 'Refactor code without affecting functionality',
    key: 'REFACTOR',
    value: 'refactor',
};
const DOCS = {
    explanation: 'Edit the documentation of the project',
    key: 'DOCS',
    value: 'docs',
};
const REVERT = {
    explanation: 'Revert to previous functionality',
    key: 'REVERT',
    value: 'revert',
};
exports.typesOfCommit = [
    exports.FEATURE,
    FIX,
    SUPPORT,
    TEST,
    REFACTOR,
    TYPINGS,
    DOCS,
    REVERT,
];
exports.explanationOfTypes = [
    `${exports.FEATURE.key} - ${exports.FEATURE.explanation}`,
    `${FIX.key} - ${FIX.explanation}`,
    `${SUPPORT.key} - ${SUPPORT.explanation}`,
    `${TEST.key} - ${TEST.explanation}`,
    `${REFACTOR.key} - ${REFACTOR.explanation}`,
    `${TYPINGS.key} - ${TYPINGS.explanation}`,
    `${DOCS.key} - ${DOCS.explanation}`,
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
const EXTEND_LABEL = {
    belongsTo: [
        exports.FEATURE,
        SUPPORT,
    ],
    explanation: 'Build upon current behaviour',
    value: 'extend',
};
const STYLE_LABEL = {
    belongsTo: [
        FIX,
        exports.FEATURE,
    ],
    explanation: 'CSS related changes',
    value: 'style',
};
const ISSUE_LABEL = {
    belongsTo: [
        FIX,
    ],
    explanation: 'Close issue',
    value: 'issue',
};
const IMPORTANT_LABEL = {
    belongsTo: [
        FIX,
        exports.FEATURE,
        TEST,
        TYPINGS,
        SUPPORT,
    ],
    explanation: 'Commit with higher significance',
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
        exports.FEATURE,
        FIX,
        SUPPORT,
        REFACTOR,
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
    belongsTo: [FIX, DOCS, TYPINGS],
    explanation: 'Fixing typo',
    value: 'typo',
};
const USAGE_LABEL = {
    belongsTo: [DOCS],
    explanation: 'Edit usage information',
    value: 'usage',
};
const customLabelsRaw = getCustomLabels_1.getCustomLabels();
const customLabels = [];
if (customLabelsRaw !== false) {
    customLabelsRaw.labels.map(singleLabel => {
        const x = {
            belongsTo: [
                exports.FEATURE,
                FIX,
                TEST,
            ],
            explanation: string_fn_1.constantCase(singleLabel),
            value: singleLabel,
        };
        customLabels.push(x);
    });
}
exports.labels = [
    exports.EMPTY_LABEL,
    ...customLabels,
    STYLE_LABEL,
    UI_LABEL,
    PERFORMANCE_LABEL,
    ISSUE_LABEL,
    TYPO_LABEL,
    DEPENDENCY_LABEL,
    PUBLISH_LABEL,
    EXAMPLES_LABEL,
    USAGE_LABEL,
    EXTEND_LABEL,
    IMPORTANT_LABEL,
    BREAK_LABEL,
    SMALL_LABEL,
    exports.CUSTOM_LABEL,
];
//# sourceMappingURL=constants.js.map