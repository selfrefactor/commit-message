"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const string_fn_1 = require("string-fn");
function parseFilePath(filePath) {
    const filePathList = filePath.split('/');
    const folderPath = filePathList.length === 1 ? '' : rambdax_1.init(filePathList).join('/');
    const fileName = string_fn_1.camelCase(rambdax_1.last(filePathList));
    return { folderPath, fileName };
}
exports.parseFilePath = parseFilePath;
//# sourceMappingURL=parseFilePath.js.map