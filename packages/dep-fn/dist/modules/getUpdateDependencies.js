"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("helpers");
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
                helpers_1.log(`Dependency ${prop} is ${typeOK}`, 'warning');
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
                helpers_1.log(`Updated '${prop}' dependency to ${willPush}`, 'success');
            }
            else {
                helpers_1.log(`'${prop}' dependency no need to update`, 'success');
            }
            willReturn[prop] = willPush;
        }
        return willReturn;
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
//# sourceMappingURL=getUpdateDependencies.js.map