"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const { promisify } = require('util');
const exec = promisify(child_process.exec);
exports.execCommand = async (command) => {
    const { stdout } = await exec(command, { cwd: process.cwd() });
    return stdout;
};
//# sourceMappingURL=execCommand.js.map