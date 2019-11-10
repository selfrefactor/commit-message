"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const string_fn_1 = require("string-fn");
const Constants = require("../constants");
function match(text, label, fn) {
    const baseKey = string_fn_1.constantCase(label);
    const regexKey = `${baseKey}_REGEX`;
    const removeKey = `${baseKey}_REMOVE`;
    const regex = Constants[regexKey];
    const remove = Constants[removeKey];
    if (rambdax_1.isNil(regex) || rambdax_1.isNil(remove)) {
        throw `${baseKey}_MISSING_CONSTANTS`;
    }
    const [matched] = rambdax_1.match(regex, text);
    if (matched === undefined) {
        throw baseKey;
    }
    const replaced = rambdax_1.replace(remove, '', matched).trim();
    return rambdax_1.isNil(fn) ?
        replaced :
        fn(replaced);
}
exports.match = match;
function matchTwoSteps(text, label, fn) {
    const baseKey = string_fn_1.constantCase(label);
    const regexKey = `${baseKey}_REGEX`;
    const removeFirstKey = `${baseKey}_REMOVE_FIRST`;
    const removeSecondKey = `${baseKey}_REMOVE_SECOND`;
    const regex = Constants[regexKey];
    const removeFirst = Constants[removeFirstKey];
    const removeSecond = Constants[removeSecondKey];
    if (rambdax_1.isNil(regex) || rambdax_1.isNil(removeFirst) || rambdax_1.isNil(removeSecond)) {
        throw `${baseKey}_MISSING_CONSTANTS`;
    }
    const [matched] = rambdax_1.match(regex, text);
    if (matched === undefined) {
        throw baseKey;
    }
    const afterFirstRemove = rambdax_1.replace(removeFirst, '', matched).trim();
    const replaced = rambdax_1.replace(removeSecond, '', afterFirstRemove).trim();
    return rambdax_1.isNil(fn) ?
        replaced :
        fn(replaced);
}
exports.matchTwoSteps = matchTwoSteps;
function matchx(input) {
    const [result] = rambdax_1.match(input.regex, input.text);
    if (result === undefined) {
        throw input.label.toUpperCase();
    }
    return rambdax_1.replace(input.regexRemove, '', result).trim();
}
exports.matchx = matchx;
function matchTwoStepsx(input) {
    const [result] = rambdax_1.match(input.regex, input.text);
    if (result === undefined) {
        throw input.label.toUpperCase();
    }
    const afterFirstRemove = rambdax_1.replace(input.regexFirstRemove, '', result).trim();
    return rambdax_1.replace(input.regexSecondRemove, '', afterFirstRemove).trim();
}
exports.matchTwoStepsx = matchTwoStepsx;
//# sourceMappingURL=match.js.map