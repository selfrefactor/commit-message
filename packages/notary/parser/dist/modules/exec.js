"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function exec(input) {
    return new Promise((resolve, reject) => {
        const willReturn = [];
        const execCommand = child_process_1.exec(input.command, { cwd: input.cwd });
        execCommand.stdout.on('data', chunk => {
            willReturn.push(chunk.toString('utf8'));
        });
        execCommand.stdout.on('end', () => resolve(willReturn));
        execCommand.stdout.on('error', err => reject(err));
    });
}
exports.exec = exec;
//# sourceMappingURL=exec.js.map