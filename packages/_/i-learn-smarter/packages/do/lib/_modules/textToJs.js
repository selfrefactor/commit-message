"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const rambdax_1 = require("rambdax");
const regexListRaw = [
    /\$\{0\}/gm,
    /\$\{1\}/gm,
    /\$\{2\}/gm,
    /\$\{3\}/gm,
    /\$\{4\}/gm,
    /\$\{5\}/gm,
];
function textToJs(filePath, replacers) {
    let fileContent = fs_1.readFileSync(filePath).toString();
    const regexList = rambdax_1.take(replacers.length, regexListRaw);
    regexList.forEach((singleRegex, index) => {
        fileContent = rambdax_1.replace(singleRegex, replacers[index], fileContent);
    });
    return fileContent;
}
exports.textToJs = textToJs;
//# sourceMappingURL=textToJs.js.map