"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const translateWithDecimal_1 = require("./translateWithDecimal");
function normalizeAcreage(input) {
    const [floatNumber, merit] = input.split(' ');
    const translated = translateWithDecimal_1.translateWithDecimal(floatNumber);
    return `${translated} ${merit}`;
}
exports.normalizeAcreage = normalizeAcreage;
//# sourceMappingURL=normalizeAcreage.js.map