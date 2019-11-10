"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const constants_1 = require("../constants");
function getPermanentPurpose(text) {
    const [result] = rambdax_1.match(constants_1.PERMANENT_PURPOSE_REGEX, text);
    if (result === undefined) {
        throw 'PERMANENT_PURPOSE';
    }
    const permanentPurpose = rambdax_1.replace(constants_1.PERMANENT_PURPOSE_REMOVE, '', result);
    return permanentPurpose.toLowerCase().trim();
}
exports.getPermanentPurpose = getPermanentPurpose;
//# sourceMappingURL=getPermanentPurpose.js.map