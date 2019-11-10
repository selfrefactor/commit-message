"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const constants_1 = require("../constants");
/**
 * Номер по предходен план
 *
 * @export
 * @param {string} text
 * @returns {string}
 */
function getPreviousNumber(text) {
    const [result] = rambdax_1.match(constants_1.PREVIOUS_NUMBER_REGEX, text);
    if (result === undefined) {
        throw 'PREVIOUS_NUMBER';
    }
    const willReturn = rambdax_1.replace(constants_1.PREVIOUS_NUMBER_REMOVE, '', result);
    return willReturn.trim();
}
exports.getPreviousNumber = getPreviousNumber;
//# sourceMappingURL=getPreviousNumber.js.map