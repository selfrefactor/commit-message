"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const getCurrentTag_1 = require("./getCurrentTag");
const getNextTag_1 = require("./getNextTag");
exports.tagTypes = [
    'major',
    'minor',
    'patch',
];
exports.getTagValue = async (x) => {
    const index = rambdax_1.findIndex(rambdax_1.equals(x.tag), exports.tagTypes);
    if (index === -1) {
        return x.tag;
    }
    const tagType = index === -1 ?
        'patch' :
        exports.tagTypes[index];
    const currentTag = await x.page.evaluate(getCurrentTag_1.getCurrentTag);
    return getNextTag_1.getNextTag(currentTag, tagType);
};
//# sourceMappingURL=getTagValue.js.map