"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCommand = void 0;
const child_process_1 = require("child_process");
const execCommand = command => new Promise((resolve, reject) => {
    const cwd = process.env.COMMIT_MESSAGE_CWD || process.cwd();
    const proc = child_process_1.exec(command, { cwd });
    if (!proc)
        return reject('!proc');
    if (!proc.stdout)
        return reject('!proc');
    proc.stdout.on('data', chunk => {
        console.log(chunk.toString());
    });
    proc.stdout.on('end', resolve);
    proc.stdout.on('error', err => {
        reject(err);
    });
});
exports.execCommand = execCommand;
//# sourceMappingURL=execCommand.js.map