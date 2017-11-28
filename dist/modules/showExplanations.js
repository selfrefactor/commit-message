"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("log");
const constants_1 = require("../constants");
function showExplanations() {
    constants_1.explanationOfTypes.map(explanation => {
        log_1.log('sep');
        log_1.log(explanation, '');
    });
    log_1.log('sep');
    log_1.log('sep');
}
exports.showExplanations = showExplanations;
//# sourceMappingURL=showExplanations.js.map