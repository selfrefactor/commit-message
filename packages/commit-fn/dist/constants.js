"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_LABELS = exports.NO_LABEL = exports.explanationOfTypes = exports.typesOfCommit = exports.FEATURE = exports.TEST_KEY = exports.SUPPORT_KEY = exports.FIX_KEY = exports.FEATURE_KEY = exports.DOCS_KEY = exports.ASK_FOR_MESSAGE = exports.ASK_FOR_CUSTOM_LABEL = exports.ASK_FOR_TYPE = void 0;
exports.ASK_FOR_TYPE = 'What is the type of the commit?';
exports.ASK_FOR_CUSTOM_LABEL = 'Write your label';
exports.ASK_FOR_MESSAGE = 'What is the message of the commit?';
exports.DOCS_KEY = 'DOCS';
exports.FEATURE_KEY = 'FEATURE';
exports.FIX_KEY = 'FIX';
exports.SUPPORT_KEY = 'SUPPORT';
exports.TEST_KEY = 'TEST';
exports.FEATURE = {
    explanation: '💡   Add new feature',
    key: exports.FEATURE_KEY,
    value: 'feat',
};
const TEST = {
    explanation: '🔍   Create unit or end-to-end test',
    key: exports.TEST_KEY,
    value: 'test',
};
const FIX = {
    explanation: '🐛   Submit a bug fix',
    key: exports.FIX_KEY,
    value: 'fix',
};
const SUPPORT = {
    explanation: '☂️   Chore',
    key: exports.SUPPORT_KEY,
    value: 'chore',
};
const DOCS = {
    explanation: '✍   Edit documentation',
    key: exports.DOCS_KEY,
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
exports.NO_LABEL = 'NO_LABEL';
exports.ALL_LABELS = [
    '🏗 bump',
    '💣 break',
    '🔪 deprecate',
    '📦 dep',
    '📝 examples',
    '⚠ important',
    '📨 publish',
    '🆗 small',
    '💋 style',
    '📚️ typings',
    'benchmark',
    'build',
    'docs',
    'lint',
    'method',
    'prepublish',
    'refactor',
    'script',
    'typings',
    'usage',
];
//# sourceMappingURL=constants.js.map