"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
exports.execCommand = (command, cwd = process.cwd()) => new Promise((resolve, reject) => {
    const proc = child_process_1.exec(command, { cwd });
    proc.stdout.on('data', chunk => {
        console.log(chunk.toString());
    });
    proc.stdout.on('end', resolve);
    proc.stdout.on('error', err => {
        reject(err);
    });
});
//# sourceMappingURL=execCommand.js.map