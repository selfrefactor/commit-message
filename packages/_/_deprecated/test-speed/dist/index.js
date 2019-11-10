"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('env')('special');
const capture_error_1 = require("capture-error");
const log_1 = require("log");
const gtmetrix_1 = require("./modules/gtmetrix");
const gtmetrixPoll_1 = require("./modules/gtmetrixPoll");
const psi_1 = require("./modules/psi");
const webPageTest_1 = require("./modules/webPageTest");
async function testURL(url) {
    try {
        const [gtmetrixPollCommand, psi, _] = await Promise.all([
            gtmetrix_1.gtmetrix(url),
            psi_1.psi(url),
            webPageTest_1.webPageTest(url),
        ]);
        log_1.log(psi, 'obj');
        const gtmetrixResult = await gtmetrixPoll_1.gtmetrixPoll(gtmetrixPollCommand);
        log_1.log(gtmetrixResult, 'obj');
    }
    catch (err) {
        capture_error_1.captureError(err, { exitFlag: true });
    }
}
exports.testURL = testURL;
//# sourceMappingURL=index.js.map