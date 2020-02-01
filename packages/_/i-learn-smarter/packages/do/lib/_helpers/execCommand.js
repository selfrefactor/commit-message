"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
// tslint:disable-next-line
function execCommand(command, cwd, flag) {
    return new Promise((resolve, reject) => {
        const proc = child_process_1.exec(command, { cwd });
        const willReturn = [];
        proc.stdout.on('data', chunk => {
            if (flag === undefined) {
                console.log(chunk.toString());
            }
            willReturn.push(chunk.toString());
        });
        proc.stdout.on('end', () => resolve(willReturn));
        proc.stdout.on('error', reject);
    });
}
exports.execCommand = execCommand;
//# sourceMappingURL=execCommand.js.map