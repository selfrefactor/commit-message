"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_puppeteer_1 = require("init-puppeteer");
const log_1 = require("log");
const rambdax_1 = require("rambdax");
const currentTag_1 = require("./dom/currentTag");
const getURLPackageJson_1 = require("./helpers/getURLPackageJson");
exports.getInitTag = async (input) => {
    try {
        const { page, url, dependency, tag } = input;
        await page.goto(url, init_puppeteer_1.waitForNetwork);
        // Jest related issue
        // Jest NPM package reference the major Github project
        // This project contains all Jest related packages
        // That is why root package.json is `private:true`
        // In this case no conversion is possible
        const urlPackageJson = getURLPackageJson_1.getURLPackageJson(url);
        const responsePackageJson = await page.goto(urlPackageJson, init_puppeteer_1.waitForNetwork);
        if (responsePackageJson === null || !responsePackageJson.ok) {
            log_1.log('responsePackageJson', 'error');
            return false;
        }
        const packageJson = await responsePackageJson.json();
        if (packageJson.private) {
            log_1.log(`packageJson.private === true | ${dependency}`, 'error');
            return false;
        }
        const urlTags = `${url}/tags`;
        await page.goto(urlTags, init_puppeteer_1.waitForNetwork);
        const currentTagValue = await page.evaluate(currentTag_1.currentTag, tag);
        return currentTagValue;
    }
    catch (error) {
        rambdax_1.debug(error);
    }
};
//# sourceMappingURL=getInitTag.js.map