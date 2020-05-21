"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_fn_1 = require("helpers-fn");
const getUpdateURL_1 = require("./getUpdateURL");
const getFallbackUpdate_1 = require("./helpers/getFallbackUpdate");
const isDependencyEligible_1 = require("./helpers/isDependencyEligible");
exports.getUpdateDependencies = async (input) => {
    try {
        const dependencies = input.dependencies;
        const willReturn = {};
        for (const prop in dependencies) {
            const dependency = dependencies[prop];
            const eligible = isDependencyEligible_1.isDependencyEligible(prop) && !dependency.startsWith('https://github.com/');
            if (!eligible) {
                const typeOK = eligible ? 'already better' : 'skipped';
                helpers_fn_1.log(`Dependency ${prop} is ${typeOK}`, 'warning');
                willReturn[prop] = dependency;
                continue;
            }
            const options = {
                dependency: prop,
                page: input.page,
                tag: dependency,
                url: getUpdateURL_1.getUpdateURL(dependency),
            };
            const willPush = await getFallbackUpdate_1.getFallbackUpdate(options);
            if (willPush !== dependency) {
                helpers_fn_1.log(`Updated '${prop}' dependency to ${willPush}`, 'success');
            }
            else {
                helpers_fn_1.log(`'${prop}' dependency no need to update`, 'success');
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
