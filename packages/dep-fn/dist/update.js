"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_puppeteer_1 = require("init-puppeteer");
const beforeEnd_1 = require("./modules/beforeEnd");
const constants_1 = require("./modules/constants");
const getUpdateDependencies_1 = require("./modules/getUpdateDependencies");
const getDependencies_1 = require("./modules/helpers/getDependencies");
async function update() {
    try {
        var { browser, page } = await init_puppeteer_1.initPuppeteer(constants_1.puppeteerSettings);
        const { devDependencies, dependencies, peerDependencies, packageJson, } = getDependencies_1.getDependencies();
        const updatedDependencies = await getUpdateDependencies_1.getUpdateDependencies({
            dependencies,
            page,
        });
        const updatedDevDependencies = await getUpdateDependencies_1.getUpdateDependencies({
            dependencies: devDependencies,
            page: page,
        });
        const updatedPeerDependencies = await getUpdateDependencies_1.getUpdateDependencies({
            dependencies: peerDependencies,
            page: page,
        });
        beforeEnd_1.beforeEnd({
            dependencies: updatedDependencies,
            devDependencies: updatedDevDependencies,
            packageJson: packageJson,
            peerDependencies: updatedPeerDependencies,
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
exports.update = update;
