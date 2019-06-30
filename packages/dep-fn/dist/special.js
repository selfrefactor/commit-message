"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_puppeteer_1 = require("init-puppeteer");
const log_1 = require("log");
const rambdax_1 = require("rambdax");
const constants_1 = require("./modules/constants");
const getUpdateTag_1 = require("./modules/getUpdateTag");
const execCommand_1 = require("./modules/helpers/execCommand");
async function special() {
    try {
        log_1.log('spin');
        const [flag, dependency] = rambdax_1.takeLast(2, process.argv);
        const yarnAdd = ['-D', '--dev'].includes(flag) ?
            'yarn add -D' :
            'yarn add';
        var { browser, page } = await init_puppeteer_1.initPuppeteer(constants_1.puppeteerSettings);
        const url = `https://github.com/selfrefactor/${dependency}`;
        const latestTag = await getUpdateTag_1.getUpdateTag({
            page,
            url,
        });
        const urlRepo = `${url}#${latestTag}`;
        const command = `${yarnAdd} ${urlRepo}`;
        log_1.log(`Latest tag of '${dependency}' is ${latestTag}`, 'info');
        await execCommand_1.execCommand(command);
        log_1.log('stopspin');
        log_1.log(`'${dependency}' is installed`, 'success');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        console.log('closing Chrome');
        if (browser !== undefined && browser.close !== undefined) {
            await browser.close();
        }
    }
}
exports.special = special;
//# sourceMappingURL=special.js.map