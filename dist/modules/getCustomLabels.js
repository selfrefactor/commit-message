"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const getPath = () => {
    let flag = true;
    let willReturn;
    const basePath = process.cwd();
    Array(4).fill('')
        .map((_, i) => {
        if (flag) {
            const filePath = path_1.resolve(basePath, `${'../'.repeat(i)}/package.json`);
            if (fs_1.existsSync(filePath)) {
                flag = false;
                willReturn = filePath;
            }
        }
    });
    return willReturn;
};
function getCustomLabels() {
    const filePathRaw = path_1.join(process.cwd(), 'package.json');
    const initCheck = fs_1.existsSync(filePathRaw);
    const filePath = initCheck ?
        filePathRaw :
        getPath();
    if (filePath === false) {
        return false;
    }
    const packageJsonRaw = fs_1.readFileSync(filePath).toString();
    const packageJson = JSON.parse(packageJsonRaw);
    return packageJson.commitMessage === undefined ?
        false :
        packageJson.commitMessage;
}
exports.getCustomLabels = getCustomLabels;
//# sourceMappingURL=getCustomLabels.js.map