"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const rambdax_1 = require("rambdax");
const getPath = () => {
    if (fs_1.existsSync(path_1.resolve(process.cwd(), '.git/HEAD'))) {
        return process.cwd();
    }
    let flag = false;
    Array(4)
        .fill('')
        .map((_, i) => {
        if (flag === false) {
            const filePath = path_1.resolve(process.cwd(), `${'../'.repeat(i)}/.git/HEAD`);
            if (fs_1.existsSync(filePath)) {
                flag = rambdax_1.replace('/.git/HEAD', '', filePath);
            }
        }
    });
    return flag;
};
exports.getRepoName = () => {
    const projectPath = getPath();
    if (projectPath === false) {
        throw 'You are not inside a Github project folder!';
    }
    return rambdax_1.last(rambdax_1.split(path_1.sep, projectPath));
};
//# sourceMappingURL=getRepoName.js.map