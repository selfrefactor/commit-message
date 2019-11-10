"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const constants_1 = require("../constants");
const translateNumber_1 = require("../helpers/translateNumber");
function getAcreage(text) {
    const [result] = rambdax_1.match(constants_1.ACREAGE_REGEX, text);
    if (result === undefined) {
        throw 'ACREAGE';
    }
    const acrageStringRaw = rambdax_1.replace(constants_1.ACREAGE_REMOVE_FIRST, '', result);
    const acrageString = rambdax_1.replace(constants_1.ACREAGE_REMOVE_SECOND, '', acrageStringRaw);
    const [acrageNumber] = rambdax_1.match(/[0-9]*/g, acrageString.trim());
    const withWords = translateNumber_1.translateNumber(Number(acrageNumber));
    return rambdax_1.replace(acrageNumber, `${acrageNumber}/${withWords}/`, acrageString.trim());
}
exports.getAcreage = getAcreage;
//# sourceMappingURL=getAcreage.js.map