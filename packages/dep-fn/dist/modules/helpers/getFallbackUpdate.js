"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFallbackUpdate = void 0;
const confirm_1 = require("./confirm");
const getFallbackLatest_1 = require("./getFallbackLatest");
const getUpdateQuestion_1 = require("./getUpdateQuestion");
const normalizeTag_1 = require("./normalizeTag");
const getFallbackUpdate = async (input) => {
    try {
        const currentVersion = normalizeTag_1.normalizeTag(input.tag);
        const latestVersion = await getFallbackLatest_1.getFallBackLatest(input.dependency);
        if (currentVersion === latestVersion) {
            return currentVersion;
        }
        const question = getUpdateQuestion_1.getUpdateQuestion({
            currentTag: currentVersion,
            dependency: input.dependency,
            latestTag: latestVersion,
        });
        const answer = await confirm_1.confirm(question);
        const willReturn = answer ? latestVersion : currentVersion;
        return willReturn;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getFallbackUpdate = getFallbackUpdate;
