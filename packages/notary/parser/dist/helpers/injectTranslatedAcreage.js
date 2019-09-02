"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const translateNumber_1 = require("./translateNumber");
function injectTranslatedAcreage(input) {
    const [matched] = rambdax_1.match(/[0-9]{1,4}\s*кв\.м\./, input);
    if (matched === undefined) {
        return input;
    }
    const num = Number(rambdax_1.replace('кв.м.', '', matched));
    const translated = translateNumber_1.translateNumber(num);
    const injection = `${matched}/${translated}/`;
    return rambdax_1.replace(/[0-9]{1,4}\s*кв\.м\./, injection, input);
}
exports.injectTranslatedAcreage = injectTranslatedAcreage;
//# sourceMappingURL=injectTranslatedAcreage.js.map