"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_fn_1 = require("helpers-fn");
const click_1 = require("./modules/click");
const constants_1 = require("./modules/constants");
const init_puppeteer_1 = require("init-puppeteer");
const getCredentials_1 = require("./modules/getCredentials");
const getRepoName_1 = require("./modules/getRepoName");
const getTagValue_1 = require("./modules/getTagValue");
const type_1 = require("./modules/type");
const selectors = {
    clickLoginSubmit: '.btn-primary',
    inputTag: 'input[placeholder="Tag version"]',
    password: '#password',
    submitTag: 'button.js-publish-release',
    username: '#login_field',
};
async function setGithubTag(tag) {
    try {
        const repoName = getRepoName_1.getRepoName();
        const { user, password } = getCredentials_1.getCredentials();
        var { browser, page } = await init_puppeteer_1.initPuppeteer({
            headless: process.env.RAMBDAX_LOG !== 'OFF',
        });
        const urlGithub = 'https://github.com/';
        const urlInit = `${urlGithub}login`;
        await page.goto(urlInit, constants_1.waitForNetwork);
        await type_1.typeModule({
            selector: selectors.username,
            text: user,
            page,
        });
        await type_1.typeModule({
            selector: selectors.password,
            text: password,
            page,
        });
        await page.evaluate(click_1.click, selectors.clickLoginSubmit);
        const responseURLInit = await page.waitForNavigation(constants_1.waitForLoad);
        const responseOK = responseURLInit._url.includes('github.com');
        if (!responseOK) {
            throw `Not valid credentials('${user}' '${password}')`;
        }
        const urlRepo = `https://github.com/${user}/${repoName}`;
        const responseURLRepo = await page.goto(urlRepo, constants_1.waitForNetwork);
        if (!responseURLRepo.ok) {
            helpers_fn_1.log(`Github user '${user}' doesn't have repo '${repoName}'`, 'error');
            return;
        }
        const urlRelease = `${urlRepo}/releases`;
        await page.goto(urlRelease, constants_1.waitForNetwork);
        const tagValue = await getTagValue_1.getTagValue({ page, tag });
        const urlNewRelease = `${urlRelease}/new`;
        await page.goto(urlNewRelease, constants_1.waitForNetwork);
        await type_1.typeModule({
            selector: selectors.inputTag,
            text: tagValue,
            page,
        });
        await page.evaluate(click_1.click, selectors.submitTag);
        const responseURLNewTag = await page.waitForNavigation(constants_1.waitForLoad);
        const expectedURL = `${urlRepo}/releases/tag/${tagValue}`;
        const ok = responseURLNewTag.ok && responseURLNewTag._url === expectedURL;
        if (ok) {
            helpers_fn_1.log(`Published new tag '${tagValue}' on repo '${repoName}'`, 'success');
            const command = `yarn add https://github.com/${user}/${repoName}#${tagValue}`;
            return helpers_fn_1.log(`Install as dependency with '${command}'`, 'info');
        }
        helpers_fn_1.log(`Something went wrong when publishing new tag '${tagValue}'`, 'error');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        if (browser && browser.close) {
            await browser.close();
        }
    }
}
exports.setGithubTag = setGithubTag;
//# sourceMappingURL=setGithubTag.js.map