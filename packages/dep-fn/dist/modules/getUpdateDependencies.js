"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("log");
const rambdax_1 = require("rambdax");
const getUpdateDependency_1 = require("./getUpdateDependency");
const getUpdateURL_1 = require("./getUpdateURL");
const getFallbackUpdate_1 = require("./helpers/getFallbackUpdate");
const isDependencyEligible_1 = require("./helpers/isDependencyEligible");
exports.getUpdateDependencies = async (input) => {
    try {
        const dependencies = input.dependencies;
        const willReturn = {};
        for (const prop in dependencies) {
            const dependency = dependencies[prop];
            const alreadyBetter = dependency.startsWith('https://github.com/');
            const isDefinitelyTyped = prop.startsWith('@types/');
            const condition = alreadyBetter && !isDefinitelyTyped;
            const eligible = isDependencyEligible_1.isDependencyEligible(prop);
            if ((alreadyBetter && isDefinitelyTyped) || !eligible) {
                const typeOK = eligible ? 'already better' : 'skipped';
                log_1.log(`Dependency ${prop} is ${typeOK}`, 'warning');
                willReturn[prop] = dependency;
                continue;
            }
            const options = {
                dependency: prop,
                page: input.page,
                tag: dependency,
                url: getUpdateURL_1.getUpdateURL(dependency),
            };
            const willPush = condition ?
                await getUpdateDependency_1.getUpdateDependency(options) :
                await getFallbackUpdate_1.getFallbackUpdate(options);
            if (willPush !== dependency) {
                log_1.log(`Updated '${prop}' dependency to ${willPush}`, 'success');
            }
            else {
                log_1.log(`'${prop}' dependency no need to update`, 'success');
            }
            willReturn[prop] = willPush;
        }
        return willReturn;
    }
    catch (err) {
        rambdax_1.debug(err);
    }
};
//# sourceMappingURL=getUpdateDependencies.js.map