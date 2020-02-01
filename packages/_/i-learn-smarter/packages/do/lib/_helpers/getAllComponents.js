"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const execCommand_1 = require("./execCommand");
const boilerplateFolders = [
    'ants',
    'bees',
    '_styled',
    '_helpers',
    '_modules',
    'carrier',
    'navigation',
];
async function getAllComponents(srcDirectory) {
    const [listResult] = await execCommand_1.execCommand(`ls ${srcDirectory}`, process.cwd(), 'DONT_LOG');
    return rambdax_1.filter((srcContentInstance) => {
        const instanceIsFolder = !srcContentInstance.includes('.');
        const folderIsBoilerplate = boilerplateFolders.includes(srcContentInstance);
        const folderIsInternal = srcContentInstance.startsWith('_');
        return rambdax_1.allTrue(instanceIsFolder, !folderIsBoilerplate, !folderIsInternal);
    })(listResult.trim().split('\n'));
}
exports.getAllComponents = getAllComponents;
//# sourceMappingURL=getAllComponents.js.map