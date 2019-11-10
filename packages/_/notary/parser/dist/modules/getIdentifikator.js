"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const constants_1 = require("../constants");
function getIdentifikator(text) {
    const [result] = rambdax_1.match(constants_1.IDENTIFIKATOR_REGEX, text);
    if (result === undefined) {
        throw 'IDENTIFIKATOR';
    }
    const willReturn = rambdax_1.replace(constants_1.IDENTIFIKATOR_REMOVE, '', result);
    return willReturn.trim();
}
exports.getIdentifikator = getIdentifikator;
//# sourceMappingURL=getIdentifikator.js.map