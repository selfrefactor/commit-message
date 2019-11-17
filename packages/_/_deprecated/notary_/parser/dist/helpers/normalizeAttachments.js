"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injectTranslatedNumber_1 = require("./injectTranslatedNumber");
const injectTranslatedAcreage_1 = require("./injectTranslatedAcreage");
const injectTranslatedPercentage_1 = require("./injectTranslatedPercentage");
function normalizeAttachments(input) {
    const withNumber = injectTranslatedNumber_1.injectTranslatedNumber(input);
    const withAcreage = injectTranslatedAcreage_1.injectTranslatedAcreage(withNumber);
    const withPercentage = injectTranslatedPercentage_1.injectTranslatedPercentage(withAcreage);
    return withPercentage;
}
exports.normalizeAttachments = normalizeAttachments;
//# sourceMappingURL=normalizeAttachments.js.map