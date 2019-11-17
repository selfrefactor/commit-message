"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const translateNumber_1 = require("./translateNumber");
function injectTranslatedNumber(input) {
    const [matched] = rambdax_1.match(/№\s?[0-9]{1,3}/, input);
    if (matched === undefined) {
        return input;
    }
    const num = Number(rambdax_1.tail(matched));
    const translated = translateNumber_1.translateNumber(num);
    const injection = `${matched}/${translated}/`;
    return rambdax_1.replace(/№\s?[0-9]{1,3}/, injection, input);
}
exports.injectTranslatedNumber = injectTranslatedNumber;
//# sourceMappingURL=injectTranslatedNumber.js.map