"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const exec_1 = require("./exec");
const normalizeError_1 = require("./normalizeError");
async function gtmetrixCURL(url) {
    try {
        const authPart = `curl --user deyan8284@gmail.com:${process.env.GTMETRIX_API_KEY}`;
        const command = `${authPart} --form url=${url} --form x-metrix-adblock=0 https://gtmetrix.com/api/0.1/test`;
        const [resultRaw] = await exec_1.exec({ command, cwd: process.cwd() });
        const result = JSON.parse(resultRaw);
        return `${authPart} ${result.poll_state_url}`;
    }
    catch (err) {
        throw new Error(normalizeError_1.normalizeError(err));
    }
}
async function gtmetrix(url) {
    try {
        if (process.env.GTMETRIX_API_KEY === undefined) {
            throw new Error(constants_1.UNAUTHORIZED);
        }
        return gtmetrixCURL(url);
    }
    catch (err) {
        throw new Error(normalizeError_1.normalizeError(err));
    }
}
exports.gtmetrix = gtmetrix;
//# sourceMappingURL=gtmetrix.js.map