"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translateNumber_1 = require("./translateNumber");
const rambdax_1 = require("rambdax");
function translateWithDecimal(inputRaw) {
    const input = rambdax_1.replace('.', ',', inputRaw);
    const [integer, afterDecimal] = input.split(',').map(Number);
    const translatedInteger = translateNumber_1.translateNumber(integer);
    const translatedAfterDecimal = afterDecimal === undefined ?
        false :
        translateNumber_1.translateNumber(afterDecimal);
    const translated = translatedAfterDecimal === false ?
        translatedInteger :
        `${translatedInteger} цяло и ${translatedAfterDecimal}`;
    return `${input}/${translated}/`;
}
exports.translateWithDecimal = translateWithDecimal;
//# sourceMappingURL=translateWithDecimal.js.map