"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const capture_error_1 = require("capture-error");
const fs_1 = require("fs");
const path_1 = require("path");
const rambdax_1 = require("rambdax");
const exec_1 = require("./modules/exec");
const getResult_1 = require("./modules/getResult");
const getText_1 = require("./modules/getText");
const getResult_2 = require("./samostoyatelen/getResult");
const TEMP_FILE = 'TEMP.txt';
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
async function notary(sourceFilePath, modeRaw) {
    try {
        const mode = rambdax_1.defaultTo('POZEMLEN', modeRaw);
        const cwd = path_1.resolve(__dirname, `../files`);
        const tempFilePath = `${cwd}/${TEMP_FILE}`;
        const convertCommand = `pdftotext ${sourceFilePath} -raw ${tempFilePath}`;
        console.log({ convertCommand });
        await exec_1.exec({
            command: convertCommand,
            cwd: cwd,
        });
        const convertedText = fs_1.readFileSync(tempFilePath, 'utf8');
        fs_1.unlinkSync(tempFilePath);
        if (convertedText.length < 100) {
            throw new Error('convertedText.length < 100');
        }
        return methods[mode](convertedText);
    }
    catch (err) {
        capture_error_1.captureError(err, { exitFlag: true });
    }
}
exports.notary = notary;
// notary('/home/just/repos/notary/files/pozemlenFirst.pdf').then(console.log)
// notary('/home/just/repos/notary/files/pozemlenSecond.pdf').then(console.log)
// notary('/home/just/repos/notary/files/samostoyatelenObekt.pdf', 'SAMOSTOYATELEN').then(console.log)
//# sourceMappingURL=index.js.map