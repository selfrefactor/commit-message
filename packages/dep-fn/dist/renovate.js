"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const fs_1 = require("fs");
const rambdax_1 = require("rambdax");
const helpers_fn_1 = require("helpers-fn");
const execCommand_1 = require("./modules/helpers/execCommand");
const HOW_MANY = 3;
function betweenIndexes(list, from, to) {
    return list.filter((_, i) => i >= from && i <= to);
}
async function renovate(dependencyName) {
    const filePath = `${process.cwd()}/package.json`;
    if (!fs_1.existsSync(filePath)) {
        return helpers_fn_1.log('Expected package.json', 'error');
    }
    const { devDependencies, dependencies } = await fs_extra_1.readJson(filePath);
    if (!dependencies[dependencyName] && !devDependencies[dependencyName]) {
        return helpers_fn_1.log(`No such dependency ${dependencyName}`, 'error');
    }
    const isDev = Boolean(devDependencies[dependencyName]);
    const currentVersionRaw = isDev ? devDependencies[dependencyName] : dependencies[dependencyName];
    const currentVersion = Number.isNaN(currentVersionRaw[0] * 1) ? rambdax_1.tail(currentVersionRaw) : currentVersionRaw;
    const command = `npm info --json ${dependencyName}`;
    const packageInfo = await execCommand_1.execCommand(command);
    const { versions } = JSON.parse(packageInfo);
    const foundIndex = versions.indexOf(currentVersion);
    const candidates = betweenIndexes(versions, foundIndex - HOW_MANY, foundIndex + HOW_MANY);
    console.log({ versions, foundIndex, candidates, currentVersion });
}
exports.renovate = renovate;
