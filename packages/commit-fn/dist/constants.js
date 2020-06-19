"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explanationOfTypes = exports.typesOfCommit = exports.FEATURE = exports.TEST_KEY = exports.SUPPORT_KEY = exports.FIX_KEY = exports.FEATURE_KEY = exports.SERVICE_KEY = exports.DOCS_KEY = exports.CUSTOM_LABEL = exports.NO_LABEL = exports.USER_LABEL_INPUT = exports.ASK_FOR_MESSAGE = exports.ASK_FOR_TYPE = exports.ALL_LABELS = exports.customCommitLabels = void 0;
const package_storage_1 = require("package-storage");
const loaded = package_storage_1.load('commitLabels', undefined, true);
exports.customCommitLabels = Array.isArray(loaded) ? loaded : [];
exports.ALL_LABELS = [
    ...exports.customCommitLabels,
    '🎏 refactor',
    '📦 dep',
    '🔥 important',
    '🆗 small',
    '🦠 issue',
    '🎰 publish',
    '🏇 bump',
    '🐸 break',
    '🔪 deprecate',
    '💮 script',
    '🥑 typings',
    '🎳 lint',
    '💋 style',
    '🐪 build',
    'docs',
    'changelog',
    'examples',
    'method',
    'prepublish',
    'stop',
    'usage',
];
exports.ASK_FOR_TYPE = 'What is the type of the commit?';
exports.ASK_FOR_MESSAGE = 'What is the message of the commit?';
exports.USER_LABEL_INPUT = 'USER_LABEL_INPUT';
exports.NO_LABEL = 'NO_LABEL';
exports.CUSTOM_LABEL = 'CUSTOM_LABEL';
exports.DOCS_KEY = 'DOCS';
exports.SERVICE_KEY = 'SERVICE';
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
const SERVICE = {
    explanation: '🧩   Create or edit of service',
    key: exports.SERVICE_KEY,
    value: 'service',
};
const SUPPORT = {
    explanation: '☂️   Support related commit',
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
    SERVICE,
    SUPPORT,
    TEST,
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