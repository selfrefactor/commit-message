"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const constants_1 = require("../constants");
function getAddress(text) {
    const [result] = rambdax_1.match(constants_1.ADDRESS_REGEX, text);
    if (result === undefined) {
        throw 'ADDRESS';
    }
    const willReturnRaw = rambdax_1.replace(constants_1.ADDRESS_REMOVE_FIRST, '', result);
    const willReturn = rambdax_1.replace(constants_1.ADDRESS_REMOVE_SECOND, '', willReturnRaw);
    return willReturn.trim();
}
exports.getAddress = getAddress;
//# sourceMappingURL=getAddress.js.map