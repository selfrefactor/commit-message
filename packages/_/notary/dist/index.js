"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const getResult_1 = require("./modules/getResult");
const getText_1 = require("./modules/getText");
const getResult_2 = require("./samostoyatelen/getResult");
const methods = {
    SAMOSTOYATELEN: samostoyatelen,
    POZEMLEN: pozemlen,
};
function pozemlen(convertedText) {
    const result = getResult_1.getResult(convertedText);
    const text = getText_1.getText(result);
    return text;
}
function samostoyatelen(convertedText) {
    return getResult_2.getResultSamostoyatelen(convertedText);
}
async function notary(textInput, modeRaw) {
    const mode = rambdax_1.defaultTo('POZEMLEN', modeRaw);
    if (textInput.length < 100)
        return '';
    return methods[mode](textInput);
}
exports.notary = notary;
//# sourceMappingURL=index.js.map