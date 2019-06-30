"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_puppeteer_1 = require("init-puppeteer");
const latestTag_1 = require("./dom/latestTag");
exports.getUpdateTag = async (input) => {
    try {
        const { page, url } = input;
        /**
         * Should be Response not any
         * import { Response } from 'puppeteer'
         */
        const responseGithub = await page.goto(url, init_puppeteer_1.waitForNetwork);
        if (responseGithub._status !== 200) {
            throw new Error(`getGithubTag ${url} ${responseGithub._status}`);
        }
        const urlTags = `${url}/tags`;
        await page.goto(urlTags, init_puppeteer_1.waitForNetwork);
        const latestTagValue = await page.evaluate(latestTag_1.latestTag);
        return latestTagValue;
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=getUpdateTag.js.map