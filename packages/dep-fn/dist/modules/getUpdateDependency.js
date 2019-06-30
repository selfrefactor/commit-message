"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const getUpdateTag_1 = require("./getUpdateTag");
const confirm_1 = require("./helpers/confirm");
const getUpdateQuestion_1 = require("./helpers/getUpdateQuestion");
exports.getUpdateDependency = async (input) => {
    const latestTagRaw = await getUpdateTag_1.getUpdateTag(input);
    const currentTag = rambdax_1.last(rambdax_1.split('#', input.tag));
    if (latestTagRaw === false) {
        throw `Couldn't fetch latest tag ${input.dependency} ${input.tag}`;
    }
    const latestTag = rambdax_1.match(/[0-9\.]/g, latestTagRaw).join('');
    if (currentTag === latestTag) {
        return input.tag;
    }
    const question = getUpdateQuestion_1.getUpdateQuestion({
        currentTag,
        dependency: input.dependency,
        latestTag: latestTag,
    });
    const answer = await confirm_1.confirm(question, input.dependency);
    return answer ? `${input.url}#${latestTag}` : input.tag;
};
//# sourceMappingURL=getUpdateDependency.js.map