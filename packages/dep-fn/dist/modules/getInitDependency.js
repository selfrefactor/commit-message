"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("log");
const rambdax_1 = require("rambdax");
const getInitTag_1 = require("./getInitTag");
const getInitURL_1 = require("./getInitURL");
exports.getInitDependency = async (input) => {
    const repositoryURL = await getInitURL_1.getInitURL(input.dependency);
    const options = rambdax_1.merge(input, { url: repositoryURL });
    const currentTag = await getInitTag_1.getInitTag(options);
    if (currentTag === false) {
        log_1.log(`Package '${input.dependency}' doesn't have Github tags!`, 'warning');
    }
    else {
        log_1.log(input.dependency, 'success');
    }
    // if currentTag is false, that means that the NPM package
    // doesn't have Github tags and we need to fallback to
    // the previous value
    return currentTag === false ?
        `^${input.tag}` :
        `${repositoryURL}#${currentTag}`;
};
//# sourceMappingURL=getInitDependency.js.map