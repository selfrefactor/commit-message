"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const constants_1 = require("../constants");
function getZapoved(text) {
    const [result] = rambdax_1.match(constants_1.ZAPOVED_REGEX, text);
    if (result === undefined) {
        throw 'ZAPOVED';
    }
    const willReturn = rambdax_1.replace(constants_1.ZAPOVED_REMOVE, '', result);
    return willReturn.trim();
}
exports.getZapoved = getZapoved;
//# sourceMappingURL=getZapoved.js.map