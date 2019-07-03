"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("helpers");
const rambdax_1 = require("rambdax");
const getInitDependency_1 = require("./getInitDependency");
const confirm_1 = require("./helpers/confirm");
exports.getInitDependencies = async (input) => {
    try {
        const dependencies = input.dependencies;
        const willReturn = {};
        for (const prop in dependencies) {
            const dependency = dependencies[prop];
            const alreadyBetter = dependency.startsWith('https://github.com/');
            const isDefinitelyTyped = prop.startsWith('@types/');
            let conditionRaw = !(alreadyBetter || isDefinitelyTyped);
            if (alreadyBetter) {
                helpers_1.log(`Dependency is already converted ${prop} ${dependency}`, 'info');
            }
            if (isDefinitelyTyped) {
                helpers_1.log(`Dependency '${dependency}' cannot be converted ${prop}`, 'info');
            }
            const question = `Do you want to convert dependency '${prop}'?`;
            const condition = conditionRaw ?
                await confirm_1.confirm(question, dependency) :
                conditionRaw;
            const tag = Number.isNaN(dependency[0] * 1) ?
                rambdax_1.tail(dependency) :
                dependency;
            const options = {
                dependency: prop,
                page: input.page,
                tag: tag,
            };
            const willPush = condition ?
                await getInitDependency_1.getInitDependency(options) :
                dependency;
            willReturn[prop] = willPush;
        }
        return willReturn;
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
//# sourceMappingURL=getInitDependencies.js.map