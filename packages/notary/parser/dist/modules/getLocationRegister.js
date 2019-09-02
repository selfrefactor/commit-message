"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const constants_1 = require("../constants");
const titleCase_1 = require("../helpers/titleCase");
function getLocationRegister(text) {
    const [result] = rambdax_1.match(constants_1.LOCATION_REGISTER_REGEX, text);
    if (result === undefined) {
        throw 'LOCATION_REGISTER';
    }
    const willReturn = rambdax_1.replace(constants_1.LOCATION_REGISTER_REMOVE, '', result);
    return titleCase_1.titleCase(willReturn.trim());
}
exports.getLocationRegister = getLocationRegister;
//# sourceMappingURL=getLocationRegister.js.map