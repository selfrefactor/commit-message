"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const capture_error_1 = require("capture-error");
const fs_1 = require("fs");
const path_1 = require("path");
const getResult_1 = require("./samostoyatelen/getResult");
const TEMP_FILE = 'TEMP_SAMOSTOYATELEN.txt';
async function notary(sourceFilePath) {
    try {
        const cwd = path_1.resolve(__dirname, `../files`);
        const tempFilePath = `${cwd}/${TEMP_FILE}`;
        const convertedText = fs_1.readFileSync(tempFilePath, 'utf8');
        if (convertedText.length < 100) {
            throw new Error('convertedText.length < 100');
        }
        const result = getResult_1.getResultSamostoyatelen(convertedText);
        let a;
    }
    catch (err) {
        capture_error_1.captureError(err, { exitFlag: true });
    }
}
exports.notary = notary;
notary('/home/just/repos/notary/files/samostoyatelenObekt.pdf').then(console.log);
//# sourceMappingURL=debug.js.map