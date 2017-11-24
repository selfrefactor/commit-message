"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASK_FOR_TYPE = 'What is the type of the commit?';
exports.FEATURE = 'feat';
exports.SUPPORT = 'choir';
exports.REFACTOR = 'refactor';
exports.DOCS = 'docs';
exports.TEST = 'test';
exports.typesOfCommit = [
    exports.DOCS,
    exports.FEATURE,
    exports.REFACTOR,
    exports.SUPPORT,
    exports.TEST,
];
exports.explanationOfTypes = [
    `${exports.FEATURE} - add new functionality`,
    `${exports.REFACTOR} - refactor code without affecting functionality`,
    `${exports.TEST} - add unit or end-to-end tests`,
];
//# sourceMappingURL=constants.js.map