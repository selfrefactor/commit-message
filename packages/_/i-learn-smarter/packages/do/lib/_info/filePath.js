"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("log");
function filePathInfo() {
    const info = `Please include the folder as well
Example input: 'foo/helpers/get.info'
This will create './src/foo/helpers/getInfo.ts'`;
    log_1.log(info, 'icon.tag=foo');
}
exports.filePathInfo = filePathInfo;
//# sourceMappingURL=filePath.js.map