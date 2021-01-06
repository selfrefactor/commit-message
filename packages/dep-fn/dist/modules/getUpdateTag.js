"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateTag = void 0;
const latestTag_1 = require("./dom/latestTag");
const getUpdateTag = async (input) => {
    const { page, url } = input;
    const responseGithub = await page.goto(url);
    if (responseGithub._status !== 200) {
        throw new Error(`getGithubTag ${url} ${responseGithub._status}`);
    }
    const urlTags = `${url}/tags`;
    await page.goto(urlTags);
    const latestTagValue = await page.evaluate(latestTag_1.latestTag);
    return latestTagValue;
};
exports.getUpdateTag = getUpdateTag;
