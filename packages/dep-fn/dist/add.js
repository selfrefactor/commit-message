"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAddDependency_1 = require("./modules/getAddDependency");
const getInitURL_1 = require("./modules/getInitURL");
const init_puppeteer_1 = require("init-puppeteer");
const helpers_1 = require("helpers");
const constants_1 = require("./modules/constants");
const rambdax_1 = require("rambdax");
async function add() {
    try {
        helpers_1.log('spin');
        const [flag, dependency] = rambdax_1.takeLast(2, process.argv);
        const commandStart = ['-D', '--dev'].includes(flag) ?
            'yarn add -D' :
            'yarn add';
        var { browser, page } = await init_puppeteer_1.initPuppeteer(constants_1.puppeteerSettings);
        const url = await getInitURL_1.getInitURL(dependency);
        const commandEnd = await getAddDependency_1.getAddDependency({
            page,
            url,
            dependency
        });
        helpers_1.log('stopspin');
        const command = `${commandStart} ${commandEnd}`;
        helpers_1.log(`Run \'${command}\' to apply changes`, 'success');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        if (browser !== undefined) {
            console.log('closing Chrome');
            await browser.close();
        }
    }
}
exports.add = add;
//# sourceMappingURL=add.js.map