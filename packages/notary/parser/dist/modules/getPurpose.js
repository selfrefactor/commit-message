"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const constants_1 = require("../constants");
function getPurpose(text) {
    const [result] = rambdax_1.match(constants_1.PURPOSE_REGEX, text);
    if (result === undefined) {
        throw 'PURPOSE';
    }
    const willReturn = rambdax_1.replace(constants_1.PURPOSE_REMOVE, '', result);
    return willReturn.toLowerCase().trim();
}
exports.getPurpose = getPurpose;
//# sourceMappingURL=getPurpose.js.map