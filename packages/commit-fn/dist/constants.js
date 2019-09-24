"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCustomLabels_1 = require("./_modules/getCustomLabels");
const string_fn_1 = require("string-fn");
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
exports.EMPTY_LABEL = {
    belongsTo: exports.typesOfCommit,
    explanation: 'No label',
    value: '',
};
exports.CUSTOM_LABEL = {
    belongsTo: exports.typesOfCommit,
    explanation: 'Write your own label',
    value: 'custom',
};
const TYPINGS_LABEL = {
    belongsTo: [
        exports.FEATURE,
        FIX,
    ],
    explanation: '📚️ ️Edit Typescript definitions',
    value: 'typings',
};
const STYLE_LABEL = {
    belongsTo: [
        FIX,
        exports.FEATURE,
    ],
    explanation: '💋  CSS/LESS related changes',
    value: 'style',
};
const ISSUE_LABEL = {
    belongsTo: [
        FIX,
    ],
    explanation: '🚮  Close issue',
    value: 'issue',
};
const IMPORTANT_LABEL = {
    belongsTo: [
        FIX,
        exports.FEATURE,
        TEST,
        SUPPORT,
    ],
    explanation: '⚠  Commit with higher significance',
    value: 'important',
};
const SMALL_LABEL = {
    belongsTo: [
        exports.FEATURE,
        TEST,
        DOCS,
        SUPPORT,
    ],
    explanation: '🆗  Small change',
    value: 'small',
};
const DEPENDENCY_LABEL = {
    belongsTo: [
        SUPPORT,
    ],
    explanation: '📦  Change of dependency',
    value: 'dep',
};
const BUMP_LABEL = {
    belongsTo: [
        SUPPORT,
    ],
    explanation: '🏗  Publish new version of library',
    value: 'bump',
};
const BREAK_LABEL = {
    belongsTo: [
        exports.FEATURE,
    ],
    explanation: '💣  Breaking changes',
    value: 'break',
};
const EXAMPLES_LABEL = {
    belongsTo: [DOCS],
    explanation: '📝  Update examples in documentation',
    value: 'examples',
};
const PUBLISH_LABEL = {
    belongsTo: [SUPPORT],
    explanation: '📨  Publish new version',
    value: 'publish',
};
const USAGE_LABEL = {
    belongsTo: [DOCS],
    explanation: 'ℹ️  Edit usage information',
    value: 'usage',
};
const REMOVE_LABEL = {
    belongsTo: [exports.FEATURE, TEST, DOCS],
    explanation: '🔪  Remove feature or test',
    value: 'cut',
};
exports.START_LABEL = {
    belongsTo: [exports.FEATURE, SUPPORT, FIX],
    explanation: '▶️  Start',
    value: 'start',
};
exports.PROGRESS_LABEL = {
    belongsTo: [exports.FEATURE, SUPPORT, FIX],
    explanation: '🐌  Continue developing',
    value: 'progress',
};
exports.STOP_LABEL = {
    belongsTo: [exports.FEATURE, SUPPORT, FIX],
    explanation: '⏹  Stop',
    value: 'stop',
};
const customLabelsRaw = getCustomLabels_1.getCustomLabels();
const customLabels = [];
const getBelongsTo = (key) => {
    let commitTypeHolder;
    exports.typesOfCommit.forEach(singleCommitType => {
        if (singleCommitType.key.toLowerCase() === key) {
            commitTypeHolder = singleCommitType;
        }
    });
    if (!commitTypeHolder)
        return [];
    return [commitTypeHolder];
};
if (customLabelsRaw !== false) {
    const belongsToWhenLabel = [
        exports.FEATURE,
        FIX,
        TEST,
    ];
    Object.keys(customLabelsRaw).forEach(key => {
        if (key === 'workInProgress') {
            return;
        }
        customLabelsRaw[key].forEach(singleLabel => {
            const belongsToValue = key === 'labels' ?
                belongsToWhenLabel :
                getBelongsTo(key);
            const x = {
                belongsTo: belongsToValue,
                explanation: `🔧  ${string_fn_1.constantCase(singleLabel)}`,
                value: singleLabel,
            };
            customLabels.push(x);
        });
    });
}
exports.labels = [
    exports.EMPTY_LABEL,
    DEPENDENCY_LABEL,
    SMALL_LABEL,
    IMPORTANT_LABEL,
    ...customLabels,
    exports.START_LABEL,
    exports.PROGRESS_LABEL,
    exports.STOP_LABEL,
    BUMP_LABEL,
    BREAK_LABEL,
    TYPINGS_LABEL,
    STYLE_LABEL,
    PUBLISH_LABEL,
    ISSUE_LABEL,
    EXAMPLES_LABEL,
    USAGE_LABEL,
    REMOVE_LABEL,
    exports.CUSTOM_LABEL,
];
//# sourceMappingURL=constants.js.map