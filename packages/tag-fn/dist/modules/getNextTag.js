"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
exports.getNextTag = (currentTag, tagType) => {
    let [major, minor, patch] = rambdax_1.compose(rambdax_1.ifElse((x) => x.length === 3, rambdax_1.identity, () => { throw 'Only tags with pattern \'1.2.3\' are accepted'; }), rambdax_1.split('.'))(currentTag);
    let flag = false;
    if (patch === '9' && tagType === 'patch') {
        if (minor === '9') {
            return `${Number(major) + 1}.0.0`;
        }
        patch = 0;
        minor = Number(minor) + 1;
        flag = true;
    }
    else if (minor === '9' && tagType === 'minor') {
        minor = 0;
        major = Number(major) + 1;
        flag = true;
    }
    if (tagType === 'minor') {
        patch = 0;
    }
    if (tagType === 'major') {
        patch = 0;
        minor = 0;
    }
    const tagIndex = tagType === 'patch' ? 2 : tagType === 'minor' ? 1 : 0;
    const result = rambdax_1.compose(rambdax_1.join('.'), rambdax_1.ifElse(rambdax_1.always(flag), rambdax_1.identity, x => rambdax_1.adjust(tagIndex, rambdax_1.add(1), x)), rambdax_1.map(Number))([major, minor, patch]);
    return result;
};
//# sourceMappingURL=getNextTag.js.map