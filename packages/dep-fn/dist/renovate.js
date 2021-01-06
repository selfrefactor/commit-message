"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renovate = void 0;
const fs_extra_1 = require("fs-extra");
const fs_1 = require("fs");
const rambdax_1 = require("rambdax");
const inquirer_1 = require("inquirer");
const helpers_fn_1 = require("helpers-fn");
const execCommand_1 = require("./modules/helpers/execCommand");
const HOW_MANY = 3;
function betweenIndexes(list, from, to, ignore) {
    return list.filter((_, i) => {
        if (i === ignore)
            return false;
        return i >= from && i <= to;
    });
}
async function renovate(dependencyName) {
    const filePath = `${process.cwd()}/package.json`;
    if (!fs_1.existsSync(filePath)) {
        return helpers_fn_1.log('Expected package.json', 'error');
    }
    const packageJson = await fs_extra_1.readJson(filePath);
    const { devDependencies, dependencies } = packageJson;
    if (!dependencies[dependencyName] && !devDependencies[dependencyName]) {
        return helpers_fn_1.log(`No such dependency ${dependencyName}`, 'error');
    }
    const isDev = Boolean(devDependencies[dependencyName]);
    const currentVersionRaw = isDev
        ? devDependencies[dependencyName]
        : dependencies[dependencyName];
    const currentVersion = Number.isNaN(currentVersionRaw[0] * 1)
        ? rambdax_1.tail(currentVersionRaw)
        : currentVersionRaw;
    const command = `npm info --json ${dependencyName}`;
    const packageInfo = await execCommand_1.execCommand(command);
    const { versions } = JSON.parse(packageInfo);
    const foundIndex = versions.indexOf(currentVersion);
    const latest = rambdax_1.takeLast(HOW_MANY, versions);
    const middle = betweenIndexes(versions, foundIndex - HOW_MANY, foundIndex + HOW_MANY, foundIndex);
    const candidates = rambdax_1.uniq([...latest, ...middle])
        .sort()
        .map((x, i) => {
        if (i % HOW_MANY === 0)
            return [x, new inquirer_1.Separator()];
        return x;
    });
    const { answer } = await inquirer_1.prompt([
        {
            type: 'list',
            name: 'answer',
            message: `Current version - ${currentVersion}`,
            choices: rambdax_1.flatten(candidates),
            default: 0,
        },
    ]);
    const depType = isDev ? 'devDependencies' : 'dependencies';
    const targetDependencies = isDev ? devDependencies : dependencies;
    const toMerge = {
        ...targetDependencies,
        [dependencyName]: answer,
    };
    const toSave = {
        ...packageJson,
        [depType]: toMerge,
    };
    await fs_extra_1.outputJson(filePath, toSave, { spaces: 2 });
}
exports.renovate = renovate;
