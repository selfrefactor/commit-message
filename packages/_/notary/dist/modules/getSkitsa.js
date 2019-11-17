"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const constants_1 = require("../constants");
function getSkitsa(text) {
    const [result] = rambdax_1.match(constants_1.SKITSA_REGEX, text);
    if (result === undefined)
        throw 'SKITSA';
    const willReturn = rambdax_1.replace(constants_1.SKITSA_REMOVE, '', result);
    return willReturn.trim();
}
exports.getSkitsa = getSkitsa;
//# sourceMappingURL=getSkitsa.js.map