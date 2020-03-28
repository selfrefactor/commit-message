"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_fn_1 = require("helpers-fn");
const currentTag_1 = require("./dom/currentTag");
const getURLPackageJson_1 = require("./helpers/getURLPackageJson");
exports.getInitTag = async (input) => {
    try {
        const { page, url, dependency, tag } = input;
        await page.goto(url);
        // Jest related issue
        // Jest NPM package reference the major Github project
        // This project contains all Jest related packages
        // That is why root package.json is `private:true`
        // In this case no conversion is possible
        const urlPackageJson = getURLPackageJson_1.getURLPackageJson(url);
        const responsePackageJson = await page.goto(urlPackageJson);
        if (responsePackageJson === null || !responsePackageJson.ok) {
            helpers_fn_1.log('responsePackageJson', 'error');
            return false;
        }
        const packageJson = await responsePackageJson.json();
        if (packageJson.private) {
            helpers_fn_1.log(`packageJson.private === true | ${dependency}`, 'error');
            return false;
        }
        const urlTags = `${url}/tags`;
        await page.goto(urlTags);
        const currentTagValue = await page.evaluate(currentTag_1.currentTag, tag);
        return currentTagValue;
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
