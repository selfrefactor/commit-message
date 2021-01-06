"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.special = void 0;
const helpers_fn_1 = require("helpers-fn");
const init_playwright_1 = require("init-playwright");
const constants_1 = require("./modules/constants");
const getUpdateTag_1 = require("./modules/getUpdateTag");
const execCommand_1 = require("./modules/helpers/execCommand");
async function special(flagOrDependency, maybeDependency) {
    try {
        helpers_fn_1.log('spin');
        const isDevDependency = ['-D', '--dev'].includes(flagOrDependency);
        const dependency = maybeDependency ? maybeDependency : flagOrDependency;
        const yarnAdd = isDevDependency ? 'yarn add -D' : 'yarn add';
        var { browser, page } = await init_playwright_1.initPlaywright(constants_1.playwrightSettings);
        const url = `https://github.com/selfrefactor/${dependency}`;
        const latestTag = await getUpdateTag_1.getUpdateTag({
            page,
            url,
        });
        const urlRepo = `${url}#${latestTag}`;
        const command = `${yarnAdd} ${urlRepo}`;
        helpers_fn_1.log(`Latest tag of '${dependency}' is ${latestTag}`, 'info');
        await execCommand_1.execCommand(command);
        helpers_fn_1.log('stopspin');
        helpers_fn_1.log(`'${dependency}' is installed`, 'success');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        console.log('closing Chrome');
        if (browser.close !== undefined) {
            await browser.close();
        }
    }
}
exports.special = special;
