"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opener = require("opener");
const constants_1 = require("../constants");
const exec_1 = require("./exec");
const normalizeError_1 = require("./normalizeError");
async function webPageTest(url) {
    try {
        if (process.env.WEBPAGETEST_API_KEY === undefined) {
            throw new Error(constants_1.UNAUTHORIZED);
        }
        const command = `webpagetest --server=https://www.webpagetest.org/ --key=${process.env.WEBPAGETEST_API_KEY} test ${url}`;
        const [resultRaw] = await exec_1.exec({ command, cwd: process.cwd() });
        const result = JSON.parse(resultRaw);
        opener(`https://www.webpagetest.org/result/${result.data.testId}/`);
    }
    catch (err) {
        throw new Error(normalizeError_1.normalizeError(err));
    }
}
exports.webPageTest = webPageTest;
//# sourceMappingURL=webPageTest.js.map