"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const translateWithDecimal_1 = require("./translateWithDecimal");
const string_fn_1 = require("string-fn");
function injectTranslatedPercentage(input) {
    const [matched] = rambdax_1.match(/[0-9,]{1,7}%\s*ид\.ч\./, input);
    if (matched === undefined) {
        return input;
    }
    const num = rambdax_1.replace(/%\s*ид\.ч\./, '', matched);
    const translatedRaw = translateWithDecimal_1.translateWithDecimal(num);
    const translated = string_fn_1.between(translatedRaw, '/', '/');
    const injection = `${matched}/${translated} процента/`;
    return rambdax_1.replace(/[0-9,]{1,7}%\s*ид\.ч\./, injection, input);
}
exports.injectTranslatedPercentage = injectTranslatedPercentage;
//# sourceMappingURL=injectTranslatedPercentage.js.map