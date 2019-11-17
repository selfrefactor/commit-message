"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
function getNumberOfStreet(address) {
    const shouldBeNumber = rambdax_1.last(rambdax_1.split('№', address)).trim();
    const isNumber = !Number.isNaN(Number(shouldBeNumber));
    return isNumber ?
        Number(shouldBeNumber) :
        shouldBeNumber;
}
exports.getNumberOfStreet = getNumberOfStreet;
//# sourceMappingURL=getNumberOfStreet.js.map