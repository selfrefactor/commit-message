"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const constants_1 = require("../constants");
function getOldID(text) {
    const [result] = rambdax_1.match(constants_1.OLD_ID_REGEX, text);
    if (result === undefined) {
        return 'няма';
    }
    const willReturn = rambdax_1.replace(constants_1.OLD_ID_REMOVE, '', result);
    return willReturn.trim();
}
exports.getOldID = getOldID;
//# sourceMappingURL=getOldID.js.map