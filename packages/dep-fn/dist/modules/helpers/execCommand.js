"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const util_1 = require("util");
const exec = util_1.promisify(childProcess.exec);
exports.execCommand = async (command) => {
    const { stdout } = await exec(command, { cwd: process.cwd() });
    return stdout;
};
