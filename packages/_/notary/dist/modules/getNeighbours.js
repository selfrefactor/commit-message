"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const constants_1 = require("../constants");
function getNeighbours(text) {
    const [result] = rambdax_1.match(constants_1.NEIGHBOURS_REGEX, text);
    if (result === undefined) {
        throw 'NEIGHBOURS';
    }
    const willReturn = rambdax_1.replace(constants_1.NEIGHBOURS_REMOVE, '', result);
    return willReturn.trim();
}
exports.getNeighbours = getNeighbours;
//# sourceMappingURL=getNeighbours.js.map