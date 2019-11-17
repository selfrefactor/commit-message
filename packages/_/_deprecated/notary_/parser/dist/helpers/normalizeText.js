"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const translateNumber_1 = require("./translateNumber");
function normalizeFirstNumber(input) {
    const matched = rambdax_1.match(/[0-9]+,/, input);
    if (matched.length === 0) {
        return input;
    }
    const number = Number(rambdax_1.init(matched[0]));
    const numberWithWords = translateNumber_1.translateNumber(number);
    const replacer = `${number}/${numberWithWords}/,`;
    return rambdax_1.replace(/[0-9]+,/, replacer, input);
}
function normalizeText(input) {
    const withNormalizedNumber = normalizeFirstNumber(input);
    const clean = rambdax_1.replace('\nПредназначение', ', предназначение', withNormalizedNumber);
    const cleaner = rambdax_1.replace('\nБрой', ', брой', clean);
    return rambdax_1.replace(/\n/gm, ' ', cleaner);
}
exports.normalizeText = normalizeText;
//# sourceMappingURL=normalizeText.js.map