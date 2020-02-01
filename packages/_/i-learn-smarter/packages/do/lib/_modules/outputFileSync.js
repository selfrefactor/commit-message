"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const log_1 = require("log");
function outputFileSync(filePath, content) {
    if (process.env.NODE_ENV === 'test') {
        log_1.log(`LOCATION ${filePath}`, 'info');
        log_1.log('sep');
        return console.log(content);
    }
    fs_extra_1.outputFileSync(filePath, content);
}
exports.outputFileSync = outputFileSync;
//# sourceMappingURL=outputFileSync.js.map