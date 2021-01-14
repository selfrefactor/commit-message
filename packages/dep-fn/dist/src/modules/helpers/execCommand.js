"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCommand = void 0;
const childProcess = require("child_process");
const util_1 = require("util");
const exec = util_1.promisify(childProcess.exec);
const execCommand = async (command) => {
    const { stdout } = await exec(command, { cwd: process.cwd() });
    return stdout;
};
exports.execCommand = execCommand;
