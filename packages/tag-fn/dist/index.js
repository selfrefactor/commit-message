"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("log-fn");
const click_1 = require("./modules/click");
const constants_1 = require("./modules/constants");
const getCredentials_1 = require("./modules/getCredentials");
const getRepoName_1 = require("./modules/getRepoName");
const getTagValue_1 = require("./modules/getTagValue");
const init_puppeteer_1 = require("init-puppeteer");
const type_1 = require("./modules/type");
const selectors = {
    clickLoginSubmit: '.btn-primary',
    inputTag: 'input[placeholder="Tag version"]',
    password: '#password',
    submitTag: 'button.js-publish-release',
    username: '#login_field',
};
const DEBUG_FLAG = false;
if (DEBUG_FLAG) {
    tagFn({ tag: undefined }).then(console.log).catch(console.log);
}
async function tagFn(input) {
    try {
        const repoName = getRepoName_1.getRepoName();
        const { user, password } = getCredentials_1.getCredentials();
        var { browser, page } = await init_puppeteer_1.initPuppeteer({ headless: !DEBUG_FLAG });
        const urlGithub = 'https://github.com/';
        const urlInit = `${urlGithub}login`;
        await page.goto(urlInit, constants_1.waitForNetwork);
        await type_1.typeModule({
            selector: selectors.username,
            text: user,
            page
        });
        await type_1.typeModule({
            selector: selectors.password,
            text: password,
            page
        });
        await page.evaluate(click_1.click, selectors.clickLoginSubmit);
        /**
         * Typescript doesn't like when `responseURLInit: Response`
         */
        const responseURLInit = await page.waitForNavigation(constants_1.waitForLoad);
        const responseOK = responseURLInit._url.includes('github.com');
        if (!responseOK) {
            throw `Not valid credentials('${user}' '${password}')`;
        }
        const urlRepo = `https://github.com/${user}/${repoName}`;
        const responseURLRepo = await page.goto(urlRepo, constants_1.waitForNetwork);
        if (!responseURLRepo.ok) {
            log(`Github user '${user}' doesn't have repo '${repoName}'`, 'error');
            return;
        }
        const urlRelease = `${urlRepo}/releases`;
        await page.goto(urlRelease, constants_1.waitForNetwork);
        const tagValue = await getTagValue_1.getTagValue({ page, input });
        const urlNewRelease = `${urlRelease}/new`;
        await page.goto(urlNewRelease, constants_1.waitForNetwork);
        await type_1.typeModule({
            selector: selectors.inputTag,
            text: tagValue,
            page
        });
        await page.evaluate(click_1.click, selectors.submitTag);
        const responseURLNewTag = await page.waitForNavigation(constants_1.waitForLoad);
        const expectedURL = `${urlRepo}/releases/tag/${tagValue}`;
        const ok = responseURLNewTag.ok && responseURLNewTag._url === expectedURL;
        if (ok) {
            log(`Published new tag '${tagValue}' on repo '${repoName}'`, 'success');
            const command = `yarn add https://github.com/${user}/${repoName}#${tagValue}`;
            return log(`Install as dependency with '${command}'`, 'info');
        }
        log(`Something went wrong when publishing new tag '${tagValue}'`, 'error');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        if (browser !== undefined) {
            await browser.close();
        }
    }
}
exports.tagFn = tagFn;
//# sourceMappingURL=index.js.map