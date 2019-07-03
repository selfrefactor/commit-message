"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("helpers");
const latestTag_1 = require("./dom/latestTag");
const getURLPackageJson_1 = require("./helpers/getURLPackageJson");
exports.getAddDependency = async (input) => {
    try {
        const urlPackageJson = getURLPackageJson_1.getURLPackageJson(input.url);
        const responsePackageJson = await input.page.goto(urlPackageJson);
        if (responsePackageJson === null || !responsePackageJson.ok) {
            helpers_1.log('responsePackageJson', 'error');
            return input.dependency;
        }
        const packageJson = await responsePackageJson.json();
        if (packageJson.private) {
            helpers_1.log('packageJson.private === true', 'error');
            return input.dependency;
        }
        const urlTags = `${input.url}/tags`;
        await input.page.goto(urlTags);
        const latestTagValue = await input.page.evaluate(latestTag_1.latestTag);
        return latestTagValue === false ?
            input.dependency :
            `${input.url}#${latestTagValue}`;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
//# sourceMappingURL=getAddDependency.js.map