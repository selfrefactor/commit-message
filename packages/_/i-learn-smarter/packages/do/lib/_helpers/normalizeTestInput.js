"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
// Defines when input is interface
const LIMIT = 3;
/**
 * Stringify according to the type of input
 */
function normalize(input) {
    return rambdax_1.switcher(rambdax_1.type(input))
        .is('Array', JSON.stringify(input))
        .is('Object', JSON.stringify(input))
        .is('Null', 'null')
        .is('Undefined', 'undefined')
        .default(input);
}
exports.normalize = normalize;
/**
 * testInput is object or undefined
 */
function normalizeTestInput(testInput) {
    if (testInput === undefined) {
        return '';
    }
    if (Object.keys(testInput).length < LIMIT) {
        return Object.keys(testInput)
            .map(testArgument => normalize(testInput[testArgument]))
            .join(', ');
    }
    const typeOfInput = rambdax_1.type(testInput);
    const shouldStringify = ['Array', 'Object'].includes(typeOfInput);
    return shouldStringify ? JSON.stringify(testInput) : testInput;
}
exports.normalizeTestInput = normalizeTestInput;
//# sourceMappingURL=normalizeTestInput.js.map