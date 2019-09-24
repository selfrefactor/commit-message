"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const translateNumber_1 = require("./translateNumber");
const SEPARATOR = ',';
const KURZER = '.';
const NUMBER = '№';
function warningFallback(input, label) {
    return `${input} /_!_${label.toUpperCase()}_!_/`;
}
function normalizeAddress(input) {
    const [location, zip, ...restRaw] = input.split(SEPARATOR);
    const rest = restRaw.join(SEPARATOR).trim();
    const [strasse, maybeNumber] = restRaw[0].split(NUMBER).map(rambdax_1.trim);
    /**
     * When somehow NUMBER is missing
     */
    if (maybeNumber === undefined) {
        return warningFallback(input, 'адрес');
    }
    const street = isNumber ?
        `${strasse} ${maybeNumber}/${translateNumber_1.translateNumber(Number(maybeNumber))}/` :
        warningFallback(input, 'адрес');
    if (restRaw.length === 1) {
        return `${location}, ${zip}, ${street}`;
    }
    const tailx = rambdax_1.tail(restRaw).map(work);
    return [location, zip, street, ...tailx].join(`${SEPARATOR} `);
}
exports.normalizeAddress = normalizeAddress;
function isNumber(input) {
    return !Number.isNaN(input * 1);
}
function work(input) {
    const [base, maybeNumber] = input.split(KURZER).map(rambdax_1.trim);
    return isNumber(maybeNumber) ?
        `${base}. ${maybeNumber}/${translateNumber_1.translateNumber(Number(maybeNumber))}/` :
        input.trim();
}
//# sourceMappingURL=normalizeAddress.js.map