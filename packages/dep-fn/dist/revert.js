"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("log");
const rambdax_1 = require("rambdax");
const getDependencies_1 = require("./modules/helpers/getDependencies");
const getFallbackLatest_1 = require("./modules/helpers/getFallbackLatest");
async function revert() {
    try {
        const dependency = rambdax_1.last(process.argv);
        const { devDependencies, dependencies, } = await getDependencies_1.getDependencies();
        const isStandardDep = Object.keys(dependencies).includes(dependency);
        const isDevDep = Object.keys(devDependencies).includes(dependency);
        if (!isStandardDep && !isDevDep) {
            log_1.log('Dependency is not included in package.json', dependency, 'error');
        }
        const latestTag = await getFallbackLatest_1.getFallBackLatest(dependency);
        const devFlag = isDevDep ?
            '-D' :
            '';
        const command = `yarn add ${devFlag} ${dependency}@^${latestTag}`;
        log_1.log(`Use command '${command}' to apply changes`, 'box');
    }
    catch (err) {
        console.log(err);
    }
}
exports.revert = revert;
//# sourceMappingURL=revert.js.map