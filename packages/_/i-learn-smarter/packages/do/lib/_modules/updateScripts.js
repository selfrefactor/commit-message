"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const rambdax_1 = require("rambdax");
const outputFileSync_1 = require("./outputFileSync");
const stringify_1 = require("./stringify");
function getSrcFolder(srcDirectory) {
    return rambdax_1.last(srcDirectory.split('/'));
}
/**
 * Update `scripts` property in `package.json`_
 * so it includes two `jest` commands_
 * one for running test_
 * the other for watch mode of `jest`
 */
function updateScripts(filePath, rootInput) {
    const packageJsonContent = fs_extra_1.readJSONSync(rootInput.packageJson);
    const packageJsonScripts = packageJsonContent.scripts;
    /**
     * We receive here filepath without the `srcDirectory`
     */
    const [, normalizedFilePathRaw] = filePath.split(rootInput.srcDirectory);
    /**
     * We need to know what is the last folder_
     * from the `srcDirectory` path so we can append it_
     * to the final filepath.
     */
    const srcFolder = getSrcFolder(rootInput.srcDirectory);
    const normalizedFilePath = `${srcFolder}${normalizedFilePathRaw}`;
    /**
     * `x` append to `dev` suggests that this command_
     * has something extra - in this case a watch flag
     */
    const scripts = {
        ...packageJsonScripts,
        dev: `jest ${normalizedFilePath}`,
        devx: `jest ${normalizedFilePath} --watch`,
    };
    const newPackageJson = {
        ...packageJsonContent,
        scripts,
    };
    outputFileSync_1.outputFileSync(rootInput.packageJson, stringify_1.stringify(newPackageJson));
}
exports.updateScripts = updateScripts;
//# sourceMappingURL=updateScripts.js.map