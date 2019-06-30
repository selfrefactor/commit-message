"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_puppeteer_1 = require("init-puppeteer");
const beforeEnd_1 = require("./modules/beforeEnd");
const getInitDependencies_1 = require("./modules/getInitDependencies");
const getDependencies_1 = require("./modules/helpers/getDependencies");
async function init() {
    try {
        const settings = {
            headless: true,
            url: 'about:blank',
        };
        var { browser, page } = await init_puppeteer_1.initPuppeteer(settings);
        const { dependencies, devDependencies, packageJson, peerDependencies, } = await getDependencies_1.getDependencies();
        const betterDependencies = await getInitDependencies_1.getInitDependencies({
            dependencies,
            page,
        });
        const betterDevDependencies = await getInitDependencies_1.getInitDependencies({
            dependencies: devDependencies,
            page: page,
        });
        const betterPeerDependencies = await getInitDependencies_1.getInitDependencies({
            dependencies: peerDependencies,
            page: page,
        });
        await beforeEnd_1.beforeEnd({
            dependencies: betterDependencies,
            devDependencies: betterDevDependencies,
            packageJson,
            peerDependencies: betterPeerDependencies,
        });
    }
    catch (err) {
        console.log(err);
    }
    finally {
        console.log('closing Chrome');
        if (browser !== undefined) {
            await browser.close();
        }
    }
}
exports.init = init;
//# sourceMappingURL=init.js.map