"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exec_1 = require("./exec");
const normalizeError_1 = require("./normalizeError");
const rambdax_1 = require("rambdax");
const log_1 = require("log");
async function gtmetrixPollCURL(command) {
    try {
        const cwd = process.cwd();
        const [resultRaw] = await exec_1.exec({ command, cwd });
        const result = JSON.parse(resultRaw);
        return result;
    }
    catch (err) {
        throw new Error(normalizeError_1.normalizeError(err));
    }
}
async function gtmetrixPoll(gtmetrixPollCommand) {
    try {
        let status = '';
        let result = {};
        let counter = 0;
        while (status !== 'completed') {
            const commandResult = await gtmetrixPollCURL(gtmetrixPollCommand);
            status = commandResult.state;
            result = commandResult.results;
            const ms = status === 'queued' ?
                3000 :
                0;
            log_1.log(counter * 3, 'seconds waiting for gtmetrix', `status: '${status}'`, 'info');
            counter++;
            await rambdax_1.delay(ms);
        }
        return {
            onLoad: result.onload_time,
            firstPaint: result.first_paint_time,
            domInteractive: result.dom_interactive_time,
            fullyLoaded: result.fully_loaded_time,
            pageLoadTime: result.page_load_time,
            yslowScore: result.yslow_score,
            pagespeedScore: result.pagespeed_score,
        };
    }
    catch (err) {
        throw new Error(normalizeError_1.normalizeError(err));
    }
}
exports.gtmetrixPoll = gtmetrixPoll;
//# sourceMappingURL=gtmetrixPoll.js.map